export class Note{
    constructor(startTime, note, velocity, length){
        this.startTime = startTime;
        this.note = note;
        this.velocity = velocity;
        this.length = length;
    }
}

export class CanvasObject{
    constructor(){}
}

export class Rectangle extends CanvasObject{
    constructor(x,y,width,height){
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = [0,0,0,0]
    }
}