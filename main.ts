namespace trailEffect {
    //% blockId=trail_create block="create trail for %Follow=variables_get(mySprite) with image %Image2=screen_image_picker speed %Speed and %Amount trails"
    //% Speed.defl=100 Amount.defl=10 Amount.min=1 Amount.max=20
    //% group="Effects"
    export function createTrail(Follow: Sprite, Image2: Image, Speed: number, Amount: number) {
        Follow.z = 100
        let trailSprites: Sprite[] = []
        let scaleFactor = -0.05

        for (let i = 0; i < Amount; i++) {
            let trail = sprites.create(Image2, SpriteKind.create())
            trail.changeScale(scaleFactor * i, ScaleAnchor.Middle)
            trail.z = 100 - (i + 1) * 5
            trailSprites.push(trail)
        }

        if (Speed > 0) {
            // If speed > 0, make the trail follow
            trailSprites[0].follow(Follow, Speed)
            for (let j = 1; j < trailSprites.length; j++) {
                trailSprites[j].follow(trailSprites[j - 1], Speed)
            }
        } else {
            // If speed is 0, position them manually instead
            for (let k = 0; k < trailSprites.length; k++) {
                trailSprites[k].setPosition(Follow.x - (k * 2), Follow.y - (k * 2))
            }
        }

        // Make all trail sprites ghost (no collisions)
        for (let trail2 of trailSprites) {
            trail2.setFlag(SpriteFlag.Ghost, true)
        }
    }
}
