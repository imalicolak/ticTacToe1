// Set the variables

let playerText = document.getElementById('playerText');
let restartButton = document.getElementById('restartButton');

let boxes = Array.from(document.getElementsByClassName('box')); // Made Array from HTML box classes


let winnerIndicator = getComputedStyle(document.body).getPropertyValue(`--winning-blocks`);
console.log(boxes);

const O_TEXT = "O";
const X_TEXT = "X";

let currentPlayer = X_TEXT;

// I want to be able to save box click value to not let anything override it. 

let spaces = Array(9).fill(null); 

// console.log(spaces);

//Starting the game

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

function boxClicked(e){
    const id = e.target.id; //target the element ID
    // console.log(e.target);
    if(!spaces[id]){
        spaces[id] = currentPlayer; // if spaces not equal to null, is null, continue. Fill the space with X or O
        e.target.innerText = currentPlayer;  //changing innerText of div to X or O
        if(playerHasWon() !== false ){
            playerText = (`${currentPlayer} has won!`);
            let winning_blocks = playerHasWon();
            
            winning_blocks.map(box => boxes[box].style.backgroundColor=winnerIndicator); // at box position, add style background color winning indicator. 

            console.log(winning_blocks);

        }
        
        currentPlayer = currentPlayer === X_TEXT ? O_TEXT: X_TEXT; //if it's X_TEXT change to O_TEXT, otherwise change back to O_TEXT, need further breakdown 
    }
} //log clicked item

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function playerHasWon(){
    // Check if player X fulfills all of the combos in the winning combos list
    for (const condition of winningCombos){
        let [a, b, c] = condition

        if(spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]){
            return [a, b, c];
        }
    }
    return false;
}

restartButton.addEventListener('click', restart);

function restart() {
    spaces.fill(null); //Take out everything and fill with empty null value
    boxes.forEach( box => {
        box.innerText = "";
        box.style.backgroundColor=''
    })
    playerText = 'Tic Tac Toe!';
    currentPlayer = X_TEXT;
    
}



startGame(); 
// when I click on a div, it should do something. we want div ID. 
