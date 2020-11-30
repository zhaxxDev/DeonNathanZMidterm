DROP TABLE IF EXISTS answer_submissions CASCADE;
CREATE TABLE answer_submissions (
  id SERIAL PRIMARY KEY NOT NULL,
  attempt_id INTEGER REFERENCES quiz_attempts(id),
  answer_id INTEGER REFERENCES answers(id)
);
