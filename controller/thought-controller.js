const { snow } = require("color-name");
const { User, Thought } = require("../model");

const thoughtController = {
  getAllThought(req, res) {
    Thought.find({})
      .then((dbThought) => {
        res.json(dbThought);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getSingleThought({ params }, res) {
    Thought.findOne(params)
      .then((dbThought) => {
        if (!dbThought) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbThought);
      })
      .catch((err) => res.json(err));
  },
  addThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbThought) => {
        if (!dbThought) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbThought);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true })
      .then((updateThought) => {
        if (!updateThought) {
          return res.status(404).json({ message: "No thoughts with this id!" });
        }
        res.json(updateThought);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((deletedThought) => {
        if (!deletedThought) {
          return res.status(404).json({ message: "No thoughts with this id!" });
        }
        res.json(deletedThought);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((dbReaction) => {
        if (!dbReaction) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbReaction);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((deletedReaction) => {
        if (!deletedReaction) {
          res
            .status(404)
            .json({ message: "no thought with reaction found with this id" });
          return;
        }
        res.json(deletedReaction);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};

module.exports = thoughtController;
