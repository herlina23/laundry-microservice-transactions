const Transaction = require("../models/Transaction");
const Member = require("../models/Member");
const shortid = require("shortid");
const Detail = require("../models/Detail");
const Service = require("../models/Service");

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
