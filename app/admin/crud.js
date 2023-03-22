const getOne = (model) => async (req, res) => {
  try {
    const doc = await model.findByPk(req.params.id, {
      where: {
        isDeleted: false,
      },
    });

    if (!doc) {
      return res.status(400).send({ message: "No Data Found." });
    }

    res.status(200).json({
      data: doc,
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({ message: e.message });
  }
};
const getMany = (model) => async (req, res) => {
  try {
    const docs = await model.findAll({
      where: {
        isDeleted: false,
      },
    });
    if (!docs) {
      return res.status(400).send({ message: "No Data Found." });
    }
    res.status(200).json({
      data: docs,
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({ message: e.message });
  }
};
const getManyPaging = (model) => async (req, res) => {
  try {
    const limit = parseInt(req.params.size);
    const page = 0 + parseInt(req.params.page) - 1;
    const offset = page * limit;
    const docs = await model.findAndCountAll({
      where: {
        isDeleted: false,
      },
      offset: offset,
      limit: limit,
    });
    if (!docs) {
      return res.status(400).send({ message: "No Data Found." });
    }
    res.status(200).json({
      data: { items: docs.rows, totalItems: docs.count },
      success: true,
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({ message: e.message });
  }
};
const createOne = (model) => async (req, res) => {
  try {
    const doc = await model.create({
      ...req.body,
    });

    if (!doc) {
      return res.status(400).send({ message: "No Data Found." });
    }

    res.status(200).json({
      data: doc,
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({ message: e.message });
  }
};
const createBulk = (model) => async (req, res) => {
  try {
    const doc = await model.bulkCreate([...req.body]);
    if (!doc) {
      return res.status(400).send({ message: "No Data Found." });
    }

    res.status(200).json({
      data: doc,
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({ message: e.errors[0].message });
  }
};
const updateOne = (model) => async (req, res) => {
  try {
    model
      .update(req.body, {
        where: {
          id: req.params.id,
          isDeleted: false,
        },
      })
      .then((docs) => {
        if (docs[0] === 0) {
          return res.status(400).send({ message: "No Data Changed." });
        }
        return res.status(200).json({
          data: docs[0],
        });
      })
      .catch((error) => {
        return res.status(400).send({ message: "No Data Found." });
      });
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};
const removeOne = (model) => async (req, res) => {
  try {
    const docs = await model
      .update(
        { isDeleted: true },
        {
          where: {
            id: req.params.id,
          },
        }
      )
      .then((docs) => {
        if (docs[0] === 0) {
          return res.status(400).send({ message: "No Data Changed." });
        }
        return res.status(200).json({
          data: docs[0],
        });
      })
      .catch((error) => {
        return res.status(400).send({ message: "No Data Found." });
      });
  } catch (e) {
    console.error(e);
    res.status(400).send({ message: e.message });
  }
};

export const crud = (model) => ({
  getMany: getMany(model),
  getManyPaging: getManyPaging(model),
  getOne: getOne(model),
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  createOne: createOne(model),
  createBulk: createBulk(model),
});
