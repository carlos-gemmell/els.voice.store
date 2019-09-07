import React from "react";
import RecorderButton from "./recorderButton";
import AudioFiles from "./audioFiles";
import uploadImage from "../../images/upload.png";
import playButtonImage from "../../images/playButton.png"
import fft from "fft-js"; 

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
		this.get_CPPS_from_blob = this.get_CPPS_from_blob.bind(this);
		this.zip = this.zip.bind(this);
		this.linearRegression = this.linearRegression.bind(this);
	}
	addAudioFile(blob,url){
		let newFiles = this.state.files;
		let selected = {url:url,blob:blob, name:"newly created audio file",uploaded:false}
		newFiles.push(selected);
		this.setState({ files: newFiles, selected: newFiles.length - 1});
		console.log("finished recording")

		// calculate CPPS after recording has concluded
		this.get_CPPS_from_blob(blob)
	}

	get_CPPS_from_blob(blob){
		// get arrayBuffer from blob
		console.log("getting audio file for CPPS calc")
		let fileReader = new FileReader();

		fileReader.readAsArrayBuffer(blob);
		fileReader.onload = (event) => {
			let arrayBuffer = fileReader.result;
			console.log(arrayBuffer);
			let typedArray = new Uint8Array(arrayBuffer);
			let array = Array.from(typedArray);
			console.log(array);
			let s = [1,0,1,0];
			console.log(s)
			array = array.concat(Array((Math.pow(2, Math.ceil(Math.log2(array.length))) - array.length)).fill(0));
			console.log(array);
			let phasors= fft.fft(array);
			console.log("Phasors are:", phasors);
			phasors = phasors.slice(0,65536)
			console.log("Chopped Phasors are:", phasors);

			

			let frequencies = fft.util.fftFreq(phasors, 8000) // Sample rate and coef is just used for length, and frequency step
			let magnitudes = fft.util.fftMag(phasors); 

			console.table(this.zip([frequencies, magnitudes]));
			
			let cepstrum= fft.ifft(phasors);

			console.log("ifft signal is: ",cepstrum);

			let lr = this.linearRegression(cepstrum.map(r => r[0]), [...Array(cepstrum.length).keys()])

			console.log(lr)

			let arg_max_cepstrum = this.argMax(cepstrum.map(r => r[0]))

			let CPPs_val = cepstrum[arg_max_cepstrum][0] - (lr.slope * arg_max_cepstrum + lr.intercept)

			console.log("CPPs is:", CPPs_val)
			console.log("arg_max_cepstrum is:", arg_max_cepstrum)
			console.log("max_cepstrum is:", cepstrum[arg_max_cepstrum][0])

			console.log("Normalised CPPs is:", 100*CPPs_val/cepstrum[arg_max_cepstrum][0], "%")
		  };
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
