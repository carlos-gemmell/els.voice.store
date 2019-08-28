import React from "react";

class guide extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			"height":15
		}
		this.toggle_height = this.toggle_height.bind(this)
	}


	toggle_height(){
		if (this.state.height == 15){
			this.setState({"height":30});
		}
		else{
			this.setState({"height":15});
		}
	}

	render() {
		return (
			<div className={"guide"} style={{"transition": "height 500ms 0ms", "width":"100%","height":this.state.height+"%"}}>
				Guide to use the application:<br />
				1 - do something <br />
				2 - do something else <br />
				3 - last thing to do because its simple!
				<button style={{"font-size": "2vh"}} onClick={this.toggle_height} >Expand</button>
			</div>
		);
	}
}
export default guide;
