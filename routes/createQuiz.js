const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/createQuiz", (req, res)=> {
    const templateVars = {
      username: req.cookies["username"],
    };
    res.render("createQuiz", templateVars);
  })
  return router;
};


