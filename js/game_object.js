import { Position } from "./position.js";

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

    constructor(objectData) {
        this.type = objectData.type;
        this.position = objectData.position;
        this.#createElement(objectData.img);
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