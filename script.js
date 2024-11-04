const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const restartButton = document.getElementById("restartButton");
const messageElement = document.getElementById("message");

let currentPlayer = "X";
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
        cell.classList.remove("X");
        cell.classList.remove("O");
        cell.textContent = "";
        cell.addEventListener("click", handleClick, { once: true });
    });
    setBoardHoverClass();
    messageElement.textContent = "Player X's turn";
    currentPlayer = "X";
}

function handleClick(e) {
    const cell = e.target;
    placeMark(cell, currentPlayer);
    if (checkWin(currentPlayer)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function placeMark(cell, player) {
    cell.classList.add(player);
    cell.textContent = player;
}

function swapTurns() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    messageElement.textContent = `Player ${currentPlayer}'s turn`;
}

function setBoardHoverClass() {
    board.classList.remove("X");
    board.classList.remove("O");
    board.classList.add(currentPlayer);
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
        messageElement.textContent = "It's a Draw!";
    } else {
        messageElement.textContent = `Player ${currentPlayer} Wins!`;
    }
    cells.forEach(cell => {
        cell.removeEventListener("click", handleClick);
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains("X") || cell.classList.contains("O");
    });
}

restartButton.addEventListener("click", startGame);

startGame();
