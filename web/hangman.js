const underscores = document.getElementById('underscores')

let currentWord; //api call here for render word

let livesRemaining = 6; //lives that are left in game

//create a request variable
let request = new XMLHttpRequest();
request.open('GET', 'http://app.linkedin-reach.io/words', true);
request.withCredentials = "true";
//running into CORS issues, so i can make the request and have it be on the same origin
request.onload = function () {
  // Begin accessing JSON data here
  let wordLibrary = this.response;
  console.log(wordLibrary);
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

// function displayUnderscores(currentWord){
//
// }
// underscores.innerHTML = currentWord.count
