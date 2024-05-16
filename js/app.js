import { wordList } from "./game-word-list.js";

const keywordDiv = document.querySelector('.keyboard'),
    wordDisplay = document.querySelector('.word-display'),
    guesesText = document.querySelector('.guesses-text b'),
    hangmanimage = document.querySelector('.hangman-box img');

let currentWord,
    wrongGuessCount = 0,
    maxGueses = 6;

const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word);
    document.querySelector('.hint-text b').textContent = hint;
    wordDisplay.innerHTML = word.split('').map(() => `<li class="letter"></li>`).join('');
};

const initGame = (buttons, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
        [...currentWord].map((letter, index) => {
            if (letter === clickedLetter) {
                wordDisplay.querySelectorAll('li')[index].textContent = letter;
                wordDisplay.querySelectorAll('li')[index].classList.add('guessed');
            };
        });
    } else {
        wrongGuessCount++;
        hangmanimage.src = `img/hangman-${wrongGuessCount}.svg`;
    };
    buttons.disabled = true;
    guesesText.textContent = `${wrongGuessCount} / ${maxGueses}`;
};

for (let i = 97; i <= 122; i++) {
    const buttons = document.createElement('button');
    buttons.textContent = String.fromCharCode(i);
    keywordDiv.appendChild(buttons);

    buttons.addEventListener('click', e => initGame(e.target, String.fromCharCode(i)));
};

getRandomWord();