import { Game } from "./js/game.js";

let game = Game.getInstance();
let interval;
let playing = false;
function gameOver(){
    clearInterval(interval);
}
function play() {
    if (playing)
        return;
    playing = true;
    interval = setInterval(function () {
        if(game.over){
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
let body = document.getElementById('body');
var bgAudio = new Audio('/sounds/game_start.wav');
bgAudio.play();
var moveAudio = new Audio('sounds/munch.wav');
body.onkeydown = function (event) {
    if(event.key == 'Escape'){
        pause();
    } else if(event.keyCode >=37 && event.keyCode <=40 && !game.over){
        moveAudio.play();
        play();
        game.move(event.key);
    }
    // event.preventDefault();
}
