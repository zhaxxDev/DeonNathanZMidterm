DROP TABLE IF EXISTS questions CASCADE;
CREATE TABLE answers (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR (255)
  question_id INTEGER REFERENCES questions(id),
  answer VARCHAR(255)
  is_true BOOLEAN
);
