const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

const {
  showTransaction,
  showDetail,
  showService
} = require("../controllers/dreport");

router.use(verifyToken);
router.get("/", showDetail);
router.get("/", showService);
router.get("/", showTransaction);

module.exports = router;
