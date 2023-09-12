// functions:
// rundomNumber, randomIndex
// վերցնել զանգվածի դատարկ անդամները և պահել նոր array-ի մեջ, 
// ամեն անգամ ստուգել դատարկ վանդակները, դրանք հանել ցանկից, ավելացնել գնդակ, նորից ստուգել, նորից ստուգել դատարկ վանդակները,  


let board = [];
let emptyCells =[];
const colors = ["red", "blue", "green", "yellow", "purple"];
const boardLength = 9;

function initBoard(boardLength){
  for (let i=0; i<boardLength ** 2; i++){
    board.push(null);
    emptyCells.push(i);
    console.log(i);
  }
  updateBoard();
}

function startGame(){
  const boardLength = 9;
  const randomBallsCount =3;
  initBoard(boardLength);
  addRandomBalls();
}
startGame();

//---------------------------------------------------------------------------
function updateBoard(){

  const containerElement = document.querySelector(".container");
  
  
  for (let i = 0; i < boardLength ** 2; i++) {  
    const printingDiv = document.createElement("div");
    printingDiv.setAttribute('id', i);
    printingDiv.textContent = board[i];
    printingDiv.classList.add("grey");
    printingDiv.style.backgroundColor = "lightgrey";
    containerElement.appendChild(printingDiv);
    
    printingDiv.setAttribute('id', i);
    console.log('table is printed');
  }
};

// -------Add a click event listener to all <div> elements on the page ------------------------
const divElements = document.querySelectorAll('.container div');

divElements.forEach(divElement => {
  divElement.addEventListener('click', function(event) {
    const clickedDivId = event.target.id;
    const insideOfSquare = this.querySelector('.ball');
   // Check if the innerHTML of the clicked div is not empty
    if (insideOfSquare.classList.contains('active-ball'))    {
      // If it's not empty, add the "active" class to the clicked div
      insideOfSquare.classList.remove('active-ball');
    } else {
      // If it's empty, remove the "active" class from the clicked div
      insideOfSquare.classList.add('active-ball');
    }
    console.log('Clicked div class is active:', clickedDivId);

    // ----Add 3 random balls to the table ------------------------------------------------
      // for (let i = 0; i < 3; i++) {
      //   const randomIndex = Math.floor(Math.random() * divElements.length);
      //   const randomDiv = divElements[randomIndex];

      //   if (randomDiv.innerHTML.trim() === '') {
      //     const ball = document.createElement('div');
      //     ball.classList.add('ball');
      //     const randomColorIndex = Math.floor(Math.random() * colors.length);
      //     const randomColor = colors[randomColorIndex];
      //     ball.style.backgroundColor = randomColor;
      //     randomDiv.appendChild(ball);
      //   } else {
      //     i--; // Retry adding a ball if the selected div is not empty -------------------
      //   }
      // }
    
  });
});

function addRandomBalls() {
  const divElements = document.querySelectorAll('.container div');

  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * divElements.length);
    const randomDiv = divElements[randomIndex];

    if (randomDiv.innerHTML.trim() === '') {
      const ball = document.createElement('div');
      ball.classList.add('ball');
      const randomColorIndex = Math.floor(Math.random() * colors.length);
      const randomColor = colors[randomColorIndex];
      ball.style.backgroundColor = randomColor;
      randomDiv.appendChild(ball);
    } else {
      i--; 
    }
  }
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
// }

// -------------------------------------------------------------------------------------
// function makeActive(clickedDiv) {
//   // Remove "active" class from all divs with the class "clickable"
//   const allDivs = document.querySelectorAll('.clickable');
//   allDivs.forEach((div) => div.classList.remove('active'));

//   // Add "active" class to the clicked div
//   clickedDiv.classList.add('active');
// }

// --------- Get random numbers --------------------------------------------------------- 

// function getRandomNumber(start, end) {
//   return Math.floor(Math.random() * (end - start + 1) + start)
// }
// const randomNumber = getRandomNumber(0, 81);
// // alert(randomNumber);


// -------------------------------------------------------------------------------------
// function moveBalls(){

// }





// let board = [];
// const colors = ["red", "blue", "green", "yellow", "purple"];
// const boardLength = 9;

// function initBoard(boardLength) {
//   for (let i = 0; i < boardLength ** 2; i++) {
//     board.push(null);
//   }
//   updateBoard();
// }

// function startGame() {
//   const boardLength = 9;
//   initBoard(boardLength);
//   addRandomBalls(5);
// }

// startGame();

// function updateBoard() {
//   const containerElement = document.querySelector(".container");
//   containerElement.innerHTML = ""; // Clear the container before updating

//   for (let i = 0; i < boardLength ** 2; i++) {
//     const printingDiv = document.createElement("div");
//     printingDiv.setAttribute('id', i);
//     const cellValue = board[i] ? board[i].color : "";
//     printingDiv.textContent = cellValue;
//     printingDiv.classList.add("grey");
//     printingDiv.style.backgroundColor = "lightgrey";
//     containerElement.appendChild(printingDiv);
//   }
// }

// function addRandomBalls(count) {
//   for (let i = 0; i < count; i++) {
//     const emptyCells = getEmptyCells();
//     if (emptyCells.length === 0) {
//       // No empty cells left, the game may end here
//       return;
//     }

//     const randomIndex = Math.floor(Math.random() * emptyCells.length);
//     const randomCellIndex = emptyCells[randomIndex];
//     const randomColorIndex = Math.floor(Math.random() * colors.length);
//     const randomColor = colors[randomColorIndex];

//     const ball = { color: randomColor };
//     board[randomCellIndex] = ball;

//     // const ball = document.createElement('div');
//     // ball.classList.add('ball');
//     // ball.style.backgroundColor = randomColor;
//     // randomIndex.appendChild(ball);

//   }

//   updateBoard();
// }

// function getEmptyCells() {
//   const emptyCells = [];
//   for (let i = 0; i < board.length; i++) {
//     if (!board[i]) {
//       emptyCells.push(i);
//     }
//   }
//   return emptyCells;
// }

// // Add a click event listener to all <div> elements on the page
// const containerElement = document.querySelector(".container");

// containerElement.addEventListener('click', function(event) {
//   const clickedDivId = event.target.id;
//   const clickedCell = board[clickedDivId];

//   if (clickedCell) {
//     // The clicked cell has a ball, let's try to move it to an empty cell
//     const emptyCells = getEmptyCells();

//     if (emptyCells.length > 0) {
//       const randomIndex = Math.floor(Math.random() * emptyCells.length);
//       const emptyCellIndex = emptyCells[randomIndex];

//       board[emptyCellIndex] = clickedCell;
//       board[clickedDivId] = null;

//       updateBoard();
//       addRandomBalls(1); // Add one random ball after moving
//     }
//   }
// });


