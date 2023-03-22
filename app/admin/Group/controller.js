import jwt from "jsonwebtoken";
import { crud } from "../crud";
import { JWT_SECRET } from "../../constant";
import { Group } from "../../models";
const attributes = ["id", "name"];

export const getUserGroup = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const user = jwt.decode(token);
  console.log("userId =>>", user);
  try {
    const docs = await Group.findAll({
      where: {
        isDeleted: false,
        user_id: user.id,
      },
      attributes: attributes,
    });
    if (!docs) {
      return res.status(400).send({ message: "No Data Found." });
    }
    res.status(200).json(docs);
  } catch (e) {
    console.error(e);
    res.status(400).send({ message: e.message });
  }
};
export const createGroup = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const user = jwt.decode(token);
  try {
    const docs = await Group.create({ ...req.body, user_id: user.id });
    if (!docs) {
      return res.status(400).send({ message: "No Data Found." });
    }
    res.status(200).json(docs);
  } catch (e) {
    console.error(e);
    res.status(400).send({ message: e.message });
  }
};

export const groupCrud = crud(Group);
