const defaultMaxWidth = 200;
const debugMaxWidth = 200;
const lineSpacing = 25;

function getMaxWidth(t) {
    if (typeof t.lineWrap === 'number') {
        return t.lineWrap;
    }
    if (typeof GLOBAL_DEBUG !== 'undefined' && GLOBAL_DEBUG) {
        return debugMaxWidth;
    }
    return defaultMaxWidth;
}

function createText({
    type = "world",
    x,
    y,
    lineX,
    lineY,
    lineWrap = null,
    content,
    color = "white",
    font,
    align = "center",
    maxDistance = 120,
    fadeSpeed = 0.08,
    fadeOnLine = true,
}) {

    if (type === "player"){
        if (content.includes("*")){
            font = "italic 20px Verdana"
        } else {
            font = "20px Verdana";
        }
    } else {
        font = "20px Arial"
    }
    // Keep both legacy and new property names so existing call sites keep working
    return {
        type,
        x,
        y,
        lineX,
        lineY,
        lineWrap,
        content,
        message: content,
        color,
        font,
        align,
        maxDistance,
        range: maxDistance,
        fadeSpeed,
        alpha: 0,
        fadeOnLine,
    };
}

function drawTexts(ctx, level) {
    // Allow calling with no level (legacy call sites pass only ctx)
    level = level || (typeof currentLevel !== 'undefined' ? currentLevel : null);
    const list = (level && (level.texts || level.text)) || [];
    for (const t of list) {
        
        let distX, distY;

        // WORLD TEXT fades based on pointer target (lineX/lineY)
        if (t.type === "world") {
            const lx = (typeof t.lineX === 'number' ? t.lineX : t.x);
            const ly = (typeof t.lineY === 'number' ? t.lineY : t.y);
            
            if (t.fadeOnLine) {
                distX = player.x - lx;
                distY = player.y - ly;
            } else {
                distX = player.x - t.x;
                distY = player.y - t.y;
            }
            
        }

        // PLAYER TEXT fades based on its trigger position (t.x, t.y)
        else if (t.type === "player") {
            distX = player.x - t.x;
            distY = player.y - t.y;
        }

        // fallback
        else {
            distX = player.x - t.x;
            distY = player.y - t.y;
        }

        const dist = Math.sqrt(distX * distX + distY * distY);


        // Target alpha based on distance (0..1)
        const range = (typeof t.range === 'number') ? t.range : (t.maxDistance || 120);
        const target = Math.max(0, 1 - dist / range);

        // Smoothly approach target alpha using fadeSpeed
        t.alpha = Math.max(0, Math.min(1, (t.alpha || 0) + (target - (t.alpha || 0)) * (t.fadeSpeed || 0.08)));
        if (t.alpha <= 0.001) continue;

        ctx.globalAlpha = t.alpha;
        ctx.fillStyle = t.color || "white";
        ctx.font = t.font || "16px sans-serif";
        ctx.textAlign = t.align || "center";

        if (t.type === "world") {
            drawWorldText(ctx, t);
        } else if (t.type === "player") {
            drawPlayerText(ctx, t);
        } else {
            // default to world-style
            drawWorldText(ctx, t);
        }

        ctx.globalAlpha = 1;
    }
}

function drawWorldText(ctx, t) {
    const textX = t.x - camera.x;
    const textY = t.y - camera.y;

    const text = t.message || t.content || "";
    const wrapWidth = getMaxWidth(t);

    // Split into wrapped lines
    const lines = wrapText(ctx, text, wrapWidth);

    // Draw each line
    let y = textY - 20;
    let longestWidth = 0;

    for (let line of lines) {
        const w = ctx.measureText(line).width;
        if (w > longestWidth) longestWidth = w;

        ctx.fillText(line, textX, y);
        y += lineSpacing; // line spacing
    }

    // Underline under the last line
    const underlineY = y - 12;

    ctx.beginPath();
    ctx.moveTo(textX - longestWidth / 2, underlineY);
    ctx.lineTo(textX + longestWidth / 2, underlineY);
    ctx.strokeStyle = t.color || "white";
    ctx.stroke();

    // Pointer line target
    const targetX = (typeof t.lineX === 'number' ? t.lineX : t.x) - camera.x;
    const targetY = (typeof t.lineY === 'number' ? t.lineY : t.y) - camera.y;

    // Pointer line from underline center to target
    ctx.beginPath();
    ctx.moveTo(textX, underlineY);
    ctx.lineTo(targetX, targetY);
    ctx.stroke();
}


function drawPlayerText(ctx, t) {
    const px = player.x - camera.x;
    const py = player.y - camera.y;

    const text = t.message || t.content || "";
    const wrapWidth = getMaxWidth(t);
    const lineSpacing = 18;

    // Wrap into lines
    const lines = wrapText(ctx, text, wrapWidth);

    // Measure longest line
    let longestWidth = 0;
    for (let line of lines) {
        const w = ctx.measureText(line).width;
        if (w > longestWidth) longestWidth = w;
    }

    // Total height of the text block
    const totalHeight = lines.length * lineSpacing;

    // Base position above the player
    let baseY = py - 40;

    // Check if text overlaps the player
    // If the bottom of the text block is too close to the player's head,
    // shift the whole block upward.
    const bottomOfText = baseY + totalHeight;
    const minGap = 15; // how much space to keep above the player

    let shiftY = 0;
    if (bottomOfText > py - minGap) {
        shiftY = bottomOfText - (py - minGap);
    }

    // Draw wrapped lines
    let y = baseY - shiftY;
    for (let line of lines) {
        ctx.fillText(line, px, y);
        y += lineSpacing;
    }

    // Underline under last line
    const underlineY = y - 12;

    ctx.beginPath();
    ctx.moveTo(px - longestWidth / 2, underlineY);
    ctx.lineTo(px + longestWidth / 2, underlineY);
    ctx.strokeStyle = t.color || "white";
    ctx.stroke();
}


function wrapText(ctx, text, maxWidth) {
    if (maxWidth === Infinity) {
        return [text];
    }

    const words = text.split(" ");
    const lines = [];
    let current = "";

    for (let w of words) {
        const test = current.length ? current + " " + w : w;
        if (ctx.measureText(test).width > maxWidth) {
            if (current.length) {
                lines.push(current);
                current = w;
            } else {
                // single word is already longer than maxWidth; keep it on its own line
                lines.push(w);
                current = "";
            }
        } else {
            current = test;
        }
    }
    if (current.length) lines.push(current);

    return lines;
}


function applyAlphaToColor(color, alpha) {
    // If the color is already rgba(), replace the alpha
    if (typeof color === 'string' && color.startsWith("rgba")) {
        return color.replace(/rgba\(([^,]+),([^,]+),([^,]+),([^)]+)\)/,
            (m, r, g, b) => `rgba(${r},${g},${b},${alpha})`);
    }

    // If it's rgb(), convert to rgba()
    if (typeof color === 'string' && color.startsWith("rgb")) {
        return color.replace(/rgb\(([^,]+),([^,]+),([^,]+)\)/,
            (m, r, g, b) => `rgba(${r},${g},${b},${alpha})`);
    }

    // If it's a named color or hex, fallback to white with alpha
    return `rgba(255,255,255,${alpha})`;
}
