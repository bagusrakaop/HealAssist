const { Exercise } = require("../models");

exports.create = (req, res) => {
    const exercise = {
        name: req.body.name,
        calBurned: req.body.calBurned,
        duration: req.body.duration,
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
