import { SPRITE_STATUS } from "../objects/Sprite.js";

export const walk = (entity, { speed }) => {
    return (direction) => {
        if (direction === false) {
            entity.vel.x = 0;
        } else {
            if (entity.status != SPRITE_STATUS.PICKING)
                entity.vel.x = direction * speed;
        }
    };
};
