const calendarContainer = document.getElementById('calendar');
let openedDays = 0;
const daysCounter = document.createElement('h4');
daysCounter.id = 'daysCounter';
document.querySelector('h4').after(daysCounter);
updateDaysCounter();

function updateDaysCounter() {
    const remainingDays = 24 - openedDays;
    daysCounter.innerHTML = `<span style="color: white; font-size: 7rem;">${remainingDays}</span><br><br> <span style="color: gold;">Days til JavaScriptmas!</span>`;
}

for (let i = 1; i <= 24; i++) {
    const box = document.createElement('li');
    box.classList.add('calendar-box');
    box.setAttribute('role', 'button');
    box.setAttribute('aria-label', `Day ${i}`);
    box.dataset.day = i;
    
    const number = document.createElement('p');
    number.classList.add('number');
    number.textContent = i;
    
    const icon = document.createElement('i');
    icon.classList.add('fas', 'fa-gift');
    
    const description = document.createElement('p');
    description.classList.add('description');
    description.textContent = "Open me!";
    
    box.appendChild(number);
    box.appendChild(icon);
    box.appendChild(description);
    
    box.addEventListener('click', () => {
        const boxDay = parseInt(box.dataset.day);
        if (boxDay === openedDays + 1) {
            // Opening a new box
            box.classList.add('opened');
            openedDays++;
            description.textContent = "Opened!";
            
            if (i === 24) {
                box.style.backgroundImage = "url('./Merry.png')";
            }
        } else if (boxDay === openedDays && box.classList.contains('opened')) {
            // Unclosing the last opened box
            box.classList.remove('opened');
            openedDays--;
            description.textContent = "Open me!";
            
            if (i === 24) {
                box.style.backgroundImage = "none";
            }
        }
        updateDaysCounter();
    });
    
    calendarContainer.appendChild(box);
}
