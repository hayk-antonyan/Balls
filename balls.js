//------------------ Printing divs -------------------

function printDivs() {
  let numDivs = 81; // Number of divs to print

  for (let i = 0; i < numDivs; i++) {
    // Create a new div element
    let newDiv = document.createElement("div");

    // Customize the new div element
     // newDiv.textContent = "Div " + (i + 1);
     newDiv.classList.add("grey");
     newDiv.setAttribute('id', i);
     newDiv.style.backgroundColor = "lightgrey";
     newDiv.addEventListener('click', divClickHandler)
    // Append the div to the body element
    main.appendChild(newDiv);
  }

  function divClickHandler(event) {
    const clickedDiv = event.target;
    console.log('New div clicked!', clickedDiv.textContent);
     // let ball = document.createElement('div');
     // let randomID = Math.ceil(Math.random()*9);
     // ball.classList.add("ball");
     // ball.setAttribute('id', randomID);
     // clickedDiv.appendChild(ball);
     // console.log(randomID);
     // ball.setAttribute('id', randomID); //random
  }
  // divClickHandler();

}printDivs();


// From here the code is not working for printing balls 

// const clickedBalls = document.querySelectorAll(".ball").length;
// for (let i = 0; i<clickedBalls; i++){
// document.querySelectorAll(".ball")[i].addEventListener("click", function(){
//  // body...
//  onclick=createNewElement('.ball');
// });
// }

// ---------------------------------------------------

// var parentDiv = document.getElementById("grey");
// grey.appendChild("ball");

// var parentElement = document.getElementById("grey");
// parentElement.appendChild(newDiv);

  
let board = [];
let emptyCells =[];
const colors = ["red", "blue", "green"];

function initBoard(boardLength){
  for (let i=0; i<boardLength**2; i++){
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
  // addRandomBalls();
}
startGame();


function updateBoard(){

  const containerElements = document.getElementsByClassName("container");

  for (let i = 0; i < board.length; i++) {
    const printingDiv = document.createElement("div");
    printingDiv.setAttribute('id', 'grey_square');
    printingDiv.textContent = board[i];
    printingDiv.classList.add(".grey");
    console.log('table is printed');
    // containerElements.appendChild('printingDiv'); 
    // document.getElementsByClassName("container").appendChild(printingDiv);
  }
}

// function addRandomBalls(){
//   let newBall = document.querySelectorAll("ball");

//   for ( i=3; i < newBall.length; i++){
//     if ( emptyCells[i]  === undefined){
//         emptyCells[i].setAttribute('id', 'ball' + i);
//     }
//   }
// }
// let randX=Math.ceil(Math.random()*9);

// let clickDiv = document.getElementsByClassName('grey');
//   clickDiv.addEventListener("click", function(){
//   alert("Div is clicked");
// });

// document.getElementById("newDiv").addEventListener("click", function(squareId) {
//   // squareId = Math.ceil(Math.random()*9);
//   alert("Hello World!");
// });


//this code is printing balls 

// document.getElementById("0").onclick = function() {addRandomBalls()};
// function addRandomBalls() {
//   let ball = document.createElement("div");
//   ball.classList.add("ball");
//   document.getElementById("0").appendChild(ball);
// }


// randomnumbers 
function getRandomNumber(start, end) {
  return Math.floor(Math.random() * (end - start + 1) + start)
}

const randomNumber = getRandomNumber(0, 81);
alert(randomNumber);


// adding random balls
function addRandomBalls(){
  const element = document.getElementById('0');
  const existingID = element.id;
  const randomID = Math.random().toString(36).substr(2, 9); // Example: "5drdxjls3"
  element.setAttribute('id', randomID);
  console.log("Existing ID:", existingID);
}addRandomBalls();



// function makeActive(clickedDiv) {
//   // Remove "active" class from all divs with the class "clickable"
//   const allDivs = document.querySelectorAll('.clickable');
//   allDivs.forEach((div) => div.classList.remove('active'));

//   // Add "active" class to the clicked div
//   clickedDiv.classList.add('active');
// }



// function moveBalls(){

// }
