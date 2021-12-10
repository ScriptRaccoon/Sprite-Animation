export class Rectangle {
    constructor({ pos, size, level }) {
        this.level = level;
        this.pos = pos;
        this.size = size || { x: 16, y: 16 };
    }

    get left() {
        return this.pos.x;
    }

    get right() {
        return this.pos.x + this.size.x;
    }

    get top() {
        return this.pos.y;
    }

    get bottom() {
        return this.pos.y + this.size.y;
    }

    setLeft(val) {
        this.pos.x = val;
    }

    setRight(val) {
        this.pos.x = val - this.size.x;
    }

    setTop(val) {
        this.pos.y = val;
    }

    setBottom(val) {
        this.pos.y = val - this.size.y;
    }

    overlapsWith(obj, offset = { x: 0, y: 0 }) {
        if (this === obj) return false;
        return (
            this.left + offset.x < obj.right &&
            this.right + offset.x > obj.left &&
            this.bottom + offset.y > obj.top &&
            this.top + offset.y < obj.bottom
        );
    }

    draw() {
        return;
    }

    update() {
        return;
    }
}
