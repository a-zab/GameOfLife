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