import { Level } from "../level.js";
import { Rectangle } from "../objects/Rectangle.js";

export const level1 = new Level({
    name: "Level 1",
    rectangles: [
        new Rectangle({
            pos: { x: 0, y: 440 },
            size: { x: 640, y: 10 },
        }),
        new Rectangle({
            pos: { x: 300, y: 320 },
            size: { x: 100, y: 10 },
        }),
        new Rectangle({
            pos: { x: 0, y: 100 },
            size: { x: 150, y: 10 },
        }),
        new Rectangle({
            pos: { x: 540, y: 200 },
            size: { x: 20, y: 10 },
        }),
        new Rectangle({
            pos: { x: 340, y: 100 },
            size: { x: 20, y: 10 },
        }),
    ],
    playerPos: { x: 200, y: 300 },
});
