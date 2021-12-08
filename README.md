# Sprite animation in JavaScript

This is a basic template for a Platformer in JavaScript including Sprite animations.

Demo: https://sprite-anima.netlify.app

There are three canvases, one for the background, one for the tiles (not redrawn during the game loop) and one for the game objects.

The game objects are divided into the following classes:

-   Rectangles
-   Sprites (can be animated, follow some physics, and may have optional features)
-   Players (sprites with collision detection which can be controlled to walk, jump and plant flowers)
-   Birds (sprites which fly back and forth)

Both controls and features are made reusable, so that they can also be applied to other classes of sprites. It is not a complete game, and has just one level, but it can easily be extended to a proper game. The timer class is borrowed from [here](https://github.com/meth-meth-method/super-mario).

This is a continuation of my [previous template](https://github.com/ScriptRaccoon/jump-and-run-template) where all objects where drawn just as plain rectangles.

The spritesheets used here are from [opengameart](https://opengameart.org) (with slight edits).

-   Player: https://opengameart.org/content/hero-spritesheets-ars-notoria
-   Tiles: https://opengameart.org/content/platformer-tilesets
-   Birds: https://opengameart.org/content/lpc-birds
-   Clouds: https://opengameart.org/content/old-frogatto-clouds-2
