const express = require("express");
const foods = require("../controllers/foodController.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const router = express.Router();

router.use(authMiddleware);

router.post("/", foods.create);
router.get("/", foods.findAll);
router.get("/:id", foods.findOne);
router.put("/:id", foods.update);
router.delete("/:id", foods.delete);
router.post("/user", foods.addUserFood);
router.get("/user/:userId", foods.getUserFood);
router.delete("/:foodId/user/:userId", foods.deleteUserFood);

// Untuk ngedit makanan user (sekaligus update schedule)
router.put("/user/:userId", foods.editWeeklyFood);

module.exports = router;
