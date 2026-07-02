# Levels and Objects

This guide explains the basic structure for building levels, characters, and objects in the game. The goal is to keep everything modular: levels are collections of platforms and objects, characters are reusable models with properties and animations, and objects are simple shape builders that become solid or decorative pieces in the world.

## 1. A simple level

A level is just a JavaScript object with a few important fields:

- `name`: the level's identifier
- `spawn`: where the player starts
- `platforms`: the solid or decorative pieces in the world
- `doors`: transitions to other levels
- `texts`: on-screen instructions or dialogue
- `playerVariants`: optional visual characters or NPC-style models

### Minimal blank level example

```js
const blankLevel = {
    name: "blank",
    spawn: { x: 0, y: 0 },
    platforms: [
        ...standingPlatform({ x: -500, topY: 300, width: 1000 }),
    ],
    doors: [],
    texts: [],
    playerVariants: []
};
```

### What each part means

- `spawn`: this is the starting point for the player.
- `platforms`: these are the surfaces the player can stand on. A basic floor is often made with `standingPlatform`.
- `doors`: use these to connect to another level.
- `texts`: use these for story, hints, or instructions.
- `playerVariants`: use these for decorative characters or NPCs.

### How to make it appear in the game

To make a level loadable, you need to do two things:

1. Add its script file to [index.html](../index.html) if it is a new file.
2. Add the level variable to the `allLevels` array in [js/gameLogic/levelLoader.js](../js/gameLogic/levelLoader.js).

Example:

```js
const allLevels = [dream, home, subway, playerTest, debug, blankLevel];
```

If you want to load it manually later, you can call:

```js
loadLevelByName("blank");
```

---

## 2. Characters

Characters are now built as reusable models. This makes them easier to create, customize, and animate than writing everything directly into a single player object.

### The basic character flow

1. Create one or more body parts with `createCharacterPart()`.
2. Combine those parts into a character model with `createCharacterModel()`.
3. Create an instance of that model with `createCharacterInstance()`.
4. Customize it later with `applyCharacterProperties()`.
5. Update its animation state with `updateCharacterAnimation()`.

### Example: create a simple character model

```js
const model = createCharacterModel({
    name: "ghost",
    width: 24,
    height: 44,
    parts: [
        createCharacterPart({ x: 0, y: 0, w: 24, h: 4, color: "rgb(240, 240, 255)" }),
        createCharacterPart({ x: 1, y: 4, w: 22, h: 4, color: "rgb(220, 220, 255)" }),
        createCharacterPart({ x: 2, y: 8, w: 20, h: 4, color: "rgb(200, 200, 255)" }),
        createCharacterPart({ x: 4, y: 16, w: 16, h: 16, color: "rgb(160, 160, 255)" })
    ],
    animations: {
        tilt: { enabled: true, strength: 4 },
        bob: { enabled: true, strength: 2 }
    },
    properties: {
        speed: 0.35,
        maxSpeed: 3.5,
        jumpForce: 9
    }
});
```

### Example: create a live instance

```js
const ghost = createCharacterInstance(model, 100, 200);
```

### Example: modify a character after creation

```js
applyCharacterProperties(ghost, {
    speed: 0.6,
    jumpForce: 10,
    maxSpeed: 4.2
});
```

### Example: update animation state

```js
updateCharacterAnimation(ghost);
```

### Notes about character customization

- `parts` controls the visible shape of the character.
- `animations` controls motion effects like tilting and bobbing.
- `properties` controls movement behavior such as speed, jump height, and friction.
- A character instance can be reused as a visual variant, an NPC, or even the main player.

### Using the older player helper

If you want the old color-based player behavior, you can still use:

```js
const player = createPlayerInstance("PURPLE", 0, 0);
```

This keeps the original player style alive while the new character system is available for more advanced or custom models.

---

## 3. Objects

Objects in this game are created as reusable builder functions that return arrays of rectangle-like pieces. They are similar to the platform builders in [js/objects/objectMaker.js](../js/objects/objectMaker.js).

The main idea is simple: an object is a collection of pieces, each with its own position, size, and collision setting.

### Common object builders

- `floatingPlatform({ x, y, width, height, collide })`
- `wall({ x, y, width, height, collide })`
- `standingPlatform({ x, topY, width, collide })`
- `box({ x, y, width, height, wallThickness, doorSide, doorSize })`
- `stairs({ x, y, stepWidth, stepHeight, steps, direction })`
- `slope({ x, y, width, height, direction, steps })`
- `standingSlope({ x, y, width, height, direction, steps })`
- `lantern({ x, y, width, height, wall })`
- `bed({ x, y, width, height, direction, collide })`
- `dresser({ x, y, width, height, shelves, collide })`
- `shelf({ x, y, width, height, collide, books, topShelf })`
- `table({ x, y, width, height, chairs, collide })`
- `sign({ x, y, width, height, tilt, collide })`

### Example: a simple platform

```js
platforms: [
    ...floatingPlatform({ x: 0, y: 250, width: 200, height: 20 })
]
```

### Example: a box room

```js
platforms: [
    ...box({
        x: 200,
        y: 100,
        width: 300,
        height: 250,
        wallThickness: 30,
        doorSide: "right",
        doorSize: 80
    })
]
```

### Example: a decorative object

```js
platforms: [
    ...shelf({ x: 450, y: 190, width: 100, height: 80, collide: false, books: true })
]
```

### Tips for objects

- Use `collide: false` for decoration and visual props.
- Use `collide: true` for things the player should stand on or bump into.
- Small objects can be composed from multiple pieces to look more detailed.
- It is often easier to build a room from a few larger shapes first, then add decoration.

---

## 4. Other important things for making a level

### Doors

Doors let the player move between levels. Use `createDoor()` to define a trigger and a destination:

```js
doors: [
    createDoor({
        x: 300,
        y: 240,
        targetLevel: "home",
        spawnX: 250,
        spawnY: 250
    })
]
```

### Text

Use `createText()` to show hints, dialog, or world text.

```js
texts: [
    createText({
        type: "world",
        x: 0,
        y: -100,
        content: "Welcome to the level"
    })
]
```

### Player variants

These are useful for showing extra characters without giving them player control.

```js
playerVariants: [
    createCharacterInstance(model, -120, -200)
]
```

### Coordinate tips

- `x` and `y` are world coordinates.
- The camera follows the player automatically.
- If you place a platform too low, the player may fall off-screen.
- It helps to build levels in layers: floor first, then walls, then decoration.

### Recommended workflow

1. Create the floor and basic walls.
2. Add the spawn point.
3. Add a few platforms for movement.
4. Add any decorative objects.
5. Add doors and text for guidance.
6. Test the level and adjust positions until the movement feels right.

---

## Quick template

Here is a fuller example you can copy and adapt:

```js
const exampleLevel = {
    name: "example",
    spawn: { x: 0, y: 0 },
    platforms: [
        ...standingPlatform({ x: -500, topY: 300, width: 1000 }),
        ...floatingPlatform({ x: 150, y: 220, width: 120, height: 20 }),
        ...wall({ x: 320, y: 180, width: 20, height: 120 })
    ],
    doors: [
        createDoor({ x: 400, y: 240, targetLevel: "home", spawnX: 250, spawnY: 250 })
    ],
    texts: [
        createText({ type: "world", x: 0, y: 150, content: "A simple example level" })
    ],
    playerVariants: []
};
```

If you want to make a level feel more alive, start by building the structure, then add characters, objects, and story text once the layout feels good.
