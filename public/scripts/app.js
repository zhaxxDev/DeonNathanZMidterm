//Creates the HTML template of a question
const newQuestion = function(i) {
  let $newQuestion = $(`
       <section class="quizquestions">
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
        <input type="radio" id="a${i}" name="correct_answer${i}" value='A'>
        <label for="a${i}">A</label><br>
        <input type="radio" id="b${i}" name="correct_answer${i}" value='B'>
        <label for="b${i}">B</label><br>
        <input type="radio" id="a${i}" name="correct_answer${i}" value='C'>
        <label for="c${i}">C</label><br>
        <input type="radio" id="b${i}" name="correct_answer${i}" value='D'>
        <label for="d${i}">D</label><br>
    </section>
  `);
  return $newQuestion;
}



$(document).ready(function() {
  let i=1;
$("#add-question-btn").click(function () {
  let questionAppend = newQuestion(i);
  console.log('clicked');
  $("#questions").append(questionAppend);
  i+=1;
});
});
