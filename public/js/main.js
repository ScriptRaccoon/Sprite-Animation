import { showLoadingScreen } from "./canvas.js";
import { preloadImages } from "./images.js";
import { level1 } from "./levels/level1.js";

showLoadingScreen();
preloadImages(() => {
    level1.makeReady();
});
