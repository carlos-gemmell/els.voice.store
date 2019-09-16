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
			this.setState({"maxHeight":"25%"});
		}
		else{
			this.setState({"maxHeight":"5%"});
		}
	}
	
	render() {
		return (
			<div className={"guide"} style={{"transition": "max-height 1000ms ease-in-out", 
				"overflow":"scroll", "width":"91.8%","height":"auto", "maxHeight":this.state["maxHeight"], 
				"border":"solid white","borderWidth":"1px", "margin":"2%",
				"padding":"2%",
				"color":"white"}} 
				onClick={this.toggle_height}
			>
				ELS Voice Store Application<br />
				Store anonymous patient voice recordings for future analysis.<br />
				<br />
				Record the patient placing the microphone 10cms from their mouth 45 degrees to the side.<br />
				1 - Press the microphone icon to start recording. <br />
				Explain to the patient that their voice will be recorded and stored anonymously 
				in the ELS cloud for future analysis. 
				Ask if they agree to their voice being stored there. <br />
				2 - Stop recording by pressing again the microphone icon and if the patient agreed 
				then press the cloud icon to store the file.<br />
				3 - If the patient did not agree you can still use the app to analyse their voice, 
				but no files should be uploaded.<br />
				4 - Record the patient saying "Ahhhh" for as long as possible. 
				Keep background noise low.<br />
				5 - Note the CPPs value displayed on the screeen in the patient's medical 
				record for this recording <br />
				6 - Record the patient repeating a sentence with no fricatives (without sounds "s", "f" "z" etc.) such as:<br />
					"Eat, drink and be merry" or "hard work never did anyone any harm".<br />
				Again note the CPPs for this recording.
				7 - Optional: Record the patient describing their voice problems<br />
				Note the CPPs value here to if desired.
				<br />
				Note that files are only visbile to you and the ELS Voice Store administrators and
				they contain no patient specific information.<br />
				Files are stored and ordered by date and time of recording. 
				You can review patient files by looking for the recordings corresponding to 
				the date and time of the petient appointment.

			</div>
		);
	}
}
export default guide;
