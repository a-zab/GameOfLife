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

class Fungi {
    constructor(x,y){
        this.x = x;
        this.y = y;
        matrix[this.y][this.x] = 3
        fungiArr.push(this)
    }
}

class TrapforEater {
    constructor(x,y){
        this.x = x;
        this.y = y;
        matrix[this.y][this.x] = 4;
        TrapforEaterCoord.push(this)
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
    exp() {
        
        for(let k = 0; k < this.direction.length; k++){
            let x = this.direction[k][0]
            let y = this.direction[k][1]
            
            matrix[y][x] = 0
            matrix[this.y][this.x] = 0
        }
        if(grassEaterArr.length<5){
            matrix[this.y][this.x] = 0
        }
    }
    
}

class Eater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 20;
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
        matrix[this.y][this.x] = 5
        EaterArr.push(this)
    }
    newCordinates(){
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
        this.newCordinates(0);
        let cordArr = [];
        for (let i in this.direction) {
            let x = this.direction[i][0];
            let y = this.direction[i][1];
            if (x >= 0 && x < matrix.length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == num) {
                    cordArr.push(this.direction[i]);
                }
            }
           
        } return cordArr;
    }
    mul() {
        let newCell = random(this.chooseCell(0));

        if (newCell && this.energy >= 8) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 5;

            let newEater = new Eater(newX, newY, 1);
            EaterArr.push(newEater);
            this.energy = 0;
        }
        this.energy++;
    }
    move(){
        let found = random(this.chooseCell(0));

        if (found){
            let x = found[0];
            let y = found[1];

            matrix[y][x] = 5
            matrix[this.y][this.x] = 0

            this.x = x;
            this.y = y;

            this.energy--

            if(this.energy < 0){
                this.die()
            }
        }else {
            this.energy--
            if(this.energy < 0){
                this.die()
            }
        }
    }
    eat(){
        let found = random(this.chooseCell(1));
        let foundgrasseater = random(this.chooseCell(2));
        let TrapforEaterfound = random(this.chooseCell(3));

        if (found){
            this.energy +=5;
            let x = found[0];
            let y = found[1];

            for (let i = 0; i < grassArr.length; i++) {
                if( grassArr[i].x == x && grassArr[i].y == y ){
                    grassArr.splice(i, 1)
                }
            }

            matrix[y][x] = 5
            matrix[this.y][this.x] = 0
            
            this.x = x;
            this.y = y

            if(this.energy > 30){
                this.mul()
            }
        }else if(foundgrasseater){
            this.energy +=5;
            let x = foundgrasseater[0];
            let y = foundgrasseater[1];

            for (let i = 0; i < grassEaterArr.length; i++) {
                if( grassEaterArr[i].x == x && grassEaterArr[i].y == y ){
                    grassEaterArr.splice(i, 1)
                }
            }

            matrix[y][x] = 5
            matrix[this.y][this.x] = 0
            
            this.x = x;
            this.y = y

            if(this.energy > 30){
                this.mul()
            }
        }else if (TrapforEaterfound) {
            let x = TrapforEaterfound[0];
            let y = TrapforEaterfound[1];
            for (let i = 0; i < TrapforEaterCoord.length; i++) {
                if (TrapforEaterCoord[i].x == x && TrapforEaterCoord[i].y == y) {
                    TrapforEaterArr.splice(i, 1)
                    TrapforEaterCoord[i].exp()
                }
            }

            matrix[y][x] = 0
            matrix[this.y][this.x] = 0 

            this.x = x;
            this.y = y;
            
        }else{
            this.move()
        }
    }
    die(){
        for (let i in EaterArr) {
            if( EaterArr[i].x == this.x && EaterArr[i].y == this.y ){
                EaterArr.splice(i, 1)
            }
        }
        matrix[this.y][this.x] = 0
    }
}