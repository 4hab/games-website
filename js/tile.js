class Tile {
    gameObject;
    htmlElement;
    type;
    containsFood;
    constructor(type, gameObject) {
        this.gameObject = gameObject;
        this.type = type;
        this.containsFood = this.type == 'food';
        this.htmlElement = document.createElement('div');
        this.htmlElement.className = type;
        if (this.gameObject) {
            this.htmlElement.appendChild(gameObject.htmlElement);
        }
    }
    #update() {
        if(this.gameObject){
            this.type = this.gameObject;
        }
        // if (this.gameObject) {
        //     this.type = this.gameObject.type;
        // } else {
        //     this.type = this.containsFood ? 'food' : 'empty';
        // }
        // this.htmlElement.className = this.type;
    }

    isBlocked() {
        return this.type == 'block';
    }

    #putPacman(pacman){
        if(this.gameObject.type == 'ghost'){
            return false;
        }
        this.gameObject = pacman;


    }
    #putGhost(ghost){
        
    }
    put(newObject) {
        if (this.isBlocked())
            return false;
        if(newObject.type == 'pacman'){
            this.#putPacman(newObject);
        }
        else if(newObject.type == 'ghost'){
            this.#putGhost(newObject);
        }
    }
    clear() {
        delete this.gameObject;
        this.htmlElement.innerHTML = '';
        this.#update();
    }

}

export { Tile };