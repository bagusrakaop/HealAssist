const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
    const user = {
        username: req.body.username,
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
    };

    if (!user.email || !user.username || !user.password || !user.name) {
        return res.status(400).send({ message: "Content cannot be empty" });
    }

    User.findOne({ where: { email: user.email } })
        .then((existingUser) => {
            if (existingUser) {
                return res
                    .status(400)
                    .send({ message: "Email is already taken" });
            } else {
                const hashedPassword = bcrypt.hashSync(user.password, 10);
                user.password = hashedPassword;

                User.create(user)
                    .then((data) => {
                        res.send(data);
                    })
                    .catch((err) => {
                        res.status(500).send({
                            message:
                                err.message ||
                                "Some error occurred while creating User.",
                        });
                    });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while checking user data.",
            });
        });
};

exports.login = (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        if (!email || !password) {
            return res.status(400).send({ message: "Content cannot be empty" });
        }

        User.findOne({ where: { email: email } }).then((user) => {
            if (!user) {
                return res.status(404).send({ message: "User not found" });
            }

            const isPasswordCorrect = bcrypt.compareSync(
                password,
                user.password
            );

            if (!isPasswordCorrect)
                return res.status(400).send({ message: "Wrong password" });

            const token = jwt.sign(
                { id: user.id, username: user.username, email: user.email },
                process.env.TOKEN_SECRET,
                { expiresIn: "12h" }
            );

            const data = {
                id: user.id,
                username: user.username,
                token: token,
            };

            return res.status(200).json({
                message: "You are authenticated",
                data: data,
            });
        });
    } catch (err) {
        return res.status(500).send({
            message: err.message || "Some error occured while authenticating",
        });
    }
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
