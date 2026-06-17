function drawPlatforms(ctx) {
    if (!currentLevel) return;

    for (const p of currentLevel.platforms) {
        if (p.collide === false) {
            ctx.fillStyle = "rgba(80, 80, 80, 0.6)";
        } else {
            ctx.fillStyle = "gray";
        }


        ctx.fillRect(
            p.x - camera.x,
            p.y - camera.y,
            p.width,
            p.height
        );
    }
}

function drawDoors(ctx) {
    if (!currentLevel?.doors) return;

    ctx.fillStyle = "white";
    for (const door of currentLevel.doors) {
        ctx.fillRect(
            door.x - camera.x,
            door.y - camera.y,
            door.width,
            door.height
        );
    }
}
