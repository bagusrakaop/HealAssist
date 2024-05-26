const { User, Health, Schedule } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");
const otpGen = require("otp-generator");
const otpTool = require("otp-without-db");

exports.register = (req, res) => {
    const user = {
        username: req.body.username,
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
    };

    hash = req.body.hash;
    otp = req.body.otp;
    passwordConfirmation = req.body.passwordConfirmation;

    if (
        !user.email ||
        !user.username ||
        !user.password ||
        !user.name ||
        !passwordConfirmation ||
        !hash ||
        !otp
    ) {
        return res.status(400).send({ message: "Content cannot be empty" });
    }

    if (user.password !== passwordConfirmation) {
        return res.status(400).send({
            message: "Password and password confirmation do not match",
        });
    }

    verified = otpTool.verifyOTP(
        user.email,
        otp,
        hash,
        process.env.TOKEN_SECRET
    );
    if (verified) {
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
                            const curDate = new Date();

                            const times = ["08:00:00", "12:00:00", "18:00:00"];
                            let count = 0;
                            while (count < 7) {
                                let schedDate = new Date();
                                schedDate.setDate(
                                    curDate.getDate() + 1 + count
                                );
                                schedDate.setHours(0); // set hours to 0
                                schedDate.setMinutes(0); // set minutes to 0
                                schedDate.setSeconds(0); // set seconds to 0
                                for (const time of times) {
                                    const schedule = {
                                        userId: data.id,
                                        date: schedDate,
                                        time: time,
                                        status: 0,
                                    };

                                    Schedule.findOne({
                                        where: {
                                            userId: schedule.userId,
                                            date: schedule.date,
                                            time: schedule.time,
                                        },
                                    })
                                        .then((existingSched) => {
                                            if (!existingSched) {
                                                Schedule.create(schedule);
                                            }
                                        })
                                        .catch((err) => {
                                            res.status(500).send({
                                                message:
                                                    err.message ||
                                                    "Some error occurred while checking Schedule data.",
                                            });
                                        });
                                }
                                count++;
                            }

                            res.send({
                                message: "User created successfully",
                                data: {
                                    id: data.id,
                                    username: data.username,
                                    name: data.name,
                                    password: data.password,
                                    email: data.email,
                                    updatedAt: data.updatedAt,
                                    createdAt: data.createdAt,
                                },
                            });
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
    } else {
        return res
            .status(400)
            .send({ message: "Invalid OTP. Maybe it has expired" });
    }
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

exports.findProfile = (req, res) => {
    const id = req.params.id;

    User.findByPk(id, {
        attributes: ["name", "email"],
        include: [
            {
                model: Health,
                attributes: ["sex", "age"],
            },
        ],
    })
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

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD,
    },
});

exports.sendResetPasswordEmail = (req, res) => {
    const { email } = req.body;

    User.findOne({ where: { email: email } })
        .then((user) => {
            if (!user) {
                return res.status(404).send({
                    message:
                        "Your email hasn't been registered. Create a new account!",
                });
            }

            const resetToken = jwt.sign(
                { email: user.email },
                process.env.TOKEN_SECRET,
                { expiresIn: "1h" }
            );

            ejs.renderFile(
                path.join(__dirname, "..", "views", "resetPassword.ejs"),
                { username: user.username, email: user.email, resetToken },
                (err, data) => {
                    if (err) {
                        return res.status(500).send({
                            message:
                                err.message ||
                                "Some error occurred while generating email content.",
                        });
                    }

                    const mailOptions = {
                        from: '"HealAssist" <' + process.env.SENDER_EMAIL + ">",
                        to: email,
                        subject: "Reset Password",
                        html: data,
                    };

                    transporter
                        .sendMail(mailOptions)
                        .then((info) => {
                            return res
                                .status(200)
                                .send({ message: "Email sent successfully" });
                        })
                        .catch((err) => {
                            return res.status(500).send({
                                message:
                                    err.message ||
                                    "Some error occurred while sending email.",
                            });
                        });
                }
            );
        })
        .catch((err) => {
            return res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while processing the request.",
            });
        });
};

exports.resetPassword = (req, res) => {
    const { resetToken, email, password, passwordConfirmation } = req.body;

    decodedToken = jwt.verify(resetToken, process.env.TOKEN_SECRET);
    if (decodedToken.email !== email) {
        return res.status(401).send({
            message: "Invalid token for the provided email.",
        });
    }

    if (password !== passwordConfirmation) {
        return res.status(400).send({
            message: "Password and password confirmation do not match",
        });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    User.update({ password: hashedPassword }, { where: { email } })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Password was reset successfully.",
                });
            } else {
                res.status(400).send({
                    message:
                        err.message ||
                        `Cannot update User with email = ${email}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || `Cannot update User with email = ${email}.`,
            });
        });
};

exports.sendOTP = (req, res) => {
    const { email } = req.body;
    otp = otpGen.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
    });

    hash = otpTool.createNewOTP(email, otp, process.env.TOKEN_SECRET);

    ejs.renderFile(
        path.join(__dirname, "..", "views", "otp.ejs"),
        { otp: otp },
        (err, data) => {
            if (err) {
                return res.status(500).send({
                    message:
                        err.message ||
                        "Some error occurred while generating email content.",
                });
            }

            const mailOptions = {
                from: '"HealAssist" <' + process.env.SENDER_EMAIL + ">",
                to: email,
                subject: "OTP Verification",
                html: data,
            };

            transporter
                .sendMail(mailOptions)
                .then((info) => {
                    return res.status(200).send({
                        message: "Email sent successfully",
                        data: hash,
                    });
                })
                .catch((err) => {
                    return res.status(500).send({
                        message:
                            err.message ||
                            "Some error occurred while sending email.",
                    });
                });
        }
    );
};
