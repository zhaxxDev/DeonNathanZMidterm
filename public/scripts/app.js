//Creates the HTML template of a question
const newQuestion = function() {
  let $newQuestion = $(`
  <section id="quizquestions">
  <form action="/newquestion" method="POST">
    <input placeholder="Enter Question" type="text" id="question" name="question"><br><br>
    <input placeholder="Option A" type="text" class="option" id="answerA" name="answerA"><br><br>
    <input placeholder="Option B" type="text" class="option" id="answerB" name="answerB"><br><br>
    <input placeholder="Option C" type="text" class="option" id="answerC" name="answerC"><br><br>
    <input placeholder="Option D" type="text" class="option" id="answerD" name="answerD"><br><br>
    <P>Which answer is correct?</P>
    <input type="radio" id="a" name="correct_answer" value='A'>
    <label for="a">A</label><br>
    <input type="radio" id="b" name="correct_answer" value='B'>
    <label for="b">B</label><br>
    <input type="radio" id="a" name="correct_answer" value='C'>
    <label for="c">C</label><br>
    <input type="radio" id="b" name="correct_answer" value='D'>
    <label for="d">D</label><br>
  </form>
</section>
  `);
  return $newQuestion;
}

//Creates the HTML template of a question
const quizAttempt = function(question) {
  let $quizAttempt = $(`
  <section id="quiz-attempt">
  <h1 id="quiz-attempt-message">Attempt Quiz</h1>
    <form action="/results" method="POST">
    <div id="question-container" class="hide">
    <label class="question"> ${question.question} </label>
    <label class="answer"> ${question.answerA} </label>
    <label class="answer"> ${question.answerB} </label>
    <label class="answer"> ${question.answerC} </label>
    <label class="answer"> ${question.answerD} </label>
      <div id="question">Question</div>
      <div id="answer-buttons" class="btn-grid">
        <button class="btn">Answer 1</button>
        <button class="btn">Answer 2</button>
        <button class="btn">Answer 3</button>
        <button class="btn">Answer 4</button>
      </div>
    </div>
      <form method="POST" action="/quizzes"><button type="submit" id="submit-btn" class="quizzes">Submit</button></form>
    </form>
  </section>
  `);
  return $quizAttempt;
};

const renderQuiz = function(newquiz) {
  // loops through questions
  // calls quizAttempt for each quiz
  // takes return value and appends it to the quiz attempt container
  for (let question in newquiz) {
    $('#quiz-attempt-container').append(quizAttempt(question.question));
  }

};




$(document).ready(function() {
$("#add-question-btn").click(function () {
  let questionAppend = newQuestion();
  console.log('clicked');
  $("#maindiv").append(questionAppend);
});
});
