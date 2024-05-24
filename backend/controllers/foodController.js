const { Food, User, Schedule } = require("../models");

exports.create = (req, res) => {
    const food = {
        name: req.body.name,
        calories: req.body.calories,
        picture: req.body.picture,
    };

    Food.create(food)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while adding Food.",
            });
        });
};

exports.findAll = (req, res) => {
    Food.findAll()
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.send({ message: "No Food found." });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Food.",
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Food.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Food ${id} does not exist`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    `Error while retrieving Food with id = ${id}`,
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    Food.update(req.body, { where: { id: id } })
        .then((num) => {
            if (num == 1) {
                res.send({ message: `Food ${id} is updated` });
            } else {
                res.status(400).send({
                    message: `Cannot update Food ${id}`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || `Error updating Food ${id}`,
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Food.destroy({ where: { id: id } })
        .then((num) => {
            if (num == 1) {
                res.send({ message: `Food ${id} is deleted` });
            } else {
                res.status(400).send({
                    message: `Cannot delete Food ${id}`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || `Error deleting Food ${id}`,
            });
        });
};

exports.addUserFood = (req, res) => {
    const { userId, foodId } = req.body;

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
            return schedule.addFood(foodId).then(() => {
                res.status(201).send({
                    message: "Food added for user successfully.",
                });
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Internal server error",
            });
        });
};

exports.getUserFood = (req, res) => {
    const userId = req.params.userId;

    User.findByPk(userId)
        .then((user) => {
            if (!user) {
                return res.status(404).send({ message: "User not found" });
            }

            return user.getSchedules().then((schedules) => {
                let foodList = [];

                const promises = schedules.map((schedule) => {
                    return schedule.getFood().then((foods) => {
                        foods.forEach((food) => {
                            if (
                                !foodList.some(
                                    (existingFood) =>
                                        existingFood.id === food.id
                                )
                            ) {
                                foodList.push(food);
                            }
                        });
                    });
                });

                return Promise.all(promises).then(() => {
                    res.status(200).send({ userId, foodList });
                });
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Internal server error",
            });
        });
};

exports.deleteUserFood = (req, res) => {
    const { foodId, userId } = req.params;

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
                return schedule.removeFood(foodId);
            });

            return Promise.all(promises).then(() => {
                res.status(200).send({ message: "Food removed successfully." });
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Internal server error",
            });
        });
};

exports.editWeeklyFood = (req, res) => {
    const userId = req.params.userId;
    const foodIds = req.body.foodIds;

    Schedule.findAll({
        where: { userId: userId },
        include: [
            {
                model: Food,
                through: { attributes: [] }, // Exclude join table attributes
            },
        ],
    })
        .then((schedules) => {
            const promises = [];

            const getRandomFoodId = () => {
                const randomIndex = Math.floor(Math.random() * foodIds.length);
                return foodIds[randomIndex];
            };

            // Update food associations for each schedule
            for (const schedule of schedules) {
                const foodId = getRandomFoodId();
                promises.push(schedule.setFood([foodId])); // Set new food association
            }

            return Promise.all(promises);
        })
        .then(() => {
            res.status(200).send({ message: "Foods changed successfully" });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Internal server error",
            });
        });
};

exports.changeUserFood = async (req, res) => {
    const { userId, foodIds } = req.body;
    const getRandomFoodId = () =>
        foodIds[Math.floor(Math.random() * foodIds.length)];

    try {
        // Delete existing foods
        const schedules = await Schedule.findAll({
            where: { userId },
            include: [{ model: Food, through: { attributes: [] } }],
        });
        await Promise.all(schedules.map((schedule) => schedule.setFood([])));

        // Add new foods
        const scheduless = await Schedule.findAll({ where: { userId } });
        await Promise.all(
            scheduless.map(async (schedule) => {
                const foodId = getRandomFoodId();
                const food = await Food.findByPk(foodId);
                await schedule.addFood(food);
            })
        );

        res.status(200).send({ message: "Food changed successfully" });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while changing food.",
        });
    }
};
