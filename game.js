//import array of commomWords from another file
import { commonWords } from "./constants.js"; // 100 words

// 1. PICK A RANDOM WORD WITH 3 LETTERS UP
const words = commonWords.filter((word) => word.length >= 3); //77 words

//create a random index
const randomIndex = Math.floor(Math.random() * words.length);

//get random words
const word = words[randomIndex];
console.log(word);

// 2. CREATE DASHES
let answerArray = [];
for (let i = 0; i < word.length; i++) {
  answerArray[i] = "_";
}

document.querySelector("#word").innerHTML = answerArray.join("");

// 3. generate letter buttons
const alphabet = "abcdefghijklmnopqrstuvwxyz";

//split into individual string
const letters = alphabet.split("");

// create btn for each letter
let btns = letters
  .map(
    (letter) =>
      `
  <button class="letters" id="${letter}">${letter}</button>
  `
  )
  .join("");

// show btns on HTML
document.getElementById("alphabet").innerHTML = btns;

// 4. KEEP TRACK OF CORRECT ANSWERS
let counter = 0;

// KEEP TRACK OF TURNS
let turns = 8;
document.getElementById("turns").style.width = turns * 40 + "px";
// 5. CHANGE STATE AFTER GUESS
document.querySelector("#alphabet").addEventListener("click", (e) => {
  e.target.disabled = true;
  turns--;
  document.getElementById("turns").style.width = turns * 40 + "px";
  let guess = e.target.id; //<button class="letters" id="${letter}">${letter}</button>
  let currentword = [];
  for (let i = 0; i <= word.length; i++) {
    if (word[i] === guess) {
      answerArray[i] = guess;
      document.querySelector("#word").innerHTML = answerArray.join("");
      counter += 1;
      console.log(counter);
    }
  }

  // 6. SHOW THE OUTCOME
  if (counter === answerArray.length) {
    document.querySelector("#gameResult").innerHTML = "🚀You win!";
  }
  if (turns === 0) {
    document.getElementsByTagName("html")[0].className = "over";
    document.querySelector("#gameResult").innerHTML = "😥 you lose!";
    document.querySelector(
      "#showAnswer"
    ).innerHTML = `The answer was: "${word}"`;
  }
});

// 7 RESET
document.querySelector("#reset").addEventListener("click", () => {
  window.location.reload();
});
