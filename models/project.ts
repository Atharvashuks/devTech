import { Schema, models, model } from "mongoose";

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  desc: String,
  image: String,
  liveURL: {
    type: String,
  },
  githubURL: String,
  caterogy: {
    type: String,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Project = models.Project || model("Project", ProjectSchema);

export default Project;
