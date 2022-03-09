var matrix = [];

    for(var h = 0; h < 50; h++){
        matrix.push([]); 
        for(var j = 0; j < 50; j++){
        matrix[h].push(0);
    }
    }

var side = 15;
var grassArr = [];
var grassEaterArr = [];
var EaterArr = [];
var fungiArr = [];
var TrapforEaterCoord = [];

function generator(GrassCount, GrassEaterCount) {
    
   let x = Math.round( Math.random() * 9 );
   let y = Math.round( Math.random() * 9 );
   new Grass(x,y);

    x = Math.round( Math.random() * 9 );
    y = Math.round( Math.random() * 9 );
   
   new GrassEater(x,y);
  
    x = Math.round( Math.random() * 9 );
    y = Math.round( Math.random() * 9 );
   
   new Eater(x,y);

   for(let a = 0; a < 10; a++ ){   
        x = Math.round( Math.random() * 49 );
        y = Math.round( Math.random() * 49 );

        new Fungi(x,y);
    }

   
         x = Math.round( Math.random() * 9 );
         y = Math.round( Math.random() * 9 );
        new TrapforEater(x,y);


}


function setup() {
    generator()
    createCanvas(600, 600)
}

function draw() {
    for (let y = 0; y < matrix.length; y++) {
        
        for (let x = 0; x < matrix[y].length; x++) {

            if(matrix[y][x] == 1)
            {
                fill("green")
            }
            else if(matrix[y][x] == 2)
            {
                fill("yellow")
            }
            else if(matrix[y][x] == 3)
            {
                fill("red")
            } else if(matrix[y][x] == 4)
            {
                fill("orange")
            } else if(matrix[y][x] == 5)
            {
                fill("purple")
            }
            else
            {
                fill("gray")
            }
            ellipse(x * side , y * side , side)
            

        }

    }
    for (let i = 0; i < grassArr.length; i++) {
        grassArr[i].mul();        
    }
   for (let i = 0; i < grassEaterArr.length; i++) {
       grassEaterArr[i].eat();        
   }
   for (let i = 0; i < EaterArr.length; i++) {
    EaterArr[i].eat();        
}
}

