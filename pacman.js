let mapDiv = document.getElementById('map');
const map = {
    'board': [
        'BBBBBBBBBBBBBBBBBBBB',
        'BFFFFFFFFBBFFFFFFFFB',
        'BFBBFBBBFBBFBBBFBBFB',
        'BFBBFBBBFBBFBBBFBBFB',
        'BFFFFFFFFFFFFFFFFFFB',
        'BFBBFBFBBBBBBFBFBBFB',
        'BFFFFBFFFBBFFFBFFFFB',
        'BBBBFBBBFBBFBBBFBBBB',
        'EEEBFBFFFFFFFFBFBEEE',
        'EEEBFBFBEEEEBFBFBEEE',
        'BBBBFBFBEEEEBFBFBBBB',
        'BFFFFFFBEGGEBFFFFFFB',
        'BBBBFBFBEGGEBFBFBBBB',
        'EEEBFBFBBBBBBFBFBEEE',
        'EEEBFBFFFFFFFFBFBEEE',
        'BBBBFBBBFBBFBBBFBBBB',
        'BFFFFBFFFBBFFFBFFFFB',
        'BFBBFBFBBBBBBFBFBBFB',
        'BFFFFFFFFPFFFFFFFFFB',
        'BFBBFBBBFBBFBBBFBBFB',
        'BFBBFBBBFBBFBBBFBBFB',
        'BFFFFFFFFBBFFFFFFFFB',
        'BBBBBBBBBBBBBBBBBBBB',
    ],
    'pacmanPosition': {
        type: 'pacman',
        img: 'images/pacman.png',
        row: 18,
        column: 9
    },
    'food': {
        type: 'food',
        img: 'images/food.svg',
        column: 0,
        row: 0
    },
    'ghostsData': [
        {
            type: 'ghost',
            img: 'images/ghost-blue.png',
            row: 11,
            column: 9
        },
        {
            type: 'ghost',
            img: 'images/ghost-green.png',
            row: 12,
            column: 10
        },
        {
            type: 'ghost',
            img: 'images/ghost-purple.png',
            row: 11,
            column: 10
        },
        {
            type: 'ghost',
            img: 'images/ghost-red.png',
            row: 12,
            column: 9
        },
    ]
};

class Game {
    board;
    pacmanTile;
    ghostsTile;
    play = false;
    constructor(map) {
        this.ghostsTile = new Array();
        this.generateMap(map);
    }
    generateMap(map) {
        let boardData = map['board'];
        let rows = boardData.length;
        let columns = boardData[0].length;
        this.board = new Array(rows);
        for (let i = 0; i < rows; i++) {
            this.board[i] = new Array(columns);
            for (let j = 0; j < columns; j++) {
                let content = boardData[i][j];
                let tile = new Tile(content == 'B' ? 'block' : 'empty', i, j);
                if (content != 'E' && content != 'B') {
                    let obj = new GameObject(content);
                    tile.put(obj);
                    if (content == 'P') {
                        this.pacmanTile = tile;
                    }
                    else if (content == 'G') {
                        this.ghostsTile.push(tile);
                    }
                }
                this.board[i][j] = tile;
                mapDiv.appendChild(tile.htmlElement);
            }
        }
        console.log(this.ghostsTile);
        console.log(this.pacmanTile);
    }
    putPacman(pacmanData) {
        let row = pacmanData.row, column = pacmanData.column;
        let pacman = new GameObject(pacmanData);
        this.board[row][column].put(pacman.htmlElement);
    }
    putGhosts(ghostsData) {
        for (let ghostData of ghostsData) {
            let row = ghostData.row, column = ghostData.column;
            let ghost = new GameObject(ghostData);
            this.board[row][column].put(ghost.htmlElement);
        }
    }
    move(direction) {
        let column = this.pacmanTile.column, row = this.pacmanTile.row;
        if (direction == 'left')
            column--;
        else if (direction == 'right')
            column++;
        else if (direction == 'up')
            row--;
        else if (direction == 'down')
            row++;

        //put in new coordinates and remove from old coordinates
        let newTile = this.board[row][column];
        if (!newTile.isBlocked()) {
            newTile.put(this.pacmanTile.gameObject);
            this.pacmanTile.empty();
            this.pacmanTile = newTile;
        }
    }

}

class Tile {
    column;
    row;
    type;
    htmlElement;
    gameObject;
    styleClasses = {
        'empty': 'tile',
        'block': 'tile block',
    }
    constructor(type, row, column) {
        this.column = column;
        this.row = row;
        this.type = type;
        this.htmlElement = document.createElement('div');
        this.htmlElement.className = this.styleClasses[type];
    }
    put(gameObject) {
        this.empty();
        this.htmlElement.appendChild(gameObject.htmlElement);
        this.gameObject = gameObject;
        // this.htmlElement.className = this.styleClasses['occupied'];
    }
    empty() {
        if (this.htmlElement.firstChild)
            this.htmlElement.removeChild(this.htmlElement.firstChild);
        this.gameObject = undefined;
    }
    isBlocked() {
        return this.type == 'block';
    }
    isEmpty() {
        return this.type == 'empty';
    }
    containsFood() {
        return this.gameObject && this.gameObject.type == 'F';
    }
}

class GameObject {
    htmlElement;
    column;
    row;
    type;
    imgs = {
        'F': 'images/food.svg',
        'P': 'images/pacman.png',
        'G': 'images/ghost-green.png'
    };
    styleClasses = {
        'F': 'food',
        'P': 'pacman',
        'G': 'ghost'
    }
    constructor(type, column, row) {
        this.type = type;
        this.column = column;
        this.row = row;
        this.htmlElement = document.createElement('img');
        this.htmlElement.src = this.imgs[type];
        this.htmlElement.className = this.styleClasses[type];
    }
}
let game = new Game(map);

let body = document.getElementById('body');
body.onkeydown = function (event) {
    if (event.key == 'ArrowLeft') {
        game.move('left');
    } else if (event.key == 'ArrowRight') {
        game.move('right');
    } else if (event.key == 'ArrowUp') {
        game.move('up');
    } else if (event.key == 'ArrowDown') {
        game.move('down');
    }
    // event.preventDefault();
}


