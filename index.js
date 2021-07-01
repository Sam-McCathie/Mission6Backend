const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); /*Allows communication with api's I have created*/
const app = express();

const ProjectsModel = require("./models/projects");
const ReviewsModel = require("./models/reviews");

app.use(express.json());
app.use(cors());

const port = 3001;
const connection =
  "mongodb+srv://Sam:Sam123456!@missionready.niilp.mongodb.net/projects?retryWrites=true&w=majority";

mongoose.connect(connection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/* Add new project to db */
app.post("/insert-project", async (req, res) => {
  const studentName = req.body.studentName;
  const studentAge = req.body.studentAge;
  const studentLevel = req.body.studentLevel;

  const project = new ProjectsModel({
    studentName: studentName,
    studentAge: studentAge,
    studentLevel: studentLevel,
  });

  try {
    await project.save();
    console.log(
      `Student ${studentName}, Age ${studentAge}, Level ${studentLevel} -> added to projects database`
    );
  } catch (error) {
    console.log(error);
  }
});

/* Get project data from db */
app.get("/read-projects", async (req, res) => {
  ProjectsModel.find({}, (error, result) => {
    if (error) {
      res.send(error);
    }
    res.send(result);
  });
});

/* Add new review to db */
app.post("/insert-review", async (req, res) => {
  const reviewHeading = req.body.reviewHeading;
  const reviewBody = req.body.reviewBody;
  const parentName = req.body.parentName;
  const parentIdentifyer = req.body.parentIdentifyer;

  const project = new ReviewsModel({
    reviewHeading: reviewHeading,
    reviewBody: reviewBody,
    parentName: parentName,
    parentIdentifyer: parentIdentifyer,
  });

  try {
    await project.save();
    console.log(
      ` Review ${reviewHeading} by ${parentName} -> added to projects database`
    );
  } catch (error) {
    console.log(error);
  }
});

/* Get review data from db */
app.get("/read-reviews", async (req, res) => {
  ReviewsModel.find({}, (error, result) => {
    if (error) {
      res.send(error);
    }
    res.send(result);
  });
});

/* Confirm the server is running */
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
