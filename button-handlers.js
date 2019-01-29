function startButton(){
    if(!intervalRunning){
        interval = setInterval(function(){
            createNextGen();
            redrawCells();
        }, intervalDelay);
        intervalRunning = true;
        document.getElementById('start').classList.add('disabled');
        document.getElementById('stop').classList.remove('disabled');
    }
}

function stepButton(){
    createNextGen();
    redrawCells();
}

function stopButton(){
    clearInterval(interval);
    intervalRunning = false;
    document.getElementById('stop').classList.add('disabled');
    document.getElementById('start').classList.remove('disabled');
}


function resetButton(){
    fillArrWithZeros(cellTable);
    fillArrWithZeros(deadCellTable);
    generation = 0;
    redrawCells();
    updateGen();
    stopButton();
}

function randomButton() {
    for(let i=0; i<cols; i++){
        for(let j=0; j<rows; j++){
            cellTable[j][i]=Math.floor(Math.random() * 2);
        }
    }
    stopButton();
    fillArrWithZeros(deadCellTable);
    redrawCells();
    generation = 0;
    updateGen();
}

function setSizeButton(){
    let userSize = parseInt(document.getElementById('userSize').value,10);
    if(userSize < 50 || userSize > maxWidth || isNaN(userSize)){
        alertMessage.innerHTML = 
        'The size is incorrect. It must be between 50px and ' 
        + maxWidth + 'px';
        showAlert();
    }
    else{
        stopButton();
        resetButton();
        canvas.width = document.getElementById('userSize').value;
        canvas.height = document.getElementById('userSize').value;
        rows = Math.floor(canvas.height/cellSize);
        cols = Math.floor(canvas.width/cellSize);
        cellTable = create2DArray();
        deadCellTable = create2DArray();
        nextGenTable = create2DArray();
        fillArrWithZeros(cellTable);
        fillArrWithZeros(nextGenTable);
        fillArrWithZeros(deadCellTable);
        document.getElementById('userSize').placeholder = userSize;
        redrawCells();
    }
}

function setCellSizeButton(){
    let userCellSize = parseInt(document.getElementById('userCellSize').value,10);
    if(userCellSize < 2 || userCellSize * 4 > canvas.width || isNaN(userCellSize)){
        alertMessage.innerHTML = 
        'The cell size is incorrect. It must be between 2px and ' 
        + canvas.width/4 + 'px';
        showAlert();
    }
    else{
        stopButton();
        resetButton();
        cellSize = userCellSize;
        rows = Math.floor(canvas.height/cellSize);
        cols = Math.floor(canvas.width/cellSize);
        cellTable = create2DArray();
        deadCellTable = create2DArray();
        nextGenTable = create2DArray();
        fillArrWithZeros(cellTable);
        fillArrWithZeros(nextGenTable);
        fillArrWithZeros(deadCellTable);
        document.getElementById('userCellSize').placeholder = userCellSize;
        redrawCells();
    }

}

function setIntervalButton(){
    let userInterval = parseInt(document.getElementById('userInterval').value,10);
    if(userInterval < 1 || userInterval > 60000 || isNaN(userInterval)){
        alertMessage.innerHTML = 
        'The interval delay is incorrect. It must be between 1 millisecond and 1 minute';
        showAlert();
    }
    else{
        if(intervalRunning){
            clearInterval(interval);
            intervalRunning=false;
            intervalDelay = userInterval;
            startButton();
        }
        else{
            intervalDelay = userInterval;
        }
    }
}

function setColorsButton(){

}
function showAlert(){
    document.getElementById('alertRow').classList.add('showAlert');
    document.getElementById('alertRow').classList.remove('hideAlert');
}

function hideAlert(){
    document.getElementById('alertRow').classList.add('hideAlert');
    document.getElementById('alertRow').classList.remove('showAlert');
}

function updateCellColor(event){

    cellColor = event.target.value;
    redrawCells();
}

function updateGridColor(event){

    gridColor = event.target.value;
    canvas.style.borderColor = gridColor;
    redrawCells();
}

function updateDeadCellColor(event){

    deadCellColor = event.target.value;
    redrawCells();
}
let alertMessage = document.getElementById('alertMessage');
let userCellColorButton = document.getElementById('userCellColor');
let userGridColorButton = document.getElementById('userGridColor');
let userDeadCellColorButton = document.getElementById('userDeadCellColor');


userCellColorButton.addEventListener('change', updateCellColor, false);
userGridColorButton.addEventListener('change', updateGridColor, false);
userDeadCellColorButton.addEventListener('change', updateDeadCellColor, false);




