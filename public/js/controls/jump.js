import { SPRITE_STATUS } from "../objects/Sprite.js";

export const jump = (entity, { speed }) => {
    return () => {
        if (
            entity.onGround &&
            entity.status != SPRITE_STATUS.PICKING
        ) {
            entity.onGround = false;
            entity.vel.y = -speed;
        }
    };
};
