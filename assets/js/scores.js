function printHighscores() {
  // either get scores from localstorage or set to empty array
  var highScores = JSON.parse(localStorage.getItem("highscores"));
  if(highScores === null)
    highscores = [];
  else{
    // for each score
    for(var i = 0; i < highScores.length; i++){
      // create li tag for each high score
      var scoreLi = document.createElement("li");
      scoreLi.textContent = highScores[i].initials + " - " + highScores[i].score;
      // display on page
      document.getElementById("highscores").appendChild(scoreLi);
    }
  }
  // (optional) sort highscores by score property in descending order

  
  
}

function clearHighscores() {
  // (and reload)
  localStorage.removeItem("highscores");
  location.reload(true);
}

// attach clear event to clear score button
var clearButton = document.getElementById("clear");
clearButton.addEventListener("click", function(){
  clearHighscores();
})
// run printhighscore when page loads
printHighscores();
