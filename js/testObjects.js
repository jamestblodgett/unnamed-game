const testObjects = [
    { x: 200, y: 350, width: 50, height: 50, color: "red" },
    { x: 600, y: 300, width: 50, height: 50, color: "blue" },
    { x: 1000, y: 250, width: 50, height: 50, color: "green" },
    { x: 1400, y: 350, width: 50, height: 50, color: "purple" }
];

function drawTestObjects(ctx) {
    for (const obj of testObjects) {
        ctx.fillStyle = obj.color;
        ctx.fillRect(
            obj.x - camera.x,
            obj.y - camera.y,
            obj.width,
            obj.height
        );
    }
}
