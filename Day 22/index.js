/*
Writing out labels by hand is a real pain. Luckily, you are so organised that you have all of your contacts saved in an array.

But not all of your contacts are on your Christmas list. So your task is this:

** Task **
1. Render a label for each entry in the address book, but only if isOnChistmasList is set to true! The label should contain the recipient's name and address.
2. Decorate the label with two festive icons from the icons folder. Use whatever colour scheme and layout you think looks good!

** Stretch goals **
1. Ensure that the label does not get two of the same icon.
2. Create your own CSS Christmas logo to add a personal touch to each label.
*/
import { addresses } from "./addresses.js";

const labelsContainer = document.querySelector(".labels-container");
const generateButton = document.querySelector(".generate");

const backgrounds = [
  "./images/label1.png",
  "./images/label2.png",
  "./images/label3.png",
  "./images/label4.png",
  "./images/label5.png",
];

const icons = [
  "bauble.png",
  "bow.png",
  "candy-cane.png",
  "deer.png",
  "gifts.png",
  "gingerbread-man.png",
  "santa-hat.png",
  "santa.png",
  "snowflake.png",
  "snowglobe.png",
  "snowman.png",
  "star-bauble.png",
  "star.png",
  "stocking.png",
  "tree.png",
  "trees.png",
  "wreath.png",
];

let backgroundUsage = {};

const getRandomBackground = () => {
  console.log("Current background usage:", { ...backgroundUsage });

  const needsReset = Object.values(backgroundUsage).every(
    (count) => count >= 3
  );
  if (needsReset) {
    console.log("Resetting background usage counts");
    backgroundUsage = {};
  }

  const availableBackgrounds = backgrounds.filter(
    (bg) => !backgroundUsage[bg] || backgroundUsage[bg] < 3
  );

  console.log("Available backgrounds:", availableBackgrounds);

  if (availableBackgrounds.length === 0) {
    console.warn("No available backgrounds, resetting counts");
    backgroundUsage = {};
    return getRandomBackground();
  }

  const selectedBg =
    availableBackgrounds[
      Math.floor(Math.random() * availableBackgrounds.length)
    ];

  backgroundUsage[selectedBg] = (backgroundUsage[selectedBg] || 0) + 1;
  console.log(
    `Selected ${selectedBg}, new count:`,
    backgroundUsage[selectedBg]
  );

  return selectedBg;
};

const getRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const getTwoUniqueIcons = () => {
  const firstIcon = getRandomItem(icons);
  let secondIcon;
  do {
    secondIcon = getRandomItem(icons);
  } while (secondIcon === firstIcon);

  return [firstIcon, secondIcon];
};

const createLabel = (person) => {
  const label = document.createElement("div");
  label.className = "label";

  const bgImage = document.createElement("img");
  bgImage.src = getRandomBackground();
  bgImage.className = "label-bg";
  label.appendChild(bgImage);

  const content = document.createElement("div");
  content.className = "label-content";

  const [icon1, icon2] = getTwoUniqueIcons();

  const nameSection = document.createElement("div");
  nameSection.className = "label-name";

  const iconImg1 = document.createElement("img");
  iconImg1.src = `./icons/${icon1}`;
  iconImg1.className = "label-icon";

  const nameText = document.createElement("span");
  nameText.textContent = person.name;

  const iconImg2 = document.createElement("img");
  iconImg2.src = `./icons/${icon2}`;
  iconImg2.className = "label-icon";

  nameSection.append(iconImg1, nameText, iconImg2);

  const address = document.createElement("div");
  address.className = "label-address";
  address.innerHTML = `
    ${person["address line 1"]}<br>
    ${person.town}, ${person.state},
    ${person.country}
  `;

  const logo = document.createElement("img");
  logo.src = "./images/logo.png";
  logo.className = "label-logo";
  logo.alt = "Logo";

  content.append(nameSection, address);
  label.appendChild(content);
  label.appendChild(logo);

  return label;
};

const generateLabels = () => {
  console.log("Generating new labels...");
  labelsContainer.innerHTML = "";

  backgroundUsage = {};

  addresses
    .filter((person) => person.isOnChristmasList)
    .forEach((person) => {
      const label = createLabel(person);
      labelsContainer.appendChild(label);
    });

  console.log("Final background usage:", { ...backgroundUsage });
};

generateButton.addEventListener("click", generateLabels);
