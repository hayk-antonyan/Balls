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
    if (divElement.innerHTML.trim() ===''){
        this.classList.add("active");
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


// -------------------------------------------------------------------------------------
// function makeActive(clickedDiv) {
//   // Remove "active" class from all divs with the class "clickable"
//   const allDivs = document.querySelectorAll('.clickable');
//   allDivs.forEach((div) => div.classList.remove('active'));

//   // Add "active" class to the clicked div
//   clickedDiv.classList.add('active');
// }


// -------------------------------------------------------------------------------------
// function moveBalls(){

// }

// --------- Get random numbers --------------------------------------------------------- 

function getRandomNumber(start, end) {
  return Math.floor(Math.random() * (end - start + 1) + start)
}
const randomNumber = getRandomNumber(0, 81);
// alert(randomNumber);


//------ Add a click event listener to all <div> elements on the page----------------------------------------

// function divClickHandler(event) {
//   const clickedDiv = event.target.id;
//   const divElement = document.getElementById('1'); // Replace 'yourDivId' with the actual ID of your <div>
//   console.log('New div clicked!', clickedDiv.textContent);
// }
// divClickHandler();

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





// Adding random balls
// function addRandomBalls(){
//   const element = document.getElementById('0');
//   const existingID = element.id;
//   const randomID = Math.random().toString(36).substr(2, 9); // Example: "5drdxjls3"
//   element.setAttribute('id', randomID);
//   console.log("Existing ID:", existingID);
// }addRandomBalls();




