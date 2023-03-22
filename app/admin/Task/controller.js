import { crud } from "../crud";
import { Task, Group } from "../../models";
const attributes = ["id", "name", "description", ["status_id", "statusId"]];

export const getGroupTask = async (req, res) => {
  const groupId = req.params.groupId || -1;
  try {
    const group = await Group.findOne({
      where: {
        isDeleted: false,
        id: groupId,
      },
    });
    if (group) {
      const docs = await Task.findAll({
        where: {
          isDeleted: false,
          group_id: groupId,
        },
        attributes: attributes,
      });
      if (!docs) {
        return res.status(400).send({ message: "No Data Found." });
      }
      return res.status(200).json(docs);
    }
    res.status(400).json({
      message: "Group is deleted or wrong id",
    });
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const docs = await Task.create({
      ...req.body,
      group_id: req.body.groupId,
      status_id: req.body.status,
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
export const taskCrud = crud(Task);
