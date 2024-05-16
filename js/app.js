
const keywordDiv = document.querySelector('.keyboard');

for (let i = 97; i <= 122; i++) {
    const buttons = document.createElement('button');
    buttons.textContent = String.fromCharCode(i);
    keywordDiv.appendChild(buttons);
};
