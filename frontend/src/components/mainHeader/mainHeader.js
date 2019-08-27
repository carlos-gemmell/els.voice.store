import React from "react";
import logo from '../../images/logo.png';
class mainHeader extends React.Component {

	render() {
		return (
			<div className="mainHeader" style={{"width":"100%","height":"12.5%","overflow":"hidden"}}>
				<img src={logo} style={{"width":"50%", "height":"100%", "objectFit":"contain", "float":"left"}}/>
				<div style={{"float":"right", "verticalAlign":"middle", "padding":"2%", "width":"40%","height":"80%"}} className="welcomeMessage">
					<div>
					Hi { this.props.username }!
					</div>
				</div>
			</div>
		);
	}
}

export default mainHeader;
