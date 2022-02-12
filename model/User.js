const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      //   match:[/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'enter a valid email']
      validate: {
        validator: function (email) {
          let regex = "/^([a-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/";
          return email.match(regex);
        },
        // validate email---- test it out(both)
      },
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
     // self reference by using 'this'
    friends: [this],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});


const User = model('User', UserSchema);
// why is this not exporting 

module.exports = User;
