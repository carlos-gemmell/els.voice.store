import React from "react";

class guide extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			"maxHeight":"5%",
		}
		this.toggle_height = this.toggle_height.bind(this)
	}


	toggle_height(){
		if (this.state["maxHeight"] == "5%"){
			this.setState({"maxHeight":"15%"});
		}
		else{
			this.setState({"maxHeight":"5%"});
		}
	}
	
	render() {
		return (
			<div className={"guide"} style={{"transition": "max-height 1000ms ease-in-out", 
				"overflow":"hidden", "width":"91.8%","height":"auto", "maxHeight":this.state["maxHeight"], 
				"border":"solid white","borderWidth":"1px", "margin":"2%",
				"padding":"2%",
				"color":"white"}} 
				onClick={this.toggle_height}
			>
				<h1>ELS Voice Store Application</h1>
				Store anonymous patient voice recordings for future analysis.<br>
				<p>
				Record the patient placing the microphone 10cms from their mouth 45 degrees to the side.<br>
				1 - Press the microphone icon to start recording. 
					Explain to the patient that their voice will be recorded and stored anonymously 
					in the ELS cloud for future analysis. Ask if they agree to allow you to record ands tore their voice.<br>
				2 - Stop recording by pressing again the microphone icon and if the patient agreed then press the cloud icon to store the file.<br />
				3 - If the patient did not agree you can still use the app to analyse their voice, but no files should be uploaded.<br>
				4 - Record the patient saying "Ahhhh" for as long as possible. watch out for background noise.<br>
				5 - Note the CPPs value in the patient's record for this recording <br>
				6 - Record the patient repeating a sentence with no fricatives (without sounds "s", "f" "z" etc.) such as:<br>
					"Eat, drink and be merry" or "hard work never did anyone any harm".<br>
				7 - Optional: Record the patient describing their voice problems<br>
				Note that files are only visbile to your user and the ELS Voice Store administrators. 
				Files are stored and ordered by date and time of recording. 
				You can review patient files by looking for the recordings corresponding to the date and time of the specific appointment.
				
			</div>
		);
	}
}
export default guide;
