import React from "react";
import logo from '../../images/logo.png';

class Login extends React.Component {

	constructor(props){
		super(props);
		this.loginButtonClick = this.loginButtonClick.bind(this);
	}
	loginButtonClick(){
		console.log("Trying to log in");
		let uploadUrl = [location.protocol, '//', location.host,"/login"].join('');
		fetch(uploadUrl, {
			method: 'post',	
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify({
				username: this.username.value,
				password: this.password.value
			})
		})
			.then(response => response.json())
			.then(data => {
				if(data["access_token"] != undefined){
					this.props.login(this.username.value,data["access_token"])
				}
				
			});
			
	}
	render() {
		let input_style = {
			"padding": "12px 20px",
			"margin": "8px 0",
			"display": "inline-block",
			"border": "1px solid #ccc",
			"border-radius": "4px",
			"box-sizing": "border-box"
		}
		return (
			<div className="LoginPageMain" style={{"height":"100%","width":"100%"}}>
				{/* <div className="LoginHeader" style={{"width":"100%","height":"20%","fontSize":"5vw","textAlign":"center"}}>
					Log into ELS Voice Store
				</div> */}
				<img src={logo} style={{"width":"50%", "height":"100%", "left":"25%", "display":"block", "objectFit":"contain", "float":"center", "position":"absolute"}}/>
				<div className="LoginForm" style={{"text-align":"center", "top":"20%", "width":"100%","height":"80%", "position":"absolute"}}>
					<div className="usernameInput" style={{}}>
						<div className="usernameLabel">
							Username
						</div>
						<input ref={(username) => this.username = username} style={input_style} type="text" placeholder="Enter Username" name="username"/>
					</div>
					<div className="passwordInput" style={{}}>
						<div className="passwordLabel">
							Password
						</div>
						<input ref={(password) => this.password = password} style={input_style} type="password" placeholder="Enter Password" name="password"/>
					</div>
					<button onClick={this.loginButtonClick} >Login</button>
				</div>
			</div>
		);
	}
}

export default Login;
