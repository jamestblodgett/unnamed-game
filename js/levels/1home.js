let inc = 325;
const home = {
    name: "home",
    spawn: { x: 780, y: -104 },
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
        ...standingPlatform({x: 850, topY: 300, width: 100, collide: false}),
        
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
        ...dresser({x: 1115, y: -153, shelves: 1}),
        ...table({x: 667, y: -84, width: 100, height: 30, chairs: "both", collide: false}),
        ...shelf({x: 815, y: -174, width: 70, height: 120, books: true, collide: false}),

        // Exit
        ...wall({ x: 1210, y: -300, height: 150, width: 40 }), // Upper Hallway wall
        ...wall({ x: 1210, y: -150, height: 99, width: 40, collide: false}),
        ...lantern({ x: 1250, y: -200, wall: "left" }),

        ...stairs({direction: "left", x: 1350 + 320, y: 300, steps: 12 }), // Stairs outside
        ...wall({ x: 1250, y: -52, height: 361, width: 80 }), // Hallway wall
        ...floatingPlatform({ x: -200, y: -450, width: 1450, height: 150}),
    ],

    doors: [
        createDoor({ x: 2840, y: 240, targetLevel: "subway", spawnX: 50, spawnY: 268 })
    ],

    texts: [
    createText({ x: 300, y: 150, content: "<A       D>" , maxDistance: 150}),

    createText({x: 900, y: 325, content: "/\\", align: "center", maxDistance: 130}),
    createText({x: 900, y: 350, content: "W", align: "center", maxDistance: 140}),
    createText({x: 900, y: 375, content: "[space]", align: "center", maxDistance: 150}),

    createText({x: 1120, y: 220, content: "> + /\\", align: "center"}),
    createText({x: 1120, y: 160, content: "< + /\\", align: "center"}),
    createText({x: 1120, y: 100, content: "> + /\\", align: "center"}),

    // Screams
    ...Array.from({ length: WORLD_BOTTOM }, (_, index) =>
        createText({ x: 900, y: 425 + index * 25, content: "A", fadeSpeed: 0.05, align: "center" })
    ),

    createText({x: 2860, y: 200, content: "V / S"}),
    ]

};