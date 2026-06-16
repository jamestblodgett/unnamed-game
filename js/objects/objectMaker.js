function floatingPlatform({ x, y, width = 100, height = 20 }) {
    return [{
        x,
        y,
        width,
        height
    }];
}

function wall({ x, y, height = 200, width = 20 }) {
    return [{
        x,
        y,
        width,
        height
    }];
}

const WORLD_BOTTOM = 1200;

function standingPlatform({ x, topY, width = 40 }) {
    return [{
        x,
        y: topY,
        width,
        height: WORLD_BOTTOM - topY
    }];
}

function box({
    x,
    y,
    width = 200,
    height = 200,
    wallThickness = 20,
    doorSide = null, // "left", "right", "both", or null
    doorSize = 60
}) {
    const platforms = [];

    // --- SIDE WALLS FIRST (placed between top & bottom walls) ---
    const innerTop = y + wallThickness;
    const innerHeight = Math.max(0, height - wallThickness * 2);

    // LEFT WALL
    if (doorSide === "left" || doorSide === "both") {
        const sideHeight = Math.max(0, innerHeight - doorSize);
        if (sideHeight > 0) {
            platforms.push({
                x,
                y: innerTop,
                width: wallThickness,
                height: sideHeight
            });
        }
    } else {
        // full left wall (between top and bottom)
        platforms.push({
            x,
            y: innerTop,
            width: wallThickness,
            height: innerHeight
        });
    }

    // RIGHT WALL
    const rightX = x + width - wallThickness;
    if (doorSide === "right" || doorSide === "both") {
        const sideHeight = Math.max(0, innerHeight - doorSize);
        if (sideHeight > 0) {
            platforms.push({
                x: rightX,
                y: innerTop,
                width: wallThickness,
                height: sideHeight
            });
        }
    } else {
        platforms.push({
            x: rightX,
            y: innerTop,
            width: wallThickness,
            height: innerHeight
        });
    }

    // --- TOP WALL ---
    platforms.push({
        x,
        y,
        width,
        height: wallThickness
    });

    // --- BOTTOM WALL ---
    platforms.push({
        x,
        y: y + height - wallThickness,
        width,
        height: wallThickness
    });

    return platforms;
}

function stairs({
    direction = "right", // "right" or "left"
    x,
    y,
    stepWidth = 32,
    stepHeight = 32,
    steps = 5    
}) {
    const platforms = [];
    for (let i = 0; i < steps; i++) {
        platforms.push({
            x: direction === "right" ? x + i * stepWidth : x - i * stepWidth,
            y: y - i * stepHeight,
            width: stepWidth + 1,
            height: stepHeight * i
        });
    }
    return platforms;
};

function lantern({
    x,
    y,
    width = 30,
    height = 35,
    wall = false // False, right, or left (for lanterns hanging on walls)
    }) {
    
    const platforms = [];
    // Post
    if (wall === "false") {
            platforms.push({
            x,
            y,
            width: width,
            height: 5,
        });
    } else if (wall === "right") {
        platforms.push({
            x,
            y,
            width: width + 8,
            height: 5,
        });
    } else {
        platforms.push({
            x: x - 8,
            y,
            width: width + 8,
            height: 5,
        });
    }
        
    

    // Center pillar
    platforms.push({ // Center beam
        x: x + ((width / 2) - 2),
        y: y + 2,
        width: 4,
        height: 35,
    });
    platforms.push({ // Center middle
        x: x + ((width / 2) - 3),
        y: height - 31 + y,
        width: 6,
        height: height/2,
    });
    platforms.push({ // Center top
        x: x + ((width / 2) - 4),
        y: height - 31 + y,
        width: 8,
        height: height/4,
    });

    
    // Bulb
    platforms.push({ // Beam 1
        x: x + ((width / 2) - 7),
        y: height - 3 + y,
        width: 14,
        height: 4,
    });
    platforms.push({ // Beam 2
        x: x + ((width / 2) - 10),
        y: height - 7 + y,
        width: 20,
        height: 2,
    });
    platforms.push({ // Beam 3
        x: x + ((width / 2) - 12),
        y: height - 11 + y,
        width: 24,
        height: 2,
    });
    platforms.push({ // Beam 4
        x: x + ((width / 2) - 13),
        y: height - 15 + y,
        width: 26,
        height: 2,
    });
    platforms.push({ // Beam 5
        x: x + ((width / 2) - 12),
        y: height - 19 + y,
        width: 24,
        height: 2,
    });
    platforms.push({ // Beam 6
        x: x + ((width / 2) - 10),
        y: height - 23 + y,
        width: 20,
        height: 2,
    });
    platforms.push({ // Beam 7
        x: x + ((width / 2) - 8),
        y: height - 27 + y,
        width: 16,
        height: 2,
    });
    platforms.push({ // Beam 8
        x: x + ((width / 2) - 8),
        y: height - 31 + y,
        width: 16,
        height: 2,
    });
    return platforms;
}

function createDoor({ x, y, width = 40, height = 60, targetLevel, spawnX = null, spawnY = null }) {
    return {
        x,
        y,
        width,
        height,
        targetLevel,
        spawnX,
        spawnY
    };
}