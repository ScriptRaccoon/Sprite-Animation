import { canvas } from "../canvas.js";

export const boundToCanvas = (entity) => {
    return () => {
        if (entity.left < 0) {
            entity.setLeft(0);
        }
        if (entity.right > canvas.size.x) {
            entity.setRight(canvas.size.x);
        }

        if (entity.bottom > canvas.size.y) {
            entity.setBottom(canvas.size.y);
        }
    };
};
