class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 20;
        this.direction = [];
        this.mulability = 0;
        matrix[this.y][this.x] = 2
        grassEaterArr.push(this)
    }
    newCordinates() {
        this.direction = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(num) {
        this.newCordinates();
        let cordArr = [];
        for (let i in this.direction) {
            let x = this.direction[i][0];
            let y = this.direction[i][1];
            if (x >= 0 && x < matrix.length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == num) {
                    cordArr.push(this.direction[i]);
                }
            }

        }
        return cordArr;
    }
    mul() {
        let newCell = random(this.chooseCell(0));

        if (newCell && this.energy >= 8 && this.mulability == 0 && grassEaterArr.length < 400) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 2;

            let newGrassEater = new GrassEater(newX, newY, 1);
            grassEaterArr.push(newGrassEater);
            this.energy = 0;
        } else {
            this.move()
        }
        this.energy++;
    }
    move() {
        let found = random(this.chooseCell(0));
        let fungifound = random(this.chooseCell(3));

        if (found || fungifound) {
            let x = found[0];
            let y = found[1];

            matrix[y][x] = 2
            matrix[this.y][this.x] = 0

            this.x = x;
            this.y = y;

            this.energy--

            if (this.energy < 0) {
                this.die()
            }
        } else {
            this.energy--
            if (this.energy < 0) {
                this.die()
            }
        }
    }
    eat() {
        let found = random(this.chooseCell(1));
        let fungifound = random(this.chooseCell(3));

        if (found) {
            this.energy += 5;
            let x = found[0];
            let y = found[1];

            for (let i = 0; i < grassArr.length; i++) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1)
                    
                }
            }

            matrix[y][x] = 2
            matrix[this.y][this.x] = 0

            this.x = x;
            this.y = y;

            if (this.energy > 30) {
                this.mul()
            }
        } else if (fungifound) {
            let x = fungifound[0];
            let y = fungifound[1];

            for (let i = 0; i < fungiArr.length; i++) {
                if (fungiArr[i].x == x && fungiArr[i].y == y) {
                    fungiArr.splice(i, 1)
                }
            }

            matrix[y][x] = 2
            matrix[this.y][this.x] = 0

            this.x = x;
            this.y = y;
            this.mulability++
        } else {
            this.move()
        }
       
       
    }
    die() {
        for (let i in grassEaterArr) {
            if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                grassEaterArr.splice(i, 1)
            }
        }
        matrix[this.y][this.x] = 0
    }
}
