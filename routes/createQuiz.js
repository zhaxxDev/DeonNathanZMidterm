const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/createQuiz", (req, res)=> {
    if (req.cookies["username"]){
      const templateVars = {
        username: req.cookies["username"],
      };
      res.render("createQuiz", templateVars);
    } else {
      res.status(400).json({ error: "Bad Request No User. Did you forget to enter your name?" })
    }
  })
  return router;
};


