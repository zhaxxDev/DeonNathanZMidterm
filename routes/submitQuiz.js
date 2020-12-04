const express = require('express');
const router  = express.Router();
const generateRandomString = function() {
  return Math.random().toString(36).substr(2,6);
}


module.exports = (db) => {
  router.post("/",(req, res) => {
    console.log('body is here', req.body)
    const sql1 = `INSERT INTO quiz_attempts (user_id, quiz_id, url)
     VALUES ($1, $2, $3)
     RETURNING quiz_attempts.id`
    const newurl = generateRandomString();
    const params1 = [req.cookies.id, req.body.quiz_id, newurl];
    console.log('params1', params1)

    const vars = { username: req.cookies.username }
    db.query(sql1, params1)
    .then(data => {

      const sql2 = `INSERT INTO answer_submissions (attempt_id, question_id, answer)
      VALUES ($1, $2, $3)`
      let paramsarr = []

      if (Array.isArray(req.body.question_ids)){
        for (let i=0; i < req.body.question_ids.length; i++) {
          paramsarr[i] = [data.rows[0].id, parseInt(req.body.question_ids[i]), req.body[`answer${i+1}`]]
        }
      } else {
        paramsarr = [[data.rows[0].id, parseInt(req.body.question_ids[0]), req.body.answer1]]
      }

      for (let i = 0; i < paramsarr.length; i++) {
        if (i !== paramsarr.length - 1) {
          db.query(sql2, paramsarr[i]);
        } else {
          db.query (sql2, paramsarr[i])
          .then (data => {
            res.redirect(`/results/${newurl}`)
          })
          .catch(err => {
            res
            .status(500)
            .json({ error: err.message });
          })
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
};

