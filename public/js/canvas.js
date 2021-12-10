export const canvas = {
    background: document.getElementById("backgroundCanvas"),
    tile: document.getElementById("tileCanvas"),
    entity: document.getElementById("entityCanvas"),
    size: { x: 640, y: 480 },
};

export const ctx = {
    background: canvas.background.getContext("2d"),
    tile: canvas.tile.getContext("2d"),
    entity: canvas.entity.getContext("2d"),
};

ctx.entity.fillStyle = "white";
ctx.entity.font = "30px sans-serif";
ctx.entity.textAlign = "center";

export function clearCanvas(key) {
    ctx[key].clearRect(0, 0, canvas[key].width, canvas[key].height);
}

export function showLoadingScreen() {
    ctx.entity.fillText(
        `Loading the game ...`,
        canvas.size.x / 2,
        canvas.size.y / 2
    );
}
