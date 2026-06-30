function generateGradientColors(startR, startG, startB, decrement, count) {
    const colors = [];
    let r = startR;
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

// Default player configuration values.
const DEFAULT_PLAYER_COLOR = "PURPLE";
const DEFAULT_PLAYER_WIDTH = 26;
const DEFAULT_PLAYER_HEIGHT = 45;

// Base definitions for the player body parts.
// Each entry is a relative rectangle for the player's stacked body segments.
const PLAYER_PART_DEFINITIONS = [
    { x: 0,  y: 0,  w: 26, h: 5 },
    { x: 1,  y: 5,  w: 24, h: 5 },
    { x: 2,  y: 10, w: 22, h: 5 },
    { x: 3,  y: 15, w: 20, h: 5 },
    { x: 4,  y: 20, w: 18, h: 5 },
    { x: 5,  y: 25, w: 16, h: 20 },
];

// Per-color gradient step sizes.
// Use this object when generating player head colors.
const PLAYER_COLOR_DECAYS = {
    RED: 30,
    ORANGE: 26,
    YELLOW: 28,
    GREEN: 27,
    BLUE: 21,
    PINK: 25,
    PURPLE: 21,
    WHITE: 25,
    LIGHTGREY: 25,
    MIDGREY: 25,
    DARKGREY: 25,
    BLACK: 25,
    BROWN: 25,
    CYAN: 25,
};

// Normalize any color input into a canonical uppercase color name.
// Accepts strings or objects with a name property.
function normalizePlayerColorName(colorNameOrObj) {
    if (!colorNameOrObj) return DEFAULT_PLAYER_COLOR;
    if (typeof colorNameOrObj === 'string') return colorNameOrObj.trim().toUpperCase();
    if (typeof colorNameOrObj === 'object') {
        if (colorNameOrObj.name) return colorNameOrObj.name.trim().toUpperCase();
        if (colorNameOrObj.color && colorNameOrObj.r != null) return DEFAULT_PLAYER_COLOR;
    }
    return DEFAULT_PLAYER_COLOR;
}

// Look up a player color entry from PLAYER_COLORS.
// If the passed value is already a full color entry object, return it unchanged.
function getPlayerColorEntry(colorNameOrObj) {
    if (typeof colorNameOrObj === 'object' && colorNameOrObj.color && colorNameOrObj.name) {
        return colorNameOrObj;
    }

    const normalizedName = normalizePlayerColorName(colorNameOrObj);
    return PLAYER_COLORS.find(entry => entry.name === normalizedName)
        || PLAYER_COLORS.find(entry => entry.name === DEFAULT_PLAYER_COLOR);
}

// Get the gradient decrement amount for a given player color.
function getPlayerColorDecrement(colorNameOrObj) {
    const name = normalizePlayerColorName(colorNameOrObj);
    return PLAYER_COLOR_DECAYS[name] || 25;
}

// Build the player body part array from generated head colors.
function createPlayerParts(headColors) {
    return PLAYER_PART_DEFINITIONS.map((def, index) => ({
        ...def,
        color: headColors[index] || headColors[headColors.length - 1] || 'rgb(255, 255, 255)'
    }));
}

// Generate the head gradient colors for the requested color.
function getPlayerHeadColors(colorNameOrObj) {
    const entry = getPlayerColorEntry(colorNameOrObj);
    const decrement = getPlayerColorDecrement(entry.name);
    return generateGradientColors(entry.color.r, entry.color.g, entry.color.b, decrement, PLAYER_PART_DEFINITIONS.length + 1);
}

// Create a fresh player object instance with shared default shape and color behavior.
function createPlayerInstance(colorNameOrObj, x = 0, y = 0) {
    const colorEntry = getPlayerColorEntry(colorNameOrObj);
    const headColors = getPlayerHeadColors(colorEntry.name);

    return {
        name: colorEntry.name,
        x,
        y,
        width: DEFAULT_PLAYER_WIDTH,
        height: DEFAULT_PLAYER_HEIGHT,
        velocityX: 0,
        velocityY: 0,
        onGround: false,
        speed: 0.5,
        maxSpeed: 4,
        friction: 0.9,
        airFriction: 0.95,
        jumpForce: 11,
        animationTime: 0,
        jumpAnim: 0,
        parts: createPlayerParts(headColors),
    };
}

// Helper for playerTest.js to create a variant entry using the shared factory.
function makePlayerVariant(colorObj, x = 0, y = 0) {
    return createPlayerInstance(colorObj, x, y);
}

// Backwards compatibility helper used by legacy level scripts.
function createPlayerVariant(colorObj, x = 0, y = 0) {
    return makePlayerVariant(colorObj, x, y);
}

// The actual active player uses DEFAULT_PLAYER_COLOR unless overridden.
const ACTIVE_PLAYER_COLOR = DEFAULT_PLAYER_COLOR;
let player = createPlayerInstance(ACTIVE_PLAYER_COLOR, 275, 50);

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

function drawPlayer(ctx, playerObject = player) {
    // Head tilts whenever moving horizontally (ground or air)
    const moving = Math.abs(playerObject.velocityX) > 0.2;
    const dir = moving ? Math.sign(playerObject.velocityX) : 0;
    const vx = playerObject.velocityX;

    let baseOffsets = [3, 2.5, 2, 1.5, 1];
    let vertOffsets = [11, 9, 7, 5, 3];

    if (moving) {
        const speedScale = Math.min(Math.abs(vx) / (playerObject.maxSpeed || player.maxSpeed), 1);
        baseOffsets = baseOffsets.map(b => b * speedScale);
    }

    for (let i = 0; i < playerObject.parts.length; i++) {
        const part = playerObject.parts[i];
        const isHead = i <= 4;

        let offsetX = part.x;
        let offsetY = part.y;

        // === HEAD TILT (horizontal movement) ===
        if (moving && i < baseOffsets.length) {
            offsetX = part.x + dir * baseOffsets[i];
        }

        // === HEAD SEPARATION (jump animation) ===
        if (isHead) {
            const bobScale = (playerObject.jumpAnim || 0) / 8; // 0 → 1
            offsetY = part.y - vertOffsets[i] * bobScale;
        }

        ctx.fillStyle = part.color;

        ctx.fillRect(
            Math.round(playerObject.x + offsetX - camera.x),
            Math.round(playerObject.y + offsetY - camera.y),
            part.w,
            part.h
        );
    }
}

function drawPlayerVariants(ctx) {
    // Draw any extra test players defined by the current level.
    // These are visual-only variants and do not participate in player input.
    if (!currentLevel?.playerVariants || !Array.isArray(currentLevel.playerVariants)) return;
    for (const variant of currentLevel.playerVariants) {
        drawPlayer(ctx, variant);
    }
}
