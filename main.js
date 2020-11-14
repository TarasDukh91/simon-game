// Creating the array of colors
var buttonColors = ['red', 'blue', 'green', 'yellow'];
// Creating an empty array
var gamePattern = [];
// Creating an empty array for clickin event
var userClickedPattern = [];

var started = false
// Create a variable that will show the number of level
var level = 0
// Key press listener
$(document).keypress(function(){
    if(!started){
        $('#level-title').text('Level ' + level);
        nextSequence();
        started = true;
    }    
    
    })
// Create an event listener for the ".btn" class
$('.btn').click(function() {
    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    // Call "playSound" function with input "userChosenColor"
    playSound(userChosenColor);
    // Call "animatePress" function with input "userChosenColor"
    animatePress(userChosenColor);
    // Call "checkAnswer" function
    checkAnswer(userClickedPattern.length -1);
})



function nextSequence() {
    // reset "clickedPattern" to play a game again
    userClickedPattern = []; 
    // Inncreminate the level number (change level number)
    level++
    // Change a "h1" text
    $('#level-title').text('Level ' + level);
    
    // Creating randomizer
    var randomNumber = Math.floor(Math.random() * 4)
    // Apliyng a randomizer to the 'buttonColors' array
    var randomChosenColor = buttonColors[randomNumber];
    // Pushing a random value of the button colors and pushing them into a 'gamePattern' array
    gamePattern.push(randomChosenColor);
    // Selecting an ids and adding an animation
    $('#' + randomChosenColor).fadeOut(100).fadeIn(100)
    // Playing an audio
    playSound(randomChosenColor);
    
    }
// Creating a function to play a music "name" will be changed to "userChosenColor"
function playSound(name) {
        var audio = new Audio('sounds/' + name + ".mp3")
        audio.play()
    }
// Creating an animaton for the button
function animatePress(currentColor){
    // Adding a class "pressed" using "currentColor" variable (will be changed to the "userChosenColor")
    $('#' + currentColor).addClass('pressed');
    // Remove class "pressed" after 100 milieseconds
    setTimeout(function(){
        $('#' + currentColor).removeClass('pressed')
    }, 100)
}
// Checking the player answer
function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log('Success')
    // If "userClickedPattern.length" === "gamePattern.length" then run the function "nextSequence()"
    if(userClickedPattern.length === gamePattern.length){
        // Setting tiomeOut for function running
        setTimeout(function () {
            nextSequence();
        }, 1000)
    } 
}
    else {
        // If player loose, then play the audio 
        var gameOverAudio = new Audio('sounds/wrong.mp3')
        gameOverAudio.play();
        // Add class "game-over" to a body that will change the background color
        $('body').addClass('game-over');
        // Removing the class "game-over" after 200 milieseconds
        setTimeout(function(){
            $('body').removeClass('game-over');
        }, 200)

        $('h1').text('Game Over, Press any key to restart')
        // Run a "startOver" function
        startOver();
    }
}
// Creating a fnction that will reset the statments of the variables
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}