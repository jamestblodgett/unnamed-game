const playerTest = {
    name: "playerTest",
    spawn: { x: 0, y: -45 },
    platforms: [
        ...standingPlatform({ x: -5000, topY: 0, width: 10000 }),
    ],
    playerVariants: createPlayerVariants(),
    text: [
        createText({ type: "world", x: 0, y: -130, content: "Player test: one variant for every available color" }),
    ]
};

function createPlayerVariants() {
    const columns = 7;
    const spacingX = 100;
    const spacingY = 140;
    const startX = -300;
    const startY = -220;

    return PLAYER_COLORS.map((entry, index) => {
        const row = Math.floor(index / columns);
        const col = index % columns;
        return makePlayerVariant(entry, startX + col * spacingX, startY + row * spacingY);
    });
}
