const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/myquizzes",(req, res) => {
    const id = req.cookies["id"];
    db.query(`SELECT name, url
    FROM quizzes
    WHERE user_id = $1
    ;`, [id])
    .then(data => {
      const quizzes = data.rows;
      let templateVars = {quizzes: quizzes, username: req.cookies["username"], id}
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
