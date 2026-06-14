let currentLevel = null;
let currentLevelIndex = 0;
const allLevels = [introLevel, level1]; // add more as needed

function loadLevel(levelData) {
    if (!levelData) {
        console.warn("Level data is missing, falling back to first level.");
        levelData = allLevels[0];
    }

    currentLevel = levelData;

    const spawn = levelData.spawnPoint || levelData.spawn;
    if (spawn) {
        player.x = spawn.x;
        player.y = spawn.y;
    }

    player.velocityX = 0;
    player.velocityY = 0;
    player.onGround = false;
}

function nextLevel() {
    currentLevelIndex++;

    if (currentLevelIndex >= allLevels.length) {
        console.log("No more levels!");
        return;
    }

    loadLevel(allLevels[currentLevelIndex]);
}

function previousLevel() {
    currentLevelIndex--;

    if (currentLevelIndex < 0) {
        currentLevelIndex = 0;
        return;
    }

    loadLevel(allLevels[currentLevelIndex]);
}