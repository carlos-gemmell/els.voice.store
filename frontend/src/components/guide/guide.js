import React from "react";

class guide extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			"max-height":"15%",
			"transition-time":"3000ms"
		}
		this.toggle_height = this.toggle_height.bind(this)
	}


	toggle_height(){
		if (this.state["max-height"] == "15%"){
			this.setState({"max-height":"600%"});
			this.setState({"transition-time":"3000ms"});
		}
		else{
			this.setState({"max-height":"15%"});
			this.setState({"transition-time":"500ms"});
		}
	}
	
	render() {
		return (
			<div className={"guide"} style={{"transition": "max-height " + this.state['transition-time'] + " ease-in-out", "overflow":"hidden", "width":"98%","height":"auto", "max-height":this.state["max-height"], "border-style":"solid","border-color": "white", "margin":"0.5%"}} onClick={this.toggle_height}>
				Guide to use the application:<br />
				1 - do something <br />
				2 - do something else <br />
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
