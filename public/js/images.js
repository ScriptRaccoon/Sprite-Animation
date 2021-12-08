export const IMAGE = {
    PLAYER: null,
    RED_BIRD: null,
    WHITE_BIRD: null,
    TILEMAP: null,
    CLOUDS: null,
};

const sources = [
    {
        name: "PLAYER",
        src: "./assets/player/player-spritemap-v9-greenpants-edit.png",
    },
    {
        name: "RED_BIRD",
        src: "./assets/bird/bird_2_cardinal.png",
    },
    {
        name: "WHITE_BIRD",
        src: "./assets/bird/bird_1_white.png",
    },
    { name: "TILEMAP", src: "./assets/tiles/goodly-1x.png" },
    { name: "CLOUDS", src: "./assets/clouds/clouds-small.png" },
];

export function preloadImages(callbackFunction) {
    function preloadImage(i) {
        if (i < sources.length) {
            const img = new Image();
            img.onload = () => {
                preloadImage(i + 1);
            };
            IMAGE[sources[i].name] = img;
            img.src = sources[i].src;
        } else {
            callbackFunction();
        }
    }
    preloadImage(0);
}
