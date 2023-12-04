
let randomBallsCount = 3;
let totalBallsRemoved = 0;
let boardLength = 5;
let removedBallsCount = 3;
let removedBalls;

// Get selected balls quantity value
let ballsQtySelect = document.getElementById("ballsQtySelect");
ballsQtySelect.addEventListener("change", function() {
  // Update the randomBallsCount variable with the selected value
  randomBallsCount = ballsQtySelect.value*1;
});

// Get selected balls quantity value
let tableSizeSelect = document.getElementById("tableSizeSelect");
tableSizeSelect.addEventListener("change", function() {
  boardLength = tableSizeSelect.value*1;
});

// Get removed balls quantity value
let removedQtySelect = document.getElementById("removedQtySelect");
removedQtySelect.addEventListener("change", function() {
  // Update the removedBallsCount variable with the selected value
  removedBallsCount = removedQtySelect.value*1;
});


// Retrieve the value from localStorage for maxScore
let maxScore = localStorage.getItem("totalBallsRemoved");
// Convert the retrieved value to a number if it exists, or set it to 0
maxScore = maxScore ? parseInt(maxScore) : 0;

// Update the content of the <span> element with id "maxScore"
document.getElementById("maxScore").textContent = maxScore;

let board = [];
const colors = ["red", "blue", "green"];

function initBoard(boardLength){

  board = []; // Clear the board array before initializing
  for (let i = 0; i<boardLength ** 2; i++){
    board.push(null);
  }
}

// ---------------------- start the game ----------------------------
function startGame() {
    
    // Clear the board
    board = [];
    initBoard(boardLength);

    // Clear the container element in the DOM
    const containerElement = document.querySelector(".container");
    containerElement.innerHTML = "";

    // Initialize the board with the selected size
    initBoard(boardLength);
    creatBoardView();
    addRandomBalls(randomBallsCount);
    updateBoardVIew();

    // Calculate the width of each cell in pixel
    let cellWidth;

    if (window.innerWidth >= 1366) {
        cellWidth = 53; // Set a default value for larger screens
    } else if (window.innerWidth >= 768) {
        cellWidth = 53; // Adjust this value for medium-sized screens
    } else {
        cellWidth = 53; // Adjust this value for smaller screens
    }

    // Calc. the total width of the container based on the boardLength and cellWidth
    const totalWidth = boardLength * cellWidth;

    // Get the .container element
    const container = document.querySelector(".container");

    // Set the width of the container dynamically
    container.style.width = totalWidth + "px";
}
startGame();

// Add event listener to the "START GAME" button
document.getElementById("myButton").addEventListener("click", function() {
  startGame();
  handleCellClick(null, null, 0);
});

//---------------------------------------------------------------------------
function creatBoardView(){

  const containerElement = document.querySelector(".container");
  
  containerElement.innerHTML = "";
  
  for (let i = 0; i < board.length; i++) {  
    const printingDiv = document.createElement("div");
    printingDiv.setAttribute('id', i);
    printingDiv.addEventListener('click',(e) => handleCellClick(e, i));
    printingDiv.textContent = board[i];
    printingDiv.classList.add("grey");
    containerElement.appendChild(printingDiv);
    printingDiv.setAttribute('id', i);
    // add setattribute style - (add width to a div in js -> check how to)
  }
};

function updateBoardVIew(){
  
  for (let i = 0; i < board.length; i++){
    const cell = document.getElementById(i);
    const element = board[i];

    if( element){
      const color =colors[element.colorIndex];
      cell.classList.add('ball', color);

      if(element.isActive){
        cell.classList.add('active-ball');
      }else{
        cell.classList.remove('active-ball');
      }

    }else{
        cell.classList.remove(...cell.classList);
        cell.classList.add('grey');
    }
  }
}

// function updateBoardVIew() {
//   for (let i = 0; i < board.length; i++) {
//       const cell = document.getElementById(i);
//       const element = board[i];

//       if (element) {
//           const color = colors[element.colorIndex];
          
//           // Create a new colored div element
//           const ballDiv = document.createElement("div");
//           ballDiv.classList.add("ball", color);
          
//           // Remove any existing child elements and append the new colored div
//           while (cell.firstChild) {
//               cell.removeChild(cell.firstChild);
//           }
//           cell.appendChild(ballDiv);

//           if (element.isActive) {
//               cell.classList.add('active-ball');
//           } else {
//               cell.classList.remove('active-ball');
//           }

//       } else {
//           cell.classList.remove(...cell.classList);
//           cell.classList.add('grey');
//       }
//   }
// }


// -------------- Get empty cells ----------------------------------------

function getEmptyCells() {
  const emptyCells = [];
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      emptyCells.push(i);
    }
  }
  return emptyCells;   
} 

function getRandomBoardIndex(emptyCells){
  const randomCellIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomCellIndex];
}

function getRandomColorIndex(){
  const randomColorIndex = Math.floor(Math.random() * colors.length);
  return randomColorIndex;
}
// -------------------------------------------------------------------------
function addRandomBalls(randomBallsCount) {
  for (let i = 0; i < randomBallsCount; i++) {
      const emptyCells = getEmptyCells();
      if (emptyCells.length > 0) {
          let randomBoardIndex = getRandomBoardIndex(emptyCells);
          const randomColor = getRandomColorIndex();
       
          board[randomBoardIndex] = { colorIndex: randomColor, isActive: false };
      }
  }
}
// -------------------------------------------------------------------------
async function handleCellClick(e, i, ballsRemoved){
  
const activeBallIndex = board.findIndex(element => element !== null && element.isActive);
// case 1: if board i is empty and activeBall is null => return 
  if( !board[i] && activeBallIndex === -1){
    return;
  }
// case 2: if board i is empty and activeBall is not null => 
// moveBalls, addRandomBalls, updateBoardView

if (!board[i] && activeBallIndex >= 0) {
  moveBalls(activeBallIndex, i);
  let ballsRemoved = removeMatchingBalls();
  // alert("Balls removed is " + ballsRemoved);
  // If balls were removed, add new random balls
  debugger
  if (ballsRemoved > 0) { 
      // alert("Balls removed is " + ballsRemoved); 
      updateBoardVIew();
      totalBallsRemoved = totalBallsRemoved + ballsRemoved * 5;
      document.getElementById("result").innerText = totalBallsRemoved;
      
      // Save totalBallsRemoved to localStorage
      localStorage.setItem("totalBallsRemoved", totalBallsRemoved);

      // Use async function to wait for the board to be updated before calling addRandomBalls
      // await new Promise(resolve => setTimeout(resolve, 0));
      
      updateBoardVIew();
      handleCellClick(null, null);
      setTimeout(() => {}, 0);

  } else {
      addRandomBalls(randomBallsCount);
      updateBoardVIew();
      handleCellClick(null, null);
      setTimeout(() => {}, 0);
  }
  return;
}

// case 3: if board i is not empty and activeBall is null => activeBall
  if( board[i] && activeBallIndex === -1){
    activeBall(i);   
    updateBoardVIew();
    return;
  }
// case 4: if board i is not empty and activeBall is not null, 
// make clicked ball activ and TURN ACTIVE BALL PASSIVE;
  if( board[i] && activeBallIndex >= 0){

    activeBall(i);
    updateBoardVIew();
    return;
  } 
  
} 

function activeBall(cellIndex) {
  // Deactivate all active cells

  for (let i = 0; i < board.length; i++) {
      if (board[i] && board[i].isActive) {
          board[i].isActive = false;
      }
  }

  const cell = board[cellIndex];
  
  if (cell) {
      // Activate the clicked cell
      cell.isActive = true;
  }
}

function moveBalls(fromIndex, toIndex) {
    if (fromIndex >= 0 && fromIndex < board.length && 
      toIndex >= 0 && toIndex < board.length) {
        const elementToMove = board[fromIndex];
        board[fromIndex] = null; 
        board[toIndex] = {
          ...elementToMove,
         isActive: false
        }
        return true; 
    } else {
        return false; 
    }
}

let fromIndex = 0;
let toIndex = 81;

if (moveBalls(fromIndex, toIndex, board)) {
} 
  else {
}


// ------------ Removing matching balls with the same color -------------
// One problem exists: if there are the balls with the same color in two lines, they become deleted  
debugger
function removeMatchingBalls() {
  const removedBalls = removedBallsCount;
  let removed = false;
  const checkArea = board.length - removedBalls + 1;
  let indexesToRemove = [];
 
  // first loop
  for (let initialIndex = 0; initialIndex < checkArea; initialIndex++) {
    if (!board[initialIndex]) {
      continue;
    }

    // Horizontal check---------
    const horizontalIndexes = checkHorizontal(initialIndex, removedBalls);
    if (horizontalIndexes.length) {
      indexesToRemove = indexesToRemove.concat(horizontalIndexes);
      removed = true;
    }

    // Vertical check----------
    const verticalIndexes = checkVertical(initialIndex, removedBalls);
    if (verticalIndexes.length) {
      indexesToRemove = indexesToRemove.concat(verticalIndexes);
      removed = true;
    }

    //Diagonal check left -------------
    const diagonalIndexesLeft = checkDiagonalLeft(initialIndex, removedBalls);
    if (diagonalIndexesLeft.length) {
      indexesToRemove = indexesToRemove.concat(diagonalIndexesLeft);
      removed = true;
    }

    //Diagonal check right ------------
    const diagonalIndexesRight = checkDiagonalRight(initialIndex, removedBalls);
    if (diagonalIndexesRight.length) {
      indexesToRemove = indexesToRemove.concat(diagonalIndexesRight);
      removed = true;
    }

    if (removed) {
      removeBalls(indexesToRemove);
      console.log("Balls removed:", board);
    } else {
      console.log("No matching balls found.");
    }
  }
  return removed;
}


function checkHorizontal(initialIndex, removedBalls){
  let indexes = [initialIndex];
  const numCols = boardLength;
  const colorIndexToMatch = board[initialIndex].colorIndex;
  const initialRow = Math.floor(initialIndex / numCols);
  
// Second loop
  for (let i = initialIndex + 1; i < initialIndex + removedBalls; i++) {  
    const currentRow = Math.floor(i / numCols); 
    if (!board[i] || colorIndexToMatch !== board[i].colorIndex || initialRow !== currentRow) {
      indexes = [];
      break; // Break if there's no ball at the current index
    }
    indexes.push(i);
  }
  return indexes;
}


function checkVertical(initialIndex, removedBalls){
  let indexes = [initialIndex];
  const numCols = boardLength;
  const colorIndexToMatch = board[initialIndex].colorIndex;
  
    // Second loop
    for (let i = initialIndex + numCols; i < initialIndex + (removedBalls * numCols ); i += numCols) {   
    if (!board[i] || colorIndexToMatch !== board[i].colorIndex) {
      indexes = [];
      break;
    }
    indexes.push(i);
  }
  return indexes;
}


function checkDiagonalLeft(initialIndex, removedBalls){
  let indexes = [initialIndex];
  const numCols = boardLength;
  const colorIndexToMatch = board[initialIndex].colorIndex;
  const initialRow = Math.floor(initialIndex / numCols);
    
  // Second loop
    for (let i = initialIndex + numCols - 1; i < initialIndex + (removedBalls * (numCols - 1)); i += numCols - 1) {  
      const currentRow = Math.floor(i / numCols); 
    if (!board[i] || colorIndexToMatch !== board[i].colorIndex || initialRow + indexes.length !== currentRow) {
      indexes = [];
      break;
    }
    indexes.push(i);
  }
  return indexes;
}


function checkDiagonalRight(initialIndex, removedBalls){
  let indexes = [initialIndex];
  const numCols = boardLength;
  const colorIndexToMatch = board[initialIndex].colorIndex;
  const initialRow = Math.floor(initialIndex / numCols);
    
  // Second loop
    for (let i = initialIndex + numCols + 1; i < initialIndex + (removedBalls * (numCols + 1)); i += numCols + 1) {  
      const currentRow = Math.floor(i / numCols); 
    if (!board[i] || colorIndexToMatch !== board[i].colorIndex || initialRow + indexes.length !== currentRow) {
      indexes = [];
      break;
    }
    indexes.push(i);
  }
  return indexes;
}


function removeBalls(indexesToRemove) {
 for (let j = 0; j < indexesToRemove.length; j++){
  const currentIndex = indexesToRemove[j];
  board[currentIndex] = null;
 }   
}