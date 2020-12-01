const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/createQuiz",(req, res) => {
    db.query(`INSERT INTO quizzes (user_id, name, url, is_public)
    VALUES (
      (SELECT id
       FROM users
       WHERE name = $1)
      , $2, $3, $4);`, [name, quizname, quizurl, privacy])
    .then(data => {
      res.render("newquiz", );
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });
  return router;
};
