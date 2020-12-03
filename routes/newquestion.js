const express = require('express');
const router  = express.Router();


module.exports = (db) => {
  router.post("/newquestion",(req, res) => {
    const sql = `INSERT INTO questions (quiz_id, question, answerA, answerB, answerC, answerD, correct_answer)
    VALUES (
      $1, $2, $3, $4, $5, $6, $7);`;
    let length=req.body.answerA.length
    let paramsarr=[]
    if (length > 1){
      for (let i=0; i < length; i++) {
        paramsarr[i] = [req.body.quiz_id, req.body.question[i], req.body.answerA[i], req.body.answerB[i], req.body.answerC[i], req.body.answerD[i], req.body[`correct_answer${i}`]]
      }
    } else if (length === 1) {
      paramsarr = [[req.body.quiz_id, req.body.question, req.body.answerA, req.body.answerB, req.body.answerC, req.body.answerD, req.body.correct_answer]]
    }
    console.log(paramsarr)

    for (let i = 0; i < paramsarr.length; i++) {
      if (i !== paramsarr.length - 1) {
        db.query(sql, paramsarr[i]);
      } else {
        db.query(sql, paramsarr[i])
        .then (data => {
          templateVars = {username: req.cookies["username"]}
          res.render("index", templateVars)
        })
        .catch(err => {
          res
          .status(500)
          .json({ error: err.message });
        })
      }
    }


  });
  return router;
};
