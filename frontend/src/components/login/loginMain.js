import React from "react";

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
			body: {
				"username": this.username.value,
				"password": this.password.value
			}
		})
			.then(response => {
				console.log("prejson",response);
				return response.json();
			})
			.then(data => {
				console.log(data);
				
			});
			
	}
	render() {
		return (
			<div className="LoginPageMain" style={{"height":"100%","width":"100%"}}>
				<div className="LoginHeader" style={{"width":"100%","height":"20%","fontSize":"5vw","textAlign":"center"}}>
					Log into ELS Voice Store
				</div>
				<div className="LoginForm" style={{"width":"100%","height":"80%"}}>
					<div className="usernameInput" style={{}}>
						<div className="usernameLabel">
							Username
						</div>
						<input ref={(username) => this.username = username} type="text" placeholder="Enter Username" name="username"/>
					</div>
					<div className="passwordInput" style={{}}>
						<div className="passwordLabel">
							Password
						</div>
						<input ref={(password) => this.password = password} type="password" placeholder="Enter Password" name="password"/>
					</div>
					<button onClick={this.loginButtonClick} >Login</button>
				</div>
			</div>
		);
	}
}

export default Login;
