var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;

$(document).keydown(function(event){
    if(event.key === "a"){
        nextSequence();
    }

});

function nextSequence(){
    userClickedPattern = [];
    var randomNumber = (Math.random() * 4);
    randomNumber = Math.floor(randomNumber);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    makeSound(randomChosenColour);
    level++;
    $("h1").text("Level " + level);
}

$(".btn").click(function(event){
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    makeSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length -1);
});

function checkAnswer(lastIndex){
    if(userClickedPattern[lastIndex] === gamePattern[lastIndex]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(nextSequence, 1000);
        }
    }else {
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Space Key to Restart");
        makeSound("wrong");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        restartGame();
    }
}

function restartGame(){
    $(document).keydown(function(event){
        if(event.key === " "){
            gamePattern = [];
            level = 0;
            nextSequence();
        }
    })
}

function animatePress(currentColour){
    $("." + currentColour).addClass("pressed");
    setTimeout(delay, 100);
    function delay(){
        $("." + currentColour).removeClass("pressed");
    }
    
}
function makeSound (soundName){
        var soundName = new Audio("sounds/" + soundName + ".mp3");
        soundName.play();
}