function checkCollisions() {
    if (!currentLevel) return;

    // Reset grounded state each frame
    player.onGround = false;

    // Store previous position for accurate collision direction detection
    const prevX = player.x - player.velocityX;
    const prevY = player.y - player.velocityY;

    for (const p of currentLevel.platforms) {
        if (p.collide === false) continue;


        // AABB overlap check
        if (player.x < p.x + p.width &&
            player.x + player.width > p.x &&
            player.y < p.y + p.height &&
            player.y + player.height > p.y) {

            const playerBottom = player.y + player.height;
            const playerTop = player.y;
            const playerRight = player.x + player.width;
            const playerLeft = player.x;

            const prevBottom = prevY + player.height;
            const prevTop = prevY;
            const prevRight = prevX + player.width;
            const prevLeft = prevX;

            const platformTop = p.y;
            const platformBottom = p.y + p.height;
            const platformLeft = p.x;
            const platformRight = p.x + p.width;

            // -----------------------------
            // LANDING ON TOP OF PLATFORM
            // -----------------------------
            if (prevBottom <= platformTop && playerBottom >= platformTop && player.velocityY >= 0) {
                player.y = platformTop - player.height;
                player.velocityY = 0;
                player.onGround = true;
                continue;
            }

            // -----------------------------
            // HITTING THE UNDERSIDE
            // -----------------------------
            if (prevTop >= platformBottom && playerTop <= platformBottom && player.velocityY < 0) {
                player.y = platformBottom;
                player.velocityY = 0;
                continue;
            }


            if (!GLOBAL_DEBUG){
                // -----------------------------
                // COLLIDING WITH LEFT SIDE
                // -----------------------------
                if (prevRight <= platformLeft && playerRight >= platformLeft && player.velocityX > 0) {
                    player.x = platformLeft - player.width;
                    player.velocityX = 0;
                    continue;
                }

                // -----------------------------
                // COLLIDING WITH RIGHT SIDE
                // -----------------------------
                if (prevLeft >= platformRight && playerLeft <= platformRight && player.velocityX < 0) {
                    player.x = platformRight;
                    player.velocityX = 0;
                    continue;
                }
            }
        }
    }
}
