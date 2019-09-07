import React from 'react'
import { select } from 'd3-selection'
import { axisRight } from 'd3-axis'
import { scaleLinear } from 'd3-scale'
import { line, area } from 'd3-shape'
import { min, max } from 'd3-array'

class WidgetGraph extends React.Component{
	defaultValues(){
		return {
			data : Array.apply(null, Array(50)).map((d,i) => Math.log(i+100) + Math.random()*1 - 3.4),
			showAxis: false,
			lineColor: 'white'
		}
	}
	render(){
		return (
			<div ref={(mainDiv) => this.mainDiv = mainDiv} style={{'width':'100%','height':'100%'}}>
				<svg ref={(svg) => this.svg = svg} style={{'width':'100%','height':'100%'}} className={'WidgetGraphSVG'}>
					<path ref={(mainLine) => this.mainLine = mainLine}/>
					<g ref={(yAxis) => this.yAxis = yAxis}/>
				</svg>
			</div>
		)
	}
	initializeGlobalVariables(){
		this.height = this.mainDiv.clientHeight
		this.width = this.mainDiv.clientWidth
		this.showAxis = this.props.showAxis || this.defaultValues().showAxis
		this.lineColor = this.props.lineColor || this.defaultValues().lineColor
		this.topMargin = 0
		this.bottomMargin = 0
		this.leftMargin = 0
		this.rightMargin = 0
	}
	createGraph(){

		this.initializeGlobalVariables()
		select(this.svg)
			.attr('viewBox', '0 0 '+this.width+' '+this.height)
			.attr('preserveAspectRatio', 'none')

		select(this.mainLine)
			.attr('fill', 'none')
			.attr('stroke', this.lineColor)
			.attr('stroke-width', "1px")

		select(this.yAxis)
			.attr('transform','translate('+this.leftMargin+',0)')
	}
	updateGraph(){
		let data = this.props.data || this.defaultValues().data
		let xScale = scaleLinear()
			.domain([0,data.length])
			.range([this.leftMargin, this.width - this.rightMargin])
		let yScale = scaleLinear()
			.domain([Math.min(min(data),0),Math.max(0,max(data))])
			.range([this.height - this.bottomMargin,0 + this.topMargin])

		//Adding the main Data Line Here
		let drawLine = line()
			.x(function(d,i) { return xScale(i) })
			.y(function(d) { return yScale(d) })

		select(this.mainLine)
			.datum(data)
			.attr('d',drawLine)

		//Adding Axis here
		if(this.showAxis){
			let yAxis = axisRight(yScale)
				.ticks(2)
			select(this.yAxis)
				.call(yAxis)
		}
	}
	componentDidMount(){
		this.createGraph()
		this.updateGraph()
	}
	componentDidUpdate(){
		this.updateGraph()
	}
}
export default WidgetGraph
