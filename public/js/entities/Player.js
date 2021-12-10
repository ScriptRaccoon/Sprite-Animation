import { jump } from "../controls/jump.js";
import { pick } from "../controls/pick.js";
import { walk } from "../controls/walk.js";
import { boundToCanvas } from "../features/bound.js";
import { collideWithRectangles } from "../features/collision.js";
import { plant } from "../features/plant.js";
import { IMAGE } from "../images.js";
import { Sprite, SPRITE_STATUS } from "./Sprite.js";

export class Player extends Sprite {
    constructor({ pos, level }) {
        super({
            pos,
            level,
            size: { x: 20, y: 50 },
            vel: { x: 0, y: 0 },
            gravity: 0.7,
            spriteSheet: IMAGE.PLAYER,
            drawSize: { x: 46, y: 50 },
        });
        this.addControls({
            walk: walk(this, { speed: 5 }),
            jump: jump(this, { speed: 17 }),
            pick: pick(this),
        });
        this.features = [
            boundToCanvas(this),
            collideWithRectangles(this),
            plant(this),
        ];
        this.animation.frames = {
            idle: [{ x: 0, y: 0 }],
            jumping: [{ x: 2, y: 0 }],
            jumpingSide: [{ x: 3, y: 0 }],
            walking: [
                { x: 0, y: 1 },
                { x: 1, y: 1 },
                { x: 2, y: 1 },
                { x: 3, y: 1 },
                { x: 4, y: 1 },
                { x: 5, y: 1 },
                { x: 6, y: 1 },
                { x: 7, y: 1 },
            ],
            picking: [{ x: 1, y: 0 }],
        };
    }

    addControls(controls) {
        document.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "ArrowRight":
                    controls.walk(+1);
                    break;
                case "ArrowLeft":
                    controls.walk(-1);
                    break;
                case "ArrowUp":
                    controls.jump(true);
                    break;
                case "ArrowDown":
                    controls.pick(true);
                    break;
            }
        });

        document.addEventListener("keyup", (e) => {
            if (["ArrowRight", "ArrowLeft"].includes(e.key)) {
                controls.walk(false);
            } else if (e.key == "ArrowDown") {
                controls.pick(false);
            }
        });
    }

    calculateStatus() {
        if (this.status == SPRITE_STATUS.PICKING) return;
        this.status =
            this.vel.y != 0
                ? this.vel.x != 0
                    ? SPRITE_STATUS.JUMPING_SIDE
                    : SPRITE_STATUS.JUMPING
                : this.vel.x != 0
                ? SPRITE_STATUS.WALKING
                : SPRITE_STATUS.IDLE;
    }
}
