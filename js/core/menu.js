let fade = 1;

// Pause menu hitboxes
const pauseButtons = {
    resume: { x: 0, y: 0, w: 0, h: 0 },
    mainMenu: { x: 0, y: 0, w: 0, h: 0 },
    settings: { x: 0, y: 0, w: 0, h: 0 }
};

// Settings menu hitboxes
const settingsButtons = {
    toggleMusic: { x: 0, y: 0, w: 0, h: 0 },
    toggleSFX: { x: 0, y: 0, w: 0, h: 0 },
    controls: { x: 0, y: 0, w: 0, h: 0 },
    colorblind: { x: 0, y: 0, w: 0, h: 0 },
    back: { x: 0, y: 0, w: 0, h: 0 }
};



/* ===========================
   MAIN MENU
   =========================== */

function drawMenu(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "40px Verdana";
    ctx.textAlign = "center";

    ctx.fillText("UNNAMED GAME", canvas.width / 2, canvas.height / 3 - 40);

    ctx.font = "24px Verdana";
    ctx.fillText("Press ENTER to Start", canvas.width / 2, canvas.height / 2.5);

    drawMenuBG(ctx);

    // Fade overlay
    ctx.fillStyle = `rgba(0,0,0,${fade})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    fade = Math.max(0, fade - 0.02);
}



/* ===========================
   PAUSE MENU
   =========================== */

function drawPauseMenu(ctx) {
    ctx.fillStyle = "rgba(40, 40, 40, 0.25)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "40px Verdana";
    ctx.textAlign = "center";
    ctx.fillText("Paused", canvas.width / 2, 80);

    ctx.font = "24px Verdana";
    ctx.textAlign = "left";

    const textX = 20;

    const RText = "P | Resume";
    const MText = "M | Main Menu";
    const SText = "S | Settings";

    const RY = canvas.height / 2 + 10;
    const MY = canvas.height / 2 + 50;
    const SY = canvas.height / 2 + 90;

    ctx.fillText(RText, textX, RY);
    ctx.fillText(MText, textX, MY);
    ctx.fillText(SText, textX, SY);

    pauseButtons.resume = {
        x: textX,
        y: RY - 24,
        w: ctx.measureText(RText).width,
        h: 30
    };

    pauseButtons.mainMenu = {
        x: textX,
        y: MY - 24,
        w: ctx.measureText(MText).width,
        h: 30
    };

    pauseButtons.settings = {
        x: textX,
        y: SY - 24,
        w: ctx.measureText(SText).width,
        h: 30
    };
}



/* ===========================
   SETTINGS MENU
   =========================== */

function drawSettingsMenu(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "40px Verdana";
    ctx.textAlign = "center";
    ctx.fillText("Settings", canvas.width / 2, 120);

    ctx.font = "24px Verdana";

    const items = [
        { text: "Toggle Music", key: "toggleMusic" },
        { text: "Toggle SFX", key: "toggleSFX" },
        { text: "Change Controls", key: "controls" },
        { text: "Colorblind Mode", key: "colorblind" },
        { text: "Back", key: "back" }
    ];

    const centerX = canvas.width / 2;
    let y = 200;

    items.forEach(item => {
        ctx.fillText(item.text, centerX, y);

        const width = ctx.measureText(item.text).width;

        settingsButtons[item.key] = {
            x: centerX - width / 2,
            y: y - 24,
            w: width,
            h: 30
        };

        y += 50;
    });
}



/* ===========================
   KEYBOARD INPUT
   =========================== */

document.addEventListener("keydown", (e) => {

    // Main menu
    if (gameState === "menu" && e.key === "Enter") {
        startGame();
        return;
    }

    // Pause toggle
    if (e.code === "Escape" || e.code === "KeyP") {
        if (gameState === "play") {
            gameState = "pause";

            // Clear movement keys
            keys.left = false;
            keys.right = false;
            keys.up = false;
            keys.down = false;
            keys.downPressed = false;

        } else if (gameState === "pause") {
            gameState = "play";
        }
        return;
    }

    // Pause menu shortcuts
    if (gameState === "pause") {
        if (e.code === "KeyM") gameState = "menu";
        if (e.code === "KeyS") gameState = "settings";
        return;
    }

    // Settings menu
    if (gameState === "settings" && e.code === "Escape") {
        gameState = "pause";
        return;
    }
});



/* ===========================
   MOUSE INPUT
   =========================== */

document.addEventListener("mousedown", (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    function inside(btn) {
        return mx >= btn.x && mx <= btn.x + btn.w &&
               my >= btn.y && my <= btn.y + btn.h;
    }

    // Pause menu clicks
    if (gameState === "pause") {
        if (inside(pauseButtons.resume)) gameState = "play";
        if (inside(pauseButtons.mainMenu)) gameState = "menu";
        if (inside(pauseButtons.settings)) gameState = "settings";
        return;
    }

    // Settings menu clicks
    if (gameState === "settings") {
        if (inside(settingsButtons.toggleMusic)) console.log("Music toggled (placeholder)");
        if (inside(settingsButtons.toggleSFX)) console.log("SFX toggled (placeholder)");
        if (inside(settingsButtons.controls)) console.log("Controls menu coming soon");
        if (inside(settingsButtons.colorblind)) console.log("Colorblind mode toggled (placeholder)");
        if (inside(settingsButtons.back)) gameState = "pause";
        return;
    }
});



/* ===========================
   START GAME
   =========================== */

function startGame() {
    loadLevel(allLevels[currentLevelIndex]);
    gameState = "play";
}



/* ===========================
   MENU BACKGROUND
   =========================== */

function drawMenuBG(ctx, t = 1) {
    const baseX = canvas.width / 2;
    let scaleUp = 377;
    let startY = 234;

    const colors = [
        `rgba(161, 0, 161, ${t})`,
        `rgba(140, 0, 140, ${t})`,
        `rgba(119, 0, 119, ${t})`
    ];

    for (let i = 0; i < colors.length; i++) {
        ctx.fillStyle = colors[i];
        ctx.fillRect(baseX - scaleUp / 2, startY, scaleUp, 72.5);

        scaleUp -= 29;
        startY += 72.5;
    }
}
