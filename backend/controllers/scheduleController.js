const { Schedule, Food, Exercise } = require("../models");

exports.create = (req, res) => {
    const schedule = {
        userId: req.body.userId,
        date: req.body.date,
        time: req.body.time,
    };

    Schedule.findOne({
        where: {
            userId: schedule.userId,
            date: schedule.date,
            time: schedule.time,
        },
    })
        .then((existingSched) => {
            if (existingSched) {
                return res.status(400).send({
                    scheduleId: existingSched.id,
                    message:
                        "Schedule data for this user, date, and time already exists.",
                });
            } else {
                Schedule.create(schedule)
                    .then((data) => {
                        res.send(data);
                    })
                    .catch((err) => {
                        res.status(500).send({
                            message:
                                err.message ||
                                "Some error occurred while adding Schedule.",
                        });
                    });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while checking Schedule data.",
            });
        });
};

exports.findAll = (req, res) => {
    Schedule.findAll()
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.send({ message: "No Schedule found." });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving Schedule.",
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Schedule.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Schedule ${id} does not exist`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    `Error while retrieving Schedule with id = ${id}`,
            });
        });
};

exports.findByUserId = (req, res) => {
    const userId = req.params.userId;

    Schedule.findAll({
        where: { userId: userId },
        include: [
            {
                model: Food,
                through: { attributes: [] },
            },
            {
                model: Exercise,
                through: { attributes: [] },
            },
        ],
    })
        .then((schedules) => {
            if (schedules.length > 0) {
                res.send(schedules);
            } else {
                res.status(404).send({
                    message: `No schedules found for User with id = ${userId}`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    `Error while retrieving schedules for User with id = ${userId}`,
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    Schedule.update(req.body, { where: { id: id } })
        .then((num) => {
            if (num == 1) {
                res.send({ message: `Schedule ${id} is updated` });
            } else {
                res.status(400).send({
                    message: `Cannot update Schedule ${id}`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || `Error updating Schedule ${id}`,
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Schedule.destroy({ where: { id: id } })
        .then((num) => {
            if (num == 1) {
                res.send({ message: `Schedule ${id} is deleted` });
            } else {
                res.status(400).send({
                    message: `Cannot delete Schedule ${id}`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || `Error deleting Schedule ${id}`,
            });
        });
};

exports.deleteByUserId = (req, res) => {
    const userId = req.params.userId;

    Schedule.destroy({ where: { userId: userId } })
        .then((num) => {
            if (num) {
                res.send({ message: `Schedule for User ${userId} is deleted` });
            } else {
                res.status(400).send({
                    message: `Cannot delete Schedule for User ${userId}`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || `Error deleting Schedule for User ${userId}`,
            });
        });
};

exports.addScheduleFood = (req, res) => {
    const { scheduleId, foodId } = req.body;

    Schedule.findByPk(scheduleId)
        .then((schedule) => {
            if (!schedule) {
                return res.status(404).send({
                    message: "Schedule not found. Please add Schedule first",
                });
            }

            Food.findByPk(foodId)
                .then((food) => {
                    if (!food) {
                        return res.status(404).send({
                            message: "Food not found. Please add Food first",
                        });
                    }

                    schedule
                        .addFood(food)
                        .then(() => {
                            res.status(201).send({
                                message: "Food added to schedule successfully.",
                            });
                        })
                        .catch((err) => {
                            res.status(500).send({
                                message:
                                    err.message ||
                                    `Error while adding food to schedule`,
                            });
                        });
                })
                .catch((err) => {
                    res.status(500).send({
                        message: err.message || `Error finding food`,
                    });
                });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || `Error finding schedule`,
            });
        });
};

exports.getScheduleFood = (req, res) => {
    const { scheduleId, foodId } = req.params;

    Schedule.findByPk(scheduleId, {
        include: [
            {
                model: Food,
                where: { id: foodId },
            },
        ],
    })
        .then((schedule) => {
            if (!schedule) {
                return res.status(404).send({ message: "Schedule not found" });
            }
            res.status(200).send({ schedule });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || `Error finding schedule`,
            });
        });
};

exports.addScheduleExercise = (req, res) => {
    const { scheduleId, exerciseId } = req.body;

    Schedule.findByPk(scheduleId)
        .then((schedule) => {
            if (!schedule) {
                return res.status(404).send({
                    message: "Schedule not found. Please add Schedule first",
                });
            }

            Exercise.findByPk(exerciseId)
                .then((exercise) => {
                    if (!exercise) {
                        return res.status(404).send({
                            message:
                                "Exercise not found. Please add Exercise first",
                        });
                    }

                    schedule
                        .addExercise(exercise)
                        .then(() => {
                            res.status(201).send({
                                message:
                                    "Exercise added to schedule successfully.",
                            });
                        })
                        .catch((err) => {
                            res.status(500).send({
                                message:
                                    err.message ||
                                    `Error while adding exercise to schedule`,
                            });
                        });
                })
                .catch((err) => {
                    res.status(500).send({
                        message: err.message || `Error finding exercise`,
                    });
                });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || `Error finding schedule`,
            });
        });
};

exports.getScheduleExercise = (req, res) => {
    const { scheduleId, exerciseId } = req.params;

    Schedule.findByPk(scheduleId, {
        include: [
            {
                model: Exercise,
                where: { id: exerciseId },
            },
        ],
    })
        .then((schedule) => {
            if (!schedule) {
                return res.status(404).send({ message: "Schedule not found" });
            }
            res.status(200).send({ schedule });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || `Error finding schedule`,
            });
        });
};
