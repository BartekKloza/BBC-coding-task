
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
        context.fillStyle = gridColor;
        context.fillRect(0, i, canvas.width, 1);
    }
    for(let i=0; i<canvas.width; i+=cellSize){
        context.fillStyle = gridColor;
        context.fillRect(i, 0, 1, canvas.height);
    }
}

function drawCells(){
    for(let i=0; i<cols; i++){
        for(let j=0; j<rows; j++){
            if(cellTable[j][i] == 1){
                context.fillStyle = cellColor;
                context.fillRect(i*cellSize+1, j*cellSize+1, cellSize-1, cellSize-1);
            }
        }
    }
}

function drawDeadCells(){
    for(let i=0; i<cols; i++){
        for(let j=0; j<rows; j++){
            if(deadCellTable[j][i] == 1){
                context.fillStyle = deadCellColor;
                context.fillRect(i*cellSize+1, j*cellSize+1, cellSize-1, cellSize-1);
            }
        }
    }
}

function redrawCells(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    drawDeadCells();
    drawCells();
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
    let nextCell;
    for(let i=0; i<cols; i++){
        for(let j=0; j<rows; j++){
            nextCell=createNextCell(j,i);
            nextGenTable[j][i]=nextCell;
            if(cellTable[j][i]==1 && deadCellTable[j][i]==0){
                deadCellTable[j][i]=1;
            }
        }
    }
    copy2DArray(cellTable, nextGenTable);
    generation++;
    updateGen();
}



/* Function that captures coordinates of a mouse click on canvas */
function getCursorPosition(event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    console.log(x + ' ' + y);
    if(y<cellTable.length*cellSize && x < cellTable[0].length*cellSize){
        x = Math.floor(x/cellSize);
        y = Math.floor(y/cellSize);
        console.log(x + ' ' + y);
        console.table(cellTable);
        switch (cellTable[y][x]) {
            case 0:
                cellTable[y][x]=1;
                redrawCells();
                break;
            
            case 1:
                cellTable[y][x]=0;
                redrawCells();
                break;
            default:
                break;
        }
    }
}

function updateGen(){
    document.getElementById('gen').innerHTML=generation;
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
    fillArrWithZeros(deadCellTable);
    fillInitialTest();
    drawGrid();
    drawCells();
    canvas.addEventListener('mousedown', function (e) { getCursorPosition(e);});
    document.getElementById('stop').classList.add('disabled');
    
}
let cellSize = 10;
let deadCellColor = 'white'
let cellColor = '#000000'
let gridColor = 'lightgray'
let generation = 0;
let intervalRunning = false;
let interval;
let intervalDelay = 50;
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let rows = canvas.height/cellSize;
let cols = canvas.width/cellSize;
let cellTable = create2DArray();
let nextGenTable = create2DArray();
let deadCellTable = create2DArray();
let maxWidth = document.getElementById("maxCanvasWidth").clientWidth-100;

main();
