import React from "react";
import MainHeader from "./mainHeader/mainHeader"
import Guide from "./guide/guide"
import VoiceMain from "./voice/voiceMain"
import Login from "./login/loginMain"

class App extends React.Component {

	constructor(props){
		super(props);
		this.login = this.login.bind(this);
		this.state = {};
	}
	render() {
		if(this.state.jwt != undefined && this.state.username != undefined){
			return (
				<div className="app" style={{"width":"100%","height":"200%"}}>
					<MainHeader username={this.state.username}/>
					<Guide />
					<VoiceMain username={this.state.username} jwt={this.state.jwt}/>				
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
		console.log("You just Logged In!",username, jwt);
		this.setState({
			username:username,
			jwt:jwt
		});
	}
}

export default App;
