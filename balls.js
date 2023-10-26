// functions:
// rundomNumber, randomIndex
// վերցնել զանգվածի դատարկ անդամները և պահել նոր array-ի մեջ, 
// ամեն անգամ ստուգել դատարկ վանդակները, դրանք հանել ցանկից, ավելացնել գնդակ, նորից ստուգել, նորից ստուգել դատարկ վանդակները,  


// Retrieve totalBallsRemoved from localStorage, or use 0 if it's not set
let totalBallsRemoved = parseInt(localStorage.getItem("totalBallsRemoved")) || 0;

// Retrieve the value from localStorage for maxScore
let maxScore = localStorage.getItem("totalBallsRemoved");
// Convert the retrieved value to a number if it exists, or set it to 0
maxScore = maxScore ? parseInt(maxScore) : 0;

// Update the content of the <span> element with id "maxScore"
document.getElementById("maxScore").textContent = maxScore;


let board = [];
const colors = ["red", "blue", "green", "yellow", "purple"];

function initBoard(boardLength){
  for (let i=0; i<boardLength ** 2; i++){
    board.push(null);
  }
}

function startGame(){
  const boardLength = 9;
  const randomBallsCount = 3;
  initBoard(boardLength);
  creatBoardView();
  addRandomBalls();
  updateBoardVIew();
}
startGame();

//---------------------------------------------------------------------------
function creatBoardView(){

  const containerElement = document.querySelector(".container");
  
  
  for (let i = 0; i < board.length; i++) {  
    const printingDiv = document.createElement("div");
    printingDiv.setAttribute('id', i);
    printingDiv.addEventListener('click',(e) => handleCellClick(e, i))
    printingDiv.textContent = board[i];
    printingDiv.classList.add("grey");
    containerElement.appendChild(printingDiv);
    printingDiv.setAttribute('id', i);
    // add setattribute style - (add width to a div in js -> check how to)
  }
};

// function updateBoardVIew() {
//   console.log(board);
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


function updateBoardVIew(){
  // console.log(board);
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


// -------------- Get empty cells ----------------------------------------

function getEmptyCells() {
  const emptyCells = [];
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      emptyCells.push(i);
    }
  }
  return emptyCells;
  // console.log(emptyCells);    
} 


function getRandomBoardIndex(emptyCells){

  const randomCellIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomCellIndex];
  alert("This is randomcell index " + randomCellIndex);
}

function getRandomColorIndex(){

  const randomColorIndex = Math.floor(Math.random() * colors.length);
  return randomColorIndex;
  alert("This is randomcolor index " + randomColorIndex);
}

function addRandomBalls() {

  for (let i = 0; i < 3; i++) {
    const emptyCells =  getEmptyCells();
    const randomBoardIndex = getRandomBoardIndex(emptyCells); 
    const randomColor = getRandomColorIndex();
    board[randomBoardIndex] = {colorIndex: randomColor, isActive: false};
  }
}

// -------------------------------------------------------------------------

// let totalBallsRemoved = 0;
function handleCellClick(e, i){
  // console.log(e);

const activeBallIndex = board.findIndex(element => element !== null && element.isActive);
// case 1: if board i is empty and activeBall is null => return 
  if( !board[i] && activeBallIndex === -1){
    return;
  }
// case 2: if board i is empty and activeBall is not null => moveBalls, addRandomBalls, updateBoardView
if (!board[i] && activeBallIndex >= 0) {
  moveBalls(activeBallIndex, i);
  const ballsRemoved = removeMatchingBalls();
  
  // If balls were removed, add new random balls
    
  if (ballsRemoved > 0) {   
      updateBoardVIew();
      // let totalBallsRemoved = 0;
      totalBallsRemoved = totalBallsRemoved + ballsRemoved;
      console.log(ballsRemoved);
      document.getElementById("result").innerText = totalBallsRemoved;
      
      console.log(totalBallsRemoved);
      // Save totalBallsRemoved to localStorage
      localStorage.setItem("totalBallsRemoved", totalBallsRemoved);
  } else {
      addRandomBalls();
      updateBoardVIew();
  }
  return;
}

// case 3: if board i is not empty and activeBall is null => activeBall
  if( board[i] && activeBallIndex === -1){
    activeBall(i);   
    updateBoardVIew();
    // console.log("This part is updated" + i);
    return;
  }
// case 4: if board i is not empty and activeBall is not null, make clicked ball activ and TURN ACTIVE BALL PASSIVE;
  if( board[i] && activeBallIndex >= 0){

    activeBall(i); //HERE ACTIVE BALL DOESNT TURN PASSIVE
    updateBoardVIew();
    return;
  } 
  
} 

// ------------------------------------------------------------------------

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
    if (fromIndex >= 0 && fromIndex < board.length && toIndex >= 0 && toIndex < board.length) {
        const elementToMove = board[fromIndex];
        board[fromIndex] = null; 
        board[toIndex] = {
          ...elementToMove,
         isActive: false
        }
        return true; 
    } else {
        // console.log("Ball is not moved.");
        return false; 
    }
}

let fromIndex = 0;
let toIndex = 81;

if (moveBalls(fromIndex, toIndex, board)) {
    // console.log("Move successful.");
    // console.log("Array after move:", board);
} else {
    // console.log("Move failed.");
}

// ------------ Removing matching balls with the same color -----------------------

function removeMatchingBalls() {

  const rows = 9; // Number of rows on the board
  const cols = 9; // Number of columns on the board
  let removed = false; // Flag to track if any balls were removed

  // Check for horizontal matches
  for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols - 2; col++) {
          const currentIndex = row * cols + col;
          const currentCell = board[currentIndex];

          if (currentCell) {
              const colorIndex = currentCell.colorIndex;

              // Check if the next two cells in the row have the same color
              if (
                  board[currentIndex + 1]?.colorIndex === colorIndex &&
                  board[currentIndex + 2]?.colorIndex === colorIndex &&
                  board[currentIndex + 3]?.colorIndex === colorIndex &&
                  board[currentIndex + 4]?.colorIndex === colorIndex

               ) {
                  // Found a horizontal match of three balls of the same color
                  board[currentIndex] = null;
                  board[currentIndex + 1] = null;
                  board[currentIndex + 2] = null;
                  board[currentIndex + 3] = null;
                  board[currentIndex + 4] = null;

                  removed = true;
              }
          }
      }
  }

  // Check for vertical matches
  for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows - 2; row++) {
          const currentIndex = row * cols + col;
          const currentCell = board[currentIndex];

          if (currentCell) {
              const colorIndex = currentCell.colorIndex;

              // Check if the next two cells in the column have the same color
              if (
                  board[currentIndex + cols]?.colorIndex === colorIndex &&
                  board[currentIndex + 2 * cols]?.colorIndex === colorIndex &&
                  board[currentIndex + 3 * cols]?.colorIndex === colorIndex &&
                  board[currentIndex + 4 * cols]?.colorIndex === colorIndex

              ) {
                  // Found a vertical match of three balls of the same color
                  board[currentIndex] = null;
                  board[currentIndex + cols] = null;
                  board[currentIndex + 2 * cols] = null;
                  board[currentIndex + 3 * cols] = null;
                  board[currentIndex + 4 * cols] = null;

                  removed = true;
              }
          }
      }
  }

   // Check for diagonal matches (from top-left to bottom-right)
   for (let row = 0; row < rows - 4; row++) {
    for (let col = 0; col < cols - 4; col++) {
        const currentIndex = row * cols + col;
        const currentCell = board[currentIndex];

        if (currentCell) {
            const colorIndex = currentCell.colorIndex;

            // Check if the next four cells diagonally have the same color
            if (
                board[currentIndex + cols + 1]?.colorIndex === colorIndex &&
                board[currentIndex + 2 * cols + 2]?.colorIndex === colorIndex &&
                board[currentIndex + 3 * cols + 3]?.colorIndex === colorIndex &&
                board[currentIndex + 4 * cols + 4]?.colorIndex === colorIndex
            ) {
                // Found a diagonal match of five balls of the same color
                for (let i = 0; i < 5; i++) {
                    board[currentIndex + i * (cols + 1)] = null;
                }
                removed = true;
            }
        }
    }
}

// Check for diagonal matches (from top-right to bottom-left)
for (let row = 0; row < rows - 4; row++) {
    for (let col = 4; col < cols; col++) {
        const currentIndex = row * cols + col;
        const currentCell = board[currentIndex];

        if (currentCell) {
            const colorIndex = currentCell.colorIndex;

            // Check if the next four cells diagonally have the same color
            if (
                board[currentIndex + cols - 1]?.colorIndex === colorIndex &&
                board[currentIndex + 2 * cols - 2]?.colorIndex === colorIndex &&
                board[currentIndex + 3 * cols - 3]?.colorIndex === colorIndex &&
                board[currentIndex + 4 * cols - 4]?.colorIndex === colorIndex
            ) {
                // Found a diagonal match of five balls of the same color
                for (let i = 0; i < 5; i++) {
                    board[currentIndex + i * (cols - 1)] = null;
                }
                removed = true;
            }
        }
    }
}

  return removed;
}

let removedCount = 0;

function myScore(ballsRemoved) {
    if (ballsRemoved) {
        removedCount += ballsRemoved;
    }
    return removedCount;
}

// Example usage:
// Call myScore with the number of balls removed to update the count
let ballsRemoved = removeMatchingBalls();
let score = myScore(ballsRemoved);

// console.log("Number of balls removed: " + ballsRemoved);
// console.log("Total score: " + score);



// function removeBall() {
//     for (let i = 0; i < board.length; i++) {
//         const cell = board[i];
//         if (cell && cell.isActive) {
//           cell.isActive = false
//           // board[i] = null;
//         }
//     }
// }



// var button = document.getElementById("myButton");

//   // Define the function to be executed
//   function myFunction() {
//     // Do something when the button is clicked
//     console.log("Button clicked!");

//     // Remove the event listener after the function is executed
//     button.removeEventListener("click", myFunction);
//   }

//   // Add event listener to the button
//   button.addEventListener("click", myFunction);


