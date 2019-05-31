const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

const {
  index,
  show,
  store,
  update,
  destroy,
  show_service
} = require("../controllers/service");

router.get("/show_service/", show_service);
router.use(verifyToken);

router.get("/", index);
router.get("/:id", show);
router.post("/", store);
router.put("/:id", update);
router.delete("/:id", destroy);

module.exports = router;
