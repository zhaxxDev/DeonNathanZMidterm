//Creates the HTML template of a question
const newQuestion = function() {
  let $newQuestion = $(`
       <section class="quizquestions">
      <form action="/newquestion" method="POST">
        <label for="question">Enter Question</label>
        <input type="text" id="question" name="question"><br><br>
        <label for="answerA">Option A</label>
        <input type="text" id="answerA" name="answerA"><br><br>
        <label for="answerB">Option B</label>
        <input type="text" id="answerB" name="answerB"><br><br>
        <label for="answerC">Option C</label>
        <input type="text" id="answerC" name="answerC"><br><br>
        <label for="answerD">Option D</label>
        <input type="text" id="answerD" name="answerD"><br><br>
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

$(document).ready(function() {
$("#add-question-btn").click(function () {
  let questionAppend = newQuestion();
  console.log('clicked');
  $("#maindiv").append(questionAppend);
});
});
