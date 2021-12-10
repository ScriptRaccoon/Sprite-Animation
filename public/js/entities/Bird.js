import { comeback } from "../features/comeback.js";
import { IMAGE } from "../images.js";
import { Sprite, SPRITE_STATUS } from "./Sprite.js";

export class Bird extends Sprite {
    constructor({ pos, level, type }) {
        super({
            pos,
            level,
            size: { x: 32, y: 32 },
            vel: { x: +2, y: 0 },
            spriteSheet:
                type == "red" ? IMAGE.RED_BIRD : IMAGE.WHITE_BIRD,
        });
        this.features = [
            comeback(this, { threshold: 200, randomTime: 3000 }),
        ];
        this.animation.frames = {
            flying: [
                { x: 0, y: 3 },
                { x: 1, y: 3 },
                { x: 2, y: 3 },
            ],
        };
        this.animation.speed = 0.1;
    }

    calculateStatus() {
        this.status = SPRITE_STATUS.FLYING;
    }
}
