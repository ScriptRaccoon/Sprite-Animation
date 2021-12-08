import { Box } from "./Box.js";

export class Player extends Box {
    constructor({ pos }) {
        super({
            pos,
            size: { x: 30, y: 30 },
            vel: { x: 0, y: 0 },
            gravity: 0.7,
        });
        this.color = "red";
        this.addControls();
    }

    addControls() {
        document.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "ArrowRight":
                    this.vel.x = 5;
                    break;
                case "ArrowLeft":
                    this.vel.x = -5;
                    break;
                case "ArrowUp":
                    if (this.onGround) {
                        this.onGround = false;
                        this.vel.y = -17;
                    }

                    break;
            }
        });

        document.addEventListener("keyup", (e) => {
            if (["ArrowRight", "ArrowLeft"].includes(e.key)) {
                this.vel.x = 0;
            }
        });
    }
}
