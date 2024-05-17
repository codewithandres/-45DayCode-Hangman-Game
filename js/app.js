import { wordList } from "./game-word-list.js";

const keywordDiv = document.querySelector('.keyboard'),
    wordDisplay = document.querySelector('.word-display'),
    guesesText = document.querySelector('.guesses-text b'),
    hangmanimage = document.querySelector('.hangman-box img'),
    gameModal = document.querySelector('.games-modal'),
    playGain = document.querySelector('.play-again');

let currentWord,
    wrongGuessCount,
    correctLetter,
    maxGueses = 6;

const restGame = () => {
    correctLetter = [];
    wrongGuessCount = 0;
    hangmanimage.src = `img/hangman-${wrongGuessCount}.svg`;
    guesesText.textContent = `${wrongGuessCount} / ${maxGueses}`;

    [...keywordDiv.querySelectorAll('button')].map(btn => btn.disabled = false);

    wordDisplay.innerHTML = currentWord.split('').map(() => `<li class="letter"></li>`).join('');
    gameModal.classList.remove('show');
};

const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;

    document.querySelector('.hint-text b').textContent = hint;
    restGame();
    wordDisplay.innerHTML = word.split('').map(() => `<li class="letter"></li>`).join('');
};

const gameOver = isVictory => {
    setTimeout(() => {
        const modalText = isVictory ? `You found the word` : `The correct word was`;
        gameModal.querySelector('img').src = `img/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector('h4').textContent = `${isVictory ? 'Congrats' : 'Game Over'}`;
        gameModal.querySelector('p').innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add('show');
    }, 300);
};

const initGame = (buttons, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
        [...currentWord].map((letter, index) => {
            if (letter === clickedLetter) {
                correctLetter.push(letter);
                wordDisplay.querySelectorAll('li')[index].textContent = letter;
                wordDisplay.querySelectorAll('li')[index].classList.add('guessed');
                buttons.disabled = true;
            };
        });
    } else {
        wrongGuessCount++;
        hangmanimage.src = `img/hangman-${wrongGuessCount}.svg`;
    };
    guesesText.textContent = `${wrongGuessCount} / ${maxGueses}`;

    if (wrongGuessCount === maxGueses) return gameOver(false);
    if (correctLetter.length === currentWord.length) return gameOver(true);
};

for (let i = 97; i <= 122; i++) {
    const buttons = document.createElement('button');
    buttons.textContent = String.fromCharCode(i);
    keywordDiv.appendChild(buttons);

    buttons.addEventListener('click', e => initGame(e.target, String.fromCharCode(i)));
};

getRandomWord();
playGain.addEventListener('click', getRandomWord)