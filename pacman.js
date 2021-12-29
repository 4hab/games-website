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
        'BFFFFFFBEEEEBFFFFFFB',
        'BBBBFBFBEEEEBFBFBBBB',
        'EEEBFBFBBBBBBFBFBEEE',
        'EEEBFBFFFFFFFFBFBEEE',
        'BBBBFBBBFBBFBBBFBBBB',
        'BFFFFBFFFBBFFFBFFFFB',
        'BFBBFBFBBBBBBFBFBBFB',
        'BFFFFFFFFFFFFFFFFFFB',
        'BFBBFBBBFBBFBBBFBBFB',
        'BFBBFBBBFBBFBBBFBBFB',
        'BFFFFFFFFBBFFFFFFFFB',
        'BBBBBBBBBBBBBBBBBBBB',
    ],
    'pacmanPosition':{
        type : 'pacman',
        img : 'images/pacman.png',
        row : 18,
        column : 9
    },
    'food':{
        type: 'food',
        img: 'images/food.svg',
        column: 0,
        row: 0
    },
    'ghostsData':[
        {
            type : 'ghost',
            img : 'images/ghost-blue.png',
            row : 11,
            column: 9
        },
        {
            type : 'ghost',
            img : 'images/ghost-green.png',
            row : 12,
            column: 10
        },
        {
            type : 'ghost',
            img : 'images/ghost-purple.png',
            row : 11,
            column: 10
        },
        {
            type : 'ghost',
            img : 'images/ghost-red.png',
            row : 12,
            column: 9
        },
    ]
}

class Board{
    board;
    constructor(map){
        this.generateMap(map);
        this.putPacman(map['pacmanPosition']);
        this.putGhosts(map['ghostsData']);
    }
    generateMap(map){
        let boardData = map['board'];
        let rows = boardData.length;
        let columns = boardData[0].length;
        this.board = new Array(rows);
        for (let i = 0; i < rows; i++) {
            this.board[i] = new Array(columns);
            for (let j = 0; j < columns; j++) {
                let tile = new Tile(boardData[i][j]=='B'? 'block':'empty');
                if(boardData[i][j]=='F'){
                    let food = new GameObject(map['food']);
                    tile.put(food.htmlElement);
                }
                this.board[i][j] = tile;
                mapDiv.appendChild(tile.htmlElement);
            }
        }
    }
    putPacman(pacmanData){
        let row = pacmanData.row, column = pacmanData.column;
        let pacman = new GameObject(pacmanData);
        this.board[row][column].put(pacman.htmlElement);
    }
    putGhosts(ghostsData){
        for(let ghostData of ghostsData){
            let row = ghostData.row, column = ghostData.column;
            let ghost = new GameObject(ghostData);
            this.board[row][column].put(ghost.htmlElement);
        }
    }
}

class Tile{
    coordinates;
    content;
    htmlElement;
    styleClasses = {
        'empty':'tile',
        'occupied': 'tile occupied',
        'block':'tile block',
    }
    constructor (type){
        this.htmlElement = document.createElement('div');
        this.htmlElement.className = this.styleClasses[type];
    }
    put(element){
        if(this.htmlElement.firstChild)
            this.htmlElement.removeChild(this.htmlElement.firstChild);
        this.htmlElement.appendChild(element);
        this.htmlElement.className = this.styleClasses['occupied'];
    }
    containsBlock(){
        return this.content == 'B';
    }
    isEmpty(){
        return this.content == 'E';
    }
    containsFood(){
        return this.content == 'F';
    }  
}

class GameObject{
    htmlElement;
    column;
    row;
    type;
    constructor(objectData){
        this.type = objectData.type;
        this.column = objectData.column;
        this.row = objectData.row;
        this.htmlElement = document.createElement('img');
        this.htmlElement.src = objectData.img;
        this.htmlElement.className = objectData.type;
    }
}
let board = new Board(map);


