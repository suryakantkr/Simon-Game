let gameSeq = [];
let userSeq = [];
let btns = ["pink", "sky", "orange", "blue"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("click", function() {
    if (!started) {  // Check if the game hasn't started
        console.log("game started");
        started = true;  // Corrected assignment
        level = 0;  // Reset the level on start
        gameSeq = [];  // Clear game sequence on start
        levelUp();
    }
});

function userFlash(btn) {
    btn.classList.add("flash");
    let originalColor = btn.style.backgroundColor;
    btn.style.backgroundColor = "white"; // Change to any color you like

    setTimeout(function () {
        btn.classList.remove("flash");
        btn.style.backgroundColor = originalColor; // Revert to original color
    }, 250);
}

function btnFlash(btn) {
    btn.classList.add("flash");
    let originalColor = btn.style.backgroundColor;
    btn.style.backgroundColor = "yellow"; // Change to any color you like

    setTimeout(function () {
        btn.classList.remove("flash");
        btn.style.backgroundColor = originalColor; // Revert to original color
    }, 250);
}

function levelUp() {
    userSeq = [];  // Reset user sequence for the new level
    level = level+1;
    h2.innerText = `Level ${level}`;

    let randidx = Math.floor(Math.random() * btns.length);  // Use correct range for random selection
    let randcolor = btns[randidx];
    let randbtn = document.querySelector(`.${randcolor}`);
    
    console.log(randbtn);
    gameSeq.push(randcolor);
    console.log("Game Sequence:", gameSeq);
    

    userFlash(randbtn);  // Flash the correct button in the sequence
}

function checkAns(idx) {
    idx =level-1;
    console.log(level)
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);  // Move to the next level if all inputs are correct
            console.log(h2.innerText)
            levelUp();
        }
       
    }
     else {
        h2.innerText = `Game Over! Press any key to start.`;
        started = false;  // Reset the game
        gameSeq = [];
    }
}

function btnPress() {
    let btn = this;
    btnFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    console.log("User Sequence:", userSeq);

    checkAns(userSeq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnPress);  // Attach click events to all buttons
}

