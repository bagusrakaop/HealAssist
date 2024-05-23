const express = require("express");
const schedules = require("../controllers/scheduleController.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const router = express.Router();

router.use(authMiddleware);

router.post("/", schedules.create);
router.get("/", schedules.findAll);
router.get("/:id", schedules.findOne);

// Untuk nampilin schedule
router.get("/user/:userId", schedules.findByUserId);

router.put("/:id", schedules.update);
router.delete("/:id", schedules.delete);
router.delete("/user/:userId", schedules.deleteByUserId);
router.post("/food", schedules.addScheduleFood);
router.get("/:scheduleId/food/:foodId", schedules.getScheduleFood);
router.put("/:scheduleId/food/:foodId", schedules.editScheduleFood);
router.post("/exercise", schedules.addScheduleExercise);
router.get("/:scheduleId/exercise/:exerciseId", schedules.getScheduleExercise);
router.put("/:scheduleId/exercise/:exerciseId", schedules.editScheduleExercise);

// Untuk ngebuat schedule saat awal bikin akun
router.post("/user", schedules.createWeeklySchedule);

// Untuk setelah milih makanan kesukaan
router.post("/user/foods", schedules.addWeeklyFood);

// Untuk setelah milih olahraga kesukaan
router.post("/user/exercise", schedules.addWeeklyExercise);

module.exports = router;
