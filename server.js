// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 3000;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const cookieParser = require('cookie-parser')

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(cookieParser())
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const quizzesRoutes = require("./routes/quizzes");
const newquizRoutes = require("./routes/newquiz");
const resultsRoutes = require("./routes/results");
const loginRoutes = require("./routes/login");
const createQuizRoutes = require("./routes/createQuiz");
const myquizzesRoutes = require("./routes/myquizzes");
const newquestionRoutes = require("./routes/newquestion");
const quizAttemptRoutes = require("./routes/quizAttempt");
const submitQuizRoutes = require("./routes/submitQuiz");
const quizScoreRoutes = require("./routes/quizScore");
const specificQuizResults = require("./routes/specificQuizResults")

const { user } = require('pg/lib/defaults');
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use ("/", quizzesRoutes(db));
app.use ("/", newquizRoutes(db));
app.use ("/", resultsRoutes(db));
app.use ("/", newquestionRoutes(db));
app.use ("/quiz/:quizurl/submit", submitQuizRoutes(db));
app.use ("/", loginRoutes(db));
app.use ("/", createQuizRoutes(db));
app.use ("/", myquizzesRoutes(db));
app.use ("/", resultsRoutes(db))
app.use ("/", newquestionRoutes(db))
app.use ("/quiz", quizAttemptRoutes(db));
app.use("/results/", quizScoreRoutes(db));
app.use("/quiz", specificQuizResults(db))
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  const templateVars = {
    username: req.cookies["username"],
  };
  res.render("index", templateVars);
});

app.post("/logout", (req, res) => {
  res.clearCookie("username")
  res.clearCookie("id")
  res.redirect('/')
});



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
