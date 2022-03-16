class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.direction = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x + 1, this.y],
            [this.x + 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x - 1, this.y + 1],
            [this.x - 1, this.y]
        ]
        matrix[this.y][this.x] = 1
        grassArr.push(this)
    }
    chooseCell(num) {
        let found = [];
        for (let i in this.direction) {
            let x = this.direction[i][0];
            let y = this.direction[i][1];
            if (x >= 0 && x < matrix.length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == num) {
                    found.push(this.direction[i]);
                }
            }

        }
        return found;
    }
    mul() {
        let newCell = random(this.chooseCell(0));

        if (newCell && this.multiply >= 1) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 1;

            new Grass(newX, newY);
            this.multiply = 0;
        }
        this.multiply++;
    }
}