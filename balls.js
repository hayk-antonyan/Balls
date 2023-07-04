//console.log(5);
var getName= prompt("What is your name?");
var firstChar= getName.slice(0,1);
var firstCharUpper= firstChar.toUpperCase();
var restOfName= getName.slice(1, getName.length);
restOfName=restOfName.toLowerCase();
var fullName=firstCharUpper+restOfName;
alert(fullName);