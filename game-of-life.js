class TheGameOfLife {
    constructor(rows, cols){
        this.rows = rows;
        this.columns = cols;
        this.gameBoard = new Array(cols);
        this.nextBoard = new Array(cols);
        this.context = canvas.getContext('2d');
        // initialize two dimensional array
        for(let i=0; i<cols; i++){
            this.gameBoard[i] = new Array(rows);
            this.nextBoard[i] = new Array(rows);
        }
    }

    resetBoard(){
        for(let i=0; i<cols; i++){
            for(let j=0; j<rows; j++){
                this.gameBoard[i][j] = 0;
            }
        }
    }

    fillInitialCells(){
        for(let i=0; i<cols; i++){
            for(let j=0; j<rows; j++){
                this.gameBoard[i][j] = Math.floor(Math.random()*2);
            }
        }
    }

    draw(){
        for(let i=0; i<cols; i++){
            for(let j=0; j<rows; j++){
                if(this.gameBoard[i][j] == 1){
                    this.context.fillStyle = 'black';
                    this.context.fillRect(i*cellSize+1, j*cellSize+1, cellSize-1, cellSize-1);
                }
            }
        }
    }

    drawGrid(){
        for(let i=0; i<canvas.height; i+=cellSize){
            this.context.fillStyle = 'gray';
            this.context.fillRect(0, i, canvas.width, 1);
        }
        for(let i=0; i<canvas.width; i+=cellSize){
            this.context.fillStyle = 'gray';
            this.context.fillRect(i, 0, 1, canvas.height);
        }
    }

    validateField(x,y){
        if(x < 0 || x > cols-1 || y < 0 || y > rows-1){
            console.log("wrong");
            return false;
        }
        return true;
    }
     
    countAdjacentCells(x,y){
        let neighbors = 0;
        for(let i=-1; i<2; i++){
            for(let j=-1; j<2; j++){
                if(!(x+i < 0 || x+i > cols-1 || y+j < 0 || y+j > rows-1)){
                    neighbors+=this.gameBoard[x+i][y+j];
                }
            }
        }
        if(this.gameBoard[x][y]==1){
            neighbors-=1;
        }
        return neighbors;
    }

    createNextCell(x,y){
        if(this.gameBoard[x][y]==1){
            if(this.countAdjacentCells(x,y)<2){
                return 0;
            }
            else{
                if(this.countAdjacentCells(x,y)>3){
                    return 0;
                }
                else{
                    return 1;
                }
            }
        }
        else{
            if(this.countAdjacentCells(x,y)==3){
                return 1;
            }
            else{
                return 0;
            }
        }
    }

    createNextGen(){
        for(let i=0; i<cols; i++){
            for(let j=0; j<rows; j++){
                this.nextBoard[i][j]=this.createNextCell(i,j);
            }
        }
        this.gameBoard=this.nextBoard;
    }

    redraw(){
        this.context.clearRect(0, 0, canvas.width, canvas.height);
        this.drawGrid();
        this.draw();
    }
}

let cellSize = 10;
let canvas = document.getElementById('canvas');
let rows = canvas.height/cellSize;
let cols = canvas.width/cellSize;
let game = new TheGameOfLife(rows, cols, canvas);
game.resetBoard();
game.fillInitialCells();
game.drawGrid();
game.fillInitialCells();
game.draw();
setInterval(function(){
    game.createNextGen();
    game.redraw();
}, 1000);
console.table(game.gameBoard);
console.table(game.nextBoard);
console.log(game.nextBoard[18][18]);

var hello = 'hello';