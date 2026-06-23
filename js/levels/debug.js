let i = 100
let cut = 120
let t = i + 50
const textY = 60
const visY = -45
const textColor = "black"
const textFont = "25px Arial"

const debug = {
    name: "debug",
    spawn: { x: 0, y: -45 },
    platforms: [
        
        ...lantern({x: i + 40, y: -100, wall: false}),
        i += cut,

        ...lantern({x: i + 40, y: -100, wall: "left"}),
        i += cut,

        ...lantern({x: i + 40, y: -100, wall: "right"}),
        i += cut,

        ...table({x: i, y: -30, width: 100, height: 30, chairs: "both", collide: true}),
        i += cut + 80,

        ...table({x: i, y: -30, width: 100, height: 30, chairs: "left", collide: true}),
        i += cut + 20,

        ...table({x: i, y: -30, width: 100, height: 30, chairs: "right", collide: true}),
        i += cut + 50,

        ...table({x: i, y: -30, width: 100, height: 30, collide: true}),
        i += cut,
        
        ...shelf({x: i, y: -360, width: 100, height: 360, books: true, collide: true}),
        i += cut,

        ...shelf({x: i, y: -80, width: 100, height: 80, books: true, collide: true}),
        i += cut,

        ...shelf({x: i, y: -160, width: 100, height: 160, books: false, collide: true}),
        i += cut,

        ...shelf({x: i, y: -160, width: 100, height: 160, books: true, collide: true}),
        i += cut,
        
        ...shelf({x: i, y: -200, width: 100, height: 200, books: false, collide: true}),
        i += cut,

        ...shelf({x: i, y: -200, width: 100, height: 200, books: true, collide: true}),
        i += cut,

        ...dresser({x: i, y: -100, shelves: 2, collide: true}),
        i += cut,

        ...dresser({x: i, y: -100, shelves: 1, collide: true}),
        i += cut,
        
        ...bed({x: i, y: -32, direction: "left", collide: true}),
        i += cut,

        ...bed({x: i, y: -32, direction: "right", collide: true}),
        i += cut,

        ...slope({x: i, y: -100, width: 100, height: 100, direction: "right", steps: 10}),
        i += cut,

        ...slope({x: i, y: -100, width: 100, height: 100, direction: "left", steps: 10}),
        i += cut,

        ...wall({x: i + 50, y: -100, width: 20, height: 100}),
        i += cut,
        
        ...box({
            x: i,
            y: -100,
            width: 100,
            height: 100,
            wallThickness: 10,
            doorSide: "both",
            doorSize: 70
        }),
        i += cut,

        ...stairs({
            direction: "right", 
            x: i,
            y: 0,

            steps: 4
        }),



        // Debug lines
        ...standingPlatform({ x: -30, topY: 0, width: 6000}), // Ground
        
        ...(() => {
            const _grid = [];
            for (let gx = -2980; gx <= 3000; gx += 50) {
                // Vertical line
                _grid.push(...floatingPlatform({ x: gx+ 2950, y: -3000, width: 1, height: 6000, collide: false }));

                // Horizontal line
                _grid.push(...floatingPlatform({ x: -30, y: gx + 30, width: 6000, height: 1, collide: false }));
            }
            return _grid;
        })(),
        
    ],

    text: [
        // Object names
        createText({type: "world", x: t, y: textY,  lineY: visY, content: "No-wall lantern", maxDistance: 200, color: textColor, font: textFont}),
        t += cut,

        createText({type: "world", x: t, y: textY,  lineY: visY, content: "Left Lantern", maxDistance: 200, color: textColor, font: textFont}),
        t += cut,

        createText({type: "world", x: t, y: textY,  lineY: visY, content: "Right Lantern", maxDistance: 200, color: textColor, font: textFont}),
        t += cut,

        createText({type: "world", x: t, y: textY, lineY: visY,  content: "Table w/ two chairs", maxDistance: 200, color: textColor, font: textFont}),
        t += cut + 80,

        createText({type: "world", x: t, y: textY,  lineY: visY, content: "Table w/ Left chair", maxDistance: 200, color: textColor, font: textFont}),
        t += cut + 20,

        createText({type: "world", x: t, y: textY,  lineY: visY, content: "Table w/ Right chair", maxDistance: 200, color: textColor, font: textFont}),
        t += cut + 50,

        createText({type: "world", x: t, y: textY,  lineY: visY, content: "Table", maxDistance: 200, color: textColor, font: textFont}),
        t += cut,

        createText({type: "world", x: t, y: textY,  lineY: visY, content: "Bookshelf", maxDistance: 200, color: textColor, font: textFont}),
        t += cut,

        createText({type: "world", x: t, y: textY,  lineY: visY, content: "Bookshelf", maxDistance: 200, color: textColor, font: textFont}),
        t += cut,

        createText({type: "world", x: t, y: textY,  lineY: visY, content: "Bookshelf", maxDistance: 200, color: textColor, font: textFont}),
        t += cut,
        
        createText({type: "world", x: t, y: textY,  lineY: visY, content: "Bookshelf", maxDistance: 200, color: textColor, font: textFont}),
        t += cut,

        createText({type: "world", x: t, y: textY,  lineY: visY, content: "Bookshelf", maxDistance: 200, color: textColor, font: textFont}),
        t += cut,

        createText({type: "world", x: t, y: textY,  lineY: visY, content: "Bookshelf", maxDistance: 200, color: textColor, font: textFont}),
        t += cut,

        createText({type: "world", x: t, y: textY,  lineY: visY, content: "Tall dresser", maxDistance: 200, color: textColor, font: textFont}),
        t += cut,

        createText({type: "world", x: t, y: textY,  lineY: visY, content: "Short dresser", maxDistance: 200, color: textColor, font: textFont}),
        t += cut,

        createText({type: "world", x: t, y: textY,  lineY: visY, content: "Left Bed", maxDistance: 200, color: textColor, font: textFont}),
        t += cut,

        createText({type: "world", x: t, y: textY,  lineY: visY, content: "Right Bed", maxDistance: 200, color: textColor, font: textFont}),
        t += cut,

        createText({type: "world", x: t, y: textY,  lineY: visY, content: "right slope", maxDistance: 200, color: textColor, font: textFont}),
        t += cut,

        createText({type: "world", x: t, y: textY,  lineY: visY, content: "Left slope", maxDistance: 200, color: textColor, font: textFont}),
        t += cut,

        createText({type: "world", x: t, y: textY,  lineY: visY, content: "Wall", maxDistance: 200, color: textColor, font: textFont}),
        t += cut,

        createText({type: "world", x: t, y: textY,  lineY: visY, content: "Box", maxDistance: 200, color: textColor, font: textFont}),
        t += cut,

        createText({type: "world", x: t, y: textY,  lineY: visY, content: "Stairs", maxDistance: 200, color: textColor, font: textFont}),
        t += cut,


        // DEBUG TEXT
        createText({type: "player", x: 0, y: -45, content: "TEXT TEXT THIS IS A LOT OF TEXT THIS IS A LOT OF TEXT THIS IS A LOT OF TEXT THIS IS A LOT OF TEXT TEXT TEXT THIS IS A LOT OF TEXT THIS IS A LOT OF TEXT THIS IS A LOT OF TEXT THIS IS A LOT OF TEXT"})
    ]
}