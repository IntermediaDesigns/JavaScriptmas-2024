// const elfFirstNames = [
//   "Aurora",
//   "Blitzen",
//   "Crispin",
//   "Dazzle",
//   "Evergreen",
//   "Frost",
//   "Glimmer",
//   "Holly",
//   "Icicle",
//   "Joyful",
//   "Kringle",
//   "Luna",
//   "Merry",
//   "Nutmeg",
//   "Olwen",
//   "Pine",
//   "Quill",
//   "Razzle",
//   "Sparkle",
//   "Tinsel",
//   "Umbra",
//   "Vixen",
//   "Whisk",
//   "Xylo",
//   "Yule",
//   "Zippy",
// ];

// const elfLastNames = [
//   "Applecheeks",
//   "Bells",
//   "Candycane",
//   "Dazzlebright",
//   "Everbright",
//   "Frostwhisk",
//   "Gingersnap",
//   "Hollyberry",
//   "Icestorm",
//   "Jovial",
//   "Kindleflame",
//   "Lightwhisper",
//   "Merrysprout",
//   "Nutcracker",
//   "Oakenleaf",
//   "Peppermint",
//   "Quicksilver",
//   "Raindrop",
//   "Snowdust",
//   "Twinkletoes",
//   "Underwood",
//   "Velvet",
//   "Winterberry",
//   "Xylospark",
//   "Yuletide",
//   "Zestwind",
// ];

/*
 * 🎅 Task:
 * - Generate an elf first and last name that matches the user’s first and last name initials, then display it on the screen.
 * - Example: if the user’s name is "John Doe," the elf name could be "Joyful Dazzle."
 * - Display the generated elf names in the "Registered Employees" list.
 */

/*
 * 🌟 Stretch Goals:
 * - Generate the elf names using an LLM API (like HuggingFace).
 * - Don't save the same name twice. (not necessary for the normal task)
 * - Make sure to use Scrimba's environment variables feature so you don't expose your API key
 */

// Elf name data
const nameData = {
  first: {
    A: ["Aurora", "Astra", "Alarin", "Aether"],
    B: ["Blitzen", "Bright", "Briar", "Bloom"],
    C: ["Crispin", "Crystal", "Celeste", "Charm"],
    D: ["Dazzle", "Dream", "Dawn", "Dewdrop"],
    E: ["Evergreen", "Echo", "Ember", "Elm"],
    F: ["Frost", "Fae", "Flare", "Forest"],
    G: ["Glimmer", "Glow", "Grace", "Gleam"],
    H: ["Holly", "Heart", "Haven", "Haze"],
    I: ["Icicle", "Iris", "Isle", "Ivory"],
    J: ["Joyful", "Jade", "Juniper", "Jazz"],
    K: ["Kringle", "Knight", "Keen", "Kindle"],
    L: ["Luna", "Light", "Leaf", "Lark"],
    M: ["Merry", "Moon", "Maple", "Mist"],
    N: ["Nutmeg", "North", "Noble", "Night"],
    O: ["Olwen", "Oak", "Ocean", "Opal"],
    P: ["Pine", "Pearl", "Petal", "Pixie"],
    Q: ["Quill", "Quest", "Quick", "Quiet"],
    R: ["Razzle", "Rose", "River", "Rain"],
    S: ["Sparkle", "Star", "Snow", "Song"],
    T: ["Tinsel", "Tide", "True", "Tale"],
    U: ["Umbra", "Unity", "Urban", "Under"],
    V: ["Vixen", "Vale", "Vine", "Valor"],
    W: ["Whisk", "Wind", "Wave", "Wish"],
    X: ["Xylo", "Xen", "Xara", "Xyle"],
    Y: ["Yule", "Year", "Yarn", "Youth"],
    Z: ["Zippy", "Zephyr", "Zen", "Zest"],
  },
  last: {
    A: ["Applecheeks", "Amberlight", "Arcweaver", "Astralbreeze"],
    B: ["Bells", "Brightspear", "Berrytwist", "Blessedwish"],
    C: ["Candycane", "Crystallight", "Cozyfire", "Cloudwhisper"],
    D: ["Dazzlebright", "Dreamweaver", "Dawnspell", "Dewkeeper"],
    E: ["Everbright", "Elfstone", "Emberwind", "Earthsong"],
    F: ["Frostwhisk", "Fairlight", "Flamekeeper", "Forestwing"],
    G: ["Gingersnap", "Glowspell", "Graceheart", "Goldleaf"],
    H: ["Hollyberry", "Heartweaver", "Hopelight", "Honeyspice"],
    I: ["Icestorm", "Illustrious", "Ironweave", "Inkspell"],
    J: ["Jovial", "Jadewind", "Jinglebell", "Jewelshine"],
    K: ["Kindleflame", "Knightstar", "Keenwish", "Kindheart"],
    L: ["Lightwhisper", "Leafshine", "Lunarweave", "Lovespell"],
    M: ["Merrysprout", "Moonbeam", "Mistweaver", "Magicborn"],
    N: ["Nutcracker", "Nightwind", "Nobleheart", "Naturewise"],
    O: ["Oakenleaf", "Orbweaver", "Oceanspray", "Opallight"],
    P: ["Peppermint", "Pixiedust", "Petalwind", "Pureheart"],
    Q: ["Quicksilver", "Quillweaver", "Quietbrook", "Questwind"],
    R: ["Raindrop", "Roselight", "Riverwind", "Rootweaver"],
    S: ["Snowdust", "Starweaver", "Sweetspice", "Silverwind"],
    T: ["Twinkletoes", "Truestar", "Tideweaver", "Thunderheart"],
    U: ["Underwood", "Unityspell", "Uniquewind", "Utterlight"],
    V: ["Velvet", "Valewind", "Vineweaver", "Valorbright"],
    W: ["Winterberry", "Wishweaver", "Windwhisper", "Wildlight"],
    X: ["Xylospark", "Xenonlight", "Xanderwind", "Xylophene"],
    Y: ["Yuletide", "Yearning", "Yonderlight", "Youngspell"],
    Z: ["Zestwind", "Zenithstar", "Zephyrweave", "Zeallight"],
  },
};

// Store generated names
const generatedNames = [];

// Helper function to get random item from array
function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Function to get matching name
function getMatchingName(initial, type) {
  initial = initial.toUpperCase();
  const names = nameData[type][initial] || nameData[type]["S"]; // Default to 'S' if no match
  return getRandomItem(names);
}

// Function to generate elf name
function generateElfName() {
  const firstNameInput = document.querySelector('input[name="first-name"]');
  const lastNameInput = document.querySelector('input[name="last-name"]');

  const firstName = firstNameInput?.value?.trim() || "";
  const lastName = lastNameInput?.value?.trim() || "";

  if (!firstName || !lastName) {
    alert("Please enter both first and last names!");
    return;
  }

  const elfFirst = getMatchingName(firstName[0], "first");
  const elfLast = getMatchingName(lastName[0], "last");
  const elfName = `${elfFirst} ${elfLast}`;

  if (!generatedNames.includes(elfName)) {
    generatedNames.push(elfName);
  }

  // Update display
  const displayEl = document.getElementById("elf-name-display");
  if (displayEl) displayEl.textContent = elfName;

  // Update list
  const listEl = document.getElementById("elf-names-list");
  if (listEl) {
    listEl.innerHTML = generatedNames.length
      ? generatedNames.map((name) => `<li>${name}</li>`).join("")
      : "<li>Seems empty...</li>";
  }

  // Clear inputs
  firstNameInput.value = "";
  lastNameInput.value = "";
}

// Add event listener when DOM is ready
window.addEventListener("DOMContentLoaded", () => {
  const generateBtn = document.getElementById("generate-btn");
  if (generateBtn) {
    generateBtn.addEventListener("click", generateElfName);
  }
});
