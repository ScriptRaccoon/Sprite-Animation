export const animatePick = (entity, { frame }) => {
    return () => {
        if (entity.picking) entity.offset = { x: frame, y: 0 };
    };
};
