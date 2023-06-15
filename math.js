
var easing = BezierEasing(0.7, 0, 0.3, 1);

export function opacityFromTime(ttn){ //time to note (in millis)
    var length = 200;
    if(ttn>length){
        return 0;
    }
    if(ttn<0){
        return 1;
    }
    return 1-ttn/length;
}

export function offsetFromTime(ttn){
    var length = 400;
    var toffset = 0;
    var hl = length/2;
    var magnitude = 20;

    var corrected_ttn = ttn+toffset;

    if(corrected_ttn>length){
        return -magnitude;
    }if(corrected_ttn<0){
        return 0;
    }else{
        return -easing(corrected_ttn/length)*magnitude
    }
}

export function xScaleFromTime(ttn){
    var length = 400;
    var hl = length/2;

    if(ttn>length){
        return 0;
    }if(ttn<0){
        return 1;
    }else{
        return 1-easing(ttn/length)
    }
}