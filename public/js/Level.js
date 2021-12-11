import { clearCanvas, canvas, ctx } from "./canvas.js";
import { IMAGE } from "./images.js";
import { Player } from "./entities/Player.js";
import { Rectangle } from "./entities/Rectangle.js";
import { Timer } from "./Timer.js";
import { Bird } from "./entities/Bird.js";
import { Background } from "./Background.js";

const LEVEL_STATUS = {
    READY: 1,
    STARTED: 2,
    PAUSED: 3,
};

export const TILE_SIZE = 16;

const SOLID_TILES = [
    "1,1",
    "0,1",
    "2,1",
    "0,3",
    "1,3",
    "2,3",
    "1,0",
    "4,1",
    "5,1",
    "6,1",
];

export class Level {
    constructor({
        name,
        tileData,
        playerPos,
        birdData,
        backgroundName,
        backgroundColor,
    }) {
        this.name = name;
        this.tileData = tileData;
        this.playerPos = playerPos;
        this.birdData = birdData;
        this.backgroundName = backgroundName;
        this.backgroundColor = backgroundColor;
        this.timer = new Timer();
        this.timer.update = (deltaTime) => this.update(deltaTime);
        this.status = null;
        this.solidCoords = [];
    }

    addControls() {
        document.addEventListener("keydown", (e) => {
            if (e.key === " ") {
                if (this.status == LEVEL_STATUS.READY) {
                    this.start();
                } else if (this.status == LEVEL_STATUS.STARTED) {
                    this.pause();
                } else if (this.status == LEVEL_STATUS.PAUSED) {
                    this.resume();
                }
            }
        });
    }

    makeReady() {
        this.drawLevelInfo();
        this.status = LEVEL_STATUS.READY;
        this.addControls();
    }

    pause() {
        this.status = LEVEL_STATUS.PAUSED;
        this.timer.pause();
    }

    resume() {
        this.status = LEVEL_STATUS.STARTED;
        this.timer.paused = false;
        this.timer.start();
    }

    drawLevelInfo() {
        clearCanvas("entity");
        ctx.entity.fillText(
            `Press 'Space' to start ${this.name}`,
            canvas.size.x / 2,
            canvas.size.y / 2
        );
    }

    getRectanglesFromTiles() {
        const rectangles = [];
        for (const tileCoord in this.tileData) {
            if (SOLID_TILES.includes(tileCoord)) {
                for (const targetCoord of this.tileData[tileCoord]) {
                    const [u, v] = targetCoord.split(",");
                    let u1 = u;
                    let u2 = u;
                    let v1 = v;
                    let v2 = v;
                    if (u.includes("-")) {
                        [u1, u2] = u.split("-");
                    }
                    if (v.includes("-")) {
                        [v1, v2] = v.split("-");
                    }
                    rectangles.push(
                        new Rectangle({
                            pos: {
                                x: u1 * TILE_SIZE,
                                y: v1 * TILE_SIZE,
                            },
                            size: {
                                x: (u2 - u1 + 1) * TILE_SIZE,
                                y: (v2 - v1 + 1) * TILE_SIZE,
                            },
                        })
                    );
                    for (let p = u1; p <= u2; p++) {
                        for (let q = v1; q <= v2; q++) {
                            this.solidCoords.push(`${p},${q}`);
                        }
                    }
                }
            }
        }
        return rectangles;
    }

    drawTiles() {
        clearCanvas("tile");
        for (const tileCoord in this.tileData) {
            const [x, y] = tileCoord.split(",");
            for (const targetCoord of this.tileData[tileCoord]) {
                const [u, v] = targetCoord.split(",");
                let u1 = u;
                let u2 = u;
                let v1 = v;
                let v2 = v;
                if (u.includes("-")) {
                    [u1, u2] = u.split("-");
                }
                if (v.includes("-")) {
                    [v1, v2] = v.split("-");
                }
                for (let p = u1; p <= u2; p++) {
                    for (let q = v1; q <= v2; q++) {
                        ctx.tile.drawImage(
                            IMAGE.TILEMAP,
                            x * TILE_SIZE,
                            y * TILE_SIZE,
                            TILE_SIZE,
                            TILE_SIZE,
                            p * TILE_SIZE,
                            q * TILE_SIZE,
                            TILE_SIZE,
                            TILE_SIZE
                        );
                    }
                }
            }
        }
    }

    isSolidAt(p, q) {
        return this.solidCoords.includes(`${p},${q}`);
    }

    start() {
        this.status = LEVEL_STATUS.STARTED;
        this.drawTiles();
        this.player = new Player({
            pos: this.playerPos,
            level: this,
        });
        this.entities = {
            players: [this.player],
            birds: this.birdData.map(
                ({ x, y, type }) =>
                    new Bird({ pos: { x, y }, type, level: this })
            ),
            rectangles: this.getRectanglesFromTiles(),
        };
        this.entityList = Object.values(this.entities).flat();
        this.background = new Background({
            name: this.backgroundName,
            color: this.backgroundColor,
        });
        this.timer.start();
    }

    update(deltaTime) {
        this.background.update(deltaTime);
        this.background.draw();
        clearCanvas("entity");
        this.entityList.forEach((entity) => entity.update(deltaTime));
        this.entityList.forEach((entity) => entity.draw());
    }
}
