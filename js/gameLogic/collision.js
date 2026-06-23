function checkCollisions() {
    if (!currentLevel) return;

    // Reset grounded state each frame
    player.onGround = false;

    const playerRects = getPlayerCollisionRects(player.x, player.y);
    const prevRects = getPlayerCollisionRects(player.x - player.velocityX, player.y - player.velocityY);

    for (const p of currentLevel.platforms) {
        const platformTop = p.y;
        const platformBottom = p.y + p.height;
        const platformLeft = p.x;
        const platformRight = p.x + p.width;

        for (let i = 0; i < playerRects.length; i++) {
            const rect = playerRects[i];
            const prevRect = prevRects[i];

            // AABB overlap check
            if (rect.x < platformRight &&
                rect.x + rect.width > platformLeft &&
                rect.y < platformBottom &&
                rect.y + rect.height > platformTop) {

                const playerBottom = rect.y + rect.height;
                const playerTop = rect.y;
                const playerRight = rect.x + rect.width;
                const playerLeft = rect.x;

                const prevBottom = prevRect.y + prevRect.height;
                const prevTop = prevRect.y;
                const prevRight = prevRect.x + prevRect.width;
                const prevLeft = prevRect.x;

                // -----------------------------
                // LANDING ON TOP OF PLATFORM
                // Always allowed, even for non-collidable platforms
                // Skip if player is pressing down to fall through
                // -----------------------------
                if (prevBottom <= platformTop && playerBottom >= platformTop && player.velocityY >= 0) {
                    // Only allow landing on non-collidable platforms from the player's bottom part
                    const isBottomPart = (i === playerRects.length - 1);
                    if (p.collide === true || (p.collide === false && !keys.down && isBottomPart)){
                        player.y = platformTop - rect.height - rect.offsetY;
                        player.velocityY = 0;
                        player.onGround = true;
                        break;
                    }
                }

                // Skip other collisions if platform is not collidable
                if (p.collide === false) continue;

                // -----------------------------
                // HITTING THE UNDERSIDE
                // -----------------------------
                if (prevTop >= platformBottom && playerTop <= platformBottom && player.velocityY < 0) {
                    player.y = platformBottom - rect.offsetY;
                    player.velocityY = 0;
                    break;
                }

                if (!GLOBAL_DEBUG) {
                    // -----------------------------
                    // COLLIDING WITH LEFT SIDE
                    // -----------------------------
                    if (prevRight <= platformLeft && playerRight >= platformLeft && player.velocityX > 0) {
                        player.x = platformLeft - rect.offsetX - rect.width;
                        player.velocityX = 0;
                        break;
                    }

                    // -----------------------------
                    // COLLIDING WITH RIGHT SIDE
                    // -----------------------------
                    if (prevLeft >= platformRight && playerLeft <= platformRight && player.velocityX < 0) {
                        player.x = platformRight - rect.offsetX;
                        player.velocityX = 0;
                        break;
                    }
                }
            }
        }
    }
}
