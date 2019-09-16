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
				<b>ELS Voice Store Application</b>
				Store anonymous patient voice recordings for future analysis.<br />
				Guide to use the application:<br />
				1 - Explain to the patient that their voice will be recorded and stored anonymously in the ELS cloud for future analysis.<br />
				2 - If they agre then record them saying<br />
				3 - last thing to do because its simple!
				foo <br/>
				foo <br/>
				foo <br/>
				foo <br/>
				foo <br/>
				foo <br/>
				foo <br/>
				foo <br/>
				foo <br/>
				foo <br/>
				foo <br/>
				foo <br/>
				foo <br/>
				foo <br/>
				foo <br/>
				foo <br/>
				foo <br/>
				foo <br/>
				foo <br/>
				foo <br/>
				foo <br/>
				foo <br/>
				foo <br/>
			</div>
		);
	}
}
export default guide;
