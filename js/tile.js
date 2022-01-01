import { Data } from "./data.js";
import { Game } from "./game.js";
import { GameObject } from "./game_object.js";


class Tile {
    htmlElement;
    type;
    position;
    constructor(typeCode, position) {
        this.position = position;
        this.type = Data.types['tile'][typeCode];
        this.objects = [];
        this.htmlElement = document.createElement('div');
        this.htmlElement.className = this.type;
    }
    #getTopObject() {
        return this.objects[this.objects.length - 1];
    }
    #update() {
        let gameObject = this.#getTopObject();
        this.htmlElement.innerHTML = '';
        if (gameObject) {
            this.htmlElement.appendChild(gameObject.htmlElement);
        }
    }
    isBlocked() {
        return this.type == 'block';
    }
    put(gameObject) {
        this.objects.push(gameObject);
        if (gameObject.isPacman() && this.contains('food')) {
            this.#removeFood();
            let game = Game.getInstance();
            game.updateScore();
        }
        this.#update();
    }
    contains(type){
        for(let object of this.objects){
            if(object.type == type){
                return true;
            }
        }
        return false;
    }
    remove(gameObject) {
        for (let i = 0; i < this.objects.length; i++) {
            if (this.objects[i] == gameObject) {
                this.objects.splice(i, 1);
                break;
            }
        }
        this.#update();
    }
    #removeFood(){
        for (let i = 0; i < this.objects.length; i++) {
            if (this.objects[i].isFood()) {
                this.objects.splice(i, 1);
                break;
            }
        }
        this.#update();
    }
}

export { Tile };