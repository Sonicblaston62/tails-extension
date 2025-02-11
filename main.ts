//% weight=100 color=#ff8000 icon="\uf021" block="Trail Effect"
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

        // Set follow chain
        if (trailSprites.length > 0) {
            trailSprites[0].follow(Follow, Speed)
            for (let i = 1; i < trailSprites.length; i++) {
                trailSprites[i].follow(trailSprites[i - 1], Speed)
            }
        }

        // Make all trail sprites ghost (no collisions)
        for (let trail of trailSprites) {
            trail.setFlag(SpriteFlag.Ghost, true)
        }
    }
}

let mySprite = sprites.create(img`
    . . 2 2 b b b b b . . . . . . . 
    . 2 b 4 4 4 4 4 4 b . . . . . . 
    2 2 4 4 4 4 d d 4 4 b . . . . . 
    2 b 4 4 4 4 4 4 d 4 b . . . . . 
    2 b 4 4 4 4 4 4 4 d 4 b . . . . 
    2 b 4 4 4 4 4 4 4 4 4 b . . . . 
    2 b 4 4 4 4 4 4 4 4 4 e . . . . 
    2 2 b 4 4 4 4 4 4 4 b e . . . . 
    . 2 b b b 4 4 4 b b b e . . . . 
    . . e b b b b b b b e e . . . . 
    . . . e e b 4 4 b e e e b . . . 
    . . . . . e e e e e e b d b b . 
    . . . . . . . . . . . b 1 1 1 b 
    . . . . . . . . . . . c 1 d d b 
    . . . . . . . . . . . c 1 b c . 
    . . . . . . . . . . . . c c . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite, 100, 100)
trailEffect.createTrail(
mySprite,
img`
    . . 2 2 b b b b b . . . . . . . 
    . 2 b 4 4 4 4 4 4 b . . . . . . 
    2 2 4 4 4 4 d d 4 4 b . . . . . 
    2 b 4 4 4 4 4 4 d 4 b . . . . . 
    2 b 4 4 4 4 4 4 4 d 4 b . . . . 
    2 b 4 4 4 4 4 4 4 4 4 b . . . . 
    2 b 4 4 4 4 4 4 4 4 4 e . . . . 
    2 2 b 4 4 4 4 4 4 4 b e . . . . 
    . 2 b b b 4 4 4 b b b e . . . . 
    . . e b b b b b b b e e . . . . 
    . . . e e b 4 4 b e e e b . . . 
    . . . . . e e e e e e b d b b . 
    . . . . . . . . . . . b 1 1 1 b 
    . . . . . . . . . . . c 1 d d b 
    . . . . . . . . . . . c 1 b c . 
    . . . . . . . . . . . . c c . . 
    `,
100,
100
)
