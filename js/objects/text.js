function createText({
    x,
    y,
    content,
    color = "white",
    font = "20px Arial",
    align = "center",
    maxDistance = 120,
    fadeSpeed = 0.01
}) {
    return {
        x,
        y,
        content,
        color,
        font,
        align,
        maxDistance,
        fadeSpeed,
        alpha: 0
    };
}


function drawTexts(ctx) {
    if (!currentLevel.texts) return;

    for (const t of currentLevel.texts) {

        // Distance from player to text
        const dx = (t.x - player.x);
        const dy = (t.y - player.y);
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Fade logic
        if (dist < t.maxDistance) {
            t.alpha += t.fadeSpeed ;
            if (t.alpha > 1) t.alpha = 1;
        } else {
            t.alpha -= t.fadeSpeed;
            if (t.alpha < 0) t.alpha = 0;
        }

        // Skip drawing if fully invisible
        if (t.alpha <= 0) continue;

        // Apply camera offset
        const screenX = t.x - camera.x;
        const screenY = t.y - camera.y;

        // Draw text with alpha
        ctx.font = t.font;
        ctx.fillStyle = applyAlphaToColor(t.color, t.alpha);
        ctx.textAlign = t.align;

        ctx.fillText(t.content, screenX, screenY);
    }
}

function applyAlphaToColor(color, alpha) {
    // If the color is already rgba(), replace the alpha
    if (color.startsWith("rgba")) {
        return color.replace(/rgba\(([^,]+),([^,]+),([^,]+),([^)]+)\)/,
            (m, r, g, b) => `rgba(${r},${g},${b},${alpha})`);
    }

    // If it's rgb(), convert to rgba()
    if (color.startsWith("rgb")) {
        return color.replace(/rgb\(([^,]+),([^,]+),([^,]+)\)/,
            (m, r, g, b) => `rgba(${r},${g},${b},${alpha})`);
    }

    // If it's a named color or hex, fallback to white with alpha
    return `rgba(255,255,255,${alpha})`;
}
