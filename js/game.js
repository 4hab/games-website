
import { Board } from "./board.js";
import {Position} from "./position.js";

class Game {
    #board;
    #score;
    #interval;
    map =[
        'BBBBBBBBBBBBBBBBBBBB',
        'BFFFFFFFFBBFFFFFFFFB',
        'BFBBFBBBFBBFBBBFBBFB',
        'BFBBFBBBFBBFBBBFBBFB',
        'BFFFFFFFFFFFFFFFFFFB',
        'BFBBFBFBBBBBBFBFBBFB',
        'BFFFFBFFFBBFFFBFFFFB',
        'BBBBFBBBFBBFBBBFBBBB',
        'EEEBFBFFFFFFFFBFBEEE',
        'EEEBFBFBEEEEBFBFBEEE',
        'BBBBFBFBEEEEBFBFBBBB',
        'BFFFFFFBEGGEBFFFFFFB',
        'BBBBFBFBEGGEBFBFBBBB',
        'EEEBFBFBBBBBBFBFBEEE',
        'EEEBFBFFFFFFFFBFBEEE',
        'BBBBFBBBFBBFBBBFBBBB',
        'BFFFFBFFFBBFFFBFFFFB',
        'BFBBFBFBBBBBBFBFBBFB',
        'BFFFFFFFFPFFFFFFFFFB',
        'BFBBFBBBFBBFBBBFBBFB',
        'BFBBFBBBFBBFBBBFBBFB',
        'BFFFFFFFFBBFFFFFFFFB',
        'BBBBBBBBBBBBBBBBBBBB',
    ];

    constructor() {
        this.#board = new Board(this.map);
    }

    start() {
        // this.#interval = setInterval(function () {
        //     //move ghosts
        //     console.log('moving ghosts');
        // }, 500);
    }

    play() {

    }
    pause() {

    }

    move(direction) {
        console.log(direction);
        let position = this.#board.getPacman().coordinates;
        let newPosition = Position.copy(position);
        newPosition.update(direction);
        this.#board.makeMove(position, newPosition);
    }

}

export { Game };