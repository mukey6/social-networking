const { Schema, model, Types } = require("mongoose");
const dateFormat = require('../utils/dateFornat');


const ReactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength:280
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal)
  },
},
{
    toJSON: {
      getters: true
    },
    _id: false
  }
);

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength:1,
    maxlength:280
    // added char limit
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal)
  },
  username: {
    type: String,
    required: true,
  },
  // Array of nested documents created with the reactionSchema
  reactions: [ReactionSchema]
},
{
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

ThoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
  });
const Thought = model('Thought', ThoughtSchema)

module.exports={Thought}

