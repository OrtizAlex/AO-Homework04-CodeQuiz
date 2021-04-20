// variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// variables to reference DOM elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

// sound effects
var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");

function startQuiz() {
  // hide start screen
  var startScreen = document.getElementById("start-screen");
  startScreen.setAttribute("class", "start hide");

  // un-hide questions section
  questionsEl.setAttribute("class", " ");
  // start timer
  timerId = setInterval(function(){
    clockTick();
  }, 1000);
  // show starting time
  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {
  // get current question object from array
  var currentQuestion = questions[currentQuestionIndex];
  // update title with current question
  questionsEl.children[0].textContent = currentQuestion.title;
  // clear out any old question choices
  while (choicesEl.hasChildNodes()) {
    choicesEl.removeChild(choicesEl.lastChild);
  }
  // loop over choices
  for(var i = 0; i < currentQuestion.choices.length; i++){

    // create new button for each choice
    var choiceButton = document.createElement("button");
    choiceButton.textContent = currentQuestion.choices[i];
    
    // display on the page
    choicesEl.appendChild(choiceButton);
  }
  // attach click event listener to each choice
  choicesEl.children[0].addEventListener("click", function(event){
    questionClick(choicesEl.children[0]);
  });
  choicesEl.children[1].addEventListener("click", function(event){
    questionClick(choicesEl.children[1]);
  });
  choicesEl.children[2].addEventListener("click", function(event){
    questionClick(choicesEl.children[2]);
  });
  choicesEl.children[3].addEventListener("click", function(event){
    questionClick(choicesEl.children[3]);
  });
}

function test(){
  console.log('test');
}

function questionClick(answerChoice) {
  console.log("answer: " + questions[currentQuestionIndex].answer);
  console.log("choice: " + answerChoice.textContent);
  // check if user guessed wrong
  
  if(answerChoice.textContent != questions[currentQuestionIndex].answer){
    // penalize time
    time -= 10;
    // display new time on page
    feedbackEl.textContent = "Incorrect";
    // play "wrong" sound effect
    sfxWrong.play();
  }
  // else 
  else{
    // play "right" sound effect
    feedbackEl.textContent = "Correct";
    
    sfxRight.play();
  }

  // flash right/wrong feedback on page for half a second
  feedbackEl.setAttribute("class", "feedback");
  setInterval(function(){
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);
  // move to next question
  
  currentQuestionIndex++;
  // check if we've run out of questions
  if(currentQuestionIndex === questions.length)
    // quizEnd
    quizEnd();
  // else 
  else
    // getQuestion
    getQuestion();
}

function quizEnd() {
  // stop timer
  clearInterval(timerId);

  // show end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.setAttribute("class", " ");
  // show final score

  // hide questions section
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  // update time
  time--;
  timerEl.textContent = time;
  // check if user ran out of time
  if(time <= 0)
    quizEnd();
  
}

function saveHighscore() {
  // get value of input box
  var initials = initialsEl.value.toUpperCase();
  // make sure value wasn't empty
  if(initials != " "){
    // get saved scores from localstorage, or if not any, set to empty array

    // format new score object for current user

    // save to localstorage

    // redirect to next page
  }
}

function checkForEnter(event) {
  // check if event key is enter
    // saveHighscore
    if(event.key === '13')
      console.log("Enter pressed");
}

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;
