function checkDoorEntry() {
    if (!currentLevel.doors) return;

    for (const door of currentLevel.doors) {
        const touching =
            player.x < door.x + door.width &&
            player.x + player.width > door.x &&
            player.y < door.y + door.height &&
            player.y + player.height > door.y;

        if (touching && downOnce()) {
            const useDoorSpawn = door.spawnX != null && door.spawnY != null;
            loadLevelByName(
                door.targetLevel,
                useDoorSpawn ? door.spawnX : null,
                useDoorSpawn ? door.spawnY : null
            );
            return;
        }
    }
}