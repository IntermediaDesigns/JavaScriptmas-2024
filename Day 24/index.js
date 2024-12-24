/*
codedMessage.js holds a coded message (well, the name makes it obvious, huh?).

**Task**
- Decode the message!

key.md will help!

**Stretch Goal**
No stretch goal for the final day. Just stretch your legs!
*/

import { codedMessage } from "./codedMessage.js";

const decodedMessage = codedMessage.map((bin) => {
    let charCode = parseInt(bin, 2) - 10
    if (charCode < 32) {
        charCode += 96
    }
    return String.fromCharCode(charCode)
}).join('')

const secretMessage = decodedMessage;

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
