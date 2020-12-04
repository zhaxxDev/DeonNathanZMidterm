const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/results",(req, res) => {
    const username = req.cookies["username"];
    console.log('name', username)
    db.query(`SELECT users.name, quiz_attempts.id AS id, COUNT(questions.*) AS score, quizzes.name AS quizname
    FROM users
    JOIN quiz_attempts ON quiz_attempts.user_id = users.id
    JOIN quizzes ON quiz_attempts.quiz_id = quizzes.id
    JOIN answer_submissions ON answer_submissions.attempt_id = quiz_attempts.id
    JOIN questions ON questions.id = answer_submissions.question_id
    WHERE questions.correct_answer = answer_submissions.answer
    GROUP BY users.name, quiz_attempts.id, quizname
    ORDER BY id ASC;
    `)
    .then(data => {
      const quiz_result = data.rows;
      console.log('quiz_results', quiz_result)
      db.query(`SELECT quiz_attempts.id, COUNT(answer_submissions.*) AS out_of
      FROM quiz_attempts
      JOIN answer_submissions ON answer_submissions.attempt_id = quiz_attempts.id
      GROUP BY quiz_attempts.id`)
      .then(data => {
        const quiz_total = data.rows;
        const templateVars = {
          quiz_result: quiz_result,
          quiz_total: quiz_total,
          username: username
        }
        res.render("results", templateVars)
      })
      .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
      })
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });
  return router;
};


//      res.render("results", templateVars);
