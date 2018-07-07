var panel = $('#quiz-area');
var countStartNumber = 5;

//CLICK EVENTS
$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
});


//Question set
var questions = [{
    question: "How many seasons are there of The Office?<br><br>",
    answers: ["Ten", "Seven", "Four", "Nine"],
    correctAnswer: "Nine",
    image: "assets/images/yay.gif"
}, {
    question: "What is Roy's brother's name?<br><br>",
    answers: ['Troy', 'Kenny', 'Mike', 'Ryan'],
    correctAnswer: "Kenny",
    image: "assets/images/yes.gif"
}, {
    question: "Which celebrity is Andy supposedly related to?<br><br>",
    answers: ['George W. Bush', 'Ice-T', 'Mr. T', 'Michelle Obama'],
    correctAnswer: "Michelle Obama",
    image: "assets/images/andy.gif"
}, {
    question: "Which season does Michael Scott leave?<br><br>",
    answers: ['Eight', 'Nine', 'Seven', 'Six'],
    correctAnswer: "Seven",
    image: "assets/images/sad.gif"
}, {
    question: "Which is not an alter ego of Michael Scott?<br><br>",
    answers: ['Michael the Magic', 'Prison Mike', 'Magic Mike', 'Caleb Crawdad'],
    correctAnswer: "Magic Mike",
    image: "assets/images/dance.gif"
}];

var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 2000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>Out of Time!<br><br></h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer + '<br><br></h3>');
    panel.append('<img src= assets/images/no-time.gif />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 2000);
    } else {
      setTimeout(game.nextQuestion, 3 * 2000);
    }
  },
  results: function() {
    clearInterval(timer);

    panel.html('<h2>All done, lets see how you did!<br><br></h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '<br><br></h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '<br><br></h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '<br><br></h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },
  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Nope!<br><br></h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '<br><br></h3>');
    panel.append('<img src= assets/images/No.gif />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 2000);
    } else {
      setTimeout(game.nextQuestion, 3 * 2000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct!<br><br></h2>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 2000);
    } else {
      setTimeout(game.nextQuestion, 3 * 2000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};