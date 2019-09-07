import React from "react";
import RecorderButton from "./recorderButton";
import AudioFiles from "./audioFiles";
import uploadImage from "../../images/whiteUploadCloud.png";
import activeUploadImage from "../../images/redUploadCloud.png";
import playButtonImage from "../../images/whitePlay.png";
import activePlayButtonImage from "../../images/redPlay.png";

class voiceMain  extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			files: [],
			selected: -1,
			playing: false,
			uploading: false,
			audio: new Audio()
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
		this.setState({uploading: true});
		let uploadUrl = [location.protocol, '//', location.host,"/upload"].join('');
		var fd = new FormData();
		fd.append('data', this.state.files[this.state.selected].blob);
		fetch(uploadUrl, { method: 'post', headers: { 'Authorization':'Bearer ' + this.props.jwt }, body: fd})
			.then(response => {
				let updatedFiles = this.state.files;
				updatedFiles[this.state.selected].uploaded = true;
				this.setState({files : updatedFiles, uploading:true});
				console.log("upload file response",response);
			})
			.catch(error => {
				this.setState({uploading:true});
				console.log("upload file error",error);
			});
	}
	playAudio(){
		this.state.audio.pause();
		let audio = new Audio(this.state.files[this.state.selected].url);
		audio.play();
		audio.onended = () => this.setState({playing: false});
		this.setState({audio: audio, playing:true});
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
				<div className="recordButton" style={{"width":"96%","height":"24%",
					"margin":"2%","border":"solid white","borderWidth":"1px"}}
				>
					<RecorderButton addAudioFile={this.addAudioFile}/>
				</div>
				<div className="analysisSection" style={{"width":"96%" ,"height":"18%",
					"margin":"2%","border":"solid white","borderWidth":"1px"}}
				>
					<div style={{"height":"70%","width":"50%","float":"left"}}>
						<div style={{"height":"7%","width":"100%"}}/>
						<img style={{"height":"68%","width":"100%","objectFit":"contain","opacity": (playable)?"1":"0.5"}}
							onClick={ (playable && !this.state.playing)? () =>  this.playAudio() : () => {} }
							src={this.state.playing?activePlayButtonImage:playButtonImage}
						/>
						<div style={{"height":"25%","width":"100%","overflow":"hidden","fontWeight":"bold","color":"white","fontSize":"30px","textAlign":"center"}}>
							{playable?"Play Audio":""}
						</div>	
					</div>
					<div style={{"height":"70%","width":"50%","float":"left"}}>
						<div style={{"height":"7%","width":"100%"}}/>
						<img style={{"height":"68%","width":"100%","objectFit":"contain","float":"left","opacity": (uploadable) ?"1":"0.5"}}
							onClick={ (uploadable && !this.state.uploading)?() => this.upload():() => {} }
							src={this.state.uploading?activeUploadImage:uploadImage}
						/>
						<div style={{"height":"25%","width":"100%","overflow":"hidden","fontWeight":"bold","color":"white","fontSize":"30px","textAlign":"center"}}>
							{uploadable?"Upload Audio":""}
						</div>	
					</div>
				</div>
				<AudioFiles jwt={this.props.jwt} selected={this.state.selected} files={this.state.files} selectFile={this.selectFile} />
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
