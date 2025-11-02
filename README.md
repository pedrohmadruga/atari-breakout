# 🏓 Breakout — HTML | CSS | JavaScript

A fun **Breakout Game** built with pure web technologies — no external libraries.  
This project is part of my journey as a fullstack developer, focusing on improving **frontend skills** and modular JavaScript architecture.

---

## 🎮 How to Play

- Move your paddle with the mouse to bounce the ball.
- Destroy all the bricks by hitting them with the ball.
- Avoid letting the ball fall below the paddle.
- Toggle music and sound effects using the icons.
- Click "Play Again" to restart after winning or losing.

---

## 📦 Project Structure

- `index.html` — game layout and canvas element  
- `style.css` — platform, bricks, ball, and UI styling  
- `scripts/main.js` — main game setup, imports, and initialization  
- `scripts/constants.js` — DOM elements and constant variables  
- `scripts/objects.js` — classes for `Ball`, `Platform`, and `Brick`  
- `scripts/state.js` — global game state management  
- `scripts/utils.js` — utility functions (e.g., clamp, reset game, start game, stop loop)  
- `scripts/audio.js` — audio initialization and music/sound control functions  
- `scripts/event.js` — event listeners for canvas, buttons, and sound toggles  
- `scripts/bricks.js` — function for bricks generation  
- `scripts/game.js` — main game logic and game loop  
- `scripts/screens.js` — victory and lose screen rendering  
- `images/` — icons for sounds and music  
- `audio/` — background music and sound effects  

---

## 🚀 Features & Highlights

✅ Modular JavaScript architecture using ES6 modules  
✅ Dynamic brick generation  
✅ Paddle movement with mouse tracking  
✅ Ball physics and collision detection (walls, paddle, bricks)  
✅ Score tracking and highscore management  
✅ Toggleable music and sound effects  
✅ Victory and Game Over screens  
✅ Smooth game loop with `requestAnimationFrame`  

---

## 🧠 Key Concepts Applied

- JavaScript ES6 Modules (`import` / `export`)  
- Classes and private fields (`#`) for `Ball`, `Platform`, `Brick`  
- Global game state management via a shared `state` object  
- DOM manipulation for dynamic score updates and canvas rendering  
- Event handling for mouse movement, clicks, and buttons  
- Audio control with multiple sound effects and looping background music  
- Collision detection using geometry math and `clamp` function  
- Modular code organization to separate concerns (audio, events, screens, utils)  

---

## ▶️ Try it live

🔗 [breakout-pedrohmadruga.netlify.app](https://breakout-pedrohmadruga.netlify.app)

---

⚠️ Note: This game is optimized for desktop browsers mouse control and may not work correctly on mobile devices.

Made by [@pedrohmadruga](https://github.com/pedrohmadruga)
