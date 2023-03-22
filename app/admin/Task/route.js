const { Router } = require("express");
const controller = require("./controller");
const router = Router();

router.route("").post(controller.createTask);
router.route("/groupTasks/:groupId").get(controller.getGroupTask);
router
  .route("/:id")
  .get(controller.taskCrud.getOne)
  .put(controller.taskCrud.updateOne)
  .delete(controller.taskCrud.removeOne);

module.exports = router;
