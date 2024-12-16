/*
Santa has grown suspicious that one of his elves isn't playing fair. The elves are paid well to make toys but Santa thinks one of the elves is keeping some of the toys he has made (and probably selling them on the black market in one of Laplands dodgier neighbourhoods.)

Santa has written a script to recursively look over the data and find discrepancies. But Santa is not so great at coding and he has got bugs he can't resolve.

This code should:
 - Traverse through all elves.
 - Traverse toysShipped, summing up toy counts across regions and subregions.
 - Compare the aggregated counts with toysMade to determine discrepancies.
But it doesn't!

Your task: debug this code - there are two bugs to find!

Stretch Goal

- Recursion is hard! Delete everything in index.js and start again from scratch. You don't have to do it the same way. Perhaps you can find a better way.
*/

// Function to find the elf who created more presents than they delivered
import { workshopData } from "./data.js";

function findNaughtyElf(data) {
  const naughtyElves = [];

  data.forEach((elf) => {
    const totalShipped = {};

    function sumToys(shipmentData) {
      for (const region in shipmentData) {
        const subRegion = shipmentData[region];
        if (Array.isArray(subRegion)) {
          subRegion.forEach(({ toy, count }) => {
            totalShipped[toy] = (totalShipped[toy] || 0) + count;
          });
        } else if (typeof subRegion === "object") {
          sumToys(subRegion);
        }
      }
    }

    sumToys(elf.toysShipped);

    for (const toy in elf.toysMade) {
      if (elf.toysMade[toy] > (totalShipped[toy] || 0)) {
        naughtyElves.push(elf.name);
        break;
      }
    }
  });

  return naughtyElves;
}

function createElfCards() {
  const elfGrid = document.getElementById("elf-grid");

  workshopData.forEach((elf) => {
    const card = document.createElement("div");
    card.className = "elf-card";
    card.id = `elf-${elf.name.replace(/\s+/g, "-").toLowerCase()}`;

    const toysList = Object.entries(elf.toysMade)
      .map(([toy, count]) => `${toy}: ${count}`)
      .join("<br>");

    card.innerHTML = `
      <img src="${elf.image}" alt="${elf.name}" class="elf-image">
      <h3 class="elf-name">${elf.name}</h3>
      <div class="toys-made">
        <p>Toys Made:</p>
        ${toysList}
      </div>
    `;

    elfGrid.appendChild(card);
  });
}

function handleInvestigation() {
  const naughtyElves = findNaughtyElf(workshopData);
  const resultDiv = document.getElementById("result");

  // Reset all cards
  document.querySelectorAll(".elf-card").forEach((card) => {
    card.classList.remove("naughty", "good");
  });

  if (naughtyElves.length > 0) {
    // Mark naughty and good elves
    document.querySelectorAll(".elf-card").forEach((card) => {
      if (
        naughtyElves.some(
          (name) => card.id === `elf-${name.replace(/\s+/g, "-").toLowerCase()}`
        )
      ) {
        card.classList.add("naughty");
      } else {
        card.classList.add("good");
      }
    });

    resultDiv.textContent = `Naughty elf detected: ${naughtyElves.join(", ")}`;
    resultDiv.classList.add("show", "has-naughty");
    resultDiv.classList.remove("all-good");
  } else {
    // All elves are good
    document.querySelectorAll(".elf-card").forEach((card) => {
      card.classList.add("good");
    });

    resultDiv.textContent = "All elves are working honestly!";
    resultDiv.classList.add("show", "all-good");
    resultDiv.classList.remove("has-naughty");
  }
}

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  createElfCards();
  document
    .getElementById("investigate-btn")
    .addEventListener("click", handleInvestigation);
});
