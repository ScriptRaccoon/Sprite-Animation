import { Rectangle } from "./Rectangle.js";
import { canvas, ctx } from "../canvas.js";

export class Sprite extends Rectangle {
    constructor({ pos, size, vel, gravity, spriteSheet, drawSize }) {
        super({ pos, size });
        this.vel = vel || { x: 0, y: 0 };
        this.spriteSheet = spriteSheet;
        this.offset = { x: 0, y: 0 };
        this.orientation = 1;
        this.ppos = { ...this.pos };
        this.drawSize = drawSize || { ...this.size };
        this.gravity = gravity || 0;
        this.features = [];
    }

    get prevLeft() {
        return this.ppos.x;
    }

    get prevRight() {
        return this.ppos.x + this.size.x;
    }

    get prevTop() {
        return this.ppos.y;
    }

    get prevBottom() {
        return this.ppos.y + this.size.y;
    }

    draw() {
        ctx.object.save();
        if (this.orientation == -1)
            ctx.object.translate(canvas.size.x, 0);
        ctx.object.scale(this.orientation, 1);
        ctx.object.drawImage(
            this.spriteSheet,
            this.drawSize.x * this.offset.x,
            this.drawSize.y * this.offset.y,
            this.drawSize.x,
            this.drawSize.y,
            this.orientation == 1
                ? this.pos.x - (this.drawSize.x - this.size.x) / 2
                : canvas.size.x -
                      this.pos.x -
                      this.drawSize.x +
                      (this.drawSize.x - this.size.x) / 2,
            this.pos.y - (this.drawSize.y - this.size.y),
            this.drawSize.x,
            this.drawSize.y
        );

        ctx.object.restore();
    }

    applyPhysics(deltaTime) {
        this.ppos = { ...this.pos };
        this.onGround = false; // would not be here.
        this.vel.y += this.gravity * deltaTime;
        this.pos.y += this.vel.y * deltaTime;
        this.pos.x += this.vel.x * deltaTime;
    }

    update(objects, deltaTime) {
        this.applyPhysics(deltaTime);
        for (const feature of this.features) {
            feature(objects, deltaTime);
        }
    }
}
