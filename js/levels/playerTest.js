let playerTestX = 1450;
const pTestCut = 100;

const playerTest = {
    name: "playerTest",
    spawn: { x: 0, y: -45 },
    platforms: [
        ...standingPlatform({ x: -5000, topY: 0, width: 10000 }),
    ],
    playerVariants: [
        ...createPlayerVariants(),
        playerTestX += pTestCut,
        createGhostCharacter({ x: playerTestX, y: -44, color: "rgb(255, 255, 255)", width: 24, height: 44 })
    ]
}
