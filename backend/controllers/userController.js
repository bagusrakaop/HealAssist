const { User } = require("../models");

exports.create = (req, res) => {
    const user = {
        username: req.body.username,
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
    };

    User.create(user)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating User.",
            });
        });
};

exports.findAll = (req, res) => {
    User.findAll()
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.send({ message: "No User found." });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving Users.",
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `User ${id} does not exist`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    `Error while retrieving User with id = ${id}`,
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    User.update(req.body, { where: { id: id } })
        .then((num) => {
            if (num == 1) {
                res.send({ message: `User ${id} is updated` });
            } else {
                res.status(400).send({ message: `Cannot update User ${id}` });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || `Error updating User ${id}`,
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    User.destroy({ where: { id: id } })
        .then((num) => {
            if (num == 1) {
                res.send({ message: `User ${id} is deleted` });
            } else {
                res.status(400).send({ message: `Cannot delete User ${id}` });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || `Error deleting User ${id}`,
            });
        });
};
