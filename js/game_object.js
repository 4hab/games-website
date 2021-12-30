class GameObject {

    htmlElement;
    constructor(type, coordinates, img) {
        this.type = type;
        this.coordinates = coordinates;
        this.#createElement(img);
    }

    #createElement(img) {
        this.htmlElement = document.createElement('img');
        this.htmlElement.src = img;
        this.htmlElement.className = this.type;
    }

    moveTo(coordinates) {
        this.coordinates = coordinates;
    }
}

export {GameObject};