const { Router } = require("express");
const controller = require("./controller");
const router = Router();

router
  .route("")
  .get(controller.statusCrud.getMany)
  .post(controller.statusCrud.createOne);
router
  .route("/:id")
  .get(controller.statusCrud.getOne)
  .put(controller.statusCrud.updateOne)
  .delete(controller.statusCrud.removeOne);

module.exports = router;
