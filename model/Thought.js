const { Schema, model } = require("mongoose");

const reactionSchema = new Schema({
  reactionId: {},
  reactionBody: {},
  username: {},
  createdAt: {},
});

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    // added char limit
  },
  createdAt: {
    type: Date.now,
  },
  username: {
    type: String,
    required: true,
  },
  reactions: {
    // Array of nested documents created with the reactionSchema
  },
});


const Thought = model('Thought', ThoughtSchema)

module.exports=Thought



// fix gitignore
