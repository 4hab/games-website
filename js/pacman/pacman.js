import { Game } from "./game.js";

let game = Game.getInstance();
let interval;
let playing;
let body = document.getElementById('body');
var bgAudio = new Audio('/sounds/game_start.wav');
var moveAudio = new Audio('sounds/munch.wav');
let btn = document.getElementById('play-btn');
let msg = document.getElementById('gameOverMsg');

function newGame(){
    playing =false;
    bgAudio.play();
    msg.style.display = 'none';
}
function gameOver() {
    if (!game.winner)
        msg.className = 'game-over loser';
    msg.style.display = 'block';
    clearInterval(interval);
}
function play() {
    if (playing)
        return;
    playing = true;
    interval = setInterval(function () {
        if (game.over) {
            gameOver();
            return;
        }
        game.board.moveGhosts();
    }, 200);
}


function pause() {
    playing = false;
    clearInterval(interval);
}
body.onkeydown = function (event) {
    if (event.key == 'Escape') {
        pause();
    } else if (event.keyCode >= 37 && event.keyCode <= 40 && !game.over) {
        moveAudio.play();
        play();
        game.move(event.key);
    }
    // event.preventDefault();
}

btn.onclick = function(){
    location.reload();
}