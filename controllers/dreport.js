const Transaction = require("../models/Transaction");
const Member = require("../models/Member");
const shortid = require("shortid");
const Detail = require("../models/Detail");
const Service = require("../models/Service");

const User = require("../models/User");
const Rule = require("../models/Rule");

const axios = require("axios");

module.exports = {
  showService: (req, res) => {
    if (req.user.role == "admin") {
      Service.find()
        .then(dreport => res.json(dreport))
        .catch(err => console.log(err));
    } else {
      res.sendStatus(403);
    }
  },

  showTransaction: (req, res) => {
    if (req.user.role == "admin") {
      Transaction.find()
        .populate("user")
        .populate("member")
        .then(dreport => res.json(dreport))
        .catch(err => console.log(err));
    } else {
      res.sendStatus(403);
    }
  },

  showDetail: (req, res) => {
    if (req.user.role == "admin") {
      Detail.find()
        .populate("transaction")
        .populate("service")
        .then(dreport => res.json(dreport))
        .catch(err => console.log(err));
    } else {
      res.sendStatus(403);
    }
  }
};
