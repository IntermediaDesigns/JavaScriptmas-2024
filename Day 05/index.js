/* 
This Christmas, you’ve been tasked with running an anagram quiz at 
the family gathering.

You have been given a list of anagrams, but you suspect that some 
of the anagram pairs might be incorrect.

Your job is to write a JavaScript function to loop through the array
and filter out any pairs that aren’t actually anagrams.

For this challenge, spaces will be ignored, so "Be The Helm" would 
be considered a valid anagram of "Bethlehem".
*/

let anagrams = [
  ["Can Assault", "Santa Claus"],
  ["Refreshed Erudite Londoner", "Rudolf the Red Nose Reindeer"],
  ["Frosty The Snowman", "Honesty Warms Front"],
  ["Drastic Charms", "Christmas Cards"],
  ["Congress Liar", "Carol Singers"],
  ["The Tin Glints", "Silent Night"],
  ["Be The Helm", "Betlehem"],
  ["Is Car Thieves", "Christmas Eve"],
  // Add more pairs here
  ["Present Wrapping", "Preparing Spawn"],
  ["Winter Tales", "Silent Water"],
  ["Christmas Tree", "Search Mister"],
  ["Holiday Presents", "Displayed Hearts"],
  ["Presents Here", "Present Sheer"],
  ["Festive Cheer", "Receive Hefts"],
  ["Merry Times", "Rest Me Try"],
  ["Star Lights", "Last Rights"],
];

function findAnagrams(array) {
  // write your code here
  const normalizeStr = (str) =>
    str.replace(/\s/g, "").toLowerCase().split("").sort().join("");

  return array.filter(([str1, str2]) => {
    const normalized1 = normalizeStr(str1);
    const normalized2 = normalizeStr(str2);
    return normalized1 === normalized2;
  });
}

console.log(findAnagrams(anagrams));

const validAnagrams = findAnagrams(anagrams);
console.log("Valid anagrams found:", validAnagrams.length);
validAnagrams.forEach(pair => console.log(pair[0], "<==>", pair[1]));