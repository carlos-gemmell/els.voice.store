import React from "react";
import MainHeader from "./mainHeader/mainHeader"
import Guide from "./guide/guide"
import VoiceMain from "./voice/voiceMain"
import Login from "./login/loginMain"

class App extends React.Component {

	constructor(props){
		super(props);
		this.login = this.login.bind(this);
		this.state = {username:"Mark Gemmell",jwt:"u"};
	}
	render() {
		if(this.state.jwt != undefined && this.state.username != undefined){
			return (
				<div className="app" style={{"width":"100%","height":"200%","backgroundColor":"#d2ea9b","font-family":"Arial","font-weight":"bold"}}>
					<MainHeader username={this.state.username}/>
					<Guide />
					<VoiceMain username={this.state.username} jwt={this.state.jwt}/>				
				</div>
			);
		}
		else{
			return (
				<div className="app" style={{"width":"100%","height":"100%","backgroundColor":"#d2ea9b","font-family":"Arial","font-weight":"bold"}}>
					<Login login={this.login}/>	
				</div>
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
