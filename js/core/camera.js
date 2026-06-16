const camera = {
    x: 0,
    y: 0,
    width: 800,   // same as canvas
    height: 450,
    followSpeed: 0.1 // how smoothly the camera follows
};

function updateCamera() {
    // Center camera on player
    const targetX = player.x + player.width / 2 - camera.width / 2;
    const targetY = player.y + player.height / 2 - camera.height / 2;

    // Smooth follow (lerp)
    camera.x += (targetX - camera.x) * camera.followSpeed;
    camera.y += (targetY - camera.y) * camera.followSpeed;
}
