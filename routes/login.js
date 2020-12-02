const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/login", (req, res) => {
    let useR = req.body.username;
    console.log(useR)
    if (useR.length <= 0){
      res.status(400).json({ error: "Bad Request No Data" })
    }
    db.query(`SELECT id, name FROM users WHERE name LIKE ($1)`, [useR])
    .then(data => {
      if (data.rows[0] === undefined) {
        const sql =
          `INSERT INTO users (name)
          VALUES ($1)
          RETURNING id`
          const params = [useR];
          db.query(sql ,params)
          .then(data => {
            const userID = data.rows[0].id;
            console.log("confirm")
            res.cookie("username", useR)
            console.log(userID)
            res.cookie("id", userID)
            res.redirect('/')
          })
          .catch(err => {
            res
              .status(500)
              .json({ error: err.message });
          });
      } else {
        const userNAME = data.rows[0].name
        const userID = data.rows[0].id
        console.log("confirm")
        console.log(userID, userNAME)
        res.cookie("username", userNAME)
        res.cookie("id", userID)
        res.redirect('/')
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });
  return router;
};

