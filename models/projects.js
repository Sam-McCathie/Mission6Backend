const mongoose = require("mongoose");

const ProjectsSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  studentAge: {
    type: Number,
    required: true,
  },
  studentLevel: {
    type: Number,
    required: true,
  },
});

const Projects = mongoose.model("ProjectsData", ProjectsSchema);
module.exports = Projects;
