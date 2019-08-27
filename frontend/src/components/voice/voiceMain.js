import React from "react";
import Recorder from "./recorder";
var URL = window.URL || window.webkitURL;

let AudioContext = window.AudioContext || window.webkitAudioContext;
let rec;
let gumStream;

class mainHeader extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			files: []
		}
		this.startRecording = this.startRecording.bind(this);
		this.stopRecording = this.stopRecording.bind(this);
		this.addAudioFile = this.addAudioFile.bind(this);
	}
	startRecording(){
		navigator.mediaDevices.getUserMedia({ audio: true, video:false }).then((stream) => {
			let audioContext = new AudioContext();	
			console.log("sample rate",audioContext.sampleRate);

			gumStream = stream;
			let input = audioContext.createMediaStreamSource(stream);
			rec = new Recorder(input,{numChannels:1})

			//start the recording process
			rec.record()

			console.log("Recording started");
			
		});
	}
	stopRecording(){
		rec.stop();
		gumStream.getAudioTracks()[0].stop();
		rec.exportWAV(this.addAudioFile);
	}
	addAudioFile(blob){
		let url = URL.createObjectURL(blob);
		let filename = new Date().toISOString();
		let newFiles = this.state.files;
		newFiles.push({url:url,filename:filename});
		this.setState({files:newFiles});
	}
	render() {
		console.log(this.state);
		return (
			<div className={"voiceMain"} style={{"width":"100%","height":"72.5%"}}>
				VOICE SECTION!!!!
				<button onClick={this.startRecording} type="button">Start</button>
				<button onClick={this.stopRecording} type="button">Stop</button>
				{this.state.files.map((file) =>(<audio autoplay="true" controls="true" src={file.url}/>))}
			</div>
	       );
	}
}
export default mainHeader;

function createDownloadLink(blob) {
	console.log(blob);
	Recorder.forceDownload(blob)
}
