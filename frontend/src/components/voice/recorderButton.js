import React from "react";
import Recorder from "./recorder";
import activeMicrophone from "../../images/activeMicrophone.png";
import deactivatedMicrophone from "../../images/deactivatedMicrophone.png";

var URL = window.URL || window.webkitURL;

let AudioContext = window.AudioContext || window.webkitAudioContext;
let rec;
let gumStream;

class RecorderButton extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			recording: false
		}
		this.startRecording = this.startRecording.bind(this);
		this.stopRecording = this.stopRecording.bind(this);
	}
	startRecording(){
		navigator.mediaDevices.getUserMedia({ audio: true, video:false }).then((stream) => {
			let audioContext = new AudioContext();	

			gumStream = stream;
			let input = audioContext.createMediaStreamSource(stream);
			rec = new Recorder(input,{numChannels:1});
			rec.record();
		}).then(() => {
			this.setState({recording:true});
		});
	}
	stopRecording(){
		rec.stop();
		this.setState({recording:false})
		gumStream.getAudioTracks()[0].stop();
		rec.exportWAV((blob) => {	
			let url = URL.createObjectURL(blob);
			this.props.addAudioFile(blob,url);
		});
		
	}
	render() {
		return (
			<img style={{"height":"100%", "width": "auto" ,"float":"right"}} className="RecordingButton" 
				onClick={ (this.state.recording)?this.stopRecording:this.startRecording } 
				touchEnd={ (this.state.recording)?this.stopRecording:this.startRecording } 
				src={ (this.state.recording)?activeMicrophone:deactivatedMicrophone}
			/>
	       );
	}
}
export default RecorderButton;

