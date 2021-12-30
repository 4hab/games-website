import { Game } from "./js/game.js";

let game = new Game();

game.start();

let body = document.getElementById('body');
body.onkeydown = function (event) {
    game.move(event.key);
    // event.preventDefault();
}
