/*
😱 Christmas can get expensive!

You've been on a shopping trip and spent too much money.
But how much of that can you blame on Christmas?

**Task**

- Calculate and return the total cost of only the gifts in the shopping cart.
- Each gift has the isGift boolean set to true.
- The total cost of gifts should be given to two decimal places.

Expected output: 559.93

**Stretch Goal**

- Use the reduce() method to complete this challenge.
*/

import shoppingCartData from './data.js';

        function calculateTotals(data) {
            return data.reduce((acc, item) => {
                if (item.isGift) {
                    acc.giftTotal += item.price;
                    acc.giftCount += 1;
                } else {
                    acc.nonGiftTotal += item.price;
                    acc.nonGiftCount += 1;
                }
                acc.grandTotal += item.price;
                return acc;
            }, {
                giftTotal: 0,
                nonGiftTotal: 0,
                giftCount: 0,
                nonGiftCount: 0,
                grandTotal: 0
            });
        }

        function renderItems(data) {
            const itemList = document.getElementById('itemList');
            itemList.innerHTML = data.map(item => `
                <div class="item">
                    <div class="item-name">
                        <span class="gift-indicator ${item.isGift ? 'gift' : 'non-gift'}"></span>
                        ${item.item}
                    </div>
                    <div>$${item.price.toFixed(2)}</div>
                </div>
            `).join('');
        }

        function renderSummary(totals) {
            const summary = document.getElementById('summary');
            summary.innerHTML = `
                <div class="summary-row">
                    <span>Gifts (${totals.giftCount} items):</span>
                    <span>$${totals.giftTotal.toFixed(2)}</span>
                </div>
                <div class="summary-row">
                    <span>Non-gifts (${totals.nonGiftCount} items):</span>
                    <span>$${totals.nonGiftTotal.toFixed(2)}</span>
                </div>
                <div class="summary-row total-row">
                    <span>Total:</span>
                    <span>$${totals.grandTotal.toFixed(2)}</span>
                </div>
            `;
        }

        function renderGiftPercentage(totals) {
            const giftPercentage = document.getElementById('giftPercentage');
            const percentage = (totals.giftTotal / totals.grandTotal * 100).toFixed(1);
            giftPercentage.innerHTML = `${percentage}% of your spending was on gifts!`;
        }

        // Initialize the receipt
        const totals = calculateTotals(shoppingCartData);
        renderItems(shoppingCartData);
        renderSummary(totals);
        renderGiftPercentage(totals);