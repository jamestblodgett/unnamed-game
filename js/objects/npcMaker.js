
function tintColor(colorInput, amount = 0) {
    const match = /\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*/.exec(colorInput || "");
    if (!match) return colorInput;

    const r = Math.max(0, Math.min(255, Number(match[1]) + amount));
    const g = Math.max(0, Math.min(255, Number(match[2]) + amount));
    const b = Math.max(0, Math.min(255, Number(match[3]) + amount));
    return `rgb(${r}, ${g}, ${b})`;
}

function createGhostCharacter({
    x = 0,
    y = 0,
    width = 24,
    height = 44,
    color = "rgb(255, 255, 255)",
    r = 255,
    g = 255,
    b = 255,
    animations = {},
    properties = {},
    hitbox = null,
    parts,
    instanceOverrides = {},
    ...rest
} = {}) {
    const baseColor = color || `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
    const model = createCharacterModel({
        name: rest.name || "ghost",
        width,
        height,
        parts: parts || [
            createCharacterPart({ x: 0, y: 0, w: width, h: 4, color: tintColor(baseColor, 0) }),
            createCharacterPart({ x: 1, y: 4, w: width - 2, h: 4, color: tintColor(baseColor, -20) }),
            createCharacterPart({ x: 2, y: 8, w: width - 4, h: 4, color: tintColor(baseColor, -40) }),
            createCharacterPart({ x: 3, y: 12, w: width - 6, h: 4, color: tintColor(baseColor, -60) }),
            createCharacterPart({ x: 4, y: 16, w: width - 8, h: 16, color: tintColor(baseColor, -80) }),
        ],
        animations: {
            tilt: { enabled: true, strength: 4 },
            bob: { enabled: true, strength: 2 },
            ...animations
        },
        properties: {
            speed: 0.35,
            maxSpeed: 3.5,
            jumpForce: 9,
            ...properties
        },
        hitbox
    });

    return createCharacterInstance(model, x, y, {
        ...rest,
        ...instanceOverrides
    });
}

function createCustomCharacterVariant(options = {}) {
    return createGhostCharacter(options);
}

function createPlayerVariants() {
    const columns = 14;
    const spacingX = 100;
    const spacingY = 0;
    const startX = 50;
    const startY = -45;

    return PLAYER_COLORS.map((entry, index) => {
        const row = Math.floor(index / columns);
        const col = index % columns;
        return makePlayerVariant(entry, startX + col * spacingX, startY + row * spacingY);
    });
}