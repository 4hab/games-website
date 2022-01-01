import { Board } from "./board.js";
import { Data } from "./data.js";

class Game {
    static #instance;
    static getInstance(){
        return this.#instance = this.#instance? this.#instance: new Game();
    }
    static newGame(){
        return this.#instance = new Game();
    }
    board;
    #food;
    over;
    winner;
    updateScore(){
        this.#food--;
        if(this.#food == 0){
            this.winner =true;
            this.gameOver();
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
        let audio;
        if(this.winner){
            audio = new Audio('./sounds/game_start.wav');
        } else{
            audio = new Audio('./sounds/death.wav');
        }
        audio.play();
    }
}
export { Game };