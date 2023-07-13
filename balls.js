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



const clickedBalls = document.querySelectorAll(".ball").length;
for (let i = 0; i<clickedBalls; i++){

document.querySelectorAll(".ball")[i].addEventListener("click", function(){
	// body...
	alert("Clicked");
});
	
}



function createNewElement() {
  // Create a new div element
  var newDiv = document.createElement(".ball");

  // Customize the div element
  newDiv.innerHTML = "New Element";
  newDiv.classList.add("highlight");

  // Append the div element to the container
  var container = document.getElementById("container");
  container.appendChild(newDiv);
}
