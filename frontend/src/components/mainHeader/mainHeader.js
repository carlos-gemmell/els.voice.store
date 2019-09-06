import React from "react";
import logo from '../../images/logo.png';
class mainHeader extends React.Component {

	render() {
		return (
			<div className="mainHeader" style={{"width":"100%","height":"5%","overflow":"hidden","backgroundColor":"white"}}>
				<img src={logo} style={{"position":"relative","left":"0","width":"60%", "height":"100%", "objectFit":"contain", "float":"left"}}/>
				<div style={{"float":"right", "width":"40%","height":"100%"}} className="welcomeMessage">
					<div style={{"height":"40%","width":"100%"}}/>
					<div style={{"height":"60%","overflow":"hidden","textAlign":"right","fontSize":"20px","color":"#2f52a2", "paddingRight":"5%"}}>
						Welcome { this.props.username || "Dr. Gorriz" }
					</div>
				</div>
			</div>
		);
	}
}

export default mainHeader;
