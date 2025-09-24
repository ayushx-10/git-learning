let total_turn = 0;
let board_array = new Array(9).fill("E");

const winner = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

const board = document.querySelector('.board');
const restartButton = document.getElementById("restartButton");
const winningMessage = document.getElementById("winningMessage");

function checkWinner() {
    for (let [a, b, c] of winner) {
        if (
            board_array[a] !== "E" &&
            board_array[a] === board_array[b] &&
            board_array[b] === board_array[c]
        ) {
            return [a, b, c];
        }
    }
    return null;
}

function easyComputerMove() {
    let emptyCells = board_array
        .map((val, idx) => (val === "E" ? idx : null))
        .filter(v => v !== null);

    if (emptyCells.length === 0) return;

    // 50% chance to block player
    for (let [a, b, c] of winner) {
        let line = [board_array[a], board_array[b], board_array[c]];
        if (line.filter(v => v === "O").length === 2 && line.includes("E")) {
            if (Math.random() > 0.5) { // only block half the time
                let move = [a, b, c][line.indexOf("E")];
                return placeMove(move, "X");
            }
        }
    }

    // Random move
    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    placeMove(randomIndex, "X");
}


function placeMove(index, player) {
    let cell = document.getElementById(index);
    cell.innerHTML = player;
    cell.classList.add(player);
    board_array[index] = player;
    total_turn++;

    // Check winner immediately after the move
    let result = checkWinner();
    if (result) {
        winningMessage.innerHTML = player === "O" ? "You Win 🎉" : "Computer Wins 🤖";
        result.forEach(i => document.getElementById(i).classList.add("winner"));
        board.removeEventListener("click", playerMove);
        return true; // indicates game is over
    }

    if (total_turn === 9) {
        winningMessage.innerHTML = "Match is Draw 🤝";
        board.removeEventListener("click", playerMove);
        return true;
    }

    return false; // game continues
}



function playerMove(event) {
    const element = event.target;
    if (!element.classList.contains("cell")) return;
    if (board_array[element.id] !== "E") return;

    const gameOver = placeMove(element.id, "O");
    
    if (!gameOver) {
        setTimeout(easyComputerMove, 500); // only let AI move if game is not over
    }
}

board.addEventListener('click', playerMove);

restartButton.addEventListener("click", () => {
    const cell = document.getElementsByClassName("cell");

    Array.from(cell).forEach((value) => {
        value.innerHTML = "";
        value.classList.remove("winner", "O", "X");
    });

    total_turn = 0;
    board_array = new Array(9).fill("E");
    winningMessage.innerHTML = "";
    board.addEventListener("click", playerMove);
});
