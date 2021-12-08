import { animateWalk } from "../features/animateWalk.js";
import { comeback } from "../features/comeback.js";
import { IMAGE } from "../images.js";
import { Sprite } from "./Sprite.js";

export class Bird extends Sprite {
    constructor({ pos, type }) {
        super({
            pos,
            size: { x: 32, y: 32 },
            vel: { x: +2, y: 0 },
            spriteSheet:
                type == "red" ? IMAGE.RED_BIRD : IMAGE.WHITE_BIRD,
            drawSize: { x: 32, y: 32 },
        });
        this.features = [
            animateWalk(this, { walkRow: 3, walkCount: 3 }),
            comeback(this, { threshold: 200, randomTime: 3000 }),
        ];
    }
}
