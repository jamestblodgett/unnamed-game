

const dream = {
    name: "dream",
    spawn: {x: 0, y: -45}, // Main
    // spawn: {x: -850, y: -67}, // Temporary
    platforms: [
        ...standingPlatform({x: -900, topY: 0, width: 1000}),
        ...sign({x: -30, y: 0}),
        ...standingPlatform({x: 99, topY: -200, width: 401}),
        ...standingSlope({x: 60, y: -299, width: 439, height: 100, steps: 40, direction: "left"}),
        ...standingSlope({x: 60, y: -119, width: 40, height: -80, steps: 10, direction: "left"}),
        ...floatingPlatform({x: -400, y: -3, width: 200, height: 4}),
        ...floatingPlatform({x: -350, y: -6, width: 60, height: 4}),
        // Placeholder tree?
        ...floatingPlatform({x: -700, y: -3, width: 180, height: 4}),
        ...floatingPlatform({x: -800, y: -6, width: 180, height: 7}),
        ...(() => {
            const platforms = [];
            for (let i = 0; i < 9; i++) {
                platforms.push(...floatingPlatform({x: -900, y: -10 - i * 4, width: 180 - i * (20 - i), height: 11}));
            }
            return platforms;
        })(),
         ...(() => {
            const platforms = [];
            for (let i = 0; i < 5; i++) {
                platforms.push(...floatingPlatform({x: -900, y: -38 - i * 4, width: 90 - i * (20 + i), height: 11}));
            }
            return platforms;
        })(),
        ...standingPlatform({x: -1500, topY: -54, width: 601}),

    ],
    doors: [
        // Temp door
        createDoor({x: -1470, y: -114, targetLevel: "home", spawnX: 265, spawnY: 255})
    ],
    texts: [
        createText({type: "world", x: 13, y: -85, lineX: -0, lineY: -35, content: "<---"}),
    ],
    playerVariants: [

    ]
}