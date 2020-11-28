-- Drop and recreate Widgets table (Example)

DROP TABLE IF EXISTS question_submissions CASCADE;
CREATE TABLE question_submissions (
  id SERIAL PRIMARY KEY NOT NULL,
  attempt_id INTEGER REFERENCES quiz_attempts(id),
  question_id INTEGER REFERENCES questions(id),
  is_correct BOOLEAN DEFAULT FALSE
);
