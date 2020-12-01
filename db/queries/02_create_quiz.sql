INSERT INTO quizzes (user_id, name, url, is_public)
VALUES (
  (SELECT id
   FROM users
   WHERE name = $1)
  , $2, $3, $4);
