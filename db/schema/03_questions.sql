DROP TABLE IF EXISTS questions CASCADE;
CREATE TABLE questions (
  id SERIAL PRIMARY KEY NOT NULL,
  quiz_id INTEGER REFERENCES quizzes(id),
  question VARCHAR(255),
  answerA VARCHAR(255),
  answerB VARCHAR(255),
  answerC VARCHAR(255),
  answerD VARCHAR(255),
  correct_answer VARCHAR(255)
);
