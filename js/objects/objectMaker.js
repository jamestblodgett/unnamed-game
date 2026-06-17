function floatingPlatform({ x, y, width = 100, height = 20, collide = true }) {
    return [{
        x,
        y,
        width,
        height,
        collide
    }];
}

function wall({ x, y, height = 200, width = 20, collide = true }) {
    return [{
        x,
        y,
        width,
        height,
        collide
    }];
}

const WORLD_BOTTOM = 1200;

function standingPlatform({ x, topY, width = 40, collide = true }) {
    return [{
        x,
        y: topY,
        width,
        height: WORLD_BOTTOM - topY,
        collide
    }];
}

function box({
    x,
    y,
    width = 200,
    height = 200,
    wallThickness = 20,
    doorSide = null, // "left", "right", "both", or null
    doorSize = 60,
    collide = true
}) {
    const platforms = [];

    // --- SIDE WALLS FIRST (so they don't get hidden) ---

    // LEFT WALL
    if (doorSide === "left" || doorSide === "both") {
        // left wall with bottom door gap
        platforms.push({
            x,
            y,
            width: wallThickness,
            height: height - doorSize,
            collide
        });
    } else {
        // full left wall
        platforms.push({
            x,
            y,
            width: wallThickness,
            height,
            collide
        });
    }

    // RIGHT WALL
    if (doorSide === "right" || doorSide === "both") {
        platforms.push({
            x: x + width - wallThickness,
            y,
            width: wallThickness,
            height: height - doorSize,
            collide
        });
    } else {
        platforms.push({
            x: x + width - wallThickness,
            y,
            width: wallThickness,
            height,
            collide
        });
    }

    // --- TOP WALL ---
    platforms.push({
        x,
        y,
        width,
        height: wallThickness,
        collide
    });

    // --- BOTTOM WALL ---
    platforms.push({
        x,
        y: y + height - wallThickness,
        width,
        height: wallThickness,
        collide
    });

    return platforms;
}


function stairs({
    direction = "right", // "right" or "left"
    x,
    y,
    stepWidth = 32,
    stepHeight = 32,
    steps = 5,
    collide = true
}) {
    const platforms = [];
    for (let i = 0; i < steps; i++) {
        platforms.push({
            x: direction === "right" ? x + i * stepWidth : x - i * stepWidth,
            y: y - i * stepHeight,
            width: stepWidth + 1,
            height: stepHeight * i,
            collide
        });
    }
    return platforms;
};

function lantern({
    x,
    y,
    scale = 1,
    width = 30,
    height = 35,
    wall = false, // False, right, or left (for lanterns hanging on walls)
    collide = true
    }) {
    
    const platforms = [];
    // Post
    if (wall === false) {
            platforms.push({
            x,
            y,
            width: width,
            height: height/7,
            collide
        });
    } else if (wall === "right") {
        platforms.push({
            x,
            y,
            width: width + 8,
            height: height/7,
            collide
        });
    } else {
        platforms.push({
            x: x - 8,
            y,
            width: width + 8,
            height: 5,
            collide
        });
    }
    platforms.push({
        x: x + 3,
        y: y - 2,
        width: width - 6,
        height: 4,
        collide
    });
        
    

    // Center pillar
    platforms.push({ // Center beam
        x: x + ((width / 2) - 2),
        y: y + 2,
        width: 4,
        height: 35,
        collide
    });
    platforms.push({ // Center middle
        x: x + ((width / 2) - 3),
        y: height - 31 + y,
        width: 6,
        height: height/2,
        collide
    });
    platforms.push({ // Center top
        x: x + ((width / 2) - 4),
        y: height - 31 + y,
        width: 8,
        height: height/4,
        collide
    });

    
    // Bulb
    platforms.push({ // Beam 1
        x: x + ((width / 2) - 7),
        y: height - 3 + y,
        width: 14,
        height: 4,
        collide
    });
    platforms.push({ // Beam 2
        x: x + ((width / 2) - 10),
        y: height - 7 + y,
        width: 20,
        height: 2,
        collide
    });
    platforms.push({ // Beam 3
        x: x + ((width / 2) - 12),
        y: height - 11 + y,
        width: 24,
        height: 2,
        collide
    });
    platforms.push({ // Beam 4
        x: x + ((width / 2) - 13),
        y: height - 15 + y,
        width: 26,
        height: 2,
        collide
    });
    platforms.push({ // Beam 5
        x: x + ((width / 2) - 12),
        y: height - 19 + y,
        width: 24,
        height: 2,
        collide
    });
    platforms.push({ // Beam 6
        x: x + ((width / 2) - 10),
        y: height - 23 + y,
        width: 20,
        height: 2,
        collide
    });
    platforms.push({ // Beam 7
        x: x + ((width / 2) - 8),
        y: height - 27 + y,
        width: 16,
        height: 2,
        collide
    });
    platforms.push({ // Beam 8
        x: x + ((width / 2) - 8),
        y: height - 31 + y,
        width: 16,
        height: 2,
        collide
    });
    return platforms;
}

function slope({ x, y, width, height, direction = "right", steps = 10, collide = true}) {
    const segments = [];
    
    for (let i = 0; i < steps; i++) {
        const segmentHeight = height / steps;
        const segmentWidth = width / steps;

        const segX = direction === "right"
            ? x + i * segmentWidth
            : x + width - (i + 1) * segmentWidth;

        const segY = y + i * segmentHeight;

        segments.push({
            x: segX,
            y: segY,
            width: segmentWidth,
            height: segmentHeight,
            collide
        });
    }
    return segments;
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