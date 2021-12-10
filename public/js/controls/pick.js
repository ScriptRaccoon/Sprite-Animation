import { SPRITE_STATUS } from "../objects/Sprite.js";

export const pick = (entity) => {
    return (bool) => {
        if (bool) {
            if (entity.onGround) {
                entity.status = SPRITE_STATUS.PICKING;
                entity.vel.x = 0;
            }
        } else {
            entity.status = SPRITE_STATUS.IDLE;
        }
    };
};
