// Santa needs your help to figure out if he has enough money to give everyone change!
function correctChangeFromSanta(bills) {
  let fives = 0;
  let tens = 0;

  for (let bill of bills) {
    if (bill === 5) {
      fives++;
    } else if (bill === 10) {
      if (fives === 0) return false; // Can't give $5 change
      fives--;
      tens++;
    } else if (bill === 20) {
      // Try to give $15 change using $10 + $5 first
      if (tens >= 1 && fives >= 1) {
        tens--;
        fives--;
      }
      // Or try using three $5 bills
      else if (fives >= 3) {
        fives -= 3;
      } else {
        return false; // Can't make change
      }
    }
  }

  return true; // Everyone got their change
}

// Game state
let currentRun = {
  bills: [],
  fives: 0,
  tens: 0,
  twenties: 0,
  gifts: 0,
  donations: 0,
  donationAmount: 0,
};
let runs = [];

function calculateTotal() {
  return currentRun.fives * 5 + currentRun.tens * 10 + currentRun.twenties * 20;
}

function getChangeAmount(billPaid) {
  if (billPaid === 5) return 0;
  if (billPaid === 10) return 5;
  if (billPaid === 20) return 15;
  return 0;
}

function calculateGiftRate() {
  const totalTransactions = currentRun.bills.length;
  if (totalTransactions === 0) return 0;
  return Math.round((currentRun.gifts / totalTransactions) * 100);
}

function showMessage(message) {
  const messageAlert = document.getElementById("messageAlert");
  if (messageAlert) {
    messageAlert.textContent = message;
    messageAlert.style.display = "block";
  }
}

function updateDisplay() {
  // Update money stats
  const elements = {
    fivesCount: currentRun.fives,
    tensCount: currentRun.tens,
    twentiesCount: currentRun.twenties,
    totalMoney: calculateTotal(),
    totalGifts: currentRun.gifts,
    giftRate: calculateGiftRate() + "%",
    totalDonations: currentRun.donationAmount,
    donationCount: currentRun.donations,
    runNumber: runs.length + 1,
  };

  for (const [id, value] of Object.entries(elements)) {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = value;
    }
  }
}

function showOptions(show) {
  const optionsContainer = document.getElementById("optionsContainer");
  if (optionsContainer) {
    optionsContainer.style.display = show ? "block" : "none";
  }
}

function handlePayment(amount) {
  currentRun.bills.push(amount);
  showOptions(false);

  if (amount === 5) {
    currentRun.fives++;
    showMessage("Payment accepted! No change needed.");
  } else if (amount === 10) {
    if (currentRun.fives === 0) {
      showOptions(true);
      showMessage(
        `Santa doesn't have enough change for $${amount}. Would you like a gift or donate the $5 change?`
      );
      return;
    }
    currentRun.fives--;
    currentRun.tens++;
    showMessage("Payment accepted! $5 change given.");
  } else if (amount === 20) {
    if (currentRun.tens >= 1 && currentRun.fives >= 1) {
      currentRun.tens--;
      currentRun.fives--;
      currentRun.twenties++;
      showMessage("Payment accepted! $15 change given.");
    } else if (currentRun.fives >= 3) {
      currentRun.fives -= 3;
      currentRun.twenties++;
      showMessage("Payment accepted! $15 change given.");
    } else {
      showOptions(true);
      showMessage(
        `Santa doesn't have enough change for $${amount}. Would you like a gift or donate the $15 change?`
      );
      return;
    }
  }

  updateDisplay();
  checkCurrentRunStatus();
}

function handleGift() {
  currentRun.gifts++;
  const lastBill = currentRun.bills[currentRun.bills.length - 1];
  if (lastBill === 10) currentRun.tens++;
  else if (lastBill === 20) currentRun.twenties++;
  showMessage("You received a special gift from Santa!");
  showOptions(false);
  updateDisplay();
}

function handleDonation() {
  const lastBill = currentRun.bills[currentRun.bills.length - 1];
  const changeAmount = getChangeAmount(lastBill);

  // Add the full bill to Santa's money
  if (lastBill === 10) currentRun.tens++;
  else if (lastBill === 20) currentRun.twenties++;

  currentRun.donations++;
  currentRun.donationAmount += changeAmount;
  showMessage(`Thank you for donating your $${changeAmount} change!`);
  showOptions(false);
  updateDisplay();
}

function finishRun() {
  const runSummary = {
    ...currentRun,
    totalMoney: calculateTotal(),
    giftRate: calculateGiftRate(),
  };
  runs.push(runSummary);

  // Reset current run
  currentRun = {
    bills: [],
    fives: 0,
    tens: 0,
    twenties: 0,
    gifts: 0,
    donations: 0,
    donationAmount: 0,
  };

  // Update display
  updateDisplay();
  showMessage("Starting new delivery run!");
  showOptions(false);

  // Update previous runs summary
  const previousRuns = document.getElementById("previousRuns");
  const runsSummary = document.getElementById("runsSummary");
  previousRuns.style.display = "block";

  const runDiv = document.createElement("div");
  runDiv.className = "run-item";
  const currentRunIndex = runs.length - 1;
  runDiv.innerHTML = `
      <div><strong>Run #${currentRunIndex + 1}</strong></div>
      <div>Final Money: $${runSummary.totalMoney}</div>
      <div>Bills Collected: ${runSummary.bills.length}</div>
      <div>Gifts Given: ${runSummary.gifts} (${runSummary.giftRate}%)</div>
      <div>Change Donated: $${runSummary.donationAmount} (${
    runSummary.donations
  } times)</div>
  `;
  runsSummary.insertBefore(runDiv, runsSummary.firstChild);
}

function checkCurrentRunStatus() {
  const canMakeChangeForAll = correctChangeFromSanta(currentRun.bills);
  const statusMessage = canMakeChangeForAll
    ? "Santa can make change for everyone!"
    : "Santa needs more small bills to make change!";
  showMessage(statusMessage);
}

// Initialize display
document.addEventListener("DOMContentLoaded", function () {
  updateDisplay();

  // Test cases
  console.log("Testing change function:");
  console.log(
    [5, 5, 5, 10, 20],
    "->",
    correctChangeFromSanta([5, 5, 5, 10, 20])
  ); // Should return true
  console.log(
    [5, 5, 10, 10, 20],
    "->",
    correctChangeFromSanta([5, 5, 10, 10, 20])
  ); // Should return false
});
