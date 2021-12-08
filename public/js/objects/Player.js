import { jump } from "../controls/jump.js";
import { pick } from "../controls/pick.js";
import { walk } from "../controls/walk.js";
import { animateJump } from "../features/animateJump.js";
import { animatePick } from "../features/animatePick.js";
import { animateWalk } from "../features/animateWalk.js";
import { boundToCanvas } from "../features/bound.js";
import { collideWithRectangles } from "../features/collision.js";
import { IMAGE } from "../images.js";
import { Sprite } from "./Sprite.js";

export class Player extends Sprite {
    constructor({ pos }) {
        super({
            pos,
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
            animateWalk(this, { walkRow: 1, walkCount: 8 }),
            animateJump(this, { frames: [2, 3, 4] }),
            animatePick(this, { frame: 1 }),
        ];
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
}
