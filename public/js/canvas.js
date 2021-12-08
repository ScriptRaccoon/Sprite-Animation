export const canvas = document.getElementById("canvas");

export const ctx = canvas.getContext("2d");

ctx.fillStyle = "black";
ctx.font = "30px sans-serif";
ctx.textAlign = "center";

export function clearCanvas(key) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
