const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

const { index, store, update, destroy } = require("../controllers/detail");

router.get("/:id_trans", index);
router.use(verifyToken);
router.post("/", store);
router.put("/:id", update);
router.delete("/:id", destroy);

module.exports = router;
