export const animateWalk = (entity, { walkRow, walkCount }) => {
    const walkAnimationSpeed = 0.2;
    let walkTimer = null;
    return (objects, deltaTime) => {
        if (entity.vel.x == 0) {
            entity.offset = { x: 0, y: 0 };
            walkTimer = null;
            return;
        }
        if (walkTimer == null) {
            walkTimer = 0;
        }
        entity.orientation = entity.vel.x > 0 ? 1 : -1;
        const walkFrame = Math.floor(walkTimer) % walkCount;
        entity.offset = {
            x: walkFrame,
            y: walkRow,
        };
        walkTimer += walkAnimationSpeed * deltaTime;
    };
};
