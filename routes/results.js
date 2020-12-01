const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/results",(req, res) => {
    db.query(`SELECT quizzes.name, answer_submissions.answer, questions.correct_answer, quiz_attempts.user_id
    FROM quiz_attempts
    JOIN quizzes ON quizzes.id = quiz_id
    JOIN answer_submissions ON answer_submissions.attempt_id = quiz_attempts.id
    JOIN questions ON questions.id = answer_submissions.question_id
    `)
    .then(data => {
      const quizzes = data.rows;
      let templateVars = { quiz_results }
      res.render("results", templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });
  return router;
};
