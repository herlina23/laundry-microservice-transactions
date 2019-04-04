const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

const {
  index,
  show,
  store,
  update,
  search,
  destroy,
  hitung,
  searchByPhone
} = require("../controllers/transaction");

router.get("/search/:invoice", search);
router.get("/phone/:phone", searchByPhone);
router.get("/", index);
router.get("/:id", show);
router.use(verifyToken);
router.post("/", store);
router.put("/hitung/:id", hitung);
router.put("/:id", update);
router.delete("/:id", destroy);

module.exports = router;
