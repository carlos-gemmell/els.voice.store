import React from "react";
import MainHeader from "./mainHeader/mainHeader"
import Guide from "./guide/guide"
import VoiceMain from "./voice/voiceMain"
import Login from "./login/loginMain"

class App extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			loggedInStatus: "loggedOut"
		};
		this.login = this.login.bind(this);
	}
	render() {
		if(this.state.loggedInStatus === "loggedIn"){
			return (
				<div className="app" style={{"width":"100%","height":"200%"}}>
					<MainHeader/>
					<Guide />
					<VoiceMain/>				
				</div>
			);
		}
		else{
			return (
				<Login login={this.login}/>	
			);
		}
	}
	login(username,jwt){
		this.setState({
			loggedInStatus:"loggedIn",
			username:username,
			jwt:jwt
		});
	}
}

export default App;
