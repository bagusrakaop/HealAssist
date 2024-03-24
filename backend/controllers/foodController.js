const { Food } = require("../models");

exports.create = (req, res) => {
    const food = {
        name: req.body.name,
        calories: req.body.calories,
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
