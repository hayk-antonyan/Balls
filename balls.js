// functions:
// rundomNumber, randomIndex
// վերցնել զանգվածի դատարկ անդամները և պահել նոր array-ի մեջ, 
// ամեն անգամ ստուգել դատարկ վանդակները, դրանք հանել ցանկից,
//  ավելացնել գնդակ, նորից ստուգել, նորից ստուգել դատարկ վանդակները,  


// Retrieve totalBallsRemoved from localStorage, or use 0 if it's not set

let randomBallsCount = 3;
let totalBallsRemoved = 0;
let boardLength = 5;
let removedBallsCount = 3;

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



// function removeMatchingBalls() {
//   debugger
//   const removedBalls = removedBallsCount;
//   let removed = false;

//   for (let initialIndex = 0; initialIndex < board.length - removedBalls; initialIndex++) {
//     console.log("InitialIndex is "+ initialIndex);
//     let row = board[initialIndex];

//     if (row) {
//       let currentIndex = 0;

//       while (currentIndex < row.length - removedBalls + 1) {
//         console.log("currentIndex is " + currentIndex); 
//         let colorIndex = row[currentIndex]?.colorIndex;
//           if (colorIndex !== undefined) {
//           let isMatching = true;

//           for (let i = 1; i < removedBalls; i++) {
//             if (row[currentIndex + i]?.colorIndex !== colorIndex) {
//               isMatching = false;
//               break;
//             }
//           }

//           if (isMatching) {
//             for (let i = 0; i < removedBalls; i++) {
//               row[currentIndex + i].colorIndex = null;
//             }
//             removed = true;
//           }
//         }

//         currentIndex++;
//       }
//     }
//   }

//   return removed;
// }



  //   if (!array || !Array.isArray(array)) {
  //     console.log("Array is not array");
  //     return;
  // }

  // if(start < 0 || start >= array.length || end < 0 || end >= array.length || start > end ){
  //   console.log("Incorrect values");
  //   return;
  // }



function removeMatchingBalls(start, count, array){

  // const removedBalls = removedBallsCount;
  // let removed = false;

  for (let i = start; i < start + count; i++){
    alert("Array indexes are " + array[i]);
  } 
}

const myArray  = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const startIndex = 5;
const countIndex = 2;

removeMatchingBalls(startIndex, countIndex, myArray);