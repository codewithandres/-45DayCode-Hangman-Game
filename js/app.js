// Importamos la lista de palabras desde un archivo externo.
import { wordList } from "./game-word-list.js";

// Seleccionamos los elementos del DOM que vamos a utilizar.
const keywordDiv = document.querySelector('.keyboard'),
    wordDisplay = document.querySelector('.word-display'),
    guesesText = document.querySelector('.guesses-text b'),
    hangmanimage = document.querySelector('.hangman-box img'),
    gameModal = document.querySelector('.games-modal'),
    playGain = document.querySelector('.play-again');

// Declaramos las variables que mantendrán el estado del juego.
let currentWord,
    wrongGuessCount,
    correctLetter,
    maxGueses = 6;

// Función para reiniciar el juego y establecer los valores iniciales.
const restGame = () => {
    correctLetter = [];
    wrongGuessCount = 0;
    hangmanimage.src = `img/hangman-${wrongGuessCount}.svg`;
    guesesText.textContent = `${wrongGuessCount} / ${maxGueses}`;

    // Habilitamos todos los botones del teclado.
    [...keywordDiv.querySelectorAll('button')].map(btn => btn.disabled = false);

    // Preparamos la visualización de la palabra con espacios en blanco.
    wordDisplay.innerHTML = currentWord.split('').map(() => `<li class="letter"></li>`).join('');
    // Ocultamos el modal del juego.
    gameModal.classList.remove('show');
};

// Función para obtener una palabra aleatoria de la lista.
const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;

    // Mostramos la pista de la palabra.
    document.querySelector('.hint-text b').textContent = hint;
    // Reiniciamos el juego con la nueva palabra.
    restGame();
};

// Función para manejar el fin del juego, ya sea por victoria o derrota.
const gameOver = isVictory => {
    setTimeout(() => {
        // Definimos el texto del modal basado en el resultado del juego.
        const modalText = isVictory ? `You found the word` : `The correct word was`;
        // Cambiamos la imagen y el texto del modal.
        gameModal.querySelector('img').src = `img/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector('h4').textContent = `${isVictory ? 'Congrats' : 'Game Over'}`;
        gameModal.querySelector('p').innerHTML = `${modalText} <b>${currentWord}</b>`;
        // Mostramos el modal.
        gameModal.classList.add('show');
    }, 300);
};

// Función para inicializar el juego cuando se hace clic en una letra.
const initGame = (buttons, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
        // Si la letra está en la palabra, la mostramos en la pantalla.
        [...currentWord].map((letter, index) => {
            if (letter === clickedLetter) {
                correctLetter.push(letter);
                wordDisplay.querySelectorAll('li')[index].textContent = letter;
                wordDisplay.querySelectorAll('li')[index].classList.add('guessed');
                buttons.disabled = true;
            };
        });
    } else {
        // Si la letra no está, incrementamos el contador de errores.
        wrongGuessCount++;
        hangmanimage.src = `img/hangman-${wrongGuessCount}.svg`;
    };
    // Actualizamos el texto de los intentos.
    guesesText.textContent = `${wrongGuessCount} / ${maxGueses}`;

    // Verificamos si el juego ha terminado.
    if (wrongGuessCount === maxGueses) return gameOver(false);
    if (correctLetter.length === currentWord.length) return gameOver(true);
};

// Creamos los botones del teclado en pantalla.
for (let i = 97; i <= 122; i++) {
    const buttons = document.createElement('button');
    buttons.textContent = String.fromCharCode(i);
    keywordDiv.appendChild(buttons);

    // Añadimos el evento de clic para cada botón.
    buttons.addEventListener('click', e => initGame(e.target, String.fromCharCode(i)));
};

// Obtenemos la primera palabra al cargar el juego.
getRandomWord();
// Añadimos el evento de clic para el botón de jugar de nuevo.
playGain.addEventListener('click', getRandomWord)
