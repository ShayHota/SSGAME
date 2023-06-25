
var buttonColours = ['red', 'blue', 'green', 'yellow'];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;


$('.btn').click(function (e) {
    let userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    chekAnswer(userClickedPattern.length - 1);
})

$(document).on('keydown', function () {
    if (!started) {
        $('#level-title').text('Level ' + level);
        nextSequence();
        started = true;
    }
})

$(document).on('touchstart', function () {
    if (!started) {
        $('#level-title').text('Level ' + level);
        nextSequence();
        started = true;
    }
})

function chekAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(() => { nextSequence() }, 1000)
        }} else {
            playWrong()
            $('body').addClass('game-over');
            setTimeout(() => { $('body').removeClass('game-over') }, 200);
            $('#level-title').text('Game over, Press Any Key to Restart');
            startOver();
        }
    }



function nextSequence() {
    userClickedPattern = [];
    level++
    $('#level-title').text('Level ' + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $('#' + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour)

}

function playSound(name) {
    let audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function playWrong() {
    let audio = new Audio('sounds/wrong.mp3')
    audio.play();
}

function animatePress(currentColour) {
    $('#' + currentColour).addClass("pressed")
    setTimeout(() => { $('#' + currentColour).removeClass('pressed') }, 100)
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false
}










