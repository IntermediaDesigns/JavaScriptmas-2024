// The keyboard has been rendered for you
import { renderKeyboard } from "/keyboard";

// Some useful elements
const guessContainer = document.getElementById("guess-container");
const snowmanParts = document.getElementsByClassName("snowman-part");
const keyboardContainer = document.getElementById("keyboard-container");

/*
Challenge  
1. Your challenge is to build a Christmas take on the classic game "Hangman" where a player attempts to guess a word by selecting letters to save a snowman from melting.
- The snowman is made up of 6 parts: hat, arm, nose, scarf, head, and body. These are separate images and have been positioned with CSS.
- At the start of the game, a player can see a number of dashes, with a dash for each letter of the word. So if the word was TREE the player would see - - - -
- The player selects a letter. 
- If that letter is in the word, that letter replaces the dash in the corresponding position. For the word "TREE", if the player has selected the letter E, they will see --EE.
- If the selected letter does not appear in the word, one part of the snowman gets removed.
- If the player guesses the entire word, they win! 
    - any removed parts of the snowman are reinstated.
    - the snowman gets sunglasses
    - the message "You Win!" is displayed in the "guess-container" div.
-If the player guesses wrong 6 times: 
    - only a puddle remains.
    - the message "You Lose!" is displayed in the "guess-container" div.
    
*** Stretch Goals *** 

- Disable the letter button once a letter has been used.
- Add a "New Game" button that appears at the end of a game and resets the app. (You will need to create an array of words to guess)
*/

// Set the word to guess
const christmasWords = [
  "gift",
  "snow",
  "santa",
  "sleigh",
  "reindeer",
  "elf",
  "christmas",
  "ornament",
  "stocking",
  "mistletoe",
  "tinsel",
  "wreath",
  "gingerbread",
  "candy",
  "star",
  "angel",
  "javascriptmas",
];
// 6 guesses for the 6 parts of the snowman
let word = "";
let guesses = 6;
let guessArr = [];
let usedLetters = new Set();
let gameOver = false;

function initializeGame() {
  word = christmasWords[Math.floor(Math.random() * christmasWords.length)];
  guesses = 6;
  guessArr = Array(word.length).fill("_");
  usedLetters.clear();
  gameOver = false;

  renderGuess();
  renderKeyboard();

  Array.from(snowmanParts).forEach((part) => {
    part.style.visibility = "visible";
  });

  document.querySelector(".sunglasses").style.visibility = "hidden";
  document.querySelector(".puddle").style.zIndex = "-2";

  const existingButton = document.getElementById("new-game-btn");
  if (existingButton) {
    existingButton.remove();
  }

  const buttons = document.getElementsByClassName("letter");
  Array.from(buttons).forEach((button) => {
    button.disabled = false;
    button.style.opacity = "1";
  });
}

function resetSnowman() {
  Array.from(snowmanParts).forEach((part) => {
    part.style.visibility = "visible";
  });

  document.querySelector(".sunglasses").style.visibility = "hidden";
  document.querySelector("puddle").style.zIndex = "-2";
}

function renderGuess() {
  const guessHtml = guessArr
    .map((char) => `<div class="guess-char">${char}</div>`)
    .join("");
  guessContainer.innerHTML = guessHtml;
}

function checkWin() {
  if (!guessArr.includes("_")) {
    gameOver = true;
    guessContainer.innerHTML = '<div class="message">You Win!</div>';
    document.querySelector(".sunglasses").style.visibility = "visible";

    Array.from(snowmanParts).forEach((part) => {
      part.style.visibility = "visible";
    });

    addNewGameButton();
    return true;
  }
  return false;
}

function checkLose() {
  if (guesses <= 0) {
    gameOver = true;
    guessContainer.innerHTML =
      '<div class="message">You Lose! The word was: ' +
      word.toUpperCase() +
      "</div>";

    Array.from(snowmanParts).forEach((part) => {
      part.style.visibility = "hidden";
    });
    document.querySelector(".puddle").style.zIndex = "1";
    addNewGameButton();
    return true;
  }
  return false;
}

function addNewGameButton() {
  const button = document.createElement("button");
  button.textContent = "New Game";
  button.id = "new-game-btn";
  button.style.cssText = `
        padding: 10px 20px;
        margin: 10px auto;
        display: block;
        background-color: #c03a2b;
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 1.2em;
        cursor: pointer;
    `;
  button.addEventListener("click", initializeGame);
  document.querySelector("main").appendChild(button);
}

function checkGuess(event) {
  if (!event.target.classList.contains("letter") || gameOver) return;

  const letter = event.target.id;

  if (usedLetters.has(letter)) return;

  usedLetters.add(letter);
  event.target.disabled = true;
  event.target.style.opacity = "0.5";

  let foundLetter = false;
  for (let i = 0; i < word.length; i++) {
    if (word[i] === letter) {
      guessArr[i] = letter.toUpperCase();
      foundLetter = true;
    }
  }

  if (!foundLetter) {
    guesses--;

    if (guesses >= 0) {
      snowmanParts[guesses].style.visibility = "hidden";
    }
  }

  renderGuess();

  checkWin() || checkLose();
}

keyboardContainer.addEventListener("click", checkGuess);

initializeGame();

