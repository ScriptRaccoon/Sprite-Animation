import { canvas } from "../canvas.js";
import { randInt } from "../utils.js";

export const comeback = (entity, { threshold, randomTime }) => {
    return () => {
        if (
            (entity.pos.x > canvas.size.x + threshold &&
                entity.vel.x > 0) ||
            (entity.pos.x < -threshold && entity.vel.x < 0)
        ) {
            const storedVel = entity.vel.x;
            entity.vel.x = 0;
            setTimeout(() => {
                entity.vel.x = -storedVel;
            }, randInt(0, randomTime));
        }
    };
};
