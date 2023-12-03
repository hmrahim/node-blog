const { Schema, model } = require("mongoose");
const { schema } = require("./User");
const Post = require("./Post");
const User = require("./User");

const profileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    title: {
      type: String,
      maxLength: 100,
      trim: true,
    },
    bio: {
      type: String,
      maxLength: 500,
      trim: true,
    },
    profilePic: String,
    links: {
      website: String,
      facebook: String,
      twitter: String,
      github: String,
    },
    post: [
      {
        type: Schema.Types.ObjectId,
        ref: Post,
      },
    ],
    bookmark: [
      {
        type: Schema.Types.ObjectId,
        ref: Post,
      },
    ],
  },
  {
    timestamps: true,
  }
);


const Profile = model("Profile",profileSchema)

module.exports = Profile
