const express = require("express");
const exercises = require("../controllers/exerciseController.js");
const router = express.Router();

router.post("/", exercises.create);
router.get("/", exercises.findAll);
router.get("/:id", exercises.findOne);
router.put("/:id", exercises.update);
router.delete("/:id", exercises.delete);

module.exports = router;
