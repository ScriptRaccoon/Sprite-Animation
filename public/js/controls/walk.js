export const walk = (entity, { speed }) => {
    return (direction) => {
        if (direction === false) {
            entity.vel.x = 0;
        } else {
            if (!entity.picking) entity.vel.x = direction * speed;
        }
    };
};
