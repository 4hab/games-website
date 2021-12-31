import { Tile } from "./tile.js";
import { Position } from './position.js';
import { Data } from "./data.js";
import { GameObject } from "./game_object.js";


class Board {

    static #instance;
    #board;
    #boardDiv
    #pacman;
    ghosts;
    static getInstance() {
        if (this.#instance) {
            return this.#instance;
        }
        else {
            return new Board();
        }
    }
    constructor() {
        this.#boardDiv = document.getElementById('board');
        this.ghosts = [];
        this.#generateBoard();
    }
    #generateBoard() {
        let map = Data.map;
        let rows = map.length, columns = map[0].length;
        this.#board = new Array(rows);
        for (let r = 0; r < rows; r++) {
            this.#board[r] = new Array(columns);
            for (let c = 0; c < columns; c++) {
                this.#newTile(map[r][c], r, c);
            }
        }
        this.#addObjects();
    }
    #addObjects() {
        let objectsData = Data.objects;
        for (let objectData of objectsData) {
            let gameObject = new GameObject(objectData);
            if (gameObject.isPacman()) {
                this.#pacman = gameObject;
            } else if (gameObject.isGhost()) {
                this.ghosts.push(gameObject);
            }
            let position = gameObject.position;
            let tile = this.getTile(position);
            tile.put(gameObject);
        }
    }
    #newTile(code, row, column) {
        let position = new Position(row, column);
        let tile = new Tile(code, position);
        this.#boardDiv.appendChild(tile.htmlElement);
        this.#board[row][column] = tile;
        if (code == 'F') {
            let food = new GameObject(Data.foodData);
            tile.put(food);
        }
    }
    getTile(position) {
        return this.#board[position.row][position.column];
    }
    moveObject(object, arrow) {
        let newPosition = Position.copy(object.position);
        newPosition.update(arrow);
        let currentTile = this.getTile(object.position);
        let newTile = this.getTile(newPosition);
        if (newTile.isBlocked()) {
            // console.log('block');
            return object.position;
        }
        currentTile.remove(object);
        newTile.put(object);
        return newPosition;
    }
    movePacman(arrow) {
        this.#pacman.position = this.moveObject(this.#pacman, arrow);
    }

    moveGhosts(ghosts) {
        let arrows = [
            'ArrowLeft',
            'ArrowRight',
            'ArrowUp',
            'ArrowDown'
        ];
        ghosts.forEach(ghost => {
            let direction = Math.floor(Math.random() * 10) % 4;
            let arrow = arrows[direction];
            ghost.position = this.moveObject(ghost, arrow);
        });
    }
}

export { Board };