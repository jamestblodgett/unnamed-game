let inc = 325;
const home = {
    name: "home",
    spawn: { x: 265, y: 255 }, // Main spawn
    // spawn: {x: 1710, y: 0},
    platforms: [
        // Ground and outer walls
        ...standingPlatform({ x: -100, topY: 300, width: 950 }), // Ground1
        ...standingPlatform({ x: 950, topY: 300, width: 2000 }), // Ground2
        ...standingPlatform({ x: -200, topY: -300, width: 441 }), // Left wall
        ...box({ // Starting box
            x: 200,
            y: -52,
            width: 400,
            height: 392,
            wallThickness: 40,
            doorSide: "right",
            doorSize: 200
        }),

        // Starting bedroom
        ...bed({x: 243, y: 268, collide: false}),
        ...dresser({x: 350, y: 199, shelves: 1, collide: false}),
        ...shelf({x: 437, y: 229, width: 117, height: 70, books: false}),

        // Rest of the house
        ...wall({x: 560, y: 140, width: 40, height: 160, collide: false}),
        ...floatingPlatform({ x: 599, y: -52, width: 401, height: 152 }), // Hallway Roof

        ...floatingPlatform({ x: 1170, y: 225, width: 80, height: 20 }), // Jump platform 1
        ...slope({x:1230, y: 245, width: 20, height: 20, direction: "right", steps: 3, collide: false}),

        ...floatingPlatform({ x: 1000, y: 150, width: 80, height: 20 }), // Jump platform 2
        ...wall({ x: 980, y: 100, height: 70, width: 20 }), // Jump platform 2 support
        ...wall({ x: 980, y: 170, width: 100, height: 130, collide: false}),

        ...floatingPlatform({ x: 1170, y: 75, width: 80, height: 20 }), // Jump platform 3
        ...slope({x:1230, y: 95, width: 20, height: 20, direction: "right", steps: 3, collide: false}),

        ...floatingPlatform({ x: 1000, y: 0, width: 80, height: 20 }), // Jump platform 4
        ...slope({x:1000, y: 20, width: 20, height: 20, direction: "left", steps: 3, collide: false}),

        ...floatingPlatform({ x: 1170, y: -52, width: 80, height: 20 }), // End platform
        ...floatingPlatform({x: 1000, y: -52, width: 170, height: 20, collide: false}),
        ...slope({x:1230, y: -32, width: 20, height: 20, direction: "right", steps: 3, collide: false}),

        // Upstairs decoration
        ...dresser({x: 900, y: -153, shelves: 1}),
        ...table({x: 667, y: -84, width: 100, height: 30, chairs: "both", collide: false}),
        ...shelf({x: 815, y: -174, width: 70, height: 120, books: true, collide: false}),

        // Exit
        ...wall({ x: 1210, y: -300, height: 150, width: 40 }), // Upper Hallway wall
        ...wall({ x: 1210, y: -150, height: 99, width: 40, collide: false}),
        ...lantern({ x: 1250, y: -200, wall: "left" }),

        // Hidden path
        ...floatingPlatform({ x: 1250, y: -390, width: 2}),
        ...floatingPlatform({x: -300, y: -380, width: 30, height: 10}),
        ...(() => {
            const _plats = [];
            let platY = -380;
            const pWidth = 30;
            const pHeight = 10;
            for (let platX = -300; platX >= - 900; platX -= 100) {
                // _plats.push(...floatingPlatform(x: platX, y: y))
                _plats.push(...floatingPlatform({ x: platX, y: platY, width: pWidth, height: pHeight, collide: true }));
                platY += 50
            }
            return _plats;
        })(),
        ...standingPlatform({ x: -1300, topY: -50, width: 500}),
        ...sign({x: -1270, y: -50}),

        // Outside
        ...standingSlope({direction: "right", x: 1320, y: -52, steps: 100, width: 1260, height: 352, collide: false }), // Slope to stairs outside
        ...wall({ x: 1250, y: -52, height: 360, width: 80 }), // outer wall (before stairs)
        ...floatingPlatform({ x: -200, y: -450, width: 1450, height: 150}), // Roof
    ],

    doors: [
        createDoor({ x: 2840, y: 240, targetLevel: "subway", spawnX: 57, spawnY: 255 })
    ],

    texts: [
        createText({type: "world", x: 360, y: 150, lineX: 290, lineY: 270, content: "A       D" , maxDistance: 150, fadeOnLine: true}),
        createText({type: "player", x: 290, y: 270, content: "\"Good morning world!\"", maxDistance: 75}),

        createText({type: "player", x: 700, y: 255, content: "*I should really fix this hole. I'll just jump for now.*", maxDistance: 130}),
    
        createText({type: "world", content: "W / Space", x: 900, y: 230, lineX: 900, lineY: WORLD_BOTTOM, fadeOnLine: false, maxDistance: 240}),
        createText({type: "player", x: 1030, y: 105, content: "Ugh, jumping.", align: "center", maxDistance: 80}),

        createText({type: "world", x: 875, y: -175, lineX: 940, lineY: -95, content: "S to pass through dark gray objects.", align: "center", maxDistance: 150}),
        createText({type: "player", x: 905, y: -97, content: "\"Thanks, note!\"", align: "center", maxDistance: 20}),

        createText({type: "world", lineX: -1255, lineY: -50, x: -1255, y: -100, content: "Placeholder Text"})
    ]

};