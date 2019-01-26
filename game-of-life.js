function create2DArray(){
    let arr = new Array(cols);
    for(let i=0; i<cols; i++){
        arr[i] = new Array(rows);
    }
    return arr;
}

function copy2DArray(arr1,arr2){
    for(let i=0; i<cols; i++){
        for(let j=0; j<rows; j++){
            arr1[j][i]=arr2[j][i];
        }
    }
}

function fillArrWithZeros(arr) {
    for(let i=0; i<cols; i++){
        for(let j=0; j<rows; j++){
            arr[i][j] = 0;
        }
    }
}

function drawGrid(){
    for(let i=0; i<canvas.height; i+=cellSize){
        context.fillStyle = 'lightgray';
        context.fillRect(0, i, canvas.width, 1);
    }
    for(let i=0; i<canvas.width; i+=cellSize){
        context.fillStyle = 'lightgray';
        context.fillRect(i, 0, 1, canvas.height);
    }
}

function draw(){
    for(let i=0; i<cols; i++){
        for(let j=0; j<rows; j++){
            if(cellTable[j][i] == 1){
                context.fillStyle = 'black';
                context.fillRect(i*cellSize+1, j*cellSize+1, cellSize-1, cellSize-1);
            }
        }
    }
}

function redraw(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    draw();
}

function countAdjacentCells(y,x){
    let neighbors = 0;
    for(let i=-1; i<2; i++){
        for(let j=-1; j<2; j++){
            if(!(y+i < 0 || y+i > cols-1 || x+j < 0 || x+j > rows-1)){
                
                neighbors+=cellTable[y+i][x+j];
            }
        }
    }
    if(cellTable[y][x]==1){
        neighbors-=1;
    }
    return neighbors;
}

function createNextCell(row,col){
    if(cellTable[row][col]==1){
        if(countAdjacentCells(row,col)<2){
            return 0;
        }
        else{
            if(countAdjacentCells(row,col)>3){
                return 0;
            }
        }
        return 1;
    }
    else{
        if(countAdjacentCells(row,col)==3){
            return 1;
        }
        return 0;
    }
}

function createNextGen(){
    for(let i=0; i<cols; i++){
        for(let j=0; j<rows; j++){
            nextGenTable[j][i]=createNextCell(j,i);
        }
    }
    copy2DArray(cellTable, nextGenTable);
    generation++;
    document.getElementById('gen').innerHTML=generation;
}

function stepButton(){
    createNextGen();
    redraw();
}

function startButton(){
    if(!intervalRunning){
        interval = setInterval(function(){
            createNextGen();
            redraw();
        }, 1000);
    }
}

function stopButton(){
    clearInterval(interval);
}

function getCursorPosition(event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    x = Math.floor(x/cellSize);
    y = Math.floor(y/cellSize);
    cellTable[y][x] = 1;
    redraw();
}

function fillInitialTest() {
    cellTable[5][5]=1;
    cellTable[6][6]=1;
    cellTable[6][7]=1;
    cellTable[6][8]=1;
    cellTable[6][3]=1;
    cellTable[6][2]=1;
    cellTable[4][3]=1;
}

function main(){
    fillArrWithZeros(cellTable);
    fillArrWithZeros(nextGenTable);
    fillInitialTest();
    drawGrid();
    draw();
    canvas.addEventListener("mousedown", function (e) { getCursorPosition(e);});
}
let cellSize = 10;
let generation = 0;
let intervalRunning = false;
let interval;
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let rows = canvas.height/cellSize;
let cols = canvas.width/cellSize;
let cellTable = create2DArray();
let nextGenTable = create2DArray();

main();
