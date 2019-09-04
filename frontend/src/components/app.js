import React from "react";
import MainHeader from "./mainHeader/mainHeader"
import Guide from "./guide/guide"
import VoiceMain from "./voice/voiceMain"
import Login from "./login/loginMain"

class App extends React.Component {

	constructor(props){
		super(props);
		this.login = this.login.bind(this);
		this.state = {
			width: window.innerWidth,
		};
	}

	componentWillMount() {
		window.addEventListener('resize', this.handleWindowSizeChange);
	}
	
	// make sure to remove the listener
	// when the component is not mounted anymore
	componentWillUnmount() {
		window.removeEventListener('resize', this.handleWindowSizeChange);
	}
	
	handleWindowSizeChange = () => {
		this.setState({ width: window.innerWidth });
	};

	render() {
		const { width } = this.state;
  		const isMobile = width <= 500;
		if(this.state.jwt != undefined && this.state.username != undefined){
			if (isMobile) {
				return (
					<div className="app" style={{"width":"100%","height":"200%","backgroundColor":"#2f52a2","font-family":"Arial","font-weight":"bold"}}>
						<MainHeader username={this.state.username}/>
						<Guide />
						<VoiceMain username={this.state.username} jwt={this.state.jwt}/>				
					</div>
				);
			} else {
				return (
					<div className="app" style={{"width":"60%","height":"200%","backgroundColor":"#2f52a2","font-family":"Arial","font-weight":"bold", "margin-left":"auto", "margin-right":"auto"}}>
						<MainHeader username={this.state.username}/>
						<Guide />
						<VoiceMain username={this.state.username} jwt={this.state.jwt}/>				
					</div>
				);
			}
		}
		else{
			return (
				<div className="app" style={{"width":"100%","height":"100%","backgroundColor":"white","font-family":"Arial","font-weight":"bold", "font-size":"3vh"}}>
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
