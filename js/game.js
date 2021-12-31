import { Board } from "./board.js";
import { Data } from "./data.js";

class Game {
    static #instance;
    static getInstance(){
        return this.#instance = this.#instance? this.#instance: new Game();
    }

    board;
    #interval;
    #food;
    #playing;
    updateScore(){
        this.#food--;
        if(this.#food == 0){
            console.log('winner');
        }
    }
    constructor() {
        this.board = Board.getInstance();
        this.#food = Data.winnerScore;
        this.#interval = false;
    }
    play() {
        // this.#playing = true;
        // this.#interval = setInterval(function (){
        //     this.board.moveGhosts(this.#board.ghosts)
        // }, 500);
    }
    pause() {
        clearInterval(this.#interval);
        this.#playing = false;
    }

    move(arrow) {
        if(arrow == 'ArrowLeft' || arrow == 'ArrowRight' || arrow == 'ArrowUp' || arrow == 'ArrowDown' ){
            if(!this.#playing){
                this.play();
            }
            this.board.movePacman(arrow);
        }
        else if(arrow == 'Escape'){
            this.pause();
        }
        console.log(arrow);
    }

}

export { Game };