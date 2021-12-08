export const canvas = {
    background: document.getElementById("backgroundCanvas"),
    tile: document.getElementById("tileCanvas"),
    object: document.getElementById("objectCanvas"),
    size: { x: 640, y: 480 },
};

export const ctx = {
    background: canvas.background.getContext("2d"),
    tile: canvas.tile.getContext("2d"),
    object: canvas.object.getContext("2d"),
};

ctx.object.fillStyle = "white";
ctx.object.font = "30px sans-serif";
ctx.object.textAlign = "center";

export function clearCanvas(key) {
    ctx[key].clearRect(0, 0, canvas[key].width, canvas[key].height);
}

export function showLoadingScreen() {
    ctx.object.fillText(
        `Loading the game ...`,
        canvas.size.x / 2,
        canvas.size.y / 2
    );
}
