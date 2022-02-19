const router = require("express").Router();

const {
  getAllThought,
  addThought,
  addReaction,
  removeReaction,
  removeThought,
  getSingleThought,
  updateThought,
} = require("../../controller/thought-controller");

router.route("/").get(getAllThought);

router.route("/:userId").post(addThought);

router
  .route("/:thoughtId")
  .get(getSingleThought)
  .delete(removeThought)
  .put(updateThought);

router.route("/:thoughtId/reactions").post(addReaction);
// ^
router.route("/:thoughtId/:reactionId").delete(removeReaction);

module.exports = router;
