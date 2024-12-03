/*  Santas Emoji Hack!

During Christmas, Santa wants to ban negative emojis, so when people
use negative emoji shortcodes, he wants positive emojis to appear instead.

In other words, :angry: should result in 🎁 instead of 😠.


*/

const hackedEmojis = {
  angry: "🎁", // 😠
  thumbsdown: "👏", // 👎
  man_facepalming: "🎅", // 🤦‍♂️
  cry: "‍😄", // 😭
  puke: "🤩", // 🤮
};

// Stretch Goal:
const directEmojiMap = {
    "😠": "🎁",
    "👎": "👏",
    "🤦‍♂️": "🎅",
    "😭": "😄",
    "🤮": "🤩",
    "💔": "❤️",
    "🥀": "🌹"
};

/* 1. Write a function that checks if a lowercase word starts and
ends with a colon. If it does, check if it exists in the hackedEmojis object,
and replace it with the corresponding emoji. If not, return the original word.


Example input: ":cry:"
Example output: ‍😄

*/
function emojifyWord(word) {
    // Check if word starts and ends with colon
    if (word.startsWith(":") && word.endsWith(":")) {
        const emojiCode = word.slice(1, -1);
        return hackedEmojis[emojiCode] || word;
    }
    return Array.from(word).map(char => directEmojiMap[char] || char).join('');
}

console.log(emojifyWord(":angry:"));

/* 2. Write a function to find any emoji shortcodes in a phrase.
Use your emojify function from the previous exercise!

Example input: "Just read your article :thumbsdown:"
Example output: "Just read your article 👏"
*/

function emojifyPhrase(phrase) {
  return phrase.split(' ')
  .map(word => emojifyWord(word))
  .join(' ');
}


console.log(emojifyWord(":thumbsdown:")); // 👏
console.log(emojifyPhrase("Just read your article :thumbsdown:")); // Just read your article 👏
console.log(emojifyPhrase("Those shoes :puke:"));
console.log(emojifyPhrase("I'm so :cry: right now"));
console.log(emojifyWord("💔"));

// Stretch goal: don't just replace the shortcodes, but also
// any emojis are added directly to the text.
