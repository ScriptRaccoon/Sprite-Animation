import { canvas, ctx } from "../canvas.js";
import { IMAGE } from "../images.js";

export class Background {
    constructor({ name, color, speed }) {
        this.name = name;
        this.color = color || "white";
        this.speed = speed || 0.1;
        this.image = IMAGE[name];
        this.offset = 0;
    }

    update(deltaTime) {
        this.offset += this.speed * deltaTime;
    }

    draw() {
        ctx.background.fillStyle = this.color;
        ctx.background.fillRect(0, 0, canvas.size.x, canvas.size.y);
        ctx.background.drawImage(
            this.image,
            0,
            0,
            canvas.size.x,
            this.image.height,
            this.offset % canvas.size.x,
            0,
            canvas.size.x,
            this.image.height
        );
        ctx.background.drawImage(
            this.image,
            0,
            0,
            canvas.size.x,
            this.image.height,
            (this.offset % canvas.size.x) - canvas.size.x,
            0,
            canvas.size.x,
            this.image.height
        );
    }
}
