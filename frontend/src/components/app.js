import React from "react";
import MainHeader from "./mainHeader/mainHeader"
import Guide from "./guide/guide"
import VoiceMain from "./voice/voiceMain"

class App extends React.Component {

	render() {
		return (
			<div className="app" style={{"width":"100%","height":"200%","backgroundColor":"#d2ea9b"}}>
				<MainHeader/>
				<Guide />
				<VoiceMain/>				
			</div>
		);
	}
}

export default App;
