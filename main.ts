namespace trailEffect {
    //% blockId=trail_create block="create trail for %Follow=variables_get(mySprite) with image %Image2=screen_image_picker and speed %Speed"
    //% Speed.defl=100
    //% group="Effects"
    export function createTrail(Follow: Sprite, Image2: Image, Speed: number) {
        Follow.z = 100
        let trailSprites: Sprite[] = []
        let scaleFactor = -0.05

        for (let i = 0; i < 16; i++) {
            let trail = sprites.create(Image2, SpriteKind.create())
            trail.changeScale(scaleFactor * i, ScaleAnchor.Middle)
            trail.z = 100 - (i + 1) * 5
            trailSprites.push(trail)
        }

        // Set follow chain
        trailSprites[0].follow(Follow, Speed)
        for (let j = 1; j < trailSprites.length; j++) {
            trailSprites[j].follow(trailSprites[j - 1], Speed)
        }

        // Make all trail sprites ghost (no collisions)
        for (let trail2 of trailSprites) {
            trail2.setFlag(SpriteFlag.Ghost, true)
        }
    }
}
