const express = require("express");
const healths = require("../controllers/healthController.js");
const router = express.Router();

router.post("/", healths.create);
router.get("/", healths.findAll);
router.get("/:id", healths.findOne);
router.get("/user/:userId", healths.findByUserId);
router.put("/:id", healths.update);
router.delete("/:id", healths.delete);

module.exports = router;
