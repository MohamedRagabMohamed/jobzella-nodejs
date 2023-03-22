const { Router } = require("express");
const controller = require("./controller");
const router = Router();

router.route("/login").post(controller.login);
router
  .route("")
  .get(controller.userCrud.getMany)
  .post(controller.userCrud.createOne);
router
  .route("/:id")
  .get(controller.userCrud.getOne)
  .put(controller.userCrud.updateOne)
  .delete(controller.userCrud.removeOne);

module.exports = router;
