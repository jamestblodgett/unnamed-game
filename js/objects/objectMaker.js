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
    // Top
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
    // Slight curve on top
    platforms.push({
        x: x + 3,
        y: y - 2,
        width: width - 6,
        height: 4,
        collide
    });
        
    

    // Center pillar
    platforms.push({ // Center beam
        x: x + ((width / 2) - 1),
        y: y + 2,
        width: 2,
        height: 33,
        collide
    });

    platforms.push({ // Bulb top
        x: x + ((width / 2) - 3.5),
        y: y + 12,
        width: 7,
        height: 3,
        collide
    });
    platforms.push({ // Bulb Main
        x: x + ((width / 2) - 5),
        y: y + 14,
        width: 10,
        height: 15,
        collide
    });
    // platforms.push({ // Bulb Center (for a rounder look)
    //     x: x + ((width / 2) - 6.5),
    //     y: y + 16,
    //     width: 13,
    //     height: 11,
    //     collide
    // });
    platforms.push({ // Bulb bottom
        x: x + ((width / 2) - 3.5),
        y: y + 28,
        width: 7,
        height: 3,
        collide
    });

    
    // Beams
    let beamWidth = 8;
    let beamSwitch = 2;
    for (let i = y + 3; i < y + height; i += 4){
        
        
        platforms.push({ // Beam
            x: x + ((width / 2) - beamWidth),
            y: i,
            width: beamWidth * 2,
            height: 1,
            collide
        });

        // increment beamWidth
        if (i > y + 12 || beamWidth > width) {
            beamSwitch = -1;
        }
        beamWidth += beamSwitch;
    }

    platforms.push({ // Bottom
        x: x + ((width / 2) - beamWidth),
        y: y + 34,
        width: beamWidth * 2,
        height: 3,
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

function standingSlope({
    x,
    y,
    width,
    height,
    direction = "right",
    steps = 10,
    collide = true
}) {
    const segments = [];

    const segmentWidth = width / steps;

    for (let i = 0; i < steps; i++) {
        // Width stays constant per pillar
        const w = segmentWidth;

        // Height grows downward
        const h = height * ((steps - i) / steps);

        // X shifts inward each step
        const segX = direction === "right"
            ? x + i * segmentWidth
            : x + width - (i + 1) * segmentWidth;

        // Y stays at the top
        const segY = y + i * (height / steps);

        segments.push({
            x: segX,
            y: segY,
            width: w,
            height: h,
            collide
        });
    }

    return segments;
}

function bed({ x, y, width = 100, height = 32, direction = "left", collide = false}) {
    const parts = [];
    parts.push({ // left leg
        x,
        y: y + 22,
        width: 10,
        height: 10,
        collide,
    });

    parts.push({ // right leg
        x: x + 90,
        y: y + 22,
        width: 10,
        height: 10,
        collide,
    });

    parts.push({ // Blanket
        x,
        y: y + 7,
        width: 100,
        height: 12,
        collide,
    });

    if (direction === "right"){
        parts.push({
            x: x + 70,
            y,
            width: 30,
            height: 4,
            collide,
        })
    } else {
        parts.push({
            x,
            y,
            width: 30,
            height: 4,
            collide,
        })
    }

    return parts;
};

function dresser({ x, y, width = 80, height = 100, shelves = 2, collide = false}) {
    const parts = [];

    parts.push({ // left leg
        x,
        y: y + 90,
        width: 10,
        height: 10,
        collide,
    });

    parts.push({ // right leg
        x: x + 70,
        y: y + 90,
        width: 10,
        height: 10,
        collide,
    });

    if (shelves === 2){
        parts.push({ // top
        x,
        y,
        width: 80,
        height: 10,
        collide,
        });

        parts.push({ // left side
            x,
            y: y + 12,
            width: 10,
            height: 64,
            collide,
        });

        parts.push({ // right side
            x: x + 70,
            y: y + 12,
            width: 10,
            height: 64,
            collide,
        });
    } else {
        parts.push({ // top
        x,
        y: y + 30,
        width: 80,
        height: 10,
        collide,
        });

        parts.push({ // left side
            x,
            y: y + 42,
            width: 10,
            height: 34,
            collide,
        });

        parts.push({ // right side
            x: x + 70,
            y: y + 42,
            width: 10,
            height: 34,
            collide,
        });
    }
    
    parts.push({ // bottom
        x,
        y: y + 78,
        width: 80,
        height: 10,
        collide,
    });
    

    // drawer 1
    if (shelves === 2) {
        const drawer1Y = y + 12;
        parts.push({ // Top
            x: x + 12,
            y: drawer1Y,
            width: 56,
            height: 10,
            collide,
        });

        parts.push({ // Bottom
            x: x + 12,
            y: drawer1Y + 16,
            width: 56,
            height: 12,
            collide,
        });

        parts.push({ // Left
            x: x + 12,
            y: drawer1Y,
            width: 15,
            height: 28,
            collide,
        });

        parts.push({ // Right
            x: x + 53,
            y: drawer1Y,
            width: 15,
            height: 28,
            collide,
        });
    }

    


    // Drawer 2
    const drawer2Y = y + 43;
    parts.push({ // Top
        x: x + 12,
        y: drawer2Y,
        width: 56,
        height: 13,
        collide,
    });

    parts.push({ // Bottom
        x: x + 12,
        y: drawer2Y + 19,
        width: 56,
        height: 13,
        collide,
    });

    parts.push({ // Left
        x: x + 12,
        y: drawer2Y,
        width: 15,
        height: 30,
        collide,
    });

    parts.push({ // Right
        x: x + 53,
        y: drawer2Y,
        width: 15,
        height: 30,
        collide,
    });
    return parts;

};

function shelf({
    x,
    y,
    width = 80,
    height = 60,
    collide = false,
    books = true,
    topShelf = true
}) {
    const parts = [];

    const legWidth = 10;
    const legHeight = 10;

    const shelfThickness = 10;

    // --- 1. Legs: left, right, and evenly spaced inner legs ---

    const targetSpacing = 40;

    const innerWidth = width - legWidth;
    const innerLegCount = Math.max(0, Math.floor(innerWidth / targetSpacing) - 1);
    const totalLegs = innerLegCount + 2;

    for (let i = 0; i < totalLegs; i++) {
        const t = (totalLegs === 1) ? 0 : i / (totalLegs - 1);
        const lx = x + t * (width - legWidth);

        parts.push({
            x: lx,
            y: y + height - legHeight,
            width: legWidth,
            height: legHeight,
            collide
        });
    }

    // --- 2. Shelves: bottom shelf always, top shelf optional ---

    const bottomShelfY = y + height - legHeight - shelfThickness;

    const topMargin = 20; // space for books + visual breathing room
    const usableHeight = bottomShelfY - (y + topMargin);

    const shelfSpacing = 40;

    const shelfCount = Math.max(1, Math.floor(usableHeight / shelfSpacing));

    for (let i = 0; i < shelfCount; i++) {
        const sy = bottomShelfY - i * shelfSpacing;

        // Skip top shelf if disabled
        if (!topShelf && sy <= y + 2) continue;
        if (sy < y + topMargin) break;

        // Shelf plank
        parts.push({
            x,
            y: sy,
            width,
            height: shelfThickness,
            collide
        });

        // Force a top shelf if enabled and not already created
    if (topShelf) {
        const topY = y + topMargin;

        // Check if a shelf already exists near the top
        const hasTopShelf = parts.some(p =>
            p.y >= topY - 2 && p.y <= topY + 2 && p.height === shelfThickness
        );

        if (!hasTopShelf) {
            parts.push({
                x,
                y: topY,
                width,
                height: shelfThickness,
                collide
            });
        }
    }


        // --- 3. Books on this shelf ---
        if (books) {
    const bookWidth = width / (width/10);
    const bookSpacing = 2;

    // How tall each book is (tweak as you like)
    const bookHeight = shelfSpacing - shelfThickness - 2;

    // Same idea as legs: inner width and evenly spaced items
    const innerBookWidth = width - bookWidth;
    const innerBookCount = Math.max(
        0,
        Math.floor(innerBookWidth / (bookWidth + bookSpacing)) - 1
    );
    const totalBooks = innerBookCount + 2;

    for (let i = 0; i < totalBooks; i++) {
        const t = (totalBooks === 1) ? 0 : i / (totalBooks - 1); // 0..1
        const bx = x + t * (width - bookWidth);

        parts.push({
            x: bx,
            y: sy - bookHeight,          // sy = shelf's y position
            width: bookWidth,
            height: bookHeight,
            collide: false,
            color: "rgb(40,40,40)"
        });
    }
    }
    // Random clutter
if (!books) {
    const clutterCount = Math.floor(width / 20);

    const nextShelfY = (i === shelfCount - 1)
        ? y + topMargin
        : bottomShelfY - (i + 1) * shelfSpacing;

    const maxClutterHeight = sy - nextShelfY + shelfThickness - 2;

    for (let c = 0; c < clutterCount; c++) {
        const itemType = Math.floor(Math.random() * 3);

        let itemWidth, itemHeight;

        if (itemType === 0) {
            itemWidth = 10 + Math.random() * 10;
            itemHeight = 10 + Math.random() * 10;
        } else if (itemType === 1) {
            itemWidth = 6 + Math.random() * 4;
            itemHeight = 12 + Math.random() * 8;
        } else {
            itemWidth = 4 + Math.random() * 3;
            itemHeight = shelfSpacing - 6;
        }

        // Initial clamp (keeps items from being absurdly tall)
        itemHeight = Math.min(itemHeight, maxClutterHeight);

        // Random X position
        const bx = x + Math.random() * (width - itemWidth);

        // Compute initial Y position
        let by = sy - itemHeight;

        // ⭐ HARD CLAMP: Prevent overlap with the shelf above
        const minTop = nextShelfY + shelfThickness;
        if (by < minTop) {
            by = minTop;
            itemHeight = sy - by; // recompute height so it fits perfectly
        }

        const shade = 30 + Math.floor(Math.random() * 20);

        parts.push({
            x: bx,
            y: by,
            width: itemWidth,
            height: itemHeight,
            collide: false,
            color: `rgb(${shade},${shade},${shade})`
        });
    }
}


    // Side wall
    parts.push({ // left wall
        x,
        y: y + topMargin,
        width: 5,
        height: height - topMargin,
        collide,
    })

    parts.push({ // right wall
        x: x + width - 5,
        y: y + topMargin,
        width: 5,
        height: height - topMargin,
        collide,
    })

    }

    return parts;
};

function table({ x, y, width = 100, height = 40, chairs = null, collide = false}) {
    const parts = [];
    parts.push({ // Left leg
        x: x + 10,
        y: y + 10,
        width: 10,
        height: height - 10,
        collide,
    })

    parts.push({ // Right leg
        x: x + width - 20,
        y: y + 10,
        width: 10,
        height: height - 10,
        collide,
    });

    parts.push({ // Top
        x,
        y,
        width: width,
        height: 10,
        collide
    });

    const chairWidth = 20;
    const chairHeight = height * 2;
    const chairGap = 15;

    if (chairs === "left" || chairs === "both"){
        parts.push({ // Left leg
            x: x - chairWidth - chairGap,
            y: y - height,
            width: 5,
            height: chairHeight,
            collide,
        });

        parts.push({ // Right leg
            x: x - chairGap,
            y,
            width: 5,
            height: height,
            collide,
        });

        parts.push({ // Seat
            x: x - chairWidth - chairGap,
            y,
            width: chairWidth,
            height: 10,
            collide
        });
    }

    if (chairs === "right" || chairs === "both"){
        parts.push({ // Left leg
            x: x + width + chairWidth + chairGap/2,
            y: y - height,
            width: 5,
            height: chairHeight,
            collide,
        });

        parts.push({ // Right leg
            x: x + width + chairGap/2,
            y,
            width: 5,
            height: height,
            collide,
        });

        parts.push({ // Seat
            x: x + width + chairGap/2,
            y,
            width: chairWidth,
            height: 10,
            collide
        });
    }

    return parts;
};

function sign({ x, y, width = 30, height = 35, tilt = false, collide = false}) {
    const parts = [];
    const poleWidth = width/5
    if (tilt) {
        for (let i = 0; i < 10; i++){
            parts.push(...slope({
                x: x + width/2 + i - (poleWidth/2),
                y: y - height/2,
                width: poleWidth,
                height: height / 2,
                steps: 5,
                direction: "right",
                collide
            }));
        }
        for (let i = 0 - width/2; i < 20; i++){
            parts.push(...slope({
                x: x + width/2 + i - 5,
                y: y - height,
                width: poleWidth,
                height: height / 2,
                steps: 5,
                direction: "right",
                collide
            }));
        }
        
    } else {
        parts.push({
            x: x + width/2 - poleWidth/2,
            y: y - height/2,
            width: poleWidth,
            height: height/2,
            collide
        });

        parts.push({
            x,
            y: y - height,
            width: width,
            height: height/2,
            collide
        })
    }

    return parts;
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
};