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
		console.log("Starting Recording");
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
		console.log(this.state);
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

//			let uploadUrl = [location.protocol, '//', location.host,"/upload"].join('');
//			var fd = new FormData();
//			fd.append('data', blob);
//			fetch(uploadUrl, { method: 'post', headers: { 'Authorization':'Bearer ' + this.props.jwt }, body: fd})
//				.then(response => console.log("response",response))
//				.catch(error => console.log("error",error));
//			console.log("So far so good");
