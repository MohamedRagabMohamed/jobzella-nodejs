import { crud } from "../crud";
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const constanet = require("../../constant");
const attributes = [
  "id",
  "username",
  "name",
  "email",
  "password",
  "phoneNumber",
];

export const getAll = (req, res) => {
  const limit = req.params.size || 10;
  const offset = req.params.page || 0;
  User.findAll({
    limit: parseInt(limit),
    offset: parseInt(offset),
  }).then(async (users) => {
    return res.status(200).send({
      totalElements: await User.count(),
      content: users,
    });
  });
};

export const login = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
    attributes: attributes,
  })
    .then((user) => {
      user = {
        ...user.dataValues,
      };
      const validPassword = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(400).send({
          login: "wronge  password",
        });
      }
      delete user.password;
      user.token = jwt.sign({ ...user }, constanet.JWT_SECRET, {
        expiresIn: constanet.JWT_EXPIRES_IN,
      });

      return res.status(200).send({
        user,
      });
    })
    .catch((err) => {
      return res.status(401).send({
        message: "wronge email or password",
      });
    });
};

export const userCrud = crud(User);
