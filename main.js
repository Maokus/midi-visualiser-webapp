import 'midi-parser-js';
import 'bezier-easing'
import { MidiObjToNotes } from './midiproc.js';
import { startAnimation } from './canvas.js';
import { download, startRecording, stopRecording } from './recorder.js';


var currentMidiNotes = [];
var bpm = 120;
var timeDivision = 96;

var recording = false;
var mediaRecorder;

function main(){
    var masterContent = document.getElementById("contentLocation");

    //Setup MIDI File reader
    let midiInputField = document.getElementById('filereader');
    MidiParser.parse(midiInputField,(obj)=>{
        [currentMidiNotes, timeDivision] = MidiObjToNotes(obj);
    })

    //Setup settings formm
    let settingsForm = document.getElementById("settingsform");
    settingsForm.onsubmit = handleSubmitSettings;

    //Setup play button
    let playbackButton = document.getElementById("playbutton");
    playbackButton.onclick=handlePlay;

    //Setup recording button
    var recordButton = document.getElementById("recordingbutton");
    recordButton.onclick = handleRecordingToggle;
    
}

function handleSubmitSettings(e){
    e.preventDefault();
    var newBpm = parseInt(e.target[0].value);
    if(newBpm>0){
        bpm = newBpm;
    }else{
        alert("error occured in input validation");
    }
}

function handlePlay(){
    console.log(currentMidiNotes)
    startAnimation(currentMidiNotes, bpm, timeDivision);
}

function handleRecordingToggle(){
    var recordButton = document.getElementById("recordingbutton");
    if(!recording){
        recording = true;
        recordButton.innerHTML="Stop recording";
        startRecording();
    }else{
        recording = false;
        recordButton.innerHTML="Start recording";
        stopRecording();
        setTimeout(download,1000);
    }
}




window.addEventListener("load",main);

