# midi-visualiser-webapp

Quick app made to replicate the effect seen in https://www.youtube.com/watch?v=sOWA2GN624g.

Feel free to tweak it for your own use! The code is a little messy but you can pretty much ignore most of the files. the important ones are `index.html`, `canvas.js`, `main.js` and `math.js`

If you want to edit the behaviour of the notes at onset, you can tweak the functions in `math.js` (hint, `ttn` is the time in milliseconds to the note, with negative values if the note has passed. 

All the animation and drawing is done in `canvas.js`
