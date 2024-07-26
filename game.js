var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var buttonColours = ["red", "blue", "green", "yellow"];
$(document).keypress(function () {
  if(!started) {
    $("#level-title").text("Level "+ level);
    nextSequence();
    started = true;
  }
});
function nextSequence() {
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level "+ level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+ randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
$(".btn").on("click", function() {
  var userChoosenColour = $(this).attr("id");
  // var userChoosenColour = this.getAttribute("id");
  userClickedPattern.push(userChoosenColour);
  playSound(userChoosenColour);
  animatePress(userChoosenColour);

  checkAnswer(userClickedPattern.length-1)
});
function playSound(name) {
  var audio = new Audio("sounds/"+ name + ".mp3");
  audio.play();
}
function animatePress(currentColour) {
  $("#"+currentColour).addClass("pressed");
  setTimeout(function () {
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}
function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel]=== gamePattern[currentLevel]){
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }
  }
  else {
    console.log("wrong")
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
function startOver() {
  level = 0;
  gamePattern=[];
  started= false;
}
