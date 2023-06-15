import { Rectangle } from "./classes.js";
import { offsetFromTime, opacityFromTime, xScaleFromTime } from "./math.js";

//Initial conditions
var midiNotes = [];
var bpm = -1;
var timePerPulse = 0;

var globalOffset = [100,100];
var globalScale = [0.5,1];


var prevFrameTime = 0;
var animationStartTime = 0;
var currentTime = 0;

var rectangles = []; //A list of objects in the canvas

var animplaying = false;

function draw(){
    //Init canvas and stuff
    const canvas = document.getElementById("canvasdisplay");
    if(canvas.getContext){
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle="white";
        ctx.fillRect(0,0,canvas.width,canvas.height);

        //Calculate current tick
        currentTime = Date.now();
        var timeSinceStart = currentTime-animationStartTime;
        var pulsesSinceStart = Math.floor(timeSinceStart/timePerPulse)

        //Update each rectangle based on the corresponding midi note
        for(var i=0; i<rectangles.length;i++){
            var r=rectangles[i];
            var n=midiNotes[i];
            var ttn = timePerPulse*n.startTime-timeSinceStart; //Time to note

            r.color[3] = opacityFromTime(ttn);
            ctx.fillStyle = `rgb(${r.color.join(",")})`;
            ctx.fillRect(r.x*globalScale[0]+offsetFromTime(ttn)+globalOffset[0] ,r.y*globalScale[1]+globalOffset[1], r.width*xScaleFromTime(ttn)*globalScale[0], r.height*globalScale[1]);
        }

        ctx.fillStyle="rgb(0,0,0,1)";
        ctx.fillText("BPM: "+bpm, 10, 10);
        ctx.fillText("Pulse: "+pulsesSinceStart, 10, 30);

    }

    if(animplaying){
        window.requestAnimationFrame(draw);
    }
}

export function startAnimation(currentMidiNotes, inputbpm, inputTimeDivision, inputOffset, inputScale){

    globalOffset = inputOffset;
    globalScale = inputScale;

    midiNotes = currentMidiNotes;
    bpm = inputbpm;
    timePerPulse = parseFloat(60)/bpm*1000/inputTimeDivision;

    const canvas = document.getElementById("canvasdisplay");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    rectangles = [];
    for(var note of midiNotes){
        var newRect = new Rectangle(note.startTime, canvas.height-note.note*5, note.length, 5);
        newRect.color = [0,0,0,1];
        rectangles.push(newRect);
    }


    animationStartTime = Date.now()+200;
    prevFrameTime = animationStartTime;


    console.log("drawing...");
    animplaying = true;
    draw();

}

export function stopAnimation(){
    animplaying = false;
}