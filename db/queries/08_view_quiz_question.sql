SELECT users.name AS name, quizzes.name AS quiz_name, answers.is_true AS result
FROM quiz_attempts
JOIN users ON user_id = users.id
JOIN answer_submissions ON quiz_attempts.id = answer_submissions.attempt_id
JOIN answers ON answer_submissions.answer_id = answers.id
JOIN questions ON answers.question_id = questions.id
JOIN quizzes ON questions.quiz_id = quizzes.id
;
