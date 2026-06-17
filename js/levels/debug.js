let i = 100
let cut = 120
const debug = {
    name: "debug",
    spawn: { x: 0, y: -200 },
    platforms: [
        
        ...slope({x: i, y: -100, width: 100, height: 100, direction: "right", steps: 10}),
        i += cut,

        ...slope({x: i, y: -100, width: 100, height: 100, direction: "left", steps: 10}),
        i += cut,

        ...standingPlatform({ x: -3000, topY: 0, width: 6000}), // GRound

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
        })
    ]
}