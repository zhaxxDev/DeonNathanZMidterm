const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:quizurl",(req, res) => {
    let {quizurl} = req.params;
    console.log('quiz url', quizurl);
    const sql = `SELECT questions.quiz_id, questions.id, questions.question, questions.answerA, questions.answerB, questions.answerC, questions.answerD, quizzes.url, quizzes.name
    FROM quizzes
    JOIN questions ON questions.quiz_id = quizzes.id
    WHERE quizzes.url = $1;`
    db.query(sql, [quizurl])
    .then(data => {

      const questions = data.rows;
      console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', questions[0]);
      const username = req.cookies["username"];
      const vars = { questions , username: username };


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
