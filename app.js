const boxes = document.querySelectorAll(".box");
const newBtn = document.querySelector("#new-btn");
const resetBtn = document.querySelector("#reset-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

let turn0 = true;
let turnX = false;
let p0TurnCount = 0;
let pXTurnCount = 0;

// Winning positions 
const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
]



boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            // for player 0 turn  
            box.innerText = "O";
            box.style.color = "blue";
            turn0 = false;
            turnX = true;
            p0TurnCount++;
        } else {
            // for player X turn  
            box.innerText = "X";
            turn0 = true;
            turnX = false;
            pXTurnCount++;
        }
        box.disabled = true;

        // Checking winner after three turns 
        if (pXTurnCount >= 3 || p0TurnCount >= 3) {
            checkWinner();
        }

        // checking game is drawn 
        if (pXTurnCount + p0TurnCount == 9 && checkWinner) {
            drawnGame();
        }

    });
});


const checkWinner = () => {

    for (let pattern of winPattern) {
        // main logic of game 
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        }
    }
}

const showWinner = (winner) => {
    disableBoxes();
    msg.innerText = `Congratulations winner is Player ${winner}`;
    msgContainer.classList.remove("hide");
}

const drawnGame = () => {
    msg.innerText = `Game is drawn. Try Again....!`;
    msgContainer.classList.remove("hide");
}

const resetGame = () => {
    turn0 = true;
    p0TurnCount = 0;
    pXTurnCount = 0;
    enableBoxes();
}

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        msgContainer.classList.add("hide");
    }
}

resetBtn.addEventListener("click", resetGame);
newBtn.addEventListener("click", resetGame);