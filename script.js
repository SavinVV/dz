
const notes = document.querySelector('.btn-notes'),
      letters = document.querySelector('.btn-letters'),
      keys = document.querySelectorAll('.piano-key'),
      container = document.querySelector('.btn-container'),
      piano = document.querySelector('.piano');

const letNotDict = {
    'D': 'c',
    'F': 'd',
    'G': 'e',
    'H': 'f',
    'J': 'g',
    'K': 'a',
    'L': 'b',
    'R': 'c♯',
    'T': 'd♯',
    'U': 'f♯',
    'I': 'g♯',
    'O': 'a♯'
};

// Переключение нот и букв

container.addEventListener('click', e => {
    if (e.target == notes) {
        if (!notes.classList.contains('btn-active')) {
            notes.classList.add('btn-active');
            letters.classList.remove('btn-active');
            keys.forEach(key => {
                key.classList.remove('piano-key-letter');
            });
        }          
    } else if (e.target == letters) {
        if (!letters.classList.contains('btn-active')) {
            letters.classList.add('btn-active');
            notes.classList.remove('btn-active');
            keys.forEach(key => {
                key.classList.add('piano-key-letter');
            });
        }
    }
});

// Воспроизвести аудио

function playAudio(src) {
    let audio = new Audio();
    audio.src = `assets/audio/${src}.mp3`;
    audio.currentTime = 0;
    audio.play();
}

// Нажать клавиатурой

function pressKeyMouse(event){
    if (event.target.classList.contains('piano-key')) {
        console.log(event);
        event.target.classList.add('piano-key-active');
        playAudio(event.target.getAttribute('data-note'));
        event.target.addEventListener('mouseup', function() {
            event.target.classList.remove('piano-key-active');
        });
        event.target.addEventListener('mouseout', function() {
            event.target.classList.remove('piano-key-active');
        });
    }
}

// Нажать мышкой

function pressKeyKeyboard(event){
    if (event.key.toUpperCase() in letNotDict && !event.repeat) {
        console.log(event);
        let keyboardKey = letNotDict[event.key.toUpperCase()];
        let key = document.querySelector(`.piano-key[data-note='${keyboardKey}']`);
        key.classList.add('piano-key-active');
        playAudio(keyboardKey);
        event.target.addEventListener('keyup', function() {
            key.classList.remove('piano-key-active');
        });
        event.target.addEventListener('mouseout', function() {
            event.target.classList.remove('piano-key-active');
        });
    }
}



piano.addEventListener('mousedown', e => {
    pressKeyMouse(e);
});

window.addEventListener('keydown', e => {
    pressKeyKeyboard(e);
});

