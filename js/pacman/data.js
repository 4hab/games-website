import { Position } from "./position.js";


class Data {
    static map = [
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
        'BFFFFFFFFEFFFFFFFFFB',
        'BFBBFBBBFBBFBBBFBBFB',
        'BFBBFBBBFBBFBBBFBBFB',
        'BFFFFFFFFBBFFFFFFFFB',
        'BBBBBBBBBBBBBBBBBBBB',
    ];
    static winnerScore = 187;
    static types = {
        'tile': {
            'E': 'empty',
            'F': 'empty',
            'G': 'empty',
            'P': 'empty',
            'B': 'block',
        },
        'object': {
            'P': 'pacman',
            'G': 'ghost',
            'F': 'food',
        }
    }
    static objects = [
        {
            type: 'pacman',
            position: new Position(18, 9),
            img: './images/pacman.png',
        },
        {
            type: 'ghost',
            position: new Position(11, 9),
            img: './images/ghost-red.png',
        },
        {
            type: 'ghost',
            position: new Position(11, 10),
            img: './images/ghost-blue.png',
        },
        {
            type: 'ghost',
            position: new Position(12, 9),
            img: './images/ghost-green.png',
        },
        {
            type: 'ghost',
            position: new Position(12, 10),
            img: './images/ghost-purple.png',
        },
    ];
    static foodData = {
        type: 'food',
        img: './images/food.svg',
    };
    static tileType(code) {
        return this.types['tile'][code];
    }
    static objectType(code){
        return this.types['object'][code];
    }
}


export { Data };