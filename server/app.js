const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;

// DAY 1: require cors after installing package
const cors = require("cors");


// DAY 2 create, require and use models
const Cohort = require('./models/Cohort.model')
const Student = require('./models/Student.model')

// STATIC DATA
// DAY 1 Devs Team - Import the provided files with JSON data of students and cohorts here:
// const students = require('./data/students.json')
// const cohorts = require('./data/cohorts.json')
// DAY 2 Replace sending static data by quering the DB instead

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE
// DAY 1 Research Team - Set up CORS middleware here:
app.use(
  cors({
    // Add the URLs of allowed origins to this array
    origin: ['http://localhost:5173', 'http://example.com'],
  })
);

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// DAY 2 install, require, create mongoose db connection
const mongoose = require("mongoose");
 
mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// DAY 1 Devs Team - Start working on the routes here:

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// DAY 1 creating routes to send cohorts and students static data as res in json
// app.get('/api/cohorts', (req, res, next) => {
//   res.json(cohorts)
// })

// app.get('/api/students', (req, res, next) => {
//   res.json(students)
// })

// DAY 2 Replace sending static data by quering the DB instead
app.get("/api/cohorts", (req, res, next) => {
  Cohort.find()
    .then((cohortsFromDB) => {
      res.json(cohortsFromDB);
    })
    .catch((err) => {
      console.log("error getting list of cohorts from DB", err);
    });
});

app.get("/api/students", (req, res, next) => {
  Student.find()
    .then((studentsFromDB) => {
      res.json(studentsFromDB);
    })
    .catch(() => {
      console.log("error getting list of students from DB", err);
    });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});