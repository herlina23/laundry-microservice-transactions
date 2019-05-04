const Detail = require("../models/Detail");

module.exports = {
  index: (req, res) => {
    Detail.find({ transaction: req.params.id_trans })
      .populate("transaction")
      .populate("service")
      .then(detail => res.json(detail))
      .catch(err => console.log(err));
  },
  // show: (req, res) => {
  //   Detail.findById(req.params.id)
  //     .populate("transaction")
  //     .populate("service")
  //     .then(detail => res.json(detail))
  //     .catch(err => console.log(err));
  // },
  update: (req, res) => {
    if (req.user.role == "kasir" || req.user.role == "admin") {
      Detail.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      )
        .then(detail => res.json(detail))
        .catch(err => console.log(err));
    } else {
      res.sendStatus(403);
    }
  },
  store: (req, res) => {
    if (req.user.role == "kasir" || req.user.role == "admin") {
      Detail.create({ ...req.body })
        .then(detail => res.json(detail))
        .catch(err => console.log(err));
    } else {
      res.sendStatus(403);
    }
  },
  destroy: (req, res) => {
    if (req.user.role == "kasir" || req.user.role == "admin") {
      Detail.findOneAndDelete({ _id: req.params.id })
        .then(detail => res.json(detail))
        .catch(err => console.log(err));
    } else {
      res.sendStatus(403);
    }
  }
};
