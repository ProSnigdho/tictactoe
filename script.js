const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const restartButton = document.getElementById("restartButton");
const turnIndicator = document.getElementById("turnIndicator");
const scoreXElement = document.querySelector("#scoreX span");
const scoreOElement = document.querySelector("#scoreO span");

let currentPlayer = "X";
let scoreX = 0;
let scoreO = 0;
let moveHistoryX = [];
let moveHistoryO = [];
let gameActive = true;

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
        cell.classList.remove("X", "O", "highlight");
        cell.textContent = "";
        cell.addEventListener("click", handleClick);
    });
    moveHistoryX = [];
    moveHistoryO = [];
    currentPlayer = "X";
    updateTurnIndicator();
    turnIndicator.textContent = "Player X's turn";
    gameActive = true;
}

function handleClick(e) {
    if (!gameActive) return;

    const cell = e.target;

    if (currentPlayer === "X" && moveHistoryX.length === 3) {
        const oldestMove = moveHistoryX.shift();
        oldestMove.classList.remove("X");
        oldestMove.textContent = "";
        oldestMove.addEventListener("click", handleClick);
    } else if (currentPlayer === "O" && moveHistoryO.length === 3) {
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
    let winningCombo = null;
    const hasWon = winningCombinations.some(combination => {
        const isWinningCombo = combination.every(index => cells[index].classList.contains(player));
        if (isWinningCombo) winningCombo = combination;
        return isWinningCombo;
    });

    if (hasWon) {
        highlightWinningCells(winningCombo);
    }

    return hasWon;
}

function highlightWinningCells(combo) {
    combo.forEach(index => {
        cells[index].classList.add('highlight');
    });
}

function endGame(draw) {
    gameActive = false;
    if (draw) {
        turnIndicator.textContent = "It's a draw!";
    } else {
        turnIndicator.textContent = `Player ${currentPlayer} Wins! 🎉`;
        if (currentPlayer === "X") {
            scoreX++;
            scoreXElement.textContent = scoreX;
        } else {
            scoreO++;
            scoreOElement.textContent = scoreO;
        }
    }
    cells.forEach(cell => cell.removeEventListener("click", handleClick)); // Disable all cells
}

restartButton.addEventListener("click", startGame);

startGame();
