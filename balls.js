// functions:
// rundomNumber, randomIndex
// վերցնել զանգվածի դատարկ անդամները և պահել նոր array-ի մեջ, 
// ամեն անգամ ստուգել դատարկ վանդակները, դրանք հանել ցանկից, ավելացնել գնդակ, նորից ստուգել, նորից ստուգել դատարկ վանդակները,  


let board = [];
const colors = ["red", "blue", "green", "yellow", "purple"];

function initBoard(boardLength){
  for (let i=0; i<boardLength ** 2; i++){
    board.push(null);
    // emptyCells.push(i);
    // console.log(i);
  }
}

function startGame(){
  const boardLength = 9;
  const randomBallsCount = 3;
  initBoard(boardLength);
  creatBoardView();
  console.log(board);
  addRandomBalls();
  console.log(board);
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
    // printingDiv.style.backgroundColor = "lightgrey";
    containerElement.appendChild(printingDiv);
    printingDiv.setAttribute('id', i);
    // console.log('table is printed');
  }
};

function updateBoardVIew(){
    
  for (let i = 0; i < board.length; i++){
    const cell = document.getElementById(i);
     const element = board[i];
    if( element){
      const color =colors[element.colorIndex];
      cell.classList.add('ball', color);
    }else{
      cell.classList.remove("ball");
    }
  }
}

function getRandomBoardIndex(){

  const randomCellIndex = Math.floor(Math.random() * board.length);
  return randomCellIndex;
  alert("This is randomcell index " + randomCellIndex);
}

function getRandomColorIndex(){

  const randomColorIndex = Math.floor(Math.random() * colors.length);
  return randomColorIndex;
  alert("This is randomcolor index " + randomColorIndex);
}

function addRandomBalls() {

  for (let i = 0; i < 3; i++) {

    const randomBoardIndex = getRandomBoardIndex(); 
    // console.log("Random board index" + randomBoardIndex);
    const randomColor = getRandomColorIndex();
    // console.log("Random board color" + randomColor);
    board[randomBoardIndex] = {colorIndex: randomColor, isActive: false};
  }
}

// ------------------------------------------------------------------------
let hasActive = null;

function activeBall(cellIndex) {
  if (hasActive === null) {
    const cell = document.getElementById(cellIndex);
    if (cell.querySelector('.ball')) {
      cell.style.borderColor = "orange";
      hasActive = cellIndex;
    }
  } else {
    const activeCell = document.getElementById(hasActive);
    activeCell.style.borderColor = "red";
    hasActive = null;
  }
}

// -------------------------------------------------------------------------

function handleCellClick(e, i){
  console.log(i);

const activeBallIndex = board.findIndex(element => element !== null && element.isActive);

// case 1: if board i is empty and activeBall is null => return 
// case 2: if board i is empty and activeBall is not null => moveBalls, addRandomBalls, updateBoardView
// case 3: if board i is not empty and activeBall is null => activeBall
// case 4: if board i is not empty and activeBall is not null, make clicked ball activ and hasActive null;
 
  if( !board[i] && activeBallIndex === -1){
    return;
  }

  if( !board[i] && activeBallIndex >= 0){
    moveBalls(activeBallIndex, i);
    addRandomBalls();
    updateBoardVIew();
    return;
  }

  if( board[i] && activeBallIndex === -1){
    activeBall(i);
    updateBoardVIew();
    console.log("This part is updated" + i);
    return;
  }

  if( board[i] && activeBallIndex >= 0){
    activeBall(i);
    // activeBallIndex = null;
    updateBoardVIew();
    return;
  }
} 

function moveBalls(fromIndex, toIndex) {
    if (fromIndex >= 0 && fromIndex < board.length && toIndex >= 0 && toIndex < board.length) {
        const elementToMove = board[fromIndex];
        board[fromIndex] = null; 
        board[toIndex] = elementToMove; 
        return true; 
    } else {
        console.log("Ball is not moved.");
        return false; 
    }
}

for (let i = 0; i <= 81; i++) {
    board.push(i);
}

let fromIndex = 0;
let toIndex = 81;

if (moveBalls(fromIndex, toIndex, board)) {
    console.log("Move successful.");
    console.log("Array after move:", board);
} else {
    console.log("Move failed.");
}



// function getEmptyCells() {
//   const emptyCells = [];
//   for (let i = 0; i < board.length; i++) {
//     if (!board[i]) {
//       emptyCells.push(i);
//     }
//   }
//   return emptyCells;
//   console.log(emptyCells);    
// }

// -------Add a click event listener to all <div> elements on the page ------------------------

// const divElements = document.querySelectorAll('.container div');

// divElements.forEach(divElement => {
//   divElement.addEventListener('click', function(event) {
//     const clickedDivId = event.target.id;
//     const insideOfSquare = this.querySelector('.ball');
   
//     if (!insideOfSquare.classList.contains('active-ball')) {
//       insideOfSquare.classList.add('active-ball');
//     } else{
//       insideOfSquare.classList.remove('active-ball');
//     }

//     console.log('Clicked div class is active:', clickedDivId);

//     // ----Add 3 random balls to the table with loop for
    
//   });
// });


// -------------- Get empty cells ----------------------------------------

