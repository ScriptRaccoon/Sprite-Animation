export const pick = (entity) => {
    entity.picking = false;
    return (bool) => {
        if (bool) {
            if (entity.onGround) {
                entity.picking = true;
                entity.vel.x = 0;
            }
        } else {
            entity.picking = false;
        }
    };
};
