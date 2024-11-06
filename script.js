const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const restartButton = document.getElementById("restartButton");
const turnIndicator = document.getElementById("turnIndicator");
const scoreXElement = document.querySelector("#scoreX span");
const scoreOElement = document.querySelector("#scoreO span");

let currentPlayer = "X";
let scoreX = 0;
let scoreO = 0;
let moveHistoryX = []; // Stores moves for X
let moveHistoryO = []; // Stores moves for O

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function startGame() {
    cells.forEach(cell => {
        cell.classList.remove("X", "O");
        cell.textContent = "";
        cell.addEventListener("click", handleClick);
    });
    moveHistoryX = [];
    moveHistoryO = [];
    currentPlayer = "X";
    updateTurnIndicator();
}

function handleClick(e) {
    const cell = e.target;

    // Remove the oldest move if the current player has already made 4 moves
    if (currentPlayer === "X" && moveHistoryX.length === 4) {
        const oldestMove = moveHistoryX.shift();
        oldestMove.classList.remove("X");
        oldestMove.textContent = "";
        oldestMove.addEventListener("click", handleClick);
    } else if (currentPlayer === "O" && moveHistoryO.length === 4) {
        const oldestMove = moveHistoryO.shift();
        oldestMove.classList.remove("O");
        oldestMove.textContent = "";
        oldestMove.addEventListener("click", handleClick);
    }

    placeMark(cell, currentPlayer);
    if (currentPlayer === "X") {
        moveHistoryX.push(cell);
    } else {
        moveHistoryO.push(cell);
    }

    if (checkWin(currentPlayer)) {
        endGame(false);
    } else {
        swapTurns();
        updateTurnIndicator();
    }
}

function placeMark(cell, player) {
    cell.classList.add(player);
    cell.textContent = player;
    cell.removeEventListener("click", handleClick);
}

function swapTurns() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function updateTurnIndicator() {
    turnIndicator.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(player);
        });
    });
}

function endGame(draw) {
    if (draw) {
        turnIndicator.textContent = "It's a draw!";
    } else {
        turnIndicator.textContent = `Player ${currentPlayer} Wins!`;
        if (currentPlayer === "X") {
            scoreX++;
            scoreXElement.textContent = scoreX;
        } else {
            scoreO++;
            scoreOElement.textContent = scoreO;
        }
    }
    cells.forEach(cell => cell.removeEventListener("click", handleClick));
}

restartButton.addEventListener("click", startGame);

startGame();
