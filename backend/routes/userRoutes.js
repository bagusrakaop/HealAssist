const express = require("express");
const users = require("../controllers/userController.js");
const router = express.Router();

router.get("/", users.findAll);
router.post("/", users.create);
router.put("/:id", users.update);
router.get("/:id", users.findOne);
router.delete("/:id", users.delete);

module.exports = router;
