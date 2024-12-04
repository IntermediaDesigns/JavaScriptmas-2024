/*
You are going to build an app that challenges players to identify a Christmas Movie from some emoji 🍿 🎅 🎬. The players will have 3 guesses per movie.

For example, the emoji 🌇 💣 👮 ✈️ ️🔫  represent the film “Die Hard”, which everyone knows is the best Christmas movie of all time.

In data.js you have an array of Christmas movies with emoji and text for aria labels.

Your task is to build an app that meets these criteria:

- The app should present the player with a set of emoji selected at random from the array in data.js.

- The player will input their guess.

- If the player guesses correctly, the app should display a message saying "Correct!". Then, after a pause of 3 seconds, it should randomly select the next set of emoji clues and display them to the player.

- If the player’s guess is incorrect, the app should display a message saying “Incorrect! You have 2 more guesses remaining.”

- If the player fails to guess correctly on the next two attempts, the app should display a message saying, `The film was <Film Name Here>!`. After a pause of 3 seconds, it should randomly select a new set of emoji clues and display them to the player.

- When all films in the array have been used, the player should see a message saying "That's all folks!".

- Each film should only be used once. There should be no repetition. 


Stretch Goals

- Use AI to decide if an answer is correct or incorrect. For example if the correct answer is "The Polar Express" but the player inputs "Polar Express" a straight comparison of the two strings will find that the player's answer was incorrect. AI could assess if there is sufficient similarity between the strings to judge it as correct. 

- Improve the UX by disabling the form/button when the game is over and during the pause between questions.
*/

import { films } from "/data.js";

// Some useful elements
const guessInput = document.getElementById("guess-input");
const messageContainer =
  document.getElementsByClassName("message-container")[0];
const emojiCluesContainer = document.getElementsByClassName(
  "emoji-clues-container"
)[0];

let availableFilms = [...films];
let currentFilm = null;
let remainingGuesses = 3;
let isWaiting = false;

function getRandomFilm() {
  const index = Math.floor(Math.random() * availableFilms.length);
  const film = availableFilms[index];
  availableFilms.splice(index, 1);
  return film;
}

function displayFilm(film) {
  emojiCluesContainer.textContent = film.emoji.join(" ");
  emojiCluesContainer.setAttribute("aria-label", film.ariaLabel);
}

function updateMessage(message) {
  messageContainer.textContent = message;
}

function resetGame() {
  if (availableFilms.length === 0) {
    updateMessage("That's all folks!");
    guessInput.querySelector("button").disabled = true;
    guessInput.querySelector("input").disabled = true;
    return;
  }

  currentFilm = getRandomFilm();
  remainingGuesses = 3;
  displayFilm(currentFilm);
  updateMessage("You have 3 guesses remaining.");
  guessInput.querySelector("input").value = "";
}

function handleGuess(guess) {
  if (isWaiting || !currentFilm) return;

  const normalizedGuess = guess.toLowerCase().trim();
  const normalizedAnswer = currentFilm.title.toLowerCase();

  if (normalizedGuess === normalizedAnswer) {
    isWaiting = true;
    updateMessage("Correct!");
    setTimeout(() => {
      isWaiting = false;
      resetGame();
    }, 3000);
  } else {
    remainingGuesses--;
    if (remainingGuesses > 0) {
      updateMessage(
        `Incorrect! You have ${remainingGuesses} more ${
          remainingGuesses === 1 ? "guess" : "guesses"
        } remaining.`
      );
    } else {
      isWaiting = true;
      updateMessage(`The film was ${currentFilm.title}!`);
      setTimeout(() => {
        isWaiting = false;
        resetGame();
      }, 3000);
    }
  }
}

guessInput.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = e.target.querySelector("input");
  handleGuess(input.value);
});

resetGame();
