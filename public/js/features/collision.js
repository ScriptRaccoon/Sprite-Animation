const collide = {
    above: (entity, rect) => {
        if (
            entity.prevBottom <= rect.top &&
            entity.overlapsWith(rect)
        ) {
            entity.setBottom(rect.top);
            entity.vel.y = 0;
            entity.onGround = true;
        }
    },
    below: (entity, rect) => {
        if (
            entity.prevTop >= rect.bottom &&
            entity.overlapsWith(rect)
        ) {
            entity.setTop(rect.bottom);
            entity.vel.y = 0;
        }
    },
    left: (entity, rect) => {
        if (
            entity.prevRight <= rect.left &&
            entity.overlapsWith(rect)
        ) {
            entity.setRight(rect.left);
            entity.vel.x = 0;
        }
    },
    right: (entity, rect) => {
        if (
            entity.prevLeft >= rect.right &&
            entity.overlapsWith(rect)
        ) {
            entity.setLeft(rect.right);
            entity.vel.x = 0;
        }
    },
};

export const collideWithRectangles = (entity) => {
    entity.onGround = false;
    return (entities) => {
        for (const rect of entities.rectangles) {
            collide.above(entity, rect);
            collide.below(entity, rect);
            collide.left(entity, rect);
            collide.right(entity, rect);
        }
    };
};
