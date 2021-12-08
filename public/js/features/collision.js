const collide = {
    above: (entity, obj) => {
        if (
            entity.prevBottom <= obj.top &&
            entity.overlapsWith(obj)
        ) {
            entity.setBottom(obj.top);
            entity.vel.y = 0;
            entity.onGround = true;
        }
    },
    below: (entity, obj) => {
        if (
            entity.prevTop >= obj.bottom &&
            entity.overlapsWith(obj)
        ) {
            entity.setTop(obj.bottom);
            entity.vel.y = 0;
        }
    },
    left: (entity, obj) => {
        if (
            entity.prevRight <= obj.left &&
            entity.overlapsWith(obj)
        ) {
            entity.setRight(obj.left);
            entity.vel.x = 0;
        }
    },
    right: (entity, obj) => {
        if (
            entity.prevLeft >= obj.right &&
            entity.overlapsWith(obj)
        ) {
            entity.setLeft(obj.right);
            entity.vel.x = 0;
        }
    },
};

export const collideWithRectangles = (entity) => {
    entity.onGround = false;
    return (objects) => {
        for (const obj of objects.rectangles) {
            collide.above(entity, obj);
            collide.below(entity, obj);
            collide.left(entity, obj);
            collide.right(entity, obj);
        }
    };
};
