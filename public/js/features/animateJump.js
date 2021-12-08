export const animateJump = (entity, { frames }) => {
    return (objects, deltaTime) => {
        if (!entity.onGround) {
            entity.offset =
                entity.vel.x == 0
                    ? { x: frames[0], y: 0 }
                    : entity.vel.x > 0
                    ? { x: frames[1], y: 0 }
                    : { x: frames[2], y: 0 };
        }
    };
};
