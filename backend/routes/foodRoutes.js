const express = require("express");
const foods = require("../controllers/foodController.js");
const router = express.Router();

router.post("/", foods.create);
router.get("/", foods.findAll);
router.get("/:id", foods.findOne);
router.put("/:id", foods.update);
router.delete("/:id", foods.delete);

module.exports = router;
