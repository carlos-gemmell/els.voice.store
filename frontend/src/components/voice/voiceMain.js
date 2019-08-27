import React from "react";
import Recorder from "./recorder";

class mainHeader extends React.Component {

	AudioContext = window.AudioContext || window.webkitAudioContext;

	constructor(props){
		super(props);
		this.startRecording = this.startRecording.bind(this);
		this.stopRecording = this.stopRecording.bind(this);
	}
	startRecording(){
		console.log("recordButton clicked");
		navigator.mediaDevices.getUserMedia({ audio: true, video:false }).then((stream) => {
			let audioContext = new this.AudioContext();	
			console.log("Audio Context",this.AudioContext)
			console.log("audio context", audioContext);
			console.log("sample rate",audioContext.sampleRate);

			let gumStream = stream;
			let input = audioContext.createMediaStreamSource(stream);
			let rec = new Recorder(input,{numChannels:1})

			//start the recording process
			rec.record()

			console.log("Recording started");
			setTimeout(() =>{
				rec.stop();
				gumStream.getAudioTracks()[0].stop();
				rec.exportWAV(createDownloadLink);
			}, 3000);
			
		});
	}
	stopRecording(){

	}
	render() {
		console.log(this.state);
		return (
			<div className={"voiceMain"} style={{"width":"100%","height":"72.5%"}}>
				VOICE SECTION!!!!
				<button onClick={this.startRecording} type="button">Start</button>
				<button onClick={this.stopRecording} type="button">Stop</button>
			</div>
	       );
	}
}
export default mainHeader;

function createDownloadLink(blob) {
	Recorder.forceDownload(blob)
}
