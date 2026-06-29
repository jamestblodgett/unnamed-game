const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const debugPanel = document.getElementById("debugPanel");
const GLOBAL_DEBUG = false;

loadLevel(allLevels[currentLevelIndex]);

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updatePlayer();
    checkCollisions();
    checkFallReset();
    checkDoorEntry();
    updateCamera();

    drawPlatforms(ctx);
    drawDoors(ctx);
    drawPlayerVariants(ctx);
    drawTexts(ctx);
    drawPlayer(ctx);
    updateDebug();

    requestAnimationFrame(gameLoop);
}

function updateDebug() {
    if (!debugPanel) return;
    const levelName = currentLevel?.name || "unknown";
    const mouseScreenX = typeof mouse !== "undefined" ? mouse.x : null;
    const mouseScreenY = typeof mouse !== "undefined" ? mouse.y : null;
    const mouseLevelX = (mouseScreenX !== null && typeof camera !== "undefined") ? mouseScreenX + camera.x : null;
    const mouseLevelY = (mouseScreenY !== null && typeof camera !== "undefined") ? mouseScreenY + camera.y : null;
    const mouseX = mouseLevelX !== null ? mouseLevelX.toFixed(0) : "n/a";
    const mouseY = mouseLevelY !== null ? mouseLevelY.toFixed(0) : "n/a";
    const downPressed = downOnce();
    debugPanel.textContent = `player.x: ${player.x.toFixed(0)} player.y: ${player.y.toFixed(0)} mouse.x: ${mouseX} mouse.y: ${mouseY} level: ${levelName} index: ${currentLevelIndex} downPressed: ${downPressed}`;
}

// FUNCTIONS
function checkFallReset() {
    let deathY = WORLD_BOTTOM;
    if (GLOBAL_DEBUG){
        deathY = 100;
    } else {
        deathY = WORLD_BOTTOM - 100;
    }
    

    if (player.y > deathY) {
        player.x = currentLevel.spawn.x;
        player.y = currentLevel.spawn.y;
        player.velocityX = 0;
        player.velocityY = 0;
    }
}


gameLoop();