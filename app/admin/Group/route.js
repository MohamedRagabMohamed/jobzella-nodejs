const { Router } = require("express");
const controller = require("./controller");
const router = Router();

router.route("").post(controller.createGroup);
router.route("/userGroups").get(controller.getUserGroup);
router
  .route("/:id")
  .get(controller.groupCrud.getOne)
  .put(controller.groupCrud.updateOne)
  .delete(controller.groupCrud.removeOne);

module.exports = router;
