/**
 *🎄 Requirements:
 * - This is a classic "Find the Pair" game with a christmas theme.
 * - The player should be able to reveal cards by clicking on them.
 * - When the player reveals one card, it should stay revealed until a second card is revealed.
 * - When the player reveals two cards:
 *   - If they are the same, they should remain revealed for the rest of the game.
 *   - If they are different, they should be flipped back to hidden.
 * - The cards should be shuffled at the start of each game.
 */

/**
 * 🎅 Stretch Goals:
 * - Add a point system where points are awarded for each correctly revealed pair
 *   and deducted for each incorrect pair (you decide the exact points for each action).
 * - Implement a high-score system using the browser's local storage.
 * - Add a "Restart Game" button that appears when the game ends so the user can start over.
 */

let firstCard = null;
let secondCard = null;
let score = 0;
let canFlip = true;
let matchedPairs = 0;

const emojis = ["🎄", "🎁", "🎅", "☃️", "🦌", "🔔", "⭐", "🕯️"]; // Your set of emojis

const createBoard = () => {
  const pairs = [...emojis, ...emojis];
  return shuffle(pairs);
};

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const initializeGame = () => {
  const gameBoard = document.getElementById("game-board");
  const cards = createBoard();
  score = 0;
  matchedPairs = 0;
  updateScore();

  gameBoard.innerHTML = cards
    .map(
      (emoji, index) => `
        <div class="card" data-card-id="${index}" data-emoji="${emoji}">
            <div class="card-front">❄️</div>
            <div class="card-back">${emoji}</div>
        </div>
    `
    )
    .join("");

  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => handleCardClick(card));
  });
};

const handleCardClick = async (card) => {
  if (!canFlip || card.classList.contains("revealed") || card === firstCard)
    return;

  card.classList.add("revealed");
  await playFlipSound();

  if (!firstCard) {
    firstCard = card;
  } else {
    secondCard = card;
    canFlip = false;
    checkMatch();
  }
};

const checkMatch = () => {
  const firstEmoji = firstCard.dataset.emoji;
  const secondEmoji = secondCard.dataset.emoji;

  if (firstEmoji === secondEmoji) {
    handleMatch();
  } else {
    handleMismatch();
  }
};

const handleMatch = () => {
  playMatchSound();
  score += 10;
  matchedPairs++;
  updateScore();

  firstCard.classList.add("matched");
  secondCard.classList.add("matched");

  resetTurn();

  if (matchedPairs === emojis.length) {
    setTimeout(() => {
      handleGameEnd();
    }, 500);
  }
};

const handleMismatch = () => {
  score = Math.max(0, score - 5);
  updateScore();

  setTimeout(() => {
    firstCard.classList.remove("revealed");
    secondCard.classList.remove("revealed");
    resetTurn();
  }, 1000);
};

const resetTurn = () => {
  firstCard = null;
  secondCard = null;
  canFlip = true;
};

const handleGameEnd = () => {
    const highScore = getHighScore();
    if (score > highScore) {
      setHighScore(score);
      showMessage(`🎉 New High Score: <span class="end-score">${score}</span> points! 🎉`);
    } else {
      showMessage(`Game Complete! Score: <span class="end-score">${score}</span> points`);
    }
    showRestartButton();
  };

const updateScore = () => {
  let scoreElement = document.getElementById("score");
  if (!scoreElement) {
    scoreElement = document.createElement("div");
    scoreElement.id = "score";
    document.querySelector("h1").after(scoreElement);
  }
  scoreElement.innerHTML = `
    <span class="score-label">Score:</span> ${score} |
    <span class="highscore-label">High Score:</span> ${getHighScore()}
  `;
};

const getHighScore = () => {
  return parseInt(localStorage.getItem("christmasMatchHighScore")) || 0;
};

const setHighScore = (score) => {
  localStorage.setItem("christmasMatchHighScore", score);
};

const showMessage = (message) => {
    const messageElement = document.createElement("div");
    messageElement.className = "message";
    messageElement.innerHTML = message;
    document.querySelector("h1").after(messageElement);
  };

const showRestartButton = () => {
  const button = document.createElement("button");
  button.textContent = "🎄 Play Again 🎄";
  button.className = "restart-button";
  button.onclick = () => {
    document.querySelector(".message")?.remove();
    button.remove();
    initializeGame();
  };
  document.querySelector("h1").after(button);
};

const playFlipSound = () => {
  return new Promise((resolve) => {
    const audio = new Audio("flipcard.mp3");
    audio.volume = 0.2;
    audio
      .play()
      .then(() => {
        // Wait for flip sound to finish
        audio.addEventListener("ended", () => resolve());
      })
      .catch(() => resolve()); // Resolve even if sound fails to play
  });
};

const playMatchSound = () => {
  const audio = new Audio("jinglebells.mp3");
  audio.volume = 0.3;
  audio.play().catch(() => {});
};

window.addEventListener("load", initializeGame);
