export class Animation {
    constructor({ entity, frames }) {
        this.entity = entity;
        this.speed = 0.2;
        this.frames = frames;
        this.timer = 0;
        this.frame = this.frames[this.entity.status][0];
    }

    update(deltaTime) {
        if (this.entity.status != this.entity.previousStatus) {
            this.timer = 0;
        } else {
            this.timer += deltaTime * this.speed;
            if (
                this.timer >= this.frames[this.entity.status].length
            ) {
                this.timer = 0;
            }
        }
        const index = Math.floor(this.timer);
        this.frame = this.frames[this.entity.status][index];
    }
}
