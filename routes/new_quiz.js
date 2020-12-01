const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/createQuiz",(req, res) => {
    db.query(`INSERT INTO quizzes (user_id, name, url, is_public)
    VALUES (
      (SELECT id
       FROM users
       WHERE name = $1)
      , $2, $3, $4);`, [a,b,c,d])
    .then(data => {
      res.render("newquestion", );
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });
  return router;
};
