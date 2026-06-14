const keys = {
    left: false,
    right: false,
    up: false
};

window.addEventListener("keydown", (e) => {
    if (e.code === "ArrowLeft" || e.code === "KeyA") keys.left = true;
    if (e.code === "ArrowRight" || e.code === "KeyD") keys.right = true;
    if (e.code === "ArrowUp" || e.code === "KeyW" || e.code === "Space") keys.up = true;
});

window.addEventListener("keyup", (e) => {
    if (e.code === "ArrowLeft" || e.code === "KeyA") keys.left = false;
    if (e.code === "ArrowRight" || e.code === "KeyD") keys.right = false;
    if (e.code === "ArrowUp" || e.code === "KeyW" || e.code === "Space") keys.up = false;
});

window.addEventListener("keydown", (e) => {
    if (e.code === "KeyN") nextLevel();
    if (e.code === "KeyP") previousLevel();
});
