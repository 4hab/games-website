class Position {
    constructor(r, c) {
        this.row = r;
        this.column = c;
    }

    static copy(position){
        return new Position(position.row, position.column);
    }
    update(direction){
        if (direction == 'ArrowLeft')
            this.column--;
        else if (direction == 'ArrowRight')
            this.column++;
        else if (direction == 'ArrowUp')
            this.row--;
        else if (direction == 'ArrowDown')
            this.row++;
    }
}

export {Position};