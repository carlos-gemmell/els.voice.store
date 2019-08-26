import React from "react";
import { ReactMic } from 'react-mic';

class mainHeader extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			record: false
		}
		this.startRecording = this.startRecording.bind(this);	
		this.stopRecording = this.stopRecording.bind(this);
	}

	startRecording(){
		this.setState({
			record: true
		});
	}

	stopRecording(){
		this.setState({
			record: false
		});
	}

	onData(recordedBlob) {
		console.log('chunk of real-time data is: ', recordedBlob);
	}

	onStop(recordedBlob) {
		console.log('recordedBlob is: ', recordedBlob);
	}

	render() {
		console.log(this.state);
		return (
			<div className={"voiceMain"} style={{"width":"100%","height":"72.5%"}}>
				VOICE SECTION!!!!
				<div>
					<ReactMic
						record={this.state.record}
						className="sound-wave"
						onStop={this.onStop}
						onData={this.onData}
						strokeColor="#000000"
						backgroundColor="#FF4081" 
					/>
					<button onClick={this.startRecording} type="button">Start</button>
					<button onClick={this.stopRecording} type="button">Stop</button>
				</div>
			</div>
	       );
	}
}
export default mainHeader;

