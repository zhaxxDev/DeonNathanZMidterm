const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/results",(req, res) => {
    let scores = {};
    let totals = {};
    const username = req.cookies["username"];
    const sql1 = `SELECT *, quiz_attempts.id, quizzes.name AS quizname, users.name FROM quiz_attempts
    JOIN quizzes ON quiz_attempts.quiz_id = quizzes.id
    JOIN users ON users.id = quiz_attempts.user_id
    WHERE users.name = $1;`
    const params1 = [username]
    db.query(sql1, params1)
    .then(data => {
      const quiz_attempts = data.rows;

      let sql2 = `SELECT COUNT(*), quiz_id FROM questions
      GROUP BY quiz_id
      HAVING quiz_id = $1`
      let sql3 = `SELECT answer_submissions.answer, questions.correct_answer
      FROM answer_submissions
      JOIN questions ON question_id = questions.id
      WHERE attempt_id = $1`

      for (let i=0; i < quiz_attempts.length; i++) {

        if (i !== quiz_attempts.length - 1) {
          db.query(sql2, [quiz_attempts[i].quiz_id])
          .then(data => {
            const total = data.rows[0].count;
            let attempt_id = quiz_attempts[i].id;

            db.query(sql3, [attempt_id])
            .then(data => {
              let answers = data.rows
              let score = 0
              for (let answer in answers) {

                if (answer.answer === answer.correct_answer) {
                  score += 1
                }
              }
              scores[`${attempt_id}`] = score;
              totals[`${attempt_id}`] = total;
            })
            .catch(err => {
              res
              .status(500)
              .json({ error: err.message });
            })
          })
        } else {
          db.query(sql2, [quiz_attempts[i].quiz_id])
          .then(data => {
            const total = data.rows[0].count;
            let attempt_id = quiz_attempts[i].id;
            db.query(sql3, [attempt_id])
            .then(data => {
              let answers = data.rows

              let score = 0
              for (let answer of answers) {

                if (answer.answer === answer.correct_answer) {
                  score += 1
                }
              }
              scores[`${attempt_id}`] = score;
              totals[`${attempt_id}`] = total;
              const templatevars = {
                username,
                quiz_attempts,
                scores,
                totals
              }

              res.render("results", templatevars)
            })
            .catch(err => {
              res
                .status(500)
                .json({ error: err.message });
            });
          })
          .catch(err => {
            res
              .status(500)
              .json({ error: err.message });
          });
        }
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });
  return router;
}
