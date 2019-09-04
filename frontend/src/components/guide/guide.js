import React from "react";

class guide extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			"max-height":"15%"
		}
		this.toggle_height = this.toggle_height.bind(this)
	}


	toggle_height(){
		if (this.state["max-height"] == "15%"){
			this.setState({"max-height":"600%"});
		}
		else{
			this.setState({"max-height":"15%"});
		}
	}
	
	render() {
		return (
			<div className={"guide"} style={{"transition": "max-height 3000ms ease-in-out", "overflow":"hidden", "width":"100%","height":"auto", "max-height":this.state["max-height"]}}>
				<button style={{"font-size": "2vh"}} onClick={this.toggle_height} >Expand</button>
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
