<script> cdnjs.cloudflare.com/ajax/libs/tone/14.7.12/Tone.js <\script> 

console.clear();

// Loads two drumstick sounds from my github
var A = new Tone.Player({	
  'url': "https://raw.githubusercontent.com/sam-holmes2/Sam-s-Accelerating-Metronome/Audio/Drum_Stick_A.mp3",
}).toMaster();
var F = new Tone.Player({
  'url': "https://raw.githubusercontent.com/sam-holmes2/Sam-s-Accelerating-Metronome/Audio/Drum_Stick_F.mp3",
}).toMaster();
document.getElementById("remaining").defaultValue = "0";

// Creates a notes array containing the 4 notes to loop over
const notes = [ 
  'A', 'F', 'F', 'F', 
];

// Input functions to let the user change  init_bpm, goal_bpm and length.
function enter_init_bpm() {  
  Tone.Transport.bpm.value = document.getElementById('init_bpm').value;
};

function enter_length() {
  var length = 60 * document.getElementById('length').value;
	return length
};

function enter_goal_bpm() {
  var goal_bpm = document.getElementById('goal_bpm').value;
	return goal_bpm
};

function play_note(time) {
	// Plays the current note then increments note_index every 8th note	
	if (index % 4 == 0|| index == 0 ) {
		A.start(time);
	} else {
		F.start(time);
	};	
	index++;
};

// Functions to let the user start and stop the metronome.
function stop() {  	
	Tone.Transport.stop();		
	Tone.Transport.cancel();
	document.getElementById('remaining').innerHTML = 0
};

function start() {  
	stop();	 //Stops any previously scheduled clicks
	index = 0; 	// Creates an index to store the current note
	
	// Smoothly increases bpm from init to goal for time = length
	enter_init_bpm();
	Tone.Transport.bpm.rampTo(enter_goal_bpm(),enter_length());
	
	// Calls the play_note function every 8th note
	Tone.Transport.scheduleRepeat(time => {
		play_note(time);
	}, '8n');
	
	// Updates the remaining time and current BPM every 0.1 seconds, stopping when remaining time reaches 0
	Tone.Transport.scheduleRepeat(time => {		
		document.getElementById('current_bpm').innerHTML = Math.round(Tone.Transport.bpm.value)
		var remaining = Math.round(enter_length() - Tone.Transport.getSecondsAtTime(time));
		if (remaining >= 0) {
			document.getElementById('remaining').innerHTML = remaining; 
		} else {
			document.getElementById('remaining').innerHTML = 0;
			Tone.Transport.stop();		
		}
  }, 0.1);		
	
	// Start the metronome
	Tone.start();
	Tone.Transport.start();	
};
