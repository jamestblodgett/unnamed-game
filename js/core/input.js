const keys = {
    left: false,
    right: false,
    up: false,
    down: false,
    downPressed: false
};

const input = keys;

const mouse = {
    x: 0,
    y: 0
};

const gameCanvas = document.getElementById("gameCanvas");

window.addEventListener("mousemove", (e) => {
    if (gameState !== "play") return;
    if (!gameCanvas) return;
    const rect = gameCanvas.getBoundingClientRect();
    mouse.x = Math.max(0, Math.min(gameCanvas.width, e.clientX - rect.left));
    mouse.y = Math.max(0, Math.min(gameCanvas.height, e.clientY - rect.top));
});

window.addEventListener("keydown", (e) => {
    if (gameState !== "play") return;
    if (e.code === LEFT || e.code === "ArrowLeft") keys.left = true;
    if (e.code === RIGHT || e.code === "ArrowRight") keys.right = true;
    if (e.code === UP || e.code === "ArrowUp" ||  e.code === "Space") keys.up = true;
    if (e.code === DOWN || e.code === "ArrowDown") {
        if (!keys.down) {
            keys.downPressed = true;
        }
        keys.down = true;
    }
});

window.addEventListener("keyup", (e) => {
    if (gameState !== "play") return;
    if (e.code === LEFT || e.code === "ArrowLeft") keys.left = false;
    if (e.code === RIGHT || e.code === "ArrowRight") keys.right = false;
    if (e.code === UP || e.code === "ArrowUp" ||  e.code === "Space") keys.up = false;
    if (e.code === DOWN || e.code === "ArrowDown") keys.down = false;
});

function downOnce() {
    const pressed = input.downPressed;
    input.downPressed = false;
    return pressed;
}

// Level skip
window.addEventListener("keydown", (e) => {
    if (e.code === "KeyN") nextLevel();
    if (e.code === "KeyP") previousLevel();
});
