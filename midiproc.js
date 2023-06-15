import {Note} from "./classes.js"

export function MidiObjToNotes(obj){

    var onOffNotes = obj.track[0].event;
    
    var currentTime = 0;
    var pressedNotes = []; //An array of velocities of each note
    var notes = [];
    
    for(let i=0; i<128;i++){
        pressedNotes.push({
            velocity: -1, 
            startTime: -1
        });
    }

    for(let message of onOffNotes){
        currentTime += message.deltaTime
        if((!message.hasOwnProperty("channel"))||obj.type<8||obj.type>9){
            currentTime += message.deltaTime
            continue;
        }
        let noteId = message.data[0]

        if(message.type==9){
            //Start note recieved
            pressedNotes[noteId].velocity = message.data[1];
            pressedNotes[noteId].startTime = currentTime;
        }else if(message.type==8){
            //End note recieved
            //Get info about start of note
            var noteInfo = pressedNotes[noteId];
            if(noteInfo.startTime!=-1){

                //Create note object
                var newNote = new Note(
                    noteInfo.startTime, 
                    noteId, 
                    noteInfo.velocity,
                    currentTime-noteInfo.startTime
                );
                
                //Add note object to notes list
                notes.push(newNote);
                
                //Reset pressed note (it is no longer pressed)
                pressedNotes[noteId].startTime = -1;
                pressedNotes[noteId].velocity=-1;
            }
        }
    }

    notes = notes.sort((a,b)=>a.startTime-b.startTime)

    return [notes, obj.timeDivision];
}