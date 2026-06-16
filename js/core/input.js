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
    if (!gameCanvas) return;
    const rect = gameCanvas.getBoundingClientRect();
    mouse.x = Math.max(0, Math.min(gameCanvas.width, e.clientX - rect.left));
    mouse.y = Math.max(0, Math.min(gameCanvas.height, e.clientY - rect.top));
});

window.addEventListener("keydown", (e) => {
    if (e.code === "ArrowLeft" || e.code === "KeyA") keys.left = true;
    if (e.code === "ArrowRight" || e.code === "KeyD") keys.right = true;
    if (e.code === "ArrowUp" || e.code === "KeyW" || e.code === "Space") keys.up = true;
    if (e.code === "ArrowDown" || e.code === "KeyS") {
        if (!keys.down) {
            keys.downPressed = true;
        }
        keys.down = true;
    }
});

window.addEventListener("keyup", (e) => {
    if (e.code === "ArrowLeft" || e.code === "KeyA") keys.left = false;
    if (e.code === "ArrowRight" || e.code === "KeyD") keys.right = false;
    if (e.code === "ArrowUp" || e.code === "KeyW" || e.code === "Space") keys.up = false;
    if (e.code === "ArrowDown" || e.code === "KeyS") keys.down = false;
});

function downOnce() {
    const pressed = input.downPressed;
    input.downPressed = false;
    return pressed;
}

window.addEventListener("keydown", (e) => {
    if (e.code === "KeyN") nextLevel();
    if (e.code === "KeyP") previousLevel();
});
