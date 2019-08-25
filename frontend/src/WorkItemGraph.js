import React, {Component} from 'react'
import * as d3 from 'd3'

class WorkItemGraph extends Component{
	constructor(props){
		super(props)
		this.state = {
			data:props.data,
			height:props.height,
			width:props.width,
		}

	}
	render(){
		return (
			<div ref={ (mainDiv) => this.mainDiv = mainDiv} style={{'margin':'0','width':'100%','height':'100%'}}>
				<svg ref={(svg) => this.svg = svg}>
					<path className="QueuedArea"/>
					<path className="InProgressArea"/>
					<path className="SubmittedArea"/>
					<path className="Total"/>
					<path className="InProgress"/>
					<path className="Submitted"/>
					<path className="Queued"/>
					<g ref={(yAxis) => this.yAxis = yAxis}/>
					<g ref={(xAxis) => this.xAxis = xAxis}/>
					<text ref={(title) => this.title = title}/>
				</svg>
			</div>
		)
	}
	generateGlobalVariables(){
		this.height = this.props.height || this.mainDiv.clientHeight
		this.width = this.props.width || this.mainDiv.clientWidth
		this.leftMargin = this.width/10
		this.rightMargin = this.width/10
		this.topMargin = this.height/8
		this.bottomMargin = this.height/10
	}
	initializeSVG(){
		d3.select(this.svg)
			.attr('height',this.height+'px')
			.attr('width',this.width+'px')
		d3.select(this.svg)
			.style('width','100%')
			.style('height','100%')
	}
	createScales(){
		this.xScale = d3.scaleLinear()
			.domain([0,this.state.data.total.length])
			.range([this.leftMargin,this.width-this.rightMargin])
		this.yScale = d3.scaleLinear()
			.domain([0,d3.max(this.state.data.total)])
			.range([this.height - this.bottomMargin,0 + this.topMargin])
	}
	createTitles(){
		d3.select(this.title)
			.attr('x',(this.width/2)-100)
			.attr('y', 20 )
			.style('font-size',(Math.sqrt(this.width)/2)+'px')
			.text('Open Work Items from the last 60 seconds')
	}
	createAxis(){
		let yAxisGenerator = d3.axisLeft(this.yScale)
			.ticks(2)
		let xAxisGenerator = d3.axisBottom(this.xScale)
			.ticks(2)
		d3.select(this.yAxis)
			.attr('transform','translate('+this.leftMargin+',0)')
			.call(yAxisGenerator)

		d3.select(this.xAxis)
			.attr('transform','translate(0,'+(this.height - this.bottomMargin)+')')
			.call(xAxisGenerator)
	}
	createGraph(name,data,color){
		let xScale = this.xScale
		let yScale = this.yScale
		let lineGenerator = d3.line()
			.x(function(d,i) { return xScale(i) })
			.y(function(d) { return yScale(d) })
		d3.select(this.svg)
			.select(name)
			.datum(data)
			.attr('fill','none')
			.attr('stroke',color)
			.attr('stroke-width', '1.5')
			.attr('d',lineGenerator)
	}
	createArea(name,data,color,title){
		let xScale = this.xScale
		let yScale = this.yScale
		let areaGenerator = d3.area()
			.x(function(d,i) { return xScale(i) })
			.y1(function(d) { return yScale(d.top) })
			.y0(function() { return yScale(0) })
		let areaValue = 0
		data.forEach(function(d){
			areaValue += d.top-d.bottom
		})
		d3.select(this.svg)
			.select(name)
			.datum(data)
			.attr('stroke','none')
			.attr('fill',color)
			.attr('d',areaGenerator)
			.append('title')
			.text(function() { return title + areaValue })
	}
	createSubmittedGraph(){
		this.createGraph('.Submitted',this.state.data.submitted,'green')
		this.createArea('.SubmittedArea',this.state.data.submitted.map(function (submitted) { return {top:submitted, bottom:0}}),'#c3f7de','Total Submitted Work Items: ')
	}
	createTotalGraph(){
		this.createGraph('.Total',this.state.data.total,'grey')
		let inverseQueued = this.state.data.inverseQueued
		this.createArea('.QueuedArea',this.state.data.total.map(function (total,i) { return {top:total, bottom:inverseQueued[i]}}),'#f5f2f0','Total Queued Work Items: ')
	}
	createInProgressGraph(){
		this.createGraph('.InProgress',this.state.data.inverseQueued,'orange')
		let submitted = this.state.data.submitted
		this.createArea('.InProgressArea',this.state.data.inverseQueued.map(function (inProgress,i) { return {top:inProgress, bottom:submitted[i]}}),'#feffde','Total In Progress Work Items: ')
	}
	createGraphs(){
		this.generateGlobalVariables()
		this.initializeSVG()
		this.createScales()
		this.createTitles()
		this.createAxis()
		this.createTotalGraph()
		this.createSubmittedGraph()
		this.createInProgressGraph()
	}
	updateGraph(name,data){
		let xScale = this.xScale
		let yScale = this.yScale
		let lineGenerator = d3.line()
			.x(function(d,i) { return xScale(i) })
			.y(function(d) { return yScale(d) })
		let graph = d3.select(this.svg)
			.select(name)
		graph.attr('d','M'+this.leftMargin+','+(this.height-this.bottomMargin) +' '+graph.attr('d'))
			.transition()
			.attr('d',lineGenerator(data))
			.duration(500)
	}
	updateArea(name,data,title){
		let xScale = this.xScale
		let yScale = this.yScale
		let areaGenerator = d3.area()
			.x(function(d,i) { return xScale(i) })
			.y1(function(d) { return yScale(d.top) })
			.y0(function() { return yScale(0) })

		let areaValue = 0
		data.forEach(function(d){
			areaValue += d.top-d.bottom
		})
		let area = d3.select(this.svg)
			.select(name)

		area.attr('d','M'+this.leftMargin+','+(this.height- this.bottomMargin) +' '+area.attr('d') + ' M'+this.leftMargin+','+(this.height-this.bottomMargin) )
			.transition()
			.attr('d',areaGenerator(data))
			.duration(500)

		area.select('title')
			.text(function() { return title + areaValue })
	}
	updateSubmittedGraph(){
		this.updateGraph('.Submitted',this.state.data.submitted)
		this.updateArea('.SubmittedArea',this.state.data.submitted.map(function (submitted) { return {top:submitted, bottom:0}}),'Total Submitted Work Items: ')
	}
	updateTotalGraph(){
		this.updateGraph('.Total',this.state.data.total)
		let inverseQueued = this.state.data.inverseQueued
		this.updateArea('.QueuedArea',this.state.data.total.map(function (total,i) { return {top:total, bottom:inverseQueued[i]}}),'Total Queued Work Items: ')
	}
	updateInProgressGraph(){
		this.updateGraph('.InProgress',this.state.data.inverseQueued)
		let submitted = this.state.data.submitted
		this.updateArea('.InProgressArea',this.state.data.inverseQueued.map(function (inProgress,i) { return {top:inProgress, bottom:submitted[i]}}),'Total In Progress Work Items: ')
	}
	updateGraphs(){
		this.generateGlobalVariables()
		this.initializeSVG()
		this.createScales()
		this.createTitles()
		this.createAxis()
		this.updateSubmittedGraph()
		this.updateTotalGraph()
		this.updateInProgressGraph()
	}
	componentDidMount(){
		this.createGraphs()
	}
	componentDidUpdate(){
		this.updateGraphs()
	}
}

export default WorkItemGraph
