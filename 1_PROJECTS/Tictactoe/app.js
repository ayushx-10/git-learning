let total_turn = 0;
let board_array = new Array(9).fill("E");
let playerScore = 0, computerScore = 0, drawScore = 0;
let isComputerThinking = false;
let confettiInterval = null; // store confetti loop

const winner = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

const board = document.querySelector('.board');
const restartButton = document.getElementById("restartButton");
const nextRoundButton = document.getElementById("nextRound");
const winningMessage = document.getElementById("winningMessage");
const playerScoreEl = document.getElementById("playerScore");
const computerScoreEl = document.getElementById("computerScore");
const drawScoreEl = document.getElementById("drawScore");

function checkWinner() {
    for (let [a,b,c] of winner) {
        if (board_array[a] !== "E" && board_array[a] === board_array[b] && board_array[b] === board_array[c]) {
            return [a,b,c];
        }
    }
    return null;
}

function smartComputerMove() {
    let emptyCells = board_array.map((val, idx)=> val==="E"? idx:null).filter(v=>v!==null);
    if(emptyCells.length===0) return;

    // 1. Try to win
    for(let [a,b,c] of winner){
        let line = [board_array[a], board_array[b], board_array[c]];
        if(line.filter(v=>"X"===v).length===2 && line.includes("E")){
            let move = [a,b,c][line.indexOf("E")];
            placeMove(move,"X");
            return;
        }
    }

    // 2. Block player
    for(let [a,b,c] of winner){
        let line = [board_array[a], board_array[b], board_array[c]];
        if(line.filter(v=>"O"===v).length===2 && line.includes("E")){
            let move = [a,b,c][line.indexOf("E")];
            placeMove(move,"X");
            return;
        }
    }

    // 3. Take center if free
    if(board_array[4]==="E"){
        placeMove(4,"X");
        return;
    }

    // 4. Take a corner if free
    let corners = [0,2,6,8].filter(i=>board_array[i]==="E");
    if(corners.length){
        placeMove(corners[Math.floor(Math.random()*corners.length)],"X");
        return;
    }

    // 5. Random move
    let randomIndex = emptyCells[Math.floor(Math.random()*emptyCells.length)];
    placeMove(randomIndex,"X");
}

function placeMove(index, player) {
    let cell = document.getElementById(index);
    if(cell.innerHTML !== "") return;

    // Add animated span
    cell.innerHTML = `<span>${player}</span>`;
    cell.classList.add(player);
    board_array[index] = player;
    total_turn++;

    let result = checkWinner();
    if(result){
        winningMessage.innerHTML = player==="O"? "🎉 You Win!":"🤖 Computer Wins!";
        result.forEach(i=>document.getElementById(i).classList.add("winner"));
        if(player==="O") playerScore++;
        else computerScore++;
        updateScores();
        board.removeEventListener("click", playerMove);

        // 🎊 Celebration until reset
        celebrate();
        return true;
    }

    if(total_turn===9){
        winningMessage.innerHTML = "🤝 Match is Draw!";
        drawScore++;
        updateScores();
        board.removeEventListener("click", playerMove);
        return true;
    }

    return false;
}

function playerMove(event){
    if(isComputerThinking) return;
    const element = event.target;
    if(!element.classList.contains("cell")) return;
    if(board_array[element.id]!=="E") return;

    const gameOver = placeMove(element.id,"O");
    if(!gameOver){
        isComputerThinking = true;
        setTimeout(()=>{
            smartComputerMove();
            isComputerThinking=false;
        },600);
    }
}

board.addEventListener('click', playerMove);

function updateScores(){
    playerScoreEl.textContent = playerScore;
    computerScoreEl.textContent = computerScore;
    drawScoreEl.textContent = drawScore;
}

// Next Round button
nextRoundButton.addEventListener("click", ()=>{
    resetBoard(false);
});

// Restart button with fade animation
restartButton.addEventListener("click", ()=>{
    document.querySelector(".board").style.opacity=0;
    setTimeout(()=>resetBoard(true),300);
});

function resetBoard(resetScores){
    if(resetScores){
        playerScore=0; computerScore=0; drawScore=0;
        updateScores();
    }

    board_array = new Array(9).fill("E");
    total_turn=0;
    winningMessage.innerHTML="";
    Array.from(document.getElementsByClassName("cell")).forEach(c=>{
        c.innerHTML="";
        c.classList.remove("O","X","winner");
    });
    board.addEventListener("click", playerMove);
    document.querySelector(".board").style.opacity=1;

    // 🛑 Stop confetti
    if(confettiInterval){
        clearInterval(confettiInterval);
        confettiInterval = null;
    }
}

// 🎊 Confetti Celebration (continuous until reset)
function celebrate(){
    if(confettiInterval) return; // prevent multiple intervals

    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    confettiInterval = setInterval(function() {
      confetti(Object.assign({}, defaults, {
        particleCount: 40,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      }));
      confetti(Object.assign({}, defaults, {
        particleCount: 40,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      }));
    }, 400);
}









let difficulty = null;

// Difficulty selection
const overlay = document.getElementById("difficultyOverlay");
const difficultyBtns = document.querySelectorAll(".difficulty-btn");

difficultyBtns.forEach(btn=>{
  btn.addEventListener("click", ()=>{
    difficulty = btn.dataset.level; // "easy" or "hard"
    overlay.style.display = "none"; // hide overlay
  });
});

// Modify computer AI
function smartComputerMove() {
    if(checkWinner() || total_turn === 9) return;

    let emptyCells = board_array.map((val, idx)=> val==="E"? idx:null).filter(v=>v!==null);
    if(emptyCells.length===0) return;

    if(difficulty === "easy"){
        // EASY MODE: random move only
        let randomIndex = emptyCells[Math.floor(Math.random()*emptyCells.length)];
        placeMove(randomIndex,"X");
        return;
    }

    // HARD MODE (your existing AI)
    // 1. Try to win
    for(let [a,b,c] of winner){
        let line = [board_array[a], board_array[b], board_array[c]];
        if(line.filter(v=>"X"===v).length===2 && line.includes("E")){
            let move = [a,b,c][line.indexOf("E")];
            placeMove(move,"X");
            return;
        }
    }

    // 2. Block player
    for(let [a,b,c] of winner){
        let line = [board_array[a], board_array[b], board_array[c]];
        if(line.filter(v=>"O"===v).length===2 && line.includes("E")){
            let move = [a,b,c][line.indexOf("E")];
            placeMove(move,"X");
            return;
        }
    }

    // 3. Take center
    if(board_array[4]==="E"){
        placeMove(4,"X");
        return;
    }

    // 4. Take a corner
    let corners = [0,2,6,8].filter(i=>board_array[i]==="E");
    if(corners.length){
        placeMove(corners[Math.floor(Math.random()*corners.length)],"X");
        return;
    }

    // 5. Random move
    let randomIndex = emptyCells[Math.floor(Math.random()*emptyCells.length)];
    placeMove(randomIndex,"X");
}


const changeDifficultyBtn = document.getElementById("changeDifficulty");

changeDifficultyBtn.addEventListener("click", ()=>{
    resetBoard(true); // clear scores and board
    overlay.style.display = "flex"; // show difficulty selection overlay again
});


