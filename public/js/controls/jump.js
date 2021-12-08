export const jump = (entity, { speed }) => {
    return () => {
        if (entity.onGround && !entity.picking) {
            entity.onGround = false;
            entity.vel.y = -speed;
        }
    };
};
