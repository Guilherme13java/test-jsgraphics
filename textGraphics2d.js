class vector2{
    constructor(x=0, y=0){
        this.x = x
        this.y= y
    }
    text(){
        return "("+this.x+", "+this.y+")"
    }
    add(other){
        return new vector2(this.x+other.x, this.y+other.y)
    }
    sub(other){
        return new vector2(this.x-other.x, this.y-other.y)
    }
    mul(other){
        if (typeof(other) == "number"){
            return new vector2(this.x*other, this.y*other)
        }else{
            return new vector2(this.x*other.x, this.y*other.y, this.z*other.z)
        }
    }
    div(other){
        if (typeof(other) == "number"){
            return new vector2(this.x/other, this.y/other)
        }else{
            return new vector2(this.x/other.x, this.y/other.y)
        }
    }
    magnitude(){
        return Math.sqrt(this.x*this.x+this.y*this.y)
    }
    unit(){
        return this.div(this.magnitude())
    }
}
class vector3{
    constructor(x=0, y=0, z=0){
        this.x = x
        this.y = y
        this.z = z
    }
    text(){
        return "("+this.x+", "+this.y+", "+this.z+")"
    }
    add(other){
        return new vector3(this.x+other.x, this.y+other.y, this.z+other.z)
    }
    sub(other){
        return new vector3(this.x-other.x, this.y-other.y, this.z-other.z)
    }
    mul(other){
        if (typeof(other)=="number"){
            return new vector3(this.x*other,this.y*other, this.z*other)
        }else{
            return new vector3(this.x*other.x, this.y*other.y, this.z*other.z)
        }
    }
    div(other){
        if (typeof(other)=="number"){
            return new vector3(this.x/other, this.y/other, this.z/other)
        }else{
            return new vector3(this.x/other.x, this.y/other.y, this.z/other.z)
        }
    }
    magnitude(){
        return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)
    }
    unit(){
        return this.div(this.magnitude())
    }
}

var Screen = []
document.body.style.backgroundColor = "rgb(0, 0, 0)"
document.body.style.margin = "0em"
document.body.style.overscrollBehavior = "none"
const TextElement = document.createElement("p")
TextElement.style.userSelect = "none"
TextElement.style.fontFamily = "monospace"
TextElement.style.color = "green"
document.body.appendChild(TextElement)
const WindowSize = new vector2(window.innerWidth, window.innerHeight)
//TextElement.style.display = "flex"
//TextElement.style.width = "100%"
/*const TextElement1 = document.createElement("div")
document.body.appendChild(TextElement1)
TextElement1.style.backgroundColor = "gray"
TextElement1.style.position = "fixed"
TextElement1.style.display = "block"
TextElement1.style.width = "100%"
TextElement1.style.heigth = "100%"*/
//window.innerWiddth/Height
//TextElement.style.display= "inline-block"
//TextElement.style.fontSize = window.innerWidth/50+"px"
Screen.size = new vector2(50, 25)
//50, 25
Screen.screen = []

String.prototype.setIndex = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

Screen.fill = (char) => {
    Screen.screen = ""
    for (let i = 0; i < Screen.size.x*Screen.size.y; i++){
        Screen.screen += char
    }
}
Screen.drawPixel = (char, position) => {
    position = new vector2(parseInt(position.x), parseInt(position.y))
    if (position.x >= 0 && position.y >= 0 && position.x < Screen.size.x && position.y <= Screen.size.y){
        Screen.screen = Screen.screen.setIndex(position.y*Screen.size.x+position.x, char)
    }
}
Screen.drawRect = (char, position, size) => {
    for (let y = 0; y<size.y; y++){
        for (let x = 0; x<size.x; x++){
            Screen.drawPixel(char, position.add(new vector2(x, y)))
        }
    }
}
Screen.drawCircle = (char, position, diameter) => {
    const Center = new vector2(diameter, diameter).div(2)
    for (let y = 0; y<diameter; y++){
        for (let x = 0; x<diameter; x++){
            if ((new vector2(x, y).sub(Center)).magnitude < diameter/2){
                Screen.drawPixel(char, position.add(new vector2(x, y)))
            }
        }
    }
}
Screen.drawText = (text, position) => {
    for (let i = 0; i < text.length; i++){
        Screen.drawPixel(text[i], position.add(new vector2(i, 0)))
    }
}
Screen.drawLine = (char, position1, position2) => {
    
}
Screen.drawPolygon = (char,positions) => {
    
}
Screen.refresh = () => {
    let FullText = ""
    for (let y = 0; y < Screen.size.y; y++){
        let Line = ""
        for (let x = 0; x < Screen.size.x; x++){
            Line += Screen.screen[y*Screen.size.x+x]
        }
        FullText += Line+"<br>"
    }
    TextElement.innerHTML = FullText
}

//built-in game Instance
var game = []
game.Objects = []
game.Gui = []
game.Config = []
game.Config.FPS = 12
game.Config.load = (dt) => {}
game.Config.mouseDown = (pos) => {}
game.Config.mouseUp = (pos) => {}

window.addEventListener("pointerdown", (event) => {
    let rect = event.target.getBoundingClientRect()
    let clickPos = new vector2(event.clientX-rect.left, event.clientY-rect.top).div(WindowSize).mul(Screen.size)
    clickPos = new vector2(Math.round(clickPos.x), Math.round(clickPos.y))
    game.Config.mouseDown()
    game.Gui.forEach((Item) => {
        if (Item.position.x < clickPos.x && Item.position.x+Item.size.x > clickPos.x && Item.position.y < clickPos.y && Item.position.y+Item.size.y > clickPos.y){
            Item.mouseDown()
        }
    })
})

window.addEventListener("pointerup", (event) => {
    let rect = event.target.getBoundingClientRect()
    let clickPos = new vector2(event.clientX-rect.left, event.clientY-rect.top)
    game.Config.mouseUp()
    game.Gui.forEach((Item) => {
        if (Item.position.x < clickPos.x && Item.position.x+Item.size.x > clickPos.x && Item.position.y < clickPos.y && Item.position.y+Item.size.y > clickPos.y){
            Item.mouseUp()
        }
    })
})

class button{
    constructor(name, position, size){
        this.name = name
        this.position = position
        this.size = size
        this.char = "#"
        this.text = ""
        this.visible = true
        this.mouseDown = () => {}
        this.mouseUp = () => {}
        game.Gui.push(this)
    }
}
const wait = time => new Promise(res => setTimeout(res, time))
async function _load(){
    while (true){
        const dt = 1/game.Config.FPS
        Screen.fill(".")
        game.Config.load(dt)
        game.Gui.forEach((Item, i) => {
            if (Item.visible){
                Screen.drawRect(Item.char, Item.position, Item.size)
                Screen.drawText(Item.text, Item.position.add(Item.size.div(2)).sub(new vector2(Item.text.length/2, 0)))
            }
        })
        Screen.refresh()
        await wait(dt*1000)
    }
}
_load()