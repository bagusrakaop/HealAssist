const express = require("express");
const exercises = require("../controllers/exerciseController.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const router = express.Router();

router.use(authMiddleware);

router.post("/", exercises.create);
router.get("/", exercises.findAll);
router.get("/:id", exercises.findOne);
router.put("/:id", exercises.update);
router.delete("/:id", exercises.delete);
router.post("/user", exercises.addUserExercise);
router.get("/user/:userId", exercises.getUserExercise);
router.delete("/:exerciseId/user/:userId", exercises.deleteUserExercise);

module.exports = router;
