// Audio objects
export const musicAudio = new Audio('./audio/music.mp3');
musicAudio.loop = true;
musicAudio.preload = "auto"

export const brickCollisionAudio = new Audio('./audio/brick-collision.mp3');
brickCollisionAudio.preload = "auto";

export const platformWallCollisionAudio = new Audio('./audio/platform-wall-collision.mp3');
platformWallCollisionAudio.preload = "auto";

export const playerLoseAudio = new Audio('./audio/player-lose.wav');
playerLoseAudio.preload = "auto";

export const playerWinAudio = new Audio('./audio/player-win.wav');
playerWinAudio.preload = "auto";

export function startMusic() {
    musicAudio.play().catch(err => console.log("Error playing track: ", err));
}

export function toggleSound(soundOn) {
    const volume = soundOn ? 1 : 0

    brickCollisionAudio.volume = volume;
    platformWallCollisionAudio.volume = volume;
    playerLoseAudio.volume = volume;
    playerWinAudio.volume = volume;
}