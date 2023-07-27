// var messege =" Hello";
// var name ="Angela";

// var tweet=prompt("Compose your tweet");
// var tweetCount=tweet.length;
// alert("Your composet tweed is "+tweetCount+ " and you have "+(180-tweetCount)+ " characters remaining" );


// var tweet=prompt("Compose your text");
// var tweetUnder140=tweet.slice(0,140);
// alert(tweetUnder140); 


// var getName= prompt("What is your name?");
// var firstChar= getName.slice(0,1);
// var firstCharUpper= firstChar.toUpperCase();
// var restOfName= getName.slice(1, getName.length);
// restOfName=restOfName.toLowerCase();
// var fullName=firstCharUpper+restOfName;
// alert(fullName);

// var output = [];
// var count = 1;

// function FuzzBizz() {
// 	// body...

// 	while (count<=100){
// 	if (count % 3 ===0 && count % 5 ===0){
// 	output.push("FuzzBizz");

// 	}else if(count % 3 === 0){
// 		output.push("Fuzz");
// 	}else if(count % 5=== 0){
// 		output.push("Bizz");
// 	}else
// 	output.push(count);
	
// }count++;
// }






// var output = [];
// var count = 1;

// function FuzzBizz() {
// 	// body...
// 	if (count % 3 ===0){
// 	output.push("Bizz");
// 	}else{
// 		output.push(count);
// 	}
// 	count++;
// 	console.log(output);	
// }




// var numberOfBottles = 99
// while (numberOfBottles >= 0) {
//     var bottleWord = "bottle";
//     if (numberOfBottles === 1) {
//         bottleWord = "bottles";
//     } 
//     console.log(numberOfBottles + " " + bottleWord + " of beer on the wall");
//     console.log(numberOfBottles + " " + bottleWord + " of beer,");
//     console.log("Take one down, pass it around,");
// 	numberOfBottles--;
//     console.log(numberOfBottles + " " + bottleWord + " of beer on the wall.");
// }





// function fibonacciGenerator (n) {
// //Do NOT change any of the code above 👆
    
//     //Write your code here:
    
//     let output = [];
    
//     if (n === 1) {
//         output =[0];
//     } else if (n === 2) {
//         output = [0,1];
//     } else {
//         output = [0,1];
//         for (let i = 2; i < n; i++) {
//         output.push(output[output.length-2] + output[output.length-1]);
//     }

//     }
    
//             return output;
    
    



    
//     //Return an array of fibonacci numbers starting from 0.
    
// //Do NOT change any of the code below 👇
// }

// function printDivs() {
//       var numDivs = 1; // Number of divs to print

//       for (var i = 0; i < numDivs; i++) {
//         // Create a new div element
//         var newDiv = document.createElement("div");

//         // Customize the new div element
//         newDiv.textContent = "Div " + (i + 1);
//         newDiv.style.backgroundColor = "yellow";

//         // Append the div to the body element
//         document.body.appendChild(newDiv);
//       }
//     }



//------------------ Printing divs -------------------

// function printDivs() {
//       var numDivs = 81; // Number of divs to print

//       for (var i = 0; i < numDivs; i++) {
//         // Create a new div element
//         var newDiv = document.createElement("div");

//         // Customize the new div element
//         newDiv.textContent = "Div " + (i + 1);
//         newDiv.classList.add("grey_square");
//         // newDiv.style.backgroundColor = "yellow";

//         // Append the div to the body element
//         main.appendChild(newDiv);
//       }
//     }printDivs();



// Giving uniqe id for each div ------ doesnt work

// var ballsId = document.getElementsByTagName("div"); // Select all div elements

// for (var i = 0; i < div.length; i++) {
//   var div = div[i];
//   var id = "div_" + (i + 1); // Generate a unique ID using a pattern or index

//   div.setAttribute("id", id); // Set the ID attribute
// }



// From here the code is not working for printing balls 


// const clickedBalls = document.querySelectorAll(".ball").length;
// for (let i = 0; i<clickedBalls; i++){

// document.querySelectorAll(".ball")[i].addEventListener("click", function(){
// 	// body...
// 	onclick=createNewElement('.ball');
// });
	
// }

// function createNewElement() {
//   // Create a new div element
//   var newDiv = document.createElement("div");

//   // Customize the div element
//   newDiv.innerHTML = "New";
//   newDiv.classList.add("ball");

//   // Append the div element to the container
//   var grey = document.getElementById("grey");
//   grey.appendChild(newDiv);
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
    // for (let i = 0; i < board.length; i++) {
    // const printingDiv = document.createElement("div");
    // printingDiv.textContent = board[i];
    // printingDiv.id ="grey";
    // console.log(printingDiv);
    // document.getElementsByClassName("container").appendChild(printingDiv);

  const containerElements = document.getElementsByClassName("container");

for (let i = 0; i < board.length; i++) {
  const printingDiv = document.createElement("div");
    printingDiv.textContent = board[i];
    printingDiv.classList.add("grey");

    containerElements.appendChild(printingDiv);
  }
}



