import { TILE_SIZE } from "../Level.js";
import { SPRITE_STATUS } from "../entities/Sprite.js";

export const plant = (entity) => {
    return () => {
        const level = entity.level;
        const flowers = level.tileData["7,0"];
        if (entity.status == SPRITE_STATUS.PICKING) {
            const x = entity.pos.x + entity.orientation * TILE_SIZE;
            const y = entity.pos.y + entity.size.y - TILE_SIZE;
            const u = Math.round(x / TILE_SIZE);
            const v = Math.round(y / TILE_SIZE);
            if (
                !flowers.includes(`${u},${v}`) &&
                level.isSolidAt(u, v + 1)
            )
                flowers.push(`${u},${v}`);
            level.drawTiles();
        }
    };
};
