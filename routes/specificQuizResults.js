const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:quizurl/results",(req, res) => {
    let scores = {};
    let totals = {};
    let names = {};
    const username = req.cookies["username"];
    const quizurl = req.params
    console.log(quizurl.quizurl)
    const sql1 = `SELECT quiz_attempts.id, quiz_id, quizzes.url AS quizurl, users.name, quizzes.name AS quizname FROM quiz_attempts
    JOIN quizzes on quiz_attempts.quiz_id = quizzes.id
    JOIN users on quiz_attempts.user_id = users.id
    GROUP BY quiz_attempts.id, quizzes.url, users.name, quizzes.name
    HAVING quizzes.url = $1`
    db.query(sql1, [quizurl.quizurl])
    .then(data => {
      const quiz_attempts = data.rows;
      console.log(quiz_attempts[0], data.rows[0])
      let sql2 = `SELECT COUNT(*), quiz_id FROM questions
      GROUP BY quiz_id
      HAVING quiz_id = $1`
      let sql3 = `SELECT answer_submissions.answer, questions.correct_answer
      FROM answer_submissions
      JOIN questions ON question_id = questions.id
      WHERE attempt_id = $1`
      if (quiz_attempts.length === 0){
        const templateVars = {
          username, quiz_attempts: 0
        }
        res.render("specificQuizResults", templateVars)
      }

      for (let i=0; i < quiz_attempts.length; i++) {

        if (i !== quiz_attempts.length - 1) {
          db.query(sql2, [quiz_attempts[i].quiz_id])
          .then(data => {
            const total = data.rows[0].count;
            console.log(total)
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
              names[`${attempt_id}`] = quiz_attempts[i].quiztakersname;
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
              names[`${attempt_id}`] = quiz_attempts[i].quiztakersname;
              const templatevars = {
                username,
                quiz_attempts,
                scores,
                totals,
                names
              }

              res.render("specificQuizResults", templatevars)
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
