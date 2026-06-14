const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

loadLevel(allLevels[currentLevelIndex]);

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updatePlayer();
    checkCollisions();
    const floorY = 400;
    if (player.y + player.height > floorY) {
        player.y = floorY - player.height;
        player.velocityY = 0;
        player.onGround = true;
    }
    updateCamera();

    drawPlayer(ctx);

    drawPlatforms(ctx);

    requestAnimationFrame(gameLoop);
}

gameLoop();