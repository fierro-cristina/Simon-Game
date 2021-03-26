var started = false;
var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level" + level);
    nextSequence();
    started = true;
  }
});

var gamePattern = [];

var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);

}

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("Success");
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Error");
    var audio = new Audio("file:///D:/WebDev_bootcamp/SimonGame/188 Simon-Game-Challenge-Starting-Files/Simon Game Challenge Starting Files/sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();

  }
}

function playSound(name) {
  var audio = new Audio("file:///D:/WebDev_bootcamp/SimonGame/188 Simon-Game-Challenge-Starting-Files/Simon Game Challenge Starting Files/sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  var currentButton = $("#" + currentColor);
  currentButton.addClass("pressed");
  setTimeout(function() {
    currentButton.removeClass("pressed");
  }, 100);
}

function startOver(){
  started = false;
  level = 0;
  gamePattern = [];
}
