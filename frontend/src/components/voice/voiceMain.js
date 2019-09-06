import React from "react";
import RecorderButton from "./recorderButton";
import AudioFiles from "./audioFiles";
import uploadImage from "../../images/upload.png";
import playButtonImage from "../../images/playButton.png"

class voiceMain  extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			files: [],
			selected: -1
		};
		this.addAudioFile = this.addAudioFile.bind(this);
		this.upload = this.upload.bind(this);
		this.selectFile = this.selectFile.bind(this);
	}
	addAudioFile(blob,url){
		let newFiles = this.state.files;
		let selected = {url:url,blob:blob, name:"newly created audio file",uploaded:false}
		newFiles.push(selected);
		this.setState({ files: newFiles, selected: newFiles.length - 1});
	}
	upload(){
		let updatedFiles = this.state.files;
		updatedFiles[this.state.selected].uploaded = true;
		this.setState({files : updatedFiles});
		let uploadUrl = [location.protocol, '//', location.host,"/upload"].join('');
		var fd = new FormData();
		fd.append('data', this.state.files[this.state.selected].blob);
		fetch(uploadUrl, { method: 'post', headers: { 'Authorization':'Bearer ' + this.props.jwt }, body: fd})
			.then(response => console.log("upload file response",response))
			.catch(error => console.log("upload file error",error));
	}
	playAudio(){
		let audio = new Audio(this.state.files[this.state.selected].url);
		audio.play();
	}
	selectFile(newFile, selected){
		let newFiles = this.state.files;
		newFiles[selected] = newFile;
		this.setState({files: newFiles, selected: selected});
	}
	render() {
		let playable = false;
		let uploadable = false;
		if(this.state.selected !== -1){
			playable = true;
			uploadable = !this.state.files[this.state.selected].uploaded;
		}
		return (
			<div className={"voiceMain"} style={{"width":"100%","height":"72.5%"}}>
				<div style={{"width":"100%","height":"20%"}}>
					<div style={{"width":"60%","height":"100%","float":"left"}}>
						<RecorderButton addAudioFile={this.addAudioFile}/>
					</div>
					<div style={{"width":"40%","height":"100%","float":"left"}}>
						{this.state.selected}
						<img style={{"height":"50%","opacity": (playable)?"1":"0.5"}}
							onClick={ (playable)? () =>  this.playAudio() : () => {} }
							src={playButtonImage}
						/><br/>
						<img style={{"height":"50%","opacity": (uploadable) ?"1":"0.5"}}
							onClick={ (uploadable)?() => this.upload():() => {} }
							src={uploadImage}
						/>
					</div>
				</div>
				<AudioFiles jwt={this.props.jwt} files={this.state.files} selectFile={this.selectFile} />
			</div>
	       );
	}
	componentDidMount(){
		let fileListUrl = [location.protocol, '//', location.host,"/list_from_user"].join('');
		fetch(fileListUrl, { method: 'POST', headers: { 'Authorization':'Bearer ' + this.props.jwt }})
			.then(response => {
				return response.json();
			})
			.then(responseJson => {
				console.log(responseJson);
				let newFiles = this.state.files;
				responseJson.file_names.forEach(name => {
					newFiles.push({name: name, uploaded: true})
				});
				this.setState({files:newFiles});
			})
			.catch(error => console.log("file list error", error));
	}
}
export default voiceMain;
