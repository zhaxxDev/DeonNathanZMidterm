const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/quizzes",(req, res) => {
    const sql = `INSERT INTO questions (quiz_id, question)
     VALUES (
      (SELECT id
      FROM quizzes
      WHERE user_id = users.id;
      LIMIT 1),
      $1)
      RETURNING *;`
    const params = [req.body.question];
    console.log(params)
    db.query(sql, params)
    .then(data => {
      console.log(data.rows)
      const submitquiz = data.rows;
      const vars = { submitquiz };

      res.render("quizzes", vars)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });
  return router;
};

