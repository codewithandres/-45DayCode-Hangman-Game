import { wordList } from "./game-word-list.js";

const keywordDiv = document.querySelector('.keyboard');
const wordDisplay = document.querySelector('.word-display');

const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    document.querySelector('.hint-text b').textContent = hint;
    wordDisplay.innerHTML = word.split('').map(() => `<li class="letter"></li>`).join('');
};

for (let i = 97; i <= 122; i++) {
    const buttons = document.createElement('button');
    buttons.textContent = String.fromCharCode(i);
    keywordDiv.appendChild(buttons);
};

getRandomWord();