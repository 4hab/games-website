import { Tile } from "./tile.js";
import {Position} from './position.js';
import { GameObject } from "./game_object.js";

class Board {

    #types;
    #board;
    #boardDiv
    #imgs;
    #pacman;
    #ghosts;
    constructor(map) {
        this.#boardDiv = document.getElementById('board');
        this.#types = {
            'E': 'empty',
            'F': 'food',
            'B': 'block',
            'P': 'pacman',
            'G': 'ghost'
        }
        this.#imgs = {
            'pacman': 'images/pacman.png',
            'ghost': 'images/ghost.png',
            'food': 'images/food.svg'
        }
        this.#ghosts = new Array(0);
        this.#generateBoard(map);
    }

    #generateBoard(map) {
        let rows = map.length, columns = map[0].length;
        this.#board = new Array(rows);
        for (let r = 0; r < rows; r++) {
            this.#board[r] = new Array(columns);
            for (let c = 0; c < columns; c++) {
                let coordinates = new Position(r, c);
                let tile = this.#generateTile(map[r][c], coordinates);
                this.#boardDiv.appendChild(tile.htmlElement);
                this.#board[r][c] = tile;
            }
        }
    }

    #generateTile(typeKey, coordinates) {
        let type = this.#types[typeKey];
        let gameObject;
        if (type == 'ghost' || type == 'pacman' || type == 'food') {
            gameObject = new GameObject(type, coordinates, this.#imgs[type]);
            if (type == 'ghost') {
                this.#ghosts.push(gameObject);
            }
            else if (type == 'pacman') {
                this.#pacman = gameObject;
            }
        }
        return new Tile(type, gameObject);
    }

    getPacman(){
        return this.#pacman;
    }

    getGhosts(){
        return this.#ghosts;
    }

    getTile(coordinates) {
        return this.#board[coordinates.row][coordinates.column];
    }

    makeMove(from, to) {
        let source = this.getTile(from);
        let destination = this.getTile(to);
        let result = destination.put(source.gameObject);
        if(result)
            source.clear();
        console.log(source);
        console.log(destination);
    }
}

export {Board};