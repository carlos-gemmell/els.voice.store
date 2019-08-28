import React from "react";
import RecorderButton from "./recorderButton";
import uploadImage from "../../images/upload.png";
import playButtonImage from "../../images/playButton.png"

class voiceMain  extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			files: [],
			selected: {url:"",title:"",uploaded:true}
		};
		this.addAudioFile = this.addAudioFile.bind(this);
		this.upload = this.upload.bind(this);
	}
	addAudioFile(blob,url){
		console.log("Adding Audio File");
		let newFiles = this.state.files;
		newFiles.push({url:url, blob: blob});
		let selected = {url:url,blob:blob, title:"newly created audio file",uploaded:false}
		this.setState({ files: newFiles, selected: selected});
	}
	upload(selected){
		selected["uploaded"] = true;
		this.setState({selected: selected});
		let uploadUrl = [location.protocol, '//', location.host,"/upload"].join('');
		var fd = new FormData();
		fd.append('data', selected.blob);
		fetch(uploadUrl, { method: 'post', headers: { 'Authorization':'Bearer ' + this.props.jwt }, body: fd})
			.then(response => console.log("response",response))
			.catch(error => console.log("error",error));
	}
	playAudio(url){
		let audio = new Audio(url);
		audio.play();
	}
	render() {
		console.log(this.state.selected.uploaded);
		console.log((!this.state.selected.uploaded)?"1":"0.5")
		return (
			<div className={"voiceMain"} style={{"width":"100%","height":"72.5%"}}>
				<div style={{"width":"65%","height":"20%","float":"left"}}>
					<RecorderButton addAudioFile={this.addAudioFile}/>
				</div>
				<div style={{"width":"35%","height":"20%","float":"left"}}>
					<img style={{"height":"50%","opacity":(this.state.selected.blob)?"1":"0.5"}}
						onClick={(this.state.selected.blob)? () =>  this.playAudio(this.state.selected.url) : () => {} }
						src={playButtonImage}
					/><br/>
					<img style={{"height":"50%","opacity":(!this.state.selected.uploaded)?"1":"0.5"}}
						onClick={ (!this.state.selected.uploaded)?() => this.upload(this.state.selected):() => {} }
						src={uploadImage}
					/>
				</div>
			</div>
	       );
	}
}
export default voiceMain;
