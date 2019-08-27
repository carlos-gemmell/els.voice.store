import React from "react";
import logo from '../../images/logo.png';
class mainHeader extends React.Component {

	render() {
		return (
			<div className="mainHeader" style={{"width":"100%","height":"12.5%"}}>
				<img src={logo} style={{"width":"50%", "height":"100%", "object-fit":"contain", "float":"left"}}/>
				<div style={{"width":"50%","height":"100%", "float":"right", "vertical-align":"bottom"}} className="welcomeMessage">
					Hi { this.props.username }!
				</div>
			</div>
		);
	}
}

export default mainHeader;
