const home = {
    name: "home",
    spawn: { x: 260, y: 268 },
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
        ...floatingPlatform({ x: 599, y: -52, width: 401, height: 152 }), // Hallway Roof
        
        ...floatingPlatform({ x: 1170, y: 225, width: 80, height: 20 }), // Jump platform 1
        ...floatingPlatform({ x: 1000, y: 150, width: 80, height: 20 }), // Jump platform 2
        ...wall({ x: 980, y: 100, height: 70, width: 20 }), // Jump platform 2 support
        ...floatingPlatform({ x: 1170, y: 75, width: 80, height: 20 }), // Jump platform 3
        ...floatingPlatform({ x: 1000, y: 0, width: 80, height: 20 }), // Jump platform 4
        ...floatingPlatform({ x: 1170, y: -52, width: 80, height: 20 }), // End platform

        ...stairs({direction: "left", x: 1350 + 320, y: 300, steps: 12 }), // Stairs to bottom platform
        ...wall({ x: 1250, y: -52, height: 361, width: 80 }), // Hallway wall
        ...floatingPlatform({ x: -200, y: -450, width: 1450, height: 150}),


        ...wall({ x: 1210, y: -300, height: 150, width: 40 }), // Upper Hallway wall
        ...lantern({ x: 1250, y: -200, wall: "left" }),
    ],

    doors: [
        createDoor({ x: 2840, y: 240, targetLevel: "subway", spawnX: 50, spawnY: 268 })
    ]
};