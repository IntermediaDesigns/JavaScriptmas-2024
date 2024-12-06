const snowGlobe = document.querySelector(".snow-globe");
const snowContainer = document.querySelector(".snow-container");
const snowGlobeBase = document.querySelector(".snow-globe-base");
const ONE_MINUTE = 60000;
let timeElapsed = 0;
let isSnowing = false;
let snowInterval;
let currentInterval = 100;
let slowdownInterval;

const shakeButton = document.createElement("button");
shakeButton.textContent = "Shake";
shakeButton.classList.add("shake-button");
shakeButton.addEventListener("click", toggleSnow);
document.querySelector(".snow-globe-base").appendChild(shakeButton);

function createSnowflake() {
  const snowflake = document.createElement("div");
  snowflake.classList.add("snowflake");

  const size = Math.random() * (20 - 10) + 10;
  const startingX = Math.random() * 380;
  const duration = Math.random() * (8 - 3) + 3;
  const direction = Math.random() < 0.3 ? Math.random() * 40 - 20 : 0;
  const isDiagonal = Math.random() < 0.3;
  const horizontalMove = isDiagonal ? (direction > 0 ? 50 : -50) : 0;

  snowflake.style.fontSize = `${size}px`;
  snowflake.style.width = `${size}px`;
  snowflake.style.left = `${startingX}px`;
  snowflake.style.animationDuration = `${duration}s`;
  snowflake.style.animationDirection = `${direction}deg`;

  if (isDiagonal) {
    snowflake.style.setProperty("--end-x", `${horizontalMove}px`);
    snowflake.classList.add("diagonal");
  }

  const flakeTypes = ["❄️", "❅", "❆", "⛇"];
  snowflake.textContent =
    flakeTypes[Math.floor(Math.random() * flakeTypes.length)];

  snowflake.addEventListener("animationend", () => {
    snowflake.remove();
  });
  snowGlobe.appendChild(snowflake);

  /*
Challenge:
1. Write JavaScript to create a snowflake and make it fall inside the snow globe. The snowflake should have a random starting position, animation duration, and size.
2. See index.css
*/
}

function graduallyStopSnow() {
  timeElapsed += 1000; // Increment by 1 second
  currentInterval += 50;
  clearInterval(snowInterval);

  if (timeElapsed >= ONE_MINUTE) {
    clearInterval(slowdownInterval);
    stopSnowing();
    return;
  }

  snowInterval = setInterval(createSnowflake, currentInterval);
}

function stopSnowing() {
  clearInterval(snowInterval);
  clearInterval(slowdownInterval);
  currentInterval = 100;
  timeElapsed = 0;
  isSnowing = false;
  shakeButton.textContent = "Shake";

  const snowflakes = document.querySelectorAll(".snowflake");
  snowflakes.forEach((flake) => flake.remove());
}

function toggleSnow() {
  if (!isSnowing) {
    snowContainer.classList.add("shake");
    setTimeout(() => {
      snowContainer.classList.remove("shake");
      snowInterval = setInterval(createSnowflake, currentInterval);
      slowdownInterval = setInterval(graduallyStopSnow, 1000);
      shakeButton.textContent = "Stop";
      timeElapsed = 0;
    }, 1000);
    isSnowing = true;
  } else {
    stopSnowing();
  }
}

shakeButton.addEventListener("click", toggleSnow);

/* Stretch goals:
- Give some variety to your snowflakes, so they are not all the same. Perhaps every 25th one could be a snowman ☃️?
- Remove each snowflake after a set time - this will stop the scene from being lost in a blizzard!
- Add a button that makes the snow start falling, it could trigger a CSS-animated shake of the snow globe. Then make the snow become less frequent until it slowly stops - until the button is pressed again.
- Change the direction of the snowflakes so they don’t all fall vertically.
- Make the style your own!
*/
