
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

var started = false;

$(document).keypress(function() {
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//sound by ID
function playSound(name) {
  var audio = new Audio('sounds/'+ name + '.mp3');
  audio.play();
}



// userChosenColour add to array
$('.btn').click(function(){

       var userChosenColour = (this.id);
       userClickedPattern.push(userChosenColour);
       playSound(userChosenColour);
       animatePress(userChosenColour);

      checkAnswer(userClickedPattern.length-1);
   });



function nextSequence() {
  userClickedPattern = [];

  level++;

  $('#level-title').text("Level " + level);
   var randomNumber = Math.floor(Math.random()*4);

   var randomChosenColour = buttonColours[randomNumber];

   gamePattern.push(randomChosenColour);
   // flashing randomchosen color
   $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

   //play audio for chosen color
   playSound(randomChosenColour);

}





function checkAnswer(currentLevel) {
  //checking if paterns are same
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("succes");

      if(userClickedPattern.length===gamePattern.length){
        setTimeout(function(){
          nextSequence()
        }, 800)
      }
  }else {
    //if userClickedPattern is wrong GAME_OVER
    playSound("wrong");
    $("body").addClass("game-over")
    $('#level-title').text("Game Over, Press Any Key to Restart")
    setTimeout(function(){
      $("body").removeClass('game-over')
    }, 200)

    startOver();
  }

}

function animatePress(currentColour) {
  $('#'+ currentColour).addClass('pressed');

  setTimeout(function(){
    $('#'+ currentColour).removeClass('pressed')
  }, 100)
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
