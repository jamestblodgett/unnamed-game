function drawPlatforms(ctx) {
    if (!currentLevel) return;

    ctx.fillStyle = "gray";

    for (const p of currentLevel.platforms) {
        ctx.fillRect(
            p.x - camera.x,
            p.y - camera.y,
            p.width,
            p.height
        );
    }
}
