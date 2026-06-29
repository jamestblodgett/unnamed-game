const greenModel = createPlayerInstance('GREEN', 300, -70);
greenModel.width = 32;
greenModel.height = 55;
greenModel.parts[0].w = 30;

const subway = {
    name: "subway",
    spawn: { x: 57, y: 255 },
    platforms: [
        ...floatingPlatform({ x: -200, y: 300, width: 400, height: 10 })
    ],
    playerVariants: [
        makePlayerVariant('RED', -150, 255),
        makePlayerVariant('BLUE', -200, 255),
        makePlayerVariant('PURPLE', 500, -80),
    ],
    doors: [
        createDoor({ x: 50, y: 240, targetLevel: "home", spawnX: 2847, spawnY: 255 })
    ]
};