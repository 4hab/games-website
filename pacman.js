import { Game } from "./js/game.js";

let game = Game.getInstance();

let ghosts = game.board.ghosts;
let interval;
let playing = false;

function play() {
    if (playing)
        return;
    playing = true;
    interval = setInterval(function () {
        game.board.moveGhosts(ghosts);
    }, 200);
}

function pause() {
    playing = false;
    clearInterval(interval);
}
let body = document.getElementById('body');
body.onkeydown = function (event) {
    if(event.key == 'Escape'){
        pause();
    } else{
        play();
        game.move(event.key);
    }
    // event.preventDefault();
}
