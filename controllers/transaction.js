const Transaction = require("../models/Transaction");
const Member = require("../models/Member");
const shortid = require("shortid");
const Detail = require("../models/Detail");
const Service = require("../models/Service");
const Rule = require("../models/Rule");

const axios = require("axios");

module.exports = {
  index: (req, res) => {
    Transaction.find()
      .populate("user")
      .populate("member")
      .then(transaction => res.json(transaction))
      .catch(err => console.log(err));
  },
  show: (req, res) => {
    Transaction.findById(req.params.id)
      .populate("user")
      .populate("member")
      .then(transaction => res.json(transaction))
      .catch(err => console.log(err));
  },
  search: (req, res) => {
    Transaction.find({ invoice: req.params.invoice })
      .populate("user")
      .populate("member")
      .then(transaction => res.json(transaction))
      .catch(err => console.log(err));
  },
  searchByPhone: (req, res) => {
    Member.findOne({ phone: req.params.phone })
      .then(member => {
        Transaction.find({ member: member._id })
          .populate("user")
          .populate("member")
          .then(transaction => res.json(transaction))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  },
  hitung: (req, res) => {
    if (req.user.role == "admin" || req.user.role == "kasir") {
      Transaction.findById(req.params.id)
        .then(transaction =>
          Detail.find({ transaction: transaction._id })
            .populate("service")
            .then(details => {
              let total = 0;
              details.forEach(detail => {
                total += detail.qty * detail.service.tarif;
              });
              transaction.total = total;
              Transaction.aggregate([
                {
                  $addFields: {
                    "month" : {$month: $dateIn},
                    "year": {$year: $dateIn}
                   }
                },
                {
                  $match: { 
                    member: transaction.member,
                    month: {$month: Date.now()},
                    year: {$year: Date.now()}
                  }
                },
                {
                  $group: {
                    _id: null,
                    total: {
                      $sum: "$total"
                    },
                    count: {
                      $sum: 1
                    }
                  }
                }
              ]).then(transacts => {
                axios
                  .get(
                    "https://laundry-microservice-diskon.herokuapp.com/api/v1/rules/diskon?",
                    {
                      params: {
                        f: transacts[0].count,
                        b: transacts[0].total
                      }
                    }
                  )
                  .then(response => {
                    transaction.discount = response.data.diskon;
                    transaction.grandTotal =
                      (transaction.total * (100 - transaction.discount)) / 100;
                    transaction.save().then(transact => res.json(transact));
                  });
              });
            })
        )
        .catch(err => console.log(err));
    } else {
      res.sendStatus(403);
    }
  },
  update: (req, res) => {
    if (req.user.role == "admin" || req.user.role == "kasir") {
      Transaction.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      )
        .then(transaction => res.json(transaction))
        .catch(err => console.log(err));
    } else {
      res.sendStatus(403);
    }
  },
  store: (req, res) => {
    if (req.user.role == "admin" || req.user.role == "kasir") {
      let newTransact = { ...req.body };
      newTransact.user = req.user._id;
      newTransact.invoice = shortid.generate();
      Transaction.create(newTransact)
        .then(transaction => res.json(transaction))
        .catch(err => console.log(err));
    } else {
      res.sendStatus(403);
    }
  },
  destroy: (req, res) => {
    if (req.user.role == "admin" || req.user.role == "kasir") {
      Transaction.findOneAndDelete({ _id: req.params.id })
        .then(transaction => res.json(transaction))
        .catch(err => console.log(err));
    } else {
      res.sendStatus(403);
    }
  }
};
