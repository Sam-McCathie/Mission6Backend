const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); /*Allows communication with api's I have created*/
const app = express();

const ProjectsModel = require("./models/projects");

// Receive info from the front end
app.use(express.json());
app.use(cors());

const port = 3001;
const connection =
  "mongodb+srv://Sam:Sam123456!@missionready.niilp.mongodb.net/projects?retryWrites=true&w=majority";

mongoose.connect(connection, {
  useNewUrlParser: true,
});

/* Add data to server */
app.post("/insert", async (req, res) => {
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

/* Read data to server */
app.get("/read", async (req, res) => {
  ProjectsModel.find({}, (error, result) => {
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
