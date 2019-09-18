import React from "react";
import RecorderButton from "./recorderButton";
import AudioFiles from "./audioFiles";
import uploadImage from "../../images/whiteUploadCloud.png";
import activeUploadImage from "../../images/redUploadCloud.png";
import playButtonImage from "../../images/whitePlay.png";
import activePlayButtonImage from "../../images/redPlay.png";
import fft from "fft-js"; 
import WidgetGraph from "./graph/widgetGraph";

class VoiceMain  extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			files: [],
			selected: -1,
			playing: false,
			uploading: false,
			audio: new Audio(),
			CPPs_val: 0
		};
		this.addAudioFile = this.addAudioFile.bind(this);
		this.upload = this.upload.bind(this);
		this.selectFile = this.selectFile.bind(this);
		// this.get_CPPS_from_blob = this.get_CPPS_from_blob.bind(this);
		// this.zip = this.zip.bind(this);
		// this.linearRegression = this.linearRegression.bind(this);
		this.processChunk = this.processChunk.bind(this);
	}
	addAudioFile(blob,url){
		let newFiles = this.state.files;
		let selected = {url:url,blob:blob, name:"newly created audio file",uploaded:false}
		newFiles.push(selected);
		this.setState({ files: newFiles, selected: newFiles.length - 1});
		console.log("finished recording")

		// calculate CPPS after recording has concluded
		// this.get_CPPS_from_blob(blob)
	}

	get_CPPS(chunk){
		// let arrayBuffer = chunk;
		// let typedArray = new Uint8Array(arrayBuffer);
		// let array = Array.from(typedArray);
		// let s = [1,0,1,0];
		// array = array.concat(Array((Math.pow(2, Math.ceil(Math.log2(array.length))) - array.length)).fill(0));
		let phasors= fft.fft(chunk);
		phasors = phasors.slice(0,256);
		phasors = phasors.map((value) => {
			value[1] = 0;
			return value;
		});
		console.log("phasors",phasors);


		let frequencies = fft.util.fftFreq(phasors, 8000) // Sample rate and coef is just used for length, and frequency step
		let magnitudes = fft.util.fftMag(phasors); 
		console.log("1");	
		let cepstrum= fft.ifft(phasors);
		console.log("2");

		// console.log("ifft signal is: ",cepstrum);

		let lr = this.linearRegression(cepstrum.map(r => r[0]), [...Array(cepstrum.length).keys()])
		console.log("3");

		// console.log(lr)

		let arg_max_cepstrum = this.argMax(cepstrum.map(r => r[0]))

		let CPPs_val = cepstrum[arg_max_cepstrum][0] - (lr.slope * arg_max_cepstrum + lr.intercept)

		console.log("4");
		// console.log("CPPs is:", CPPs_val)
		// console.log("arg_max_cepstrum is:", arg_max_cepstrum)
		// console.log("max_cepstrum is:", cepstrum[arg_max_cepstrum][0])

		// console.log("Normalised CPPs is:", 100*CPPs_val/cepstrum[arg_max_cepstrum][0], "%")
		return [CPPs_val, phasors.map((r) => r[0]), cepstrum.map((r) => r[0])]

	}

	processChunk(chunk){
		chunk = chunk[0]
		let [CPPs_val, phasors, cepstrum] = this.get_CPPS(chunk)
		this.setState({chunk:chunk, CPPs_val:Math.floor(CPPs_val*10)/10, phasors:phasors, cepstrum:cepstrum});
		//console.log("this is the chunk:", chunk);
		//console.log("this is the phasor:", phasors);
		//console.log("this is the cepstrum:", cepstrum);
		//console.log("CPPs for chunk:",CPPs_val);
	}

	argMax(array) {
		return [].map.call(array, (x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
	  }

	zip(arrays){
		return arrays[0].map(function(_,i){
			return arrays.map(function(array){return array[i]})
		});
	}

	linearRegression(y,x){
		var lr = {};
		var n = y.length;
		var sum_x = 0;
		var sum_y = 0;
		var sum_xy = 0;
		var sum_xx = 0;
		var sum_yy = 0;

		for (var i = 0; i < y.length; i++) {

		    sum_x += x[i];
		    sum_y += y[i];
		    sum_xy += (x[i]*y[i]);
		    sum_xx += (x[i]*x[i]);
		    sum_yy += (y[i]*y[i]);
		} 

		lr['slope'] = (n * sum_xy - sum_x * sum_y) / (n*sum_xx - sum_x * sum_x);
		lr['intercept'] = (sum_y - lr.slope * sum_x)/n;
		lr['r2'] = Math.pow((n*sum_xy - sum_x*sum_y)/Math.sqrt((n*sum_xx-sum_x*sum_x)*(n*sum_yy-sum_y*sum_y)),2);

		return lr;
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
				this.setState({files : updatedFiles, uploading:false});
			})
			.catch(error => {
				this.setState({uploading:false});
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
		let graphStyles={"height":"60%","width":"100%"};
		let graphTextStyles={"height":"40%","width":"100%","fontWeight":"normal","color":"white","fontSize":"20px","overflow":"hidden","textAlign":"center"};
		return (
			<div className={"voiceMain"} style={{"width":"100%","height":"72.5%"}}>
				<div className="recordButton" style={{"width":"96%","height":"17%",
					"margin":"2%","border":"solid white","borderWidth":"1px"}}
				>
					<RecorderButton processChunk={this.processChunk} addAudioFile={this.addAudioFile}/>
				</div>
				<div className="analysisSection" style={{"width":"96%" ,"height":"18%",
					"margin":"2%","border":"solid white","borderWidth":"1px"}}
				>
					<div style={{"height":"60%","width":"50%","float":"left"}}>
						<div style={{"height":"7%","width":"100%"}}/>
						<img style={{"height":"68%","width":"100%","objectFit":"contain","opacity": (playable)?"1":"0.5"}}
							onClick={ (playable && !this.state.playing)? () =>  this.playAudio() : () => {} }
							src={this.state.playing?activePlayButtonImage:playButtonImage}
						/>
						<div style={{"height":"25%","width":"100%","overflow":"hidden","fontWeight":"bold","color":"white","fontSize":"30px","textAlign":"center"}}>
							{playable?"Play Audio":""}
						</div>	
					</div>
					<div style={{"height":"60%","width":"50%","float":"left"}}>
						<div style={{"height":"7%","width":"100%"}}/>
						<img style={{"height":"68%","width":"100%","objectFit":"contain","float":"left","opacity": (uploadable) ?"1":"0.5"}}
							onClick={ (uploadable && !this.state.uploading)?() => this.upload():() => {} }
							src={this.state.uploading?activeUploadImage:uploadImage}
						/>
						<div style={{"height":"25%","width":"100%","overflow":"hidden","fontWeight":"bold","color":"white","fontSize":"30px","textAlign":"center"}}>
							{uploadable?"Upload Audio":""}
						</div>	
					</div>
					<div style={{"height":"40%","width":"96%","marginLeft":"2%","marginRight":"2%","float":"left"}}>
						<div style={{"height":"10%","width":"100%","float":"left"}}/>
						<div style={{"height":"90%","width":"25%","float":"left"}}>
							<div style={graphStyles}>
								<WidgetGraph marginRight={0.05} marginLeft={0.05} data={this.state.chunk}/>
							</div>
							<div style={graphTextStyles}>
								Audio
							</div>
						</div>
						<div style={{"height":"90%","width":"25%","float":"left"}}>
							<div style={graphStyles}>
								<WidgetGraph marginRight={0.05} marginLeft={0.05} data={this.state.phasors}/>
							</div>
							<div style={graphTextStyles}>
								Frequency
							</div>
						</div>
						<div style={{"height":"90%","width":"25%","float":"left"}}>
							<div style={graphStyles}>
								<WidgetGraph marginRight={0.05} marginLeft={0.05} data={this.state.cepstrum}/>
							</div>
							<div style={graphTextStyles}>
								Quefrency
							</div>
						</div>
						<div style={{"height":"90%","width":"25%","float":"left"}}>
							<div style={{"height":"60%","width":"100%","fontWeight":"bold","color":"white","fontSize":"35px","textAlign":"center"}}>
								{this.state.CPPs_val}dB
							</div>
							<div style={{"height":"40%","width":"100%","fontWeight":"bold","color":"white","fontSize":"30px","textAlign":"center"}}>
								CPPs
							</div>
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
				let newFiles = this.state.files;
				responseJson.file_names.forEach(name => {
					newFiles.push({name: name, uploaded: true})
				});
				this.setState({files:newFiles});
			})
			.catch(error => console.log("file list error", error));
	}
}
export default VoiceMain;
