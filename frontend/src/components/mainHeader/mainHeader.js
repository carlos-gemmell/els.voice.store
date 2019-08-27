import React from "react";

class mainHeader extends React.Component {

	render() {
		return (
			<div className="mainHeader" style={{"width":"100%","height":"12.5%"}}>
				<div style={{"width":"100%","height":"2.5%"}} className="welcomeMessage">
					Hi { this.props.username }!
				</div>
			</div>
		);
	}
}

export default mainHeader;
