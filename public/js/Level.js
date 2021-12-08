import { clearCanvas, canvas, ctx } from "./canvas.js";
import { Player } from "./objects/Player.js";
import { Timer } from "./Timer.js";

const STATUS = {
    READY: 1,
    STARTED: 2,
    PAUSED: 3,
};

export class Level {
    constructor({ name, rectangles, playerPos }) {
        this.name = name;
        this.objects = {
            players: [new Player({ pos: playerPos })],
            rectangles: rectangles,
        };
        this.timer = new Timer();
        this.timer.update = (deltaTime) => this.update(deltaTime);
        this.status = null;
    }

    makeReady() {
        this.status = STATUS.READY;
        this.drawLevelInfo();
        this.addControls();
    }

    addControls() {
        document.addEventListener("keydown", (e) => {
            if (e.key === " ") {
                if (this.status == STATUS.READY) {
                    this.start();
                } else if (this.status == STATUS.STARTED) {
                    this.pause();
                } else if (this.status == STATUS.PAUSED) {
                    this.resume();
                }
            }
        });
    }

    pause() {
        this.status = STATUS.PAUSED;
        this.timer.pause();
    }

    resume() {
        this.status = STATUS.STARTED;
        this.timer.paused = false;
        this.timer.start();
    }

    drawLevelInfo() {
        clearCanvas();
        ctx.fillText(
            `Press 'Space' to start ${this.name}`,
            canvas.width / 2,
            canvas.height / 2
        );
    }

    start() {
        this.status = STATUS.STARTED;
        this.objectList = Object.values(this.objects).flat();
        this.timer.start();
    }

    update(deltaTime) {
        clearCanvas();
        this.objectList.forEach((obj) =>
            obj.update(this.objects, deltaTime)
        );
        this.objectList.forEach((obj) => obj.draw());
    }
}
