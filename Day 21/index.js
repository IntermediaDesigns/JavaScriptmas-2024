/*
The run up to Christmas is quite a data-intensive time for Santa. In order to understand market trends, Santa's Data Elves have collated sample children’s wish list data from 4 locations and now need to know which was the most popular toy requested overall. This will help with procurement for next year.

**Task**
- Your task is to find the most requested toy from the array of objects “toysRequested”. But remember: some toys appear in more than one location!

Expected output: "The most popular toy is 🎲 board games with 9000 requests.""

**Stretch Goal**
- Complete this challenge using the .flatMap() method to work with the various "toys" arrays.

*/

import { toysRequested } from "./data.js";

// Calculate total toys requested per type
function calculateTotalsByToy(locationFilter = "") {
  const totals = {};
  const locations = locationFilter
    ? [toysRequested.find((l) => l.location === locationFilter)]
    : toysRequested;

  locations.forEach((location) => {
    location.toys.forEach((toy) => {
      const [toyName, amount] = Object.entries(toy)[0];
      totals[toyName] = (totals[toyName] || 0) + amount;
    });
  });
  return totals;
}

// Find most popular toy
function findMostPopularToy(totals) {
  const [toyName, amount] = Object.entries(totals).reduce((max, curr) =>
    curr[1] > max[1] ? curr : max
  );
  return { toyName, amount };
}

// Create bar chart
function createBarChart(totals) {
  const chart = document.getElementById("toy-chart");
  chart.innerHTML = "";

  const maxValue = Math.max(...Object.values(totals));

  Object.entries(totals).forEach(([toy, amount]) => {
    const bar = document.createElement("div");
    bar.className = "bar";
    const height = (amount / maxValue) * 100;
    bar.style.height = `${height}%`;

    const label = document.createElement("div");
    label.className = "bar-label";
    label.textContent = toy;

    const value = document.createElement("div");
    value.className = "bar-value";
    value.textContent = amount;

    bar.appendChild(label);
    bar.appendChild(value);
    chart.appendChild(bar);
  });
}

// Update dashboard based on location
function updateDashboard(location) {
  const totals = calculateTotalsByToy(location);
  createBarChart(totals);
  updateLocationDetails(location);
}

// Update location analysis
function updateLocationDetails(location) {
  const details = document.getElementById("location-details");
  if (!location) {
    details.innerHTML = "<p>Please select a location to see details.</p>";
    return;
  }

  const locationData = toysRequested.find((l) => l.location === location);
  const toysList = locationData.toys
    .map((toy) => {
      const [name, amount] = Object.entries(toy)[0];
      return `<tr>
            <td>${name}</td>
            <td>${amount}</td>
            <td>${((amount / locationData.amount) * 100).toFixed(1)}%</td>
        </tr>`;
    })
    .join("");

  details.innerHTML = `
        <h3>Total Request Amount: ${locationData.amount}</h3>
        <table>
            <thead>
                <tr>
                    <th>Toy</th>
                    <th>Amount</th>
                    <th>% of Location Total</th>
                </tr>
            </thead>
            <tbody>
                ${toysList}
            </tbody>
        </table>
    `;
}

// Initialize dashboard
function initializeDashboard() {
  const totals = calculateTotalsByToy();
  const { toyName, amount } = findMostPopularToy(totals);

  // Update stats
  document.getElementById("total-requests").textContent = toysRequested.reduce(
    (sum, loc) => sum + loc.amount,
    0
  );
  document.getElementById(
    "most-popular"
  ).textContent = `${toyName} (${amount})`;
  document.getElementById("total-locations").textContent = toysRequested.length;

  // Create chart
  createBarChart(totals);

  // Setup location selector
  const select = document.getElementById("location-select");
  toysRequested.forEach((location) => {
    const option = document.createElement("option");
    option.value = location.location;
    option.textContent = location.location;
    select.appendChild(option);
  });

  // Add "Global View" option at the top
  const globalOption = document.createElement("option");
  globalOption.value = "";
  globalOption.textContent = "Global View";
  select.insertBefore(globalOption, select.firstChild);

  select.addEventListener("change", (e) => {
    updateDashboard(e.target.value);
  });

  // Initialize dashboard with global view
  updateDashboard("");
}

// Start the dashboard when the DOM is loaded
document.addEventListener("DOMContentLoaded", initializeDashboard);
console.log(`The most popular toy is <TOY> with <NUMBER> requests.`);
