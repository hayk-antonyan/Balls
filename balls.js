
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
  let ballsAdded = 0;
  for (let i = 0; i < randomBallsCount; i++) {
      const emptyCells = getEmptyCells();
      if (emptyCells.length > 0) {
          let randomBoardIndex = getRandomBoardIndex(emptyCells);
          const randomColor = getRandomColorIndex();

       
          board[randomBoardIndex] = { colorIndex: randomColor, isActive: false };
          ballsAdded++;
      }
  }
  return ballsAdded;
}
// -------------------------------------------------------------------------
async function handleCellClick(e, i, ballsAdded){
  
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
  // console.log("Passed balls qty is " + boardLength);
  // If balls were removed, add new random balls
  if (ballsRemoved > 0) {   
      updateBoardVIew();
      totalBallsRemoved = totalBallsRemoved + ballsRemoved * 5;
      document.getElementById("result").innerText = totalBallsRemoved;
      
      // Save totalBallsRemoved to localStorage
      localStorage.setItem("totalBallsRemoved", totalBallsRemoved);

      // Use async function to wait for the board to be updated before calling addRandomBalls
      await new Promise(resolve => setTimeout(resolve, 0));

      // const newBallsAdded  = addRandomBalls(randomBallsCount);
      
      updateBoardVIew();

      setTimeout(() => {
        handleCellClick(null, null);
    }, 0);

  } else {
      addRandomBalls(randomBallsCount);
      updateBoardVIew();
      removeMatchingBalls();
      updateBoardVIew();
      setTimeout(() => {
      handleCellClick(null, null);
    }, 0);
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

function removeMatchingBalls() {
  const removedBalls = removedBallsCount;
  // console.log("Balls to be removed in row are " + removedBalls);
  let removed = false;

  const checkArea = board.length - removedBalls + 1;
  // console.log("The checkArea is " + checkArea);

  // Horizontal check

  for (let initialIndex = 0; initialIndex < checkArea; initialIndex++) {
    let matchingBallsCount = 0;
    let colorIndexToMatch = null;

    for (let i = 0; i < removedBalls; i++) {
      console.log(`Outer loop index: ${initialIndex}, Inner loop index: ${i}`);

      // Ensure the ball at the current index is not null or undefined
      const currentBall = board[initialIndex + i];
      // console.log(currentBall);
      if (!currentBall) {
        break; // Exit the loop if the ball is null or undefined
      }
      
      const colorIndex = currentBall.colorIndex;
      console.log("colorindex is " + colorIndex);
      if (colorIndexToMatch === null) {
        // First ball in the sequence
        colorIndexToMatch = colorIndex;
        matchingBallsCount = 1;
      } else if (colorIndex === colorIndexToMatch) {
        // Ball has the same color as the previous ones
        matchingBallsCount++;
      } else {
          break; //Ball has not the same color as the previus ones
      }
      debugger
      if (matchingBallsCount === removedBalls) {
        // Remove matching balls
        for (let j = 0; j < removedBalls; j++) {
          board[initialIndex + j] = null;
        }
        removed = true;
        break; 
      }
    }
  }
  

  // Check vertically
  const columns = boardLength;
  for (let columnIndex = 0; columnIndex < board.length; columnIndex++) {
  // console.log("Balls to be removed in col are " + removedBalls);

    let matchingBallsCount = 0;
    let colorIndexToMatch = null;

    for (let rowIndex = 0; rowIndex < board.length/columns; rowIndex++) {
      // console.log(`Outer loop index: ${columnIndex}, Inner loop index: ${rowIndex}`);
      const currentBall = board[rowIndex * columns + columnIndex];
      // console.log(currentBall);
      if (!currentBall) {
        break;
      }

      const colorIndex = currentBall.colorIndex;
      // console.log("Colorindex is " + currentBall.colorIndex);

      if (colorIndexToMatch === null) {
        colorIndexToMatch = colorIndex;
        matchingBallsCount = 1;
      } else if (colorIndex === colorIndexToMatch) {
        matchingBallsCount++;
      } else {
        continue;
      }

      if (matchingBallsCount === removedBalls) {
        // Found a sequence of matching balls, remove them
        for (let j = 0; j < removedBalls; j++) {
          board[(rowIndex - removedBalls + 1 + j) * columns + columnIndex] = null;
        }
        removed = true;
        break; // No need to check further in this iteration
      }
    }
  }

// Diagonal matchings from top-left to bottom-right

  const diagonals = boardLength;
  for (let initialIndex = 0; initialIndex < board.length; initialIndex++) {
  // console.log("Balls to be removed in diagonal are " + removedBalls);

    let matchingBallsCount = 0;
    let colorIndexToMatch = null;

    for (let rowIndex = 0; rowIndex < removedBalls; rowIndex++) {
      console.log(`Outer loop index: ${initialIndex}, Inner loop index: ${rowIndex}`);
      const currentBall = board[initialIndex + rowIndex * (diagonals + 1)];
      console.log("Current diagonal ball is " + currentBall);
      if (!currentBall) {
        break;
      }

      const colorIndex = currentBall.colorIndex;
      console.log("Colorindex is " + currentBall.colorIndex);

      if (colorIndexToMatch === null) {
        colorIndexToMatch = colorIndex;
        matchingBallsCount = 1;
      } else if (colorIndex === colorIndexToMatch) {
        matchingBallsCount++;
      } else {
        continue;
      }

      if (matchingBallsCount === removedBalls) {
        // Found a sequence of matching balls, remove them
        for (let j = 0; j < removedBalls; j++) {
          board[initialIndex + j * (diagonals + 1)] = null;
        }
        removed = true;
        break; // No need to check further in this iteration
      }
    }
  }

// Diagonal matchings from top-right to bottom-left

  for (let initialIndex = 0; initialIndex < board.length; initialIndex++) {
  // console.log("Balls to be removed in diagonal are " + removedBalls);

    let matchingBallsCount = 0;
    let colorIndexToMatch = null;

    for (let rowIndex = 0; rowIndex < removedBalls; rowIndex++) {
      console.log(`Outer loop index: ${initialIndex}, Inner loop index: ${rowIndex}`);
      const currentBall = board[initialIndex + rowIndex * (diagonals - 1)];
      console.log("Current diagonal ball is " + currentBall);
      if (!currentBall) {
        break;
      }

      const colorIndex = currentBall.colorIndex;
      console.log("Colorindex is " + currentBall.colorIndex);

      if (colorIndexToMatch === null) {
        colorIndexToMatch = colorIndex;
        matchingBallsCount = 1;
      } else if (colorIndex === colorIndexToMatch) {
        matchingBallsCount++;
      } else {
        continue;
      }

      if (matchingBallsCount === removedBalls) {
        // Found a sequence of matching balls, remove them
        for (let j = 0; j < removedBalls; j++) {
          board[initialIndex + j * (diagonals - 1)] = null;
        }
        removed = true;
        break; // No need to check further in this iteration
      }
    }
  }

  if (removed) {
    console.log("Balls removed:", board);
  } else {
    console.log("No matching balls found.");
  }
  return removed;
}
