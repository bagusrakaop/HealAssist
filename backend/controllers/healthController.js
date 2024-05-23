const { Health } = require("../models");

exports.create = (req, res) => {
    const health = {
        userId: req.body.userId,
        age: req.body.age,
        sex: req.body.sex,
        tall: req.body.tall,
        weight: req.body.weight,
        smoke: req.body.smoke,
        health: req.body.health,
        checkup: req.body.checkup,
        exercise: req.body.exercise,
        depression: req.body.depression,
        diabetes: req.body.diabetes,
        arthritis: req.body.arthritis,
        skinCancer: req.body.skinCancer,
        otherCancer: req.body.otherCancer,
        alcohol: req.body.alcohol,
        fruit: req.body.fruit,
        vegetables: req.body.vegetables,
        potatoes: req.body.potatoes,
    };

    Health.findOne({ where: { userId: health.userId } })
        .then((existingHealth) => {
            if (existingHealth) {
                Health.update(req.body, { where: { id: existingHealth.id } })
                    .then((num) => {
                        if (num == 1) {
                            res.send({ message: `Health ${id} is updated` });
                        } else {
                            res.status(400).send({
                                message: `Cannot update Health ${id}`,
                            });
                        }
                    })
                    .catch((err) => {
                        res.status(500).send({
                            message:
                                err.message || `Error updating Health ${id}`,
                        });
                    });
            } else {
                Health.create(health)
                    .then((data) => {
                        res.send(data);
                    })
                    .catch((err) => {
                        res.status(500).send({
                            message:
                                err.message ||
                                "Some error occurred while adding Health.",
                        });
                    });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while checking Health data.",
            });
        });
};

exports.findAll = (req, res) => {
    Health.findAll()
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.send({ message: "No Health found." });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving Health.",
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Health.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Health ${id} does not exist`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    `Error while retrieving Health with id = ${id}`,
            });
        });
};

exports.findByUserId = (req, res) => {
    const userId = req.params.userId;

    Health.findOne({ where: { userId: userId } })
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Health for User ${userId} does not exist`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    `Error while retrieving Health for User with id = ${userId}`,
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    Health.update(req.body, { where: { id: id } })
        .then((num) => {
            if (num == 1) {
                res.send({ message: `Health ${id} is updated` });
            } else {
                res.status(400).send({ message: `Cannot update Health ${id}` });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || `Error updating Health ${id}`,
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Health.destroy({ where: { id: id } })
        .then((num) => {
            if (num == 1) {
                res.send({ message: `Health ${id} is deleted` });
            } else {
                res.status(400).send({ message: `Cannot delete Health ${id}` });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || `Error deleting Health ${id}`,
            });
        });
};
