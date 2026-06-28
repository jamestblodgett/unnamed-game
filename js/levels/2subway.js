const subway = {
    name: "subway",
    spawn: { x: 57, y: 255 },
    platforms: [
        ...floatingPlatform({x: -200, y: 300, width: 400, height: 10})
    ],
    doors: [
        createDoor({ x: 50, y: 240, targetLevel: "home" , spawnX: 2847, spawnY: 255 })
    ]
    
};
