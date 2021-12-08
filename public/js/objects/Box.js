import { Rectangle } from "./Rectangle.js";
import { collide } from "../collision.js";

export class Box extends Rectangle {
    constructor({ pos, size, vel, gravity }) {
        super({ pos, size });
        this.vel = vel || { x: 0, y: 0 };
        this.ppos = { ...this.pos };
        this.gravity = gravity || 0;
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

    applyPhysics(deltaTime) {
        this.ppos = { ...this.pos };
        this.onGround = false;
        this.vel.y += this.gravity * deltaTime;
        this.pos.y += this.vel.y * deltaTime;
        this.pos.x += this.vel.x * deltaTime;
    }

    update(objects, deltaTime) {
        this.applyPhysics(deltaTime);
        for (const obj of objects.rectangles) {
            collide.above(this, obj);
            collide.below(this, obj);
            collide.left(this, obj);
            collide.right(this, obj);
        }
        this.boundToCanvas();
    }

    boundToCanvas() {
        if (this.left < 0) {
            this.setLeft(0);
        }
        if (this.right > canvas.width) {
            this.setRight(canvas.width);
        }

        if (this.bottom > canvas.height) {
            this.setBottom(canvas.height);
        }
    }
}
