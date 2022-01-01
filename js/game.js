import { Board } from "./board.js";
import { Data } from "./data.js";

class Game {
    static #instance;
    static getInstance(){
        return this.#instance = this.#instance? this.#instance: new Game();
    }

    board;
    #food;
    over;
    updateScore(){
        this.#food--;
        if(this.#food == 0){
            console.log('winner');
        }
    }
    constructor() {
        this.board = Board.getInstance();
        this.#food = Data.winnerScore;
        this.over = false;
    }
    move(arrow) {
        this.board.movePacman(arrow);
        console.log(arrow);
    }
    gameOver(){
        this.over = true;
        let audio = new Audio('./sounds/death.wav');
        audio.play();
        console.log('gameOver');
    }
}
export { Game };