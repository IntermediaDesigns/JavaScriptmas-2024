/*
    You're shopping for holiday gifts, but money is tight
    so we need to consider the cheapest items first.
    Use JavaScript's built-in array sort() (or toSorted()) method to
    write a function that returns an array of products sorted
    by price, cheapest to most expensive.

    Log the sorted array to the console to double-check you
    solved it correctly.
*/

/**
 * Stretch goals:
 *
 * 1. Log the items to the console in a more formatted way,
 *    like this (one item per line):
 *
 *    💕: $0
 *    🍬: $0.49
 *    🍫: $0.99
 *    🍭: $1.99
 *    🧁: $2.99
 *    ...etc.
 *
 * 2. Create a UI for this by displaying the unsorted items first, then
 *    having a button that will sort the items on the page by price.
 */

import shoppingList from "./shoppingList.js";

function sortProducts(list) {
  return list.toSorted((a, b) => a.price - b.price);
}

function displayFormattedList(list) {
  list.forEach((item) => {
    console.log(`${item.product}: $${item.price.toFixed(2)}`);
  });
}

// Basic sort functionality
const listByCheapest = sortProducts(shoppingList);
console.log("Sorted list:", listByCheapest);

// Stretch goal 1: Formatted console output
console.log("\nFormatted list:");
displayFormattedList(listByCheapest);

// UI Implementation
function createListItem(item) {
  const itemElement = document.createElement("div");
  itemElement.className = "item";

  const product = document.createElement("span");
  product.className = "product";
  product.textContent = item.product;

  const price = document.createElement("span");
  price.className = "price";
  price.textContent = `$${item.price.toFixed(2)}`;

  itemElement.appendChild(product);
  itemElement.appendChild(price);

  return itemElement;
}

function renderItems(items) {
  const listContainer = document.getElementById("listContainer");
  listContainer.innerHTML = "";
  items.forEach((item) => {
    listContainer.appendChild(createListItem(item));
  });
}

// Initialize the UI
function initializeUI() {
  renderItems(shoppingList);

  const sortButton = document.getElementById("sortButton");
  let isSorted = false;

  sortButton.addEventListener("click", () => {
    if (!isSorted) {
      renderItems(sortProducts(shoppingList));
      sortButton.textContent = "Show Original List";
    } else {
      renderItems(shoppingList);
      sortButton.textContent = "Sort by Price";
    }
    isSorted = !isSorted;
  });
}

initializeUI();

export default sortProducts;
