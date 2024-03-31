const express = require("express");
const schedules = require("../controllers/scheduleController.js");
const router = express.Router();

router.post("/", schedules.create);
router.get("/", schedules.findAll);
router.get("/:id", schedules.findOne);
router.get("/user/:userId", schedules.findByUserId);
router.put("/:id", schedules.update);
router.delete("/:id", schedules.delete);
router.delete("/user/:userId", schedules.deleteByUserId);
router.post("/food", schedules.addScheduleFood);
router.get("/:scheduleId/food/:foodId", schedules.getScheduleFood);
router.post("/exercise", schedules.addScheduleExercise);
router.get("/:scheduleId/exercise/:exerciseId", schedules.getScheduleExercise);

module.exports = router;
