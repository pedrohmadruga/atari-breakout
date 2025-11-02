import * as audio from './audio.js'
import * as constants from './constants.js'
import * as utils from './utils.js'
import { state, platform } from './state.js';

// Register all events
export function registerEvents() {
    document.addEventListener("click", audio.startMusic, { once: true});

    constants.gameSoundEl.addEventListener("click", () => {
        const image = getComputedStyle(constants.gameSoundEl).backgroundImage;
        let soundOn;

        if (image.includes('sound.svg')) {
            constants.gameSoundEl.style.backgroundImage = 'url("./images/sound-slash.svg")';
            soundOn = false;
        }
        else {
            constants.gameSoundEl.style.backgroundImage = 'url("./images/sound.svg")';
            soundOn = true;
        }

        audio.toggleSound(soundOn);
    })

    constants.musicSoundEl.addEventListener("click", () => {
        const image = getComputedStyle(constants.musicSoundEl).backgroundImage;
        state.musicEnabled = !state.musicEnabled;

        if (image.includes('music-note.svg')) {
            constants.musicSoundEl.style.backgroundImage = 'url("./images/music-note-slash.svg")';
            audio.musicAudio.pause();
        }
        else {
            constants.musicSoundEl.style.backgroundImage = 'url("./images/music-note.svg")';
            audio.musicAudio.play().catch(() => {});
        }
    })

    constants.canvas.addEventListener("mousedown", () => {
        if (!state.ballIsMoving) {
            utils.resetGame();
            state.ballIsMoving = true;
        }
    });

    constants.canvas.addEventListener("mousemove", event => {
        const rect = constants.canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        platform.x = Math.max(0, Math.min(mouseX - platform.width / 2, constants.canvas.width - platform.width));
    });

    constants.playAgainBtn.addEventListener("click", () => {
        utils.stopLoop();
        utils.resetGame();
        utils.startGame();
    });
}