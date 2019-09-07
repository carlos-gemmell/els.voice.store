import React from "react";
import logo from '../../images/logo.png';

class Login extends React.Component {

	constructor(props){
		super(props);
		this.loginButtonClick = this.loginButtonClick.bind(this);
		this.state = {"bg_color":"white"}
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
				this.setState({"bg_color":"#ffcccc"});

			});
			
	}
	render() {
		let labelStyle = {
			"fontFamily":"Arial",
			"fontWeight":"bold", 
			"fontSize":"30px",
			"textAlign":"center"
		};
		let inputStyle = {
			"width":"100%",
			"height":"40px",
			"border":"1px solid #ccc",
			"borderRadius":"25px",
			"textAlign":"center",
			"backgroundColor":this.state.bg_color
		};
		return (
			<div className="LoginPageMain" style={{"width":"100%","height":"100%", "minHeight":"600px","maxHeight":"1080px","backgroundColor":"white"}}>
				<div className="LoginForm" style={{"width":"30%", "minWidth":"250px","maxWidth":"450px", "display": "block", "marginLeft": "auto", "marginRight": "auto","paddingTop":"50px"}}>
					<div className="usernameInput" style={{"paddingBottom":"20px"}}>
						<div className="usernameLabel" style={labelStyle}>
							Username
						</div>
						<input ref={(username) => this.username = username} style={inputStyle} type="text" placeholder="Enter Username" name="username"/>
					</div>
					<div className="passwordInput" style={{"paddingBottom":"20px"}}>
						<div className="passwordLabel" style={labelStyle}>
							Password
						</div>
						<input ref={(password) => this.password = password} style={inputStyle} type="password" placeholder="Enter Password" name="password"/>
					</div>
					<button style={{"width":"50%", "minWidth":"50px","maxWidth":"100px", "display": "block", "marginLeft": "auto", "marginRight": "auto","fontSize": "15px"}} 
						onClick={this.loginButtonClick} 
					>
						Login
					</button>
				</div>
				<img src={logo} style={{"width":"100%", "minWidth":"350px","maxWidth":"700px", "display": "block", "marginLeft": "auto", "marginRight": "auto"}}/>
			</div>
		);
	}
}

export default Login;
