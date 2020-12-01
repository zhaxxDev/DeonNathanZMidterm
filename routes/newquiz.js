const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/newquiz",(req, res) => {
    const sql = `INSERT INTO quizzes (user_id, name, url, is_public)
    VALUES (
      (SELECT id
       FROM users
       WHERE name = $1
       LIMIT 1)
       , $2, $3, $4)
       RETURNING *;`
    const params = [req.body.name, req.body.quizname, req.body.quizurl, req.body.privacy];
    db.query(sql ,params)
    .then(data => {
      console.log(data.rows)
      const newquiz = data.rows;
      const vars = { newquiz };

      res.render("newquiz", vars)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });
  return router;
};
