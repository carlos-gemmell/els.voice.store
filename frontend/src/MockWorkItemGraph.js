import React, {Component} from 'react'
import WorkItemGraph from './WorkItemGraph'

class MockWorkItemGraph extends Component{

	constructor(props){
		super(props)
		this.state = {
			data:{
				total: Array.apply(null, Array(60)).map(()=>0),
				queued: Array.apply(null, Array(60)).map(()=>0),
				inProgress: Array.apply(null, Array(60)).map(()=>0),
				saved: Array.apply(null, Array(60)).map(()=>0),
				submitted: Array.apply(null, Array(60)).map(()=>0),
				inverseQueued: Array.apply(null, Array(60)).map(()=>0),
			},

		}
	}
	render(){
		return (<WorkItemGraph data={this.state.data} height={this.props.height} width={this.props.width}/>)
	}
	setTotalData(newData){
		let newWorkItems = Math.floor(Math.sqrt(Math.sqrt(Math.random()))*50)
		newWorkItems = 50+ Math.floor(Math.random()*5)
		newData.total.unshift(newWorkItems)
		newData.total.pop()
		newData.queued.unshift(newWorkItems)
		newData.queued.pop()

	}
	setInProgressData(newData){
		newData.inProgress.unshift(0)
		newData.inProgress.pop()
		newData.queued.forEach(function(queued,i){
			let inProgress =  Math.min(queued, Math.floor(Math.random()*5))
			newData.queued[i] += -inProgress
			newData.inProgress[i] += inProgress
		})
	}
	setSubmittedData(newData){
		newData.submitted.unshift(0)
		newData.submitted.pop()
		newData.inProgress.forEach(function(inProgress,i){
			if(i > 10){
				let submitted = Math.min(inProgress,Math.floor(Math.random()*(0.15*inProgress+1)))
				newData.inProgress[i] += -submitted
				newData.submitted[i] += submitted
			}
		})
		newData.inverseQueued = newData.inProgress.map((num, i) => num + newData.submitted[i])
	}
	refreshData(){
		let newData = this.state.data
		this.setTotalData(newData)
		this.setInProgressData(newData)
		this.setSubmittedData(newData)
		this.setState({
			data:newData,
		})
	}
	componentWillMount(){
		this.dataInterval = setInterval(() => this.refreshData(), 1000)
	}
	componentWillUnmount() {
		clearInterval(this.dataInterval)
	}
}

export default MockWorkItemGraph
