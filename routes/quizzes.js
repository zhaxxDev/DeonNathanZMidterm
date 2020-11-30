const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/quizzes",(req, res) => {
    db.query(`SELECT name, url
    FROM quizzes
    WHERE is_public = true;`)
    .then(data => {
      const quizzes = data.rows;
      console.log(quizzes)
      let templateVars = {quizzes: quizzes}
      res.render("quizzes", templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });
  return router;
};