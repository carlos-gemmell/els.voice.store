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
				<b>The ELS Voice Store Application</b><br /><br />
				Store anonymous patient voice recordings for future analysis.<br />
				<br />
				Place the microphone 10cms from the patient and at 45 degrees to the side in order
				to avoid breath noise. Keep background noise low.<br /><br />
				1 - Press the microphone icon to start recording. <br />
				Explain to the patient that their voice will be recorded and stored anonymously 
				in the ELS cloud for future analysis. 
				Confrim they agree to these recordings being stored there. <br /><br />
				2 - Stop recording by pressing again the microphone icon and, assuming the patient 
				agreed, press the cloud icon to store this recording giving consent 
				(required for legal purposes).<br /><br />
				3 - Record the patient saying "Ahhhh" for as long as possible.  <br /><br />
				4 - Note the CPPs value displayed on the screeen in the patient's medical 
				record for this recording and upload it to the cloud<br /><br />
				5 - Record the patient repeating a sentence with no fricatives 
				(without sounds "s", "f" "z" etc.) such as:<br />
					<b>"Eat, drink and be merry"</b> or <br />
					<b>"hard work never did anyone any harm"</b>.<br />
				Again note the CPPs for this recording and upload it to the cloud.<br /><br />
				6 - Optional: Record the patient describing their voice problems.<br />
				Note the CPPs value here too if desired and upload to the cloud.
				<br /><br />
				<b>Note that files are only visbile to you and the ELS Voice Store administrators and
				contain no patient specific information.</b><br />
				Files are stored and ordered by date and time of recording. 
				You can review previous recordings by looking in the file list below for the 
				recordings corresponding to the date and time of the patient's appointment.

			</div>
		);
	}
}
export default guide;
