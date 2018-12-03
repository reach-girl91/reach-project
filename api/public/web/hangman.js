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
let currentWord; //api call here for render word
let currentWordArray;
let guessedLettersArray = [];
let livesRemaining = 6; //lives that are left in game
let remainingLetters; //letters left to be guessed in word
let wordLibrary;
let wordLibraryArray;

let result = document.getElementById("status");


//const underscores = document.getElementById('underscores')

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

// underscores.innerHTML = currentWord.count

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


//note:put take guesss somewhere
//2. take user's guess
function takeGuess(letter) {
  //assume i have an input box or buttons
  guessedLettersArray.push(letter);
  isCorrectGuess(letter)
  if (livesRemaining < 1) {
    endGame("Game Over ;(");
  } else if (remainingLetters < 1) {
    endGame("You Won!");
  }
}

//3. checking if letter guessed is correct
function isCorrectGuess(letter) {
  // takes in two arguments
  //
  //if false, this should also decrement lives
  if (!currentWordArray.includes(letter)) {
    livesRemaining -= 1;
  } else {
    remainingLetters -= 1;
    displayStatus(currentWord)
  }
}

function endGame(endGamePhrase) {
  //render 'play again' button
  console.log(endGamePhrase)
  let gameEnding = document.getElementById("endOfGame");
  gameEnding.innerHTML = `${endGamePhrase}`;
  playAgain();

}

function playAgain() {
  //reset all variables and stored letters arrays
  //need to reset
    //guessedLettersArray
    //currentWordArray
    //currentWord
    //livesRemaining
    //remainingLetters
  livesRemaining = 6;
  guessedLettersArray = [];
  chooseRandomWord(); //setting currentWord to a new random word
  currentWordArray;
  //render play again button
}

//render buttons for game board
let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'w', 'y', 'z'];

// const docFragment = document.createDocumentFragment();

let innerHTML = '';

alphabet.forEach(function(letter) {
  innerHTML += `<button class="alphabet__letter" onclick="takeGuess('${letter}')">${letter}</button>`;
});

const alphabetElement = document.querySelector('.alphabet');
alphabetElement.innerHTML = innerHTML;


//need to show livesRemaining
//need to show letters that were guess aka dim buttons (turn them off)
//need to show remainingLetters
//bugs: when i click on the same letter twice, my life decrements, need to disable guessing letter again
//bugs: lives keep decrementing past 0 End Game
//need to list incorrect guesses (wrong letter bank)
