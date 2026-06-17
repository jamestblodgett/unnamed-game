let currentLevel = null;
let currentLevelIndex = 0;
const allLevels = [home, subway, debug];

function loadLevel(levelData, spawnX = null, spawnY = null) {
    // Fallback if level is missing or undefined
    if (!levelData) {
        console.warn("Level data is missing, falling back to first level.");
        levelData = allLevels[0];
    }

    currentLevel = levelData;

    // Determine spawn point:
    // 1. Door-provided spawn (highest priority)
    // 2. Level's spawnPoint (preferred)
    // 3. Level's spawn (legacy support)
    const defaultSpawn = levelData.spawnPoint || levelData.spawn;

    if (spawnX != null && spawnY != null) {
        // Door-defined spawn
        player.x = spawnX;
        player.y = spawnY;
    } else if (defaultSpawn) {
        // Level-defined spawn
        player.x = defaultSpawn.x;
        player.y = defaultSpawn.y;
    } else {
        console.warn("No spawn point found in level; defaulting to (0,0).");
        player.x = 0;
        player.y = 0;
    }

    // Reset player physics
    player.velocityX = 0;
    player.velocityY = 0;
    player.onGround = false;

    if (GLOBAL_DEBUG) {
        levelData = allLevels[allLevels.length - 1];  
        currentLevel = levelData;
        return;
    }
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

function loadLevelByName(name, spawnX = null, spawnY = null) {
    const index = allLevels.findIndex(l => l.name === name);
    if (index === -1) {
        console.error("Level not found:", name);
        return;
    }

    currentLevelIndex = index;
    loadLevel(allLevels[currentLevelIndex], spawnX, spawnY);
}
