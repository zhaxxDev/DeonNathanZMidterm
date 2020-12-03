const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:quiz",(req, res) => {
    let quizurl = (req.params.quiz)
    console.log(quizurl)
    const sql = `SELECT questions.quiz_id, questions.question, questions.answerA, questions.answerB, questions.answerC, questions.answerD, quizzes.url, quizzes.name
    FROM quizzes
    JOIN questions ON questions.quiz_id = quizzes.id
    WHERE quizzes.url = $1;`
    db.query(sql, [quizurl])
    .then(data => {
      console.log(data.rows[0])
      const questions = data.rows;
      const username = req.cookies["username"];
      const vars = { questions , username: username };
      console.log(username);

      res.render("quizAttempt", vars)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });
  return router;
};
