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
			</div>
		);
	}
}
export default guide;
