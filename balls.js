// functions:
// rundomNumber, randomIndex
// վերցնել զանգվածի դատարկ անդամները և պահել նոր array-ի մեջ, 
// ամեն անգամ ստուգել դատարկ վանդակները, դրանք հանել ցանկից, ավելացնել գնդակ, նորից ստուգել, նորից ստուգել դատարկ վանդակները,  


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
      }
    else{
      cell.classList.remove("active-ball");
    }
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
    const randomColor = getRandomColorIndex();
    board[randomBoardIndex] = {colorIndex: randomColor, isActive: false};
  }
}

// -------------------------------------------------------------------------

function handleCellClick(e, i){
  console.log(e);

const activeBallIndex = board.findIndex(element => element !== null && element.isActive);

// case 1: if board i is empty and activeBall is null => return 
  if( !board[i] && activeBallIndex === -1){
    return;
  }
// case 2: if board i is empty and activeBall is not null => moveBalls, addRandomBalls, updateBoardView
  if( !board[i] && activeBallIndex >= 0){
    moveBalls(activeBallIndex, i);
    addRandomBalls();
    // նոր տեղ տեղափոխված գնդակը պետքա active չլինի 
    removeBall();
    updateBoardVIew();
    return;
  }
// case 3: if board i is not empty and activeBall is null => activeBall
  if( board[i] && activeBallIndex === -1){
    activeBall(i);   
    updateBoardVIew();
    // console.log("This part is updated" + i);
    return;
  }
// case 4: if board i is not empty and activeBall is not null, make clicked ball activ and hasActive null;
  if( board[i] && activeBallIndex >= 0){
    activeBall(i); //HERE ACTIVE BALL DOESNT RETURN PASSIVE
    updateBoardVIew();
    return;
  } console.log(activeBallIndex);
} 

// ------------------------------------------------------------------------

// function activeBall(cellIndex) {
//     const cell = board[cellIndex];
    
//     if (cell && !cell.isActive) {
//       cell.isActive = true;    
//       return;
//     } 
  
//     if (cell && cell.isActive) {
//       cell.isActive = false;
//       return;
//     }
// }

function activeBall(cellIndex) {
    const cell = board[cellIndex];
    
    if (cell) {
        cell.isActive = !cell.isActive;
        
        // If you want to deactivate all other active cells when activating a new one
        if (cell.isActive) {
            for (let i = 0; i < board.length; i++) {
                if (board[i] && board[i].isActive && i !== cellIndex) {
                    board[i].isActive = false;
                }
            }
        }
    }
}

function removeBall() {
    for (let i = 0; i < board.length; i++) {
        const cell = board[i];
        if (cell && cell.isActive) {
          cell.isActive = false
          // board[i] = null;
        }
    }
}

function moveBalls(fromIndex, toIndex) {
    if (fromIndex >= 0 && fromIndex < board.length && toIndex >= 0 && toIndex < board.length) {
        const elementToMove = board[fromIndex];
        board[fromIndex] = null; 
        board[toIndex] = elementToMove; 
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




// -------------- Get empty cells ----------------------------------------

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