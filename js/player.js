let player = {
    x: 50,
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
    onGround: false
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
}


function drawPlayer(ctx) {
    ctx.fillStyle = "orange";
    ctx.fillRect(
        player.x - camera.x,
        player.y - camera.y,
        player.width,
        player.height
    );
}
