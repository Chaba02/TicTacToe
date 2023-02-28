const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartButton = document.querySelector(".restart_btn");
const scoreText = document.querySelector("#scoreText");

// win conditions
const winConditions = [
    [0,1,2],
    [0,3,6],
    [3,4,5],
    [6,7,8],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let options = ["","","","","","","","",""];
let currentPlayer = "X";
let running = false;
let scoreX= 0;
let score0 = 0;
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');

// begin the game
initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartButton.addEventListener("click", restartGame);
    statusText.textContent = currentPlayer + " turn";
    scoreText.textContent = scoreX + " : " + score0;
    running = true;
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index){

    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }else{
        currentPlayer = "X";
    }

    statusText.textContent = currentPlayer + " turn";

}

function checkWinner(){
    let roundWon = false;

    for(let i = 0; i<winConditions.length; i++){

        // looping through all win conditions
        const condition = winConditions[i];

        // seeing 
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }

        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = currentPlayer + " won";
        updateScore(currentPlayer);
        // game over
        running = false;
    }else if(!options.includes("")){ // means all spaces full but still no one won
        statusText.textContent = "Draw";
        running = false;
    }else{
        changePlayer();
    }
}

function updateScore(current){
    if(current == "X"){
        scoreX++;
        scoreText.textContent = scoreX + " : " + score0;
    }else{
        score0++;
        scoreText.textContent = scoreX + " : " + score0;
    }
}

function restartGame(){
    currentPlayer = "X";
    options = ["","","","","","","","",""];
    statusText.textContent = currentPlayer + " turn";
    cells.forEach(cell => cell.textContent = "");
    running = true;
}
