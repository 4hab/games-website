import { Board } from "./board.js";
import { Position } from "./position.js";

let directions = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
let styles = {
    'ArrowLeft':'pacman left',
    'ArrowRight':'pacman right',
    'ArrowUp':'pacman up',
    'ArrowDown':'pacman down',
}


class GameObject {

    htmlElement;
    type;
    position;
    #dir;

    constructor(objectData) {
        this.type = objectData.type;
        this.position = objectData.position;
        this.#createElement(objectData.img);
        this.#dir = 'ArrowLeft';
    }

    getDirection(){
        let nPosition = Position.copy(this.position);
        nPosition.update(this.#dir);
        let board = Board.getInstance();
        let tile = board.getTile(nPosition);
        if(tile.isBlocked()){
            let index = Math.floor(Math.random()*10)%4;
            this.#dir = directions[index];
            return this.getDirection();
        }
        return this.#dir;
    }

    #createElement(img) {
        this.htmlElement = document.createElement('img');
        this.htmlElement.src = img;
        this.htmlElement.className = this.type;
    }

    moveTo(direction) {
        let newPosition = Position.copy(this.position);
        newPosition.update(direction);


    }

    #updateStyle(direction){
        this.htmlElement.style = styles[direction];
    }

    isPacman(){
        return this.type == 'pacman';
    }
    isGhost(){
        return this.type == 'ghost';
    }
    isFood(){
        return this.type == 'food';
    }
    
}

export {GameObject};