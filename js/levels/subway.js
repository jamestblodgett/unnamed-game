const subway = {
    name: "subway",
    spawn: { x: 50, y: 268 },
    platforms: [
        { x: 0, y: 300, width: 400, height: 20 },
        { x: 450, y: 250, width: 100, height: 20 },
        { x: 600, y: 200, width: 150, height: 20 },
        { x: 800, y: 150, width: 200, height: 20 }
    ],
    doors: [
        createDoor({ x: 50, y: 240, targetLevel: "home" , spawnX: 2840, spawnY: 268 })
    ]
    
};
