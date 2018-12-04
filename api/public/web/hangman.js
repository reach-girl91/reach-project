//1. pick a random word from word library
//2. take user's guess
//3. check if letterGuessed is correct
//4. keep track of letters user has guessed (in an array?)
//5. user has won when entire word is guessed

// pick random word
// WHILE word hasnt be guessed keep playing game (remainingLetters > 0){
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

//using global variables bc this project is small enough to keep track
let currentWord; //api call and chooses randomword, get set as currentWord
let currentWordArray; //word gets split from string by letter into an array
let guessedLettersArray = []; //letters that get guessed are pushed into this array
let wrongLetters = []; //incorrectly guessed letters
let livesRemaining = 6; //lives that are left in game, starting at 6 lives
let remainingLetters; //letters left to be guessed in word
let wordLibrary; //api call to all the words
let wordLibraryArray; //all the words get split by line/word

let innerHTML = '';
let result = document.getElementById("status");
let gameEnding = document.getElementById("endOfGame");
let wrongs = document.getElementById("wrongLetterBank");


//API call for word library
//create a request variable
let request = new XMLHttpRequest();
request.open('GET', 'http://localhost:9001/words', true);
request.withCredentials = "true";
//running into CORS issues, so i can make the request and have it be on the same origin
request.onload = function() {
  // Begin accessing JSON data here
   wordLibrary = this.response;
   wordLibraryArray = wordLibrary.split('\n');
  if (request.status >= 200 && request.status < 400) {
    chooseRandomWord();
  } else {
    console.log('error');
  }
}
// Send request
request.send();


//1. choosing random word and returns currentWord as string
function chooseRandomWord() {
  //store random word
  currentWord = wordLibraryArray[Math.floor(Math.random() * wordLibraryArray.length)];
  currentWordArray = currentWord.split('');
  remainingLetters = currentWord.length;
  displayStatus(currentWord);
}

//shows underscores or letters guessed correctly on game board
function displayStatus(word) {
  let answerArray = [];
  for (let i = 0; i < currentWordArray.length; i++){
    if (guessedLettersArray.includes(currentWordArray[i])) {
      answerArray[i] = currentWordArray[i];
    } else {
      answerArray[i] = "_";
    }
  }
  return result.innerHTML = answerArray;
}

//2. take user's guess
function takeGuess(letter) {
  //assume i have an input box or buttons
  document.getElementById(`${letter}`).disabled = "disabled";
  guessedLettersArray.push(letter);
  isCorrectGuess(letter)
  if (livesRemaining < 1) {
    //disables all buttons once game is over
    document.querySelectorAll("button").forEach(button => button.disabled = "disabled");
    endGame("Game Over ;(");
  } else if (remainingLetters < 1) {
    endGame("You Won!");
  }
}

//3. checking if letter guessed is correct
function isCorrectGuess(letter) {
  //if false, this should also decrement lives
  if (!currentWordArray.includes(letter)) {
    livesRemaining -= 1;
    gameEnding.innerHTML = "Lives Remaining: " + livesRemaining;
    wrongLetters.push(letter);
    displayWrongLetterBank();
  } else {
    remainingLetters -= 1;
    displayStatus(currentWord)
  }
}

function displayWrongLetterBank(){
  wrongs.innerHTML = wrongLetters.join(", ");
}

//4. game ends
function endGame(endGamePhrase) {
  //render 'play again' button
  console.log(endGamePhrase)
  gameEnding.innerHTML = `${endGamePhrase}` + `<button style="margin-left: 20px;" onclick="playAgain()">Play Again?</button>`;
}


function playAgain() {
  //reset all variables and stored letters arrays
  //need to reset
    //livesRemaining
    //guessedLettersArray
    //wrongLetters
    //currentWordArray
    //currentWord
    //remainingLetters
  livesRemaining = 6;
  guessedLettersArray = [];
  wrongLetters = [];
  gameEnding.innerHTML = 'Lives Remaining: 6';
  wrongs.innerHTML = ' ';
  document.querySelectorAll("button").forEach(button => button.disabled = false); //turns buttons back on from being disabled
  chooseRandomWord(); //setting currentWord to a new random word
  currentWordArray;
}

//render buttons for game board
let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];


alphabet.forEach(function(letter) {
  innerHTML += `<button id="${letter}" onclick="takeGuess('${letter}')">${letter}</button>`;
});

const alphabetElement = document.querySelector('.alphabet');
alphabetElement.innerHTML = innerHTML;
