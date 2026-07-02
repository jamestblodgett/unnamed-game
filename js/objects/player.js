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

function createCharacterPart(definition = {}) {
    return {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        color: 'rgb(255, 255, 255)',
        ...definition
    };
}

function createCharacterModel(options = {}) {
    const animations = {
        tilt: { enabled: false, strength: 2, speed: 1 },
        bob: { enabled: false, strength: 1, speed: 1 },
        ...(options.animations || {})
    };

    animations.tilt = {
        ...(animations.tilt || {}),
        ...((options.animations && options.animations.tilt) || {})
    };

    animations.bob = {
        ...(animations.bob || {}),
        ...((options.animations && options.animations.bob) || {})
    };

    return {
        name: options.name || 'character',
        width: options.width || DEFAULT_PLAYER_WIDTH,
        height: options.height || DEFAULT_PLAYER_HEIGHT,
        parts: Array.isArray(options.parts)
            ? options.parts.map(part => createCharacterPart(part))
            : [],
        animations,
        properties: {
            speed: 0.5,
            maxSpeed: 4,
            friction: 0.9,
            airFriction: 0.95,
            jumpForce: 11,
            ...(options.properties || {})
        },
        hitbox: options.hitbox || null
    };
}

function resolveCharacterModel(modelOrDefinition) {
    if (modelOrDefinition && Array.isArray(modelOrDefinition.parts) && modelOrDefinition.name) {
        return modelOrDefinition;
    }

    return createCharacterModel({
        name: modelOrDefinition && modelOrDefinition.name ? modelOrDefinition.name : 'character',
        width: modelOrDefinition && modelOrDefinition.width ? modelOrDefinition.width : DEFAULT_PLAYER_WIDTH,
        height: modelOrDefinition && modelOrDefinition.height ? modelOrDefinition.height : DEFAULT_PLAYER_HEIGHT,
        parts: modelOrDefinition && Array.isArray(modelOrDefinition.parts) ? modelOrDefinition.parts : []
    });
}

function createCharacterInstance(modelOrDefinition, x = 0, y = 0, overrides = {}) {
    const sourceModel = resolveCharacterModel(modelOrDefinition);
    const baseParts = Array.isArray(sourceModel.parts) ? sourceModel.parts.map(part => ({ ...part })) : [];
    const instance = {
        model: sourceModel,
        name: sourceModel.name,
        x,
        y,
        width: sourceModel.width,
        height: sourceModel.height,
        velocityX: 0,
        velocityY: 0,
        onGround: false,
        parts: baseParts,
        state: {
            animationTime: 0,
            jumpAnim: 0,
            tilt: 0,
            bob: 0
        },
        properties: { ...(sourceModel.properties || {}) },
        ...overrides
    };

    if (!Array.isArray(instance.parts) || !instance.parts.length) {
        instance.parts = baseParts;
    }

    Object.keys(instance.properties).forEach(key => {
        if (typeof instance[key] === 'undefined') {
            instance[key] = instance.properties[key];
        }
    });

    if (sourceModel.hitbox) {
        instance.hitbox = { ...sourceModel.hitbox };
    }

    return instance;
}

function applyCharacterProperties(character, properties = {}) {
    if (!character) return character;
    if (!character.properties) {
        character.properties = {};
    }

    Object.assign(character.properties, properties);

    Object.keys(properties).forEach(key => {
        character[key] = properties[key];
    });

    return character;
}

function updateCharacterAnimation(character, delta = 1) {
    if (!character) return character;
    const state = character.state || (character.state = {});
    const moving = Math.abs(character.velocityX) > 0.2;
    const dir = moving ? Math.sign(character.velocityX) : 0;
    const tiltAnimation = character.model && character.model.animations && character.model.animations.tilt;
    const bobAnimation = character.model && character.model.animations && character.model.animations.bob;

    if (moving && tiltAnimation && tiltAnimation.enabled) {
        const strength = tiltAnimation.strength || 2;
        state.tilt = dir * strength;
    } else {
        state.tilt = 0;
    }

    if (character.onGround && Math.abs(character.velocityX) > 0.2) {
        state.animationTime += 0.2 * delta;
    } else {
        state.animationTime = 0;
    }

    if (!character.onGround) {
        const jumpGain = (bobAnimation && bobAnimation.speed) ? bobAnimation.speed : 1;
        state.jumpAnim = Math.min((state.jumpAnim || 0) + 0.5 * jumpGain * delta, 8);
    } else {
        const jumpDecay = (bobAnimation && bobAnimation.speed) ? bobAnimation.speed : 1;
        state.jumpAnim = Math.max((state.jumpAnim || 0) - 1 * jumpDecay * delta, 0);
    }

    return character;
}

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
    const model = createCharacterModel({
        name: colorEntry.name,
        width: DEFAULT_PLAYER_WIDTH,
        height: DEFAULT_PLAYER_HEIGHT,
        parts: createPlayerParts(headColors),
        animations: {
            tilt: { enabled: true, strength: 2.5, speed: 1 },
            bob: { enabled: true, strength: 1, speed: 1 }
        },
        properties: {
            speed: 0.5,
            maxSpeed: 4,
            friction: 0.9,
            airFriction: 0.95,
            jumpForce: 11
        }
    });

    return createCharacterInstance(model, x, y);
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
    const speed = typeof player.speed !== 'undefined' ? player.speed : (player.properties && player.properties.speed);
    const friction = typeof player.friction !== 'undefined' ? player.friction : (player.properties && player.properties.friction);
    const airFriction = typeof player.airFriction !== 'undefined' ? player.airFriction : (player.properties && player.properties.airFriction);
    const maxSpeed = typeof player.maxSpeed !== 'undefined' ? player.maxSpeed : (player.properties && player.properties.maxSpeed);
    const jumpForce = typeof player.jumpForce !== 'undefined' ? player.jumpForce : (player.properties && player.properties.jumpForce);

    if (keys.left) {
        player.velocityX -= speed;
    }
    if (keys.right) {
        player.velocityX += speed;
    }

    if (player.onGround) {
        player.velocityX *= friction;
    } else {
        player.velocityX *= airFriction;
    }

    if (player.velocityX > maxSpeed) player.velocityX = maxSpeed;
    if (player.velocityX < -maxSpeed) player.velocityX = -maxSpeed;

    if (keys.up && player.onGround) {
        player.velocityY = -jumpForce;
        player.onGround = false;
    }

    player.velocityY += 0.5;
    player.x += player.velocityX;
    player.y += player.velocityY;

    updateCharacterAnimation(player);
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

function drawCharacter(ctx, characterObject = player, cameraObject = camera) {
    const moving = Math.abs(characterObject.velocityX) > 0.2;
    const dir = moving ? Math.sign(characterObject.velocityX) : 0;
    const vx = characterObject.velocityX;
    const speedScale = moving ? Math.min(Math.abs(vx) / (characterObject.maxSpeed || 4), 1) : 0;
    const tiltAnimation = characterObject.model && characterObject.model.animations && characterObject.model.animations.tilt;
    const bobAnimation = characterObject.model && characterObject.model.animations && characterObject.model.animations.bob;
    const parts = Array.isArray(characterObject.parts) && characterObject.parts.length
        ? characterObject.parts
        : (characterObject.model && Array.isArray(characterObject.model.parts) ? characterObject.model.parts : []);

    if (!parts.length) {
        ctx.fillStyle = characterObject.color || "white";
        ctx.fillRect(
            Math.round(characterObject.x - (cameraObject ? cameraObject.x : 0)),
            Math.round(characterObject.y - (cameraObject ? cameraObject.y : 0)),
            characterObject.width || 20,
            characterObject.height || 20
        );
        return;
    }

    const baseOffsets = [3, 2.5, 2, 1.5, 1];
    const vertOffsets = [11, 9, 7, 5, 3];
    const animatedOffsets = moving
        ? baseOffsets.map(b => b * speedScale)
        : baseOffsets;

    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        const isHead = i <= 4;
        let offsetX = part.x;
        let offsetY = part.y;

        if (moving && i < animatedOffsets.length) {
            offsetX = part.x + dir * animatedOffsets[i];
        }

        if (tiltAnimation && tiltAnimation.enabled && moving) {
            offsetX = part.x + dir * (tiltAnimation.strength || 2) * speedScale;
        }

        if (isHead && bobAnimation && bobAnimation.enabled) {
            const bobScale = ((characterObject.state && characterObject.state.jumpAnim) || 0) / 8;
            offsetY = part.y - vertOffsets[i] * bobScale;
        }

        ctx.fillStyle = part.color;
        ctx.fillRect(
            Math.round(characterObject.x + offsetX - (cameraObject ? cameraObject.x : 0)),
            Math.round(characterObject.y + offsetY - (cameraObject ? cameraObject.y : 0)),
            part.w,
            part.h
        );
    }
}

function drawPlayer(ctx, playerObject = player) {
    drawCharacter(ctx, playerObject, camera);
}

function drawPlayerVariants(ctx) {
    if (!currentLevel?.playerVariants || !Array.isArray(currentLevel.playerVariants)) return;
    for (const variant of currentLevel.playerVariants) {
        drawPlayer(ctx, variant);
    }
}
