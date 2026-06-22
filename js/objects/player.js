function generateGradientColors(startR, startG, startB, decrement, count) {
    const colors = [];
    let r = startR
    let g = startG;
    let b = startB;

    for (let i = 0; i < count; i++) {
        colors.push(`rgb(${r}, ${g}, ${b})`);
        r = Math.max(0, r - decrement);
        g = Math.max(0, g - decrement);
        b = Math.max(0, b - decrement);
    }

    return colors;
}

const headColors = generateGradientColors(155, 50, 255, 20, 6);



let player = {
    x: 275,
    y: 50,
    width: 32,
    height: 32,
    velocityX: 0,
    velocityY: 0,
    speed: 0.5,        // acceleration
    maxSpeed: 4,       // top running speed
    friction: 0.9,     // friction when on ground
    airFriction: 0.95, // friction in air (less)
    jumpForce: 11,
    onGround: false,
    parts: [
        { x: 0,  y: 0,  w: 26, h: 5, color: headColors[0]}, // head
        { x: 1,  y: 5,  w: 24, h: 5, color: headColors[1] }, // head 2
        { x: 2,  y: 10,  w: 22, h: 5, color: headColors[2] }, // head 3
        { x: 3,  y: 15,  w: 20, h: 5, color: headColors[3] }, // head 4
        { x: 4,  y: 20,  w: 18, h: 5, color: headColors[4] }, // lower head
        { x: 5,  y: 25,  w: 16, h: 20, color: headColors[5] }, // body
    ],
    animationTime: 0,
    jumpAnim: 0,
};

player.hitbox = {
    xOffset: 0,
    yOffset: 0,
    width: 20,
    height: 40
};

function updatePlayer() {
    // Horizontal acceleration
    if (keys.left) {
        player.velocityX -= player.speed;
    }
    if (keys.right) {
        player.velocityX += player.speed;
    }

    // Apply friction
    if (player.onGround) {
        player.velocityX *= player.friction;
    } else {
        player.velocityX *= player.airFriction;
    }

    // Clamp max speed
    if (player.velocityX > player.maxSpeed) player.velocityX = player.maxSpeed;
    if (player.velocityX < -player.maxSpeed) player.velocityX = -player.maxSpeed;

    // Jump
    if (keys.up && player.onGround) {
        player.velocityY = -player.jumpForce;
        player.onGround = false;
    }

    // Gravity
    player.velocityY += 0.5;

    // Apply movement
    player.x += player.velocityX;
    player.y += player.velocityY;

    // Update animation timer
    if (player.onGround && Math.abs(player.velocityX) > 0.2) {
        player.animationTime += 0.2;
    } else {
        player.animationTime = 0; // reset when idle or in air
    }

    // Jump bob animation
    if (!player.onGround) {
        // Rising effect while in air
        player.jumpAnim = Math.min(player.jumpAnim + 0.5, 8);
    } else {
        // Settle back down when grounded
        player.jumpAnim = Math.max(player.jumpAnim - 1, 0);
    }
}

function getPlayerCollisionRects(baseX = player.x, baseY = player.y) {
    if (Array.isArray(player.parts) && player.parts.length) {
        return player.parts.map(part => ({
            x: baseX + part.x,
            y: baseY + part.y,
            width: part.w,
            height: part.h,
            offsetX: part.x,
            offsetY: part.y
        }));
    }

    if (player.hitbox) {
        return [{
            x: baseX + player.hitbox.xOffset,
            y: baseY + player.hitbox.yOffset,
            width: player.hitbox.width,
            height: player.hitbox.height,
            offsetX: player.hitbox.xOffset,
            offsetY: player.hitbox.yOffset
        }];
    }

    return [{
        x: baseX,
        y: baseY,
        width: player.width,
        height: player.height
    }];
}

function drawPlayer(ctx) {
    // Head tilts whenever moving horizontally (ground or air)
    const moving = Math.abs(player.velocityX) > 0.2;
    const dir = moving ? Math.sign(player.velocityX) : 0;
    const vx = player.velocityX;

    let baseOffsets = [3, 2.5, 2, 1.5, 1];
    let vertOffsets = [11, 9, 7, 5, 3];

    if (moving) {
        const speedScale = Math.min(Math.abs(vx) / player.maxSpeed, 1);
        baseOffsets = baseOffsets.map(b => b * speedScale);
    }

    for (let i = 0; i < player.parts.length; i++) {
        const part = player.parts[i];
        const isHead = i <= 4;

        let offsetX = part.x;
        let offsetY = part.y;

        // === HEAD TILT (horizontal movement) ===
        if (moving && i < baseOffsets.length) {
            offsetX = part.x + dir * baseOffsets[i];
        }

        // === HEAD SEPARATION (jump animation) ===
        if (isHead) {
            const bobScale = player.jumpAnim / 8; // 0 → 1
            offsetY = part.y - vertOffsets[i] * bobScale;
        }

        ctx.fillStyle = part.color;

        ctx.fillRect(
            Math.round(player.x + offsetX - camera.x),
            Math.round(player.y + offsetY - camera.y),
            part.w,
            part.h
        );
    }
}
