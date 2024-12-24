/*
codedMessage.js holds a coded message (well, the name makes it obvious, huh?).

**Task**
- Decode the message!

key.md will help!

**Stretch Goal**
No stretch goal for the final day. Just stretch your legs!
*/

import { codedMessage } from "./codedMessage.js";

function binaryToDecimal(binary) {
  return parseInt(binary, 2);
}

function decimalToChar(decimal) {
  return String.fromCharCode(decimal);
}

function decodeMessage(binaryArray) {
  return binaryArray
    .map((binary) => decimalToChar(binaryToDecimal(binary)))
    .join("");
}

function applyKey(decodedMessage) {
  return decodedMessage;
}

const secretMessage = applyKey(decodeMessage(codedMessage));

document.getElementById("revealButton").onclick = function () {
  document.getElementById("modal").style.display = "flex";
  document.getElementById("secretMessage").textContent = secretMessage;
};

document.querySelector(".close").onclick = function () {
  document.getElementById("modal").style.display = "none";
};

window.onclick = function (event) {
  if (event.target == document.getElementById("modal")) {
    document.getElementById("modal").style.display = "none";
  }
};

console.log(secretMessage);
