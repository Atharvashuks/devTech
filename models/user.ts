import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists!"],
    },
    username: {
      type: String,
      required: [true, "username already exists!"],
    },
    image: String,
    desc: String,
    githubURL: String,
    linkedinURL: String,
    projects: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Project",
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;
