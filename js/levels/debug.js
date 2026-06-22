let i = 100
let cut = 120
const debug = {
    name: "debug",
    spawn: { x: 0, y: -50 },
    platforms: [

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

        ...lantern({x: i, y: -100, wall: false}),
        i += cut,

        ...lantern({x: i, y: -100, wall: "left"}),
        i += cut,

        ...lantern({x: i, y: -100, wall: "right"}),
        i += cut,

        ...wall({x: i, y: -100, width: 20, height: 100}),
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
            for (let gx = -3000; gx <= 3000; gx += 50) {
                // Vertical line (thin, non-collidable)
                _grid.push(...floatingPlatform({ x: gx, y: -3000, width: 1, height: 6000, collide: false }));

                // Horizontal line (thin, non-collidable)
                _grid.push(...floatingPlatform({ x: -3000, y: gx, width: 6000, height: 1, collide: false }));
            }
            return _grid;
        })(),
        
    ]
}