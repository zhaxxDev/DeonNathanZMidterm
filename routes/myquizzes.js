const express = require('express');
const router  = express.Router();

module.exports = (db) => {
   router.get("/myquizzes", (req, res)=> {
    const templateVars = {
      username: req.cookies["username"],
    };
    res.render("myquizzes", templateVars);
  })
  return router;
};
