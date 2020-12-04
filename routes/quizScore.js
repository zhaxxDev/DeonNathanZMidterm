const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:quizresulturl",(req, res) => {
    let {quizresulturl} = req.params;
    console.log(quizresulturl, 'quizresultsurl')
    console.log('quiz url', quizresulturl);
    const sql1 = `SELECT quiz_attempts.id, quiz_attempts.quiz_id, users.name FROM quiz_attempts
    JOIN users ON quiz_attempts.user_id = users.id
    WHERE url = $1`
    db.query(sql1, [quizresulturl])
    .then(data => {
      const attempt_id = data.rows[0].id;
      const quiz_id = data.rows[0].quiz_id
      const username = req.cookies["username"];
      const quiztakersname = data.rows[0].name
      const sql2 = `SELECT COUNT(*), quiz_id, quizzes.name FROM questions
      JOIN quizzes ON quiz_id = quizzes.id
      GROUP BY quiz_id, quizzes.name
      HAVING quiz_id = $1`
      const sql3 = `SELECT answer_submissions.answer, questions.correct_answer
      FROM answer_submissions
      JOIN questions ON question_id = questions.id
      WHERE attempt_id = $1`


      db.query(sql2, [quiz_id])
      .then(data => {
        const total = data.rows[0].count;
        const quizname = data.rows[0].name;
        db.query(sql3, [attempt_id])
        .then(data => {
          let answers = data.rows;
          let score = 0
          for (let answer of answers) {
            if (answer.answer === answer.correct_answer) {
              score += 1
            }
          }
          const templateVars = {
            username, score, total, quizname, quizresulturl, quiztakersname
          }
          res.render("quizScore", templateVars);
        })
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

//     res.render("quizScore", vars)
