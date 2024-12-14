/*
The cool people of Lapland are bored of traditional social media and have decided to build their own app called Northagram...and they need your help!

This is how the app should work:
- It displays circular avatars of the friends who have uploaded pictures lately. These avatars have a white border.
- Underneath, it cycles through the friends' pictures displaying each for 1.5 seconds. (There's an animated snowman loading state before pictures load.)
- While a friend's pictures are being displayed, that friend's avatar gets a red border.
- This red border reverts to white when their pictures have finished being displayed.
- When all of the images have been displayed, the user should see a message "Refresh to load latest images". All avatars should have a white border at this point.

Stretch Goals for dedicated Social Media Engineers

- Add captions to the images.
- Refactor your code to use generators!
- Grey out the avatar after that friend's pictures have been displayed.
- Make it so clicking on an image pauses the timer.
- Add left and right arrow overlays to the image so users can scroll back and forth.
*/

import { feedData } from "./data.js";

let isPaused = false;
let intervalId = null;
let viewedUsers = new Set();
let feedGenerator = null;
let currentState = null;

const avatarsSection = document.querySelector(".feed-avatars");
const imagesSection = document.querySelector(".feed-images");

function* createFeedGenerator() {
  for (let userIndex = 0; userIndex < feedData.length; userIndex++) {
    const user = feedData[userIndex];
    for (let imageIndex = 0; imageIndex < user.features.length; imageIndex++) {
      yield { userIndex, imageIndex };
    }
    viewedUsers.add(user.handle);
  }
}

function* createReverseFeedGenerator(currentUserIndex, currentImageIndex) {
  for (let userIndex = currentUserIndex; userIndex >= 0; userIndex--) {
    const user = feedData[userIndex];
    const startImage =
      userIndex === currentUserIndex
        ? currentImageIndex - 1
        : user.features.length - 1;

    for (let imageIndex = startImage; imageIndex >= 0; imageIndex--) {
      yield { userIndex, imageIndex };
    }
  }
}

function renderAvatars() {
  avatarsSection.innerHTML = feedData
    .map(
      (user, index) => `
                <img 
                    src="./images/${user.avatarUrl}" 
                    alt="${user.handle}" 
                    class="avatar ${
                      index === currentState.userIndex ? "highlight" : ""
                    } 
                          ${viewedUsers.has(user.handle) ? "viewed" : ""}"
                >
            `
    )
    .join("");
}

function renderImage() {
  if (!currentState || currentState.userIndex >= feedData.length) {
    showEndMessage();
    return;
  }

  const currentUser = feedData[currentState.userIndex];
  const currentImage = currentUser.features[currentState.imageIndex];

  imagesSection.innerHTML = `
        <div class="image-container">
            <img 
                src="./images/${currentImage.imageUrl}" 
                alt="Photo by ${currentUser.handle}: ${currentImage.alt}" 
                class="feature-image"
            >
            <div class="caption">
                <p>${currentImage.alt}</p> 
            </div>
            <button class="nav-button prev" aria-label="Previous image">←</button>
            <button class="nav-button next" aria-label="Next image">→</button>
        </div>
    `;

  const imageContainer = imagesSection.querySelector(".image-container");
  imageContainer.addEventListener("click", togglePause);

  const prevButton = imagesSection.querySelector(".nav-button.prev");
  const nextButton = imagesSection.querySelector(".nav-button.next");

  prevButton.addEventListener("click", (e) => {
    e.stopPropagation();
    previousImage();
  });

  nextButton.addEventListener("click", (e) => {
    e.stopPropagation();
    nextImage();
  });
}

function showEndMessage() {
  clearInterval(intervalId);
  intervalId = null;

  imagesSection.innerHTML = `
        <div class="end-message">
            <p class="ux-message">All caught up! Start again?</p>
            <button class="refresh-button" aria-label="Refresh feed">
                <img src="./images/refresh.png" alt="Refresh" class="refresh-icon">
            </button>
        </div>
    `;

  const refreshButton = imagesSection.querySelector(".refresh-button");
  refreshButton.addEventListener("click", refreshFeed);
}

function refreshFeed() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }

  isPaused = false;
  viewedUsers = new Set();
  feedGenerator = createFeedGenerator();
  currentState = null;

  init();
}

function previousImage() {
  if (!currentState) return;

  const reverseGenerator = createReverseFeedGenerator(
    currentState.userIndex,
    currentState.imageIndex
  );
  const prevState = reverseGenerator.next();

  if (!prevState.done) {
    currentState = prevState.value;
    renderImage();
    renderAvatars();
  }
}

function nextImage() {
  const nextState = feedGenerator.next();

  if (!nextState.done) {
    currentState = nextState.value;
    renderImage();
    renderAvatars();
  } else {
    showEndMessage();
  }
}

function togglePause(event) {
  if (event.target.classList.contains("feature-image")) {
    isPaused = !isPaused;
    if (isPaused) {
      clearInterval(intervalId);
      intervalId = null;
    } else {
      startImageRotation();
    }
  }
}

function startImageRotation() {
  if (intervalId) {
    clearInterval(intervalId);
  }

  if (!isPaused) {
    intervalId = setInterval(() => {
      nextImage();
    }, 1500);
  }
}

function init() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }

  imagesSection.innerHTML = `<div class="ux-loading" role="status">☃️☃️☃️</div>`;

  feedGenerator = createFeedGenerator();

  setTimeout(() => {
    nextImage();
    startImageRotation();
  }, 1500);
}

init();
