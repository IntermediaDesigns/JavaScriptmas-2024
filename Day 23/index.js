/*
Santa has been hacked! In the list of kids to deliver to, the Grinch has replaced some kids' names with his own name.

The original array looked like this: 
['James', 'Yi', 'Florinda', 'Fatima', 'Tariq', 'Jose', 'Clare', 'Gibbs']

**Task** 
Remove 'Grinch' from santasArr and put the missing kids back in their original places!

**Stretch goal**
- Do this without creating a new array and using no array methods other than .forEach().
*/

const santasArr = [
  "James",
  "Yi",
  "Grinch",
  "Fatima",
  "Tariq",
  "Grinch",
  "Clare",
  "Grinch",
];
const missingNamesArr = ["Florinda", "Jose", "Gibbs"];

const originalList = document.querySelector("#original ul");
santasArr.forEach((name) => {
  const li = document.createElement("li");
  li.textContent = name;
  originalList.appendChild(li);
});

let missingNameIndex = 0;

santasArr.forEach((name, index) => {
  if (name === "Grinch") {
    santasArr[index] = missingNamesArr[missingNameIndex];
    missingNameIndex++;
  }
});

const fixedList = document.querySelector("#fixed ul");
santasArr.forEach((name) => {
  const li = document.createElement("li");
  li.textContent = name;
  fixedList.appendChild(li);
});

console.log(santasArr);
// Expected Output: ['James', 'Yi', 'Florinda', 'Fatima', 'Tariq', 'Jose', 'Clare', 'Gibbs']
