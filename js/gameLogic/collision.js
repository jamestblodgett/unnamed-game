const GROUND_FORGIVENESS = 4; // pixels

function checkCollisions() {
    if (!currentLevel) return;

    player.onGround = false;

    const playerRects = getPlayerCollisionRects(player.x, player.y);
    const prevRects   = getPlayerCollisionRects(player.x - player.velocityX,
                                                player.y - player.velocityY);

    // Collect resolution requests
    let resolveDown  = null;
    let resolveUp    = null;
    let resolveLeft  = null;
    let resolveRight = null;

    for (const p of currentLevel.platforms) {
        const platformTop    = p.y;
        const platformBottom = p.y + p.height;
        const platformLeft   = p.x;
        const platformRight  = p.x + p.width;

        for (let i = 0; i < playerRects.length; i++) {
            const rect     = playerRects[i];
            const prevRect = prevRects[i];

            // AABB overlap
            if (rect.x < platformRight &&
                rect.x + rect.width > platformLeft &&
                rect.y < platformBottom &&
                rect.y + rect.height > platformTop) {

                const playerBottom = rect.y + rect.height;
                const playerTop    = rect.y;
                const playerRight  = rect.x + rect.width;
                const playerLeft   = rect.x;

                const prevBottom = prevRect.y + prevRect.height;
                const prevTop    = prevRect.y;
                const prevRight  = prevRect.x + prevRect.width;
                const prevLeft   = prevRect.x;

                // -----------------------------
                // LANDING ON TOP
                // -----------------------------
                if (prevBottom <= platformTop + GROUND_FORGIVENESS &&
                    playerBottom >= platformTop &&
                    player.velocityY >= 0){

                    const isBottomPart = (i === playerRects.length - 1);

                    if (p.collide === true ||
                       (p.collide === false && !keys.down && isBottomPart)) {

                        const neededY = platformTop - rect.height - rect.offsetY;

                        resolveDown = (resolveDown === null)
                                      ? neededY
                                      : Math.min(resolveDown, neededY);

                        player.onGround = true;
                    }
                }

                // Skip side/ceiling collisions for non-collidable platforms
                if (p.collide === false) continue;

                // -----------------------------
                // HITTING UNDERSIDE
                // -----------------------------
                if (prevTop >= platformBottom &&
                    playerTop <= platformBottom &&
                    player.velocityY < 0) {

                    const neededY = platformBottom - rect.offsetY;

                    resolveUp = (resolveUp === null)
                                ? neededY
                                : Math.max(resolveUp, neededY);
                }

                // If we're close enough to land, ignore side collisions this frame
                const closeToLanding =
                    prevBottom <= platformTop + GROUND_FORGIVENESS &&
                    playerBottom >= platformTop &&
                    player.velocityY >= 0;

                if (closeToLanding) {
                    continue; // skip side collisions
                }

                if (!GLOBAL_DEBUG) {
                    // -----------------------------
                    // LEFT SIDE COLLISION
                    // -----------------------------
                    if (prevRight <= platformLeft &&
                        playerRight >= platformLeft &&
                        player.velocityX > 0) {

                        const neededX = platformLeft - rect.offsetX - rect.width;

                        resolveLeft = (resolveLeft === null)
                                      ? neededX
                                      : Math.min(resolveLeft, neededX);
                    }

                    // -----------------------------
                    // RIGHT SIDE COLLISION
                    // -----------------------------
                    if (prevLeft >= platformRight &&
                        playerLeft <= platformRight &&
                        player.velocityX < 0) {

                        const neededX = platformRight - rect.offsetX;

                        resolveRight = (resolveRight === null)
                                       ? neededX
                                       : Math.max(resolveRight, neededX);
                    }
                }
            }
        }
    }

    // -----------------------------
    // APPLY RESOLUTIONS
    // -----------------------------

    // Vertical
    if (resolveDown !== null) {
        player.y = resolveDown;
        player.velocityY = 0;
        player.onGround = true;
    }

    if (resolveUp !== null) {
        player.y = resolveUp;
        player.velocityY = 0;
    }

    // Horizontal
    if (resolveLeft !== null) {
        player.x = resolveLeft;
        player.velocityX = 0;
    }

    if (resolveRight !== null) {
        player.x = resolveRight;
        player.velocityX = 0;
    }
}
