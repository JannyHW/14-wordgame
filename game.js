//import array of commomWords from another file 
import { commonWords } from "./constants.js"; // 100 words

let i = 0;
let lives = 8;
let hit = true;
let buttons = [];
const charCodeA = 65;
const charCodeZ = 90;
let disableInput = false;

//Get new random word and set back
function newWord() {
  let threeup = commonWords.filter((word) => word.length >= 3);
  let selected = Math.floor(Math.random() * threeup.length);
  let word = threeup[selected].split("");
  let letterSpan =[];
  let letterString = "";
  let lives = 8;
  console.log(word);
  document.getElementById("lives").style.width = lives * 40 + "px";
  document.getElementById("word").innerHTML = "";
  document.getElementsByTagName("html")[0].className = "";
  //Remove the disabled-class from all buttons
  for (let i = 0; i <= 25; i++) {
    buttons[i].className = "";
  }
  //Create <span> for each character of the word and fill it with dashes
  for (let i = 0; i < word.length; i++) {
    letterSpan[i] = document.createElement("span");
    letterSpan[i].innerHTML = "_";
    document.getElementById("word").appendChild(letterSpan[i]);
  }
}

function processInput(character) {
  //Loop through the word-array and check, if the given character matches
  for (let i = 0; i < word.length; i++) {
    if (word[i] == character) {
      letterSpan[i].innerHTML = character;
      hit = true;
    } else if (letterSpan[i].innerHTML == "_") {
      finished = false;
    }
  }
  //After the for-loop is finished, check if there was a hit
  if (hit == true) {
    //Set hit back to false
    hit = false;
  } else {
    //Decrease lives and display them
    lives--;
    document.getElementById("lives").style.width = lives * 40 + "px";
    //Check, if there are lives left
    if (lives == 0) {
      gameOver();
    }
  }
  //After the for-loop is finished, check if every character is already guessed
  let finished;
  if (finished === true) {
    document.getElementsByTagName("html")[0].className = "finished";
    disableInput = true;
  } else {
    finished = true;
  }
}

function echoButtons() {
  let i = 0;

  for (let letter = charCodeA; letter <= charCodeZ; letter++) {
    //Create a button for every character of the alphabet
    buttons[i] = document.createElement("button");
    buttons[i].innerHTML = String.fromCharCode(letter);

    //Create a EventListener for every button
    buttons[i].addEventListener("click", function () {
      if (disableInput === false) {
        if (this.className.indexOf("disabled") == -1) {
          processInput(this.innerHTML);
          this.className = "disabled";
        }
      }
    });

    //Insert every button into the buttonContainer
    document.getElementById("buttons").appendChild(buttons[i]);
    i++;
  }
}

//Reveal the missing characters of the word
function gameOver() {
  for (let i = 0; i < word.length; i++) {
    if (letterSpan[i].innerHTML == "_") {
      letterSpan[i].innerHTML = word[i];
      letterSpan[i].className = "missing";
    }
  }
  disableInput = true;
  document.getElementsByTagName("html")[0].className = "gameOver";
}
document.getElementById("next").addEventListener("click", newWord);
echoButtons();
newWord();
