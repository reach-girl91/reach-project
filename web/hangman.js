//1. pick a random word from word library
//2. take user's guess
//3. check if letterGuessed is correct
//4. keep track of letters user has guessed (in an array?)
//5. user has won when entire word is guessed

// pick random word
// WHILE word hasnt be guessed (remainingLetters > 0){
  // DISPLAY user current status
  // GET guess from user

  // IF letterGuessed is in word {
    // UPDATE user's current status
    // DECREMENT remainingLetters
  //} ELSE {
    //
    // DECREMENT livesRemaining
  //}
  //ADD letterGuessed to guessedLettersArray
//}

const underscores = document.getElementById('underscores')

let currentWord; //api call here for render word
let livesRemaining = 6; //lives that are left in game
let remainingLetters = currentWord.count; //letters left to be guessed in word

//API call for word library
//create a request variable
let request = new XMLHttpRequest();
request.open('GET', 'localhost:9001/words', true);
request.withCredentials = "true";
//running into CORS issues, so i can make the request and have it be on the same origin
request.onload = function () {
  // Begin accessing JSON data here
  let wordLibrary = this.response;
  let wordLibraryArray = wordLibrary.split("/n")
  if (request.status >= 200 && request.status < 400) {
    currentWord = wordLibraryArray[Math.floor(Math.random() * wordLibraryArray.length)];
    console.log(currentWord)

  } else {
    console.log('error');
  }
}


// Send request
request.send();


function displayStatus(currentWord){
  let answerArray = [];
  for (let i = 0; i < currentWord.length; i++){
    answerArray[i] = "_";
  }
  return answerArray;
}
// underscores.innerHTML = currentWord.count

let currentWordArray = currentWord.split('');
let livesRemaining = 6; //lives that are left in game
let remainingLetters = currentWord.count; //letters left to be guessed in word
function isCorrectGuess(currentWordArray, letterGuessed) {
  // takes in two arguments
  //
  //if false, this should also decrement lives
  if !(currentWordArray.includes(letterGuessed)) {
    livesRemaining -= 1;
  } else {
    remainingLetters -= 1;
  }
}
