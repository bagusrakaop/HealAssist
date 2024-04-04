const express = require("express");
const users = require("../controllers/userController.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const router = express.Router();

router.use(authMiddleware);

router.get("/", users.findAll);
router.put("/:id", users.update);
router.get("/:id", users.findOne);
router.delete("/:id", users.delete);

module.exports = router;
