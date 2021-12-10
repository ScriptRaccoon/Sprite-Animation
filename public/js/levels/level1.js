import { Level } from "../level.js";

export const level1 = new Level({
    name: "Level 1",
    tileData: {
        // simple ground tile
        "1,1": ["0-39,29", "22-24,21", "0-7,9"],
        // left border of tile
        "0,1": ["21,21"],
        // right border of tile
        "2,1": ["25,21", "8,9"],
        // tile air left
        "4,1": ["34,16", "23,7"],
        // tile air center
        "5,1": ["35-36,16"],
        // tile air right
        "6,1": ["37,16", "24,7"],
        // gray tile left shadow
        "4,2": ["22,23"],
        // gray tile left
        "4,3": ["22,24-28"],
        // gray tile middle shadow
        "5,2": ["23,23", "0-2,11"],
        // gray tile middle
        "5,3": ["23,24-28", "0-2,12-28"],
        // gray tile right shadow
        "6,2": ["24,23", "3,11"],
        // gray tile right
        "6,3": ["3,12-28", "24,24-28"],
        // left bottom corner
        "0,3": ["21,22"],
        // bottom middle tile
        "1,3": ["0-7,10", "22-24,22"],
        // right bottom corner
        "2,3": ["8,10", "25,22"],
        // grass
        "0,0": ["26-29,28", "38-39,28", "5-7,8", "21-22,20", "24,6"],
        // flower
        "7,0": ["4,28", "5,28"],
        // arrow right
        "4,0": ["12,28"],
        // arrow left
        "5,0": ["2,8"],
    },
    playerPos: { x: 150, y: 300 },
    birdData: [
        { x: -50, y: 20, type: "red" },
        { x: -100, y: 30, type: "white" },
    ],
    backgroundName: "CLOUDS",
    backgroundColor: "skyblue",
});
