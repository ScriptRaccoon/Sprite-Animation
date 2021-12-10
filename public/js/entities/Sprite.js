import { Rectangle } from "./Rectangle.js";
import { canvas, ctx } from "../canvas.js";
import { Animation } from "../Animation.js";

export const SPRITE_STATUS = {
    IDLE: "idle",
    WALKING: "walking",
    JUMPING: "jumping",
    JUMPING_SIDE: "jumpingSide",
    PICKING: "picking",
    FLYING: "flying",
};

export class Sprite extends Rectangle {
    constructor({
        pos,
        size,
        level,
        vel,
        gravity,
        spriteSheet,
        drawSize,
    }) {
        super({ pos, size, level });
        this.vel = vel || { x: 0, y: 0 };
        this.spriteSheet = spriteSheet;
        this.orientation = 1;
        this.ppos = { ...this.pos };
        this.drawSize = drawSize || { ...this.size };
        this.gravity = gravity || 0;
        this.features = [];
        this.status = SPRITE_STATUS.IDLE;
        this.animation = new Animation({
            entity: this,
            frames: {
                idle: [{ x: 0, y: 0 }],
            },
        });
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
        ctx.entity.save();

        if (this.orientation == -1)
            ctx.entity.translate(canvas.size.x, 0);

        ctx.entity.scale(this.orientation, 1);

        const drawX =
            this.orientation == 1
                ? this.pos.x - (this.drawSize.x - this.size.x) / 2
                : canvas.size.x -
                  this.pos.x -
                  this.drawSize.x +
                  (this.drawSize.x - this.size.x) / 2;

        const drawY = this.pos.y - (this.drawSize.y - this.size.y);

        ctx.entity.drawImage(
            this.spriteSheet,
            this.drawSize.x * this.animation.frame.x,
            this.drawSize.y * this.animation.frame.y,
            this.drawSize.x,
            this.drawSize.y,
            drawX,
            drawY,
            this.drawSize.x,
            this.drawSize.y
        );

        ctx.entity.restore();
    }

    applyPhysics(deltaTime) {
        this.ppos = { ...this.pos };
        this.onGround = false;
        this.vel.y += this.gravity * deltaTime;
        this.pos.y += this.vel.y * deltaTime;
        this.pos.x += this.vel.x * deltaTime;
    }

    update(deltaTime) {
        this.applyPhysics(deltaTime);
        for (const feature of this.features) {
            feature(this.level.entities, deltaTime);
        }
        if (this.vel.x != 0)
            this.orientation = this.vel.x > 0 ? +1 : -1;
        this.previousStatus = this.status;
        this.calculateStatus();
        this.animation.update(deltaTime);
    }

    calculateStatus() {
        return;
    }
}
