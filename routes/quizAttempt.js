const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/quizAttempt",(req, res) => {
    const sql = `SELECT * FROM questions;`
    db.query(sql)
    .then(data => {
      console.log(data.rows)
      const newquiz = data.rows;
      const vars = { newquiz };
      console.log(newquiz);

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
