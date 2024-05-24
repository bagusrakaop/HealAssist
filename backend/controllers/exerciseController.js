const { Exercise, User, Schedule, Food } = require("../models");
const db = require("../models/index.js");
const sequelize = db.sequelize;

exports.create = (req, res) => {
    const exercise = {
        name: req.body.name,
        calBurned: req.body.calBurned,
        duration: req.body.duration,
        picture: req.body.picture,
    };

    Exercise.create(exercise)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while adding Exercise.",
            });
        });
};

exports.findAll = (req, res) => {
    Exercise.findAll()
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.send({ message: "No Exercise found." });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving Exercise.",
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Exercise.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Exercise ${id} does not exist`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    `Error while retrieving Exercise with id = ${id}`,
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    Exercise.update(req.body, { where: { id: id } })
        .then((num) => {
            if (num == 1) {
                res.send({ message: `Exercise ${id} is updated` });
            } else {
                res.status(400).send({
                    message: `Cannot update Exercise ${id}`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || `Error updating Exercise ${id}`,
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Exercise.destroy({ where: { id: id } })
        .then((num) => {
            if (num == 1) {
                res.send({ message: `Exercise ${id} is deleted` });
            } else {
                res.status(400).send({
                    message: `Cannot delete Exercise ${id}`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || `Error deleting Exercise ${id}`,
            });
        });
};

exports.addUserExercise = (req, res) => {
    const { userId, exerciseId } = req.body;

    User.findByPk(userId)
        .then((user) => {
            if (!user) {
                return res.status(404).send({ message: "User not found" });
            }

            const defaultDate = new Date(0);
            const defaultTime = "00:00:00";
            return Schedule.create({
                userId: userId,
                date: defaultDate,
                time: defaultTime,
            });
        })
        .then((schedule) => {
            return schedule.addExercise(exerciseId).then(() => {
                res.status(201).send({
                    message: "Exercise added for user successfully.",
                });
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Internal server error",
            });
        });
};

exports.getUserExercise = (req, res) => {
    const userId = req.params.userId;

    User.findByPk(userId)
        .then((user) => {
            if (!user) {
                return res.status(404).send({ message: "User not found" });
            }

            return user.getSchedules().then((schedules) => {
                let exerciseList = [];

                const promises = schedules.map((schedule) => {
                    return schedule.getExercises().then((exercises) => {
                        exercises.forEach((exercise) => {
                            if (
                                !exerciseList.some(
                                    (existingExercise) =>
                                        existingExercise.id === exercise.id
                                )
                            ) {
                                exerciseList.push(exercise);
                            }
                        });
                    });
                });

                return Promise.all(promises).then(() => {
                    res.status(200).send({ userId, exerciseList });
                });
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Internal server error",
            });
        });
};

exports.deleteUserExercise = (req, res) => {
    const { exerciseId, userId } = req.params;

    Schedule.findAll({
        where: { userId: userId },
    })
        .then((schedules) => {
            if (schedules.length === 0) {
                return res
                    .status(404)
                    .send({ message: "Schedules not found for User" });
            }

            const promises = schedules.map((schedule) => {
                return schedule.removeExercise(exerciseId);
            });

            return Promise.all(promises).then(() => {
                res.status(200).send({
                    message: "Exercises removed successfully.",
                });
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Internal server error",
            });
        });
};

exports.editWeeklyExercise = (req, res) => {
    const userId = req.params.userId;
    const exIds = req.body.exIds;

    Schedule.findAll({
        where: { userId: userId },
        include: [
            {
                model: Exercise,
                through: { attributes: [] }, // Exclude join table attributes
                required: true,
            },
        ],
    })
        .then((schedules) => {
            const promises = [];

            const getRandomExId = () => {
                const randomIndex = Math.floor(Math.random() * exIds.length);
                return exIds[randomIndex];
            };

            for (const schedule of schedules) {
                const exId = getRandomExId();
                promises.push(schedule.setExercises([exId]));
            }

            return Promise.all(promises);
        })
        .then(() => {
            res.status(200).send({ message: "Exercise changed successfully" });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Internal server error",
            });
        });
};

exports.changeUserExercise = async (req, res) => {
    const { userId, exIds } = req.body;
    const getRandomExId = () => exIds[Math.floor(Math.random() * exIds.length)];

    try {
        // Delete existing exercises
        const schedules = await Schedule.findAll({
            where: { userId },
            include: [{ model: Exercise, through: { attributes: [] } }],
        });
        await Promise.all(
            schedules.map((schedule) => schedule.setExercises([]))
        );

        // Get unique dates
        const dateSchedules = await Schedule.findAll({
            where: { userId },
            attributes: [
                [sequelize.fn("DISTINCT", sequelize.col("date")), "date"],
            ],
        });

        // Add new exercises
        await Promise.all(
            dateSchedules.map(async (schedule) => {
                const date = schedule.date;
                const time = ["08:00:00", "12:00:00", "18:00:00"][
                    Math.floor(Math.random() * 3)
                ];
                const existingSchedule = await Schedule.findOne({
                    where: { userId, date, time },
                });
                if (existingSchedule) {
                    const exId = getRandomExId();
                    const exercise = await Exercise.findByPk(exId);
                    await existingSchedule.addExercise(exercise);
                }
            })
        );

        res.status(200).send({ message: "Exercise changed successfully" });
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while changing exercise.",
        });
    }
};
