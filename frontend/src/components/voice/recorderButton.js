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
			rec = new Recorder(input,{numChannels:1}, this.props.processChunk);
			rec.record();
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
			<div style={{"width":"100%","height":"100%"}}>
				<div style={{"height":"5%","width":"100%"}}></div>
				<img style={{"height":"90%", "width": "100%","objectFit":"contain"}} className="RecordingButton" 
					onClick={ (this.state.recording)?this.stopRecording:this.startRecording } 
					touchEnd={ (this.state.recording)?this.stopRecording:this.startRecording } 
					src={ (this.state.recording)?activeMicrophone:deactivatedMicrophone}
				/>
				<div style={{"height":"5%","width":"100%","color":"white","fontSize":"20px","textAlign":"center"}}>
				</div>
				<div style={{"position":"relative","fontWeight":"bold","bottom":"40px","color":"white","fontSize":"30px","textAlign":"center"}}>
					{!this.state.recording?"Record Audio":""}
				</div>
			</div>
	       );
	}
}
export default RecorderButton;

