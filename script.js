class particle{
    constructor(name, position){
        this.name = name
        this.position = position
        this.velocity = new vector2()
        game.Objects.push(this)
    }
}

Screen.size = new vector2(100, 20)
const GravityForce = 5
for (let i = 0; i < 100; i++){
    new particle(i, new vector2(Math.random()*Screen.size.x, Math.random()*Screen.size.y))
}

const up = new button("up", new vector2(10, Screen.size.y*0.5), new vector2(10, 5))
up.char = "^"
const down= new button("down", new vector2(10, Screen.size.y*0.5+5), new vector2(10, 5))
down.char = "v"

var Camera = []
Camera.position = new vector2()

var moveDirection = new vector2()

up.mouseDown = () => {
    moveDirection = new vector2(0, 1)
}
up.mouseUp() => {
    moveDirection = new vector2(0, -1)
}
down.mouseDown() => {
    
}
down.mouseUp() => {
    
}

function updateFrame(dt){
    //console.log(game.length)
    game.Objects.forEach((Particle, i) => {
        let Acceleration = new vector2(0, 0)
        game.Objects.forEach((Other, i2) => {
            if (Particle.name != Other.name){
                let Diff = Other.position.sub(Particle.position)
                let Distance = Diff.magnitude()
                let Direction = Diff.unit()
                Acceleration = Acceleration.add((Direction.div(Distance)).mul(GravityForce))
            }
        })
        Particle.velocity = Particle.velocity.add(Acceleration.mul(dt))
        Particle.position = Particle.position.add(Particle.velocity.mul(dt))
    })
}

function drawFrame(){
    game.Objects.forEach((Particle, i) => {
        Screen.drawPixel("O", Particle.position)
    })
    Screen.drawCircle("c", new vector2(10, 0), 5)
    Screen.drawText("@guimo81", new vector2())
}

game.Config.load = (dt) => {
    updateFrame(dt)
    drawFrame()
}