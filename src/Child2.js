import React, { Component } from "react";
import * as d3 from 'd3'
import './App.css'

class Child2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
  }

  componentDidUpdate(){

    var data = this.props.data2

    var margin = {top:20, right:20, bottom:50, left:20},
      w = 500 - margin.left - margin.right,
      h = 300 - margin.top - margin.bottom;

    var container = d3.select(".child2_svg")
    .attr("width", w+margin.left+margin.right)
    .attr('height', h+margin.top+margin.bottom)
    .select(".g_2")
    .attr('transform', `translate(${margin.left}, ${margin.right})`)

    const temp = d3.flatRollup(data, (v)=> d3.mean(v, (d) => d.tip), (d) => d.day)

    //console.log(temp)

    //x axis stuff
    
    const x_data=temp.map((item)=>item[0])

    //console.log(x_data)

    const x_scale = d3.scaleBand().domain(x_data).range([0,w]).padding(0.3)

    container.selectAll('.x_axis_g')
    .data([0])
    .join('g')
    .attr('class','x_axis_g')
    .attr('transform', `translate (0,${h})`)
    .call(d3.axisBottom(x_scale))

    container.select('.x_axis_g')
    .append('text')
    .attr('class','x_axis_label')
    .attr('x', ((w+margin.right+margin.left)/2))
    .attr('y', 40)
    .attr('fill', 'black')
    .text('Day')
    .attr('font-size', 17)
    .attr('text-anchor', 'middle')
    .attr('font-family', 'Times New Roman')
    .attr('font-weight','bold')


    d3.select('.child2_svg')
    .append('text')
    .attr('class','title')
    .attr('x', (w+margin.right+margin.left)/2)
    .attr('y', 15)
    .attr('fill', 'black')
    .text('Average Tip by Day')
    .attr('font-size', 19)
    .attr('text-anchor', 'middle')
    .attr('font-family', 'Times New Roman')
    .attr('font-weight','bold')




    //y axis stuff
    var y_data=temp.map((item)=>item[1])

    //console.log(y_data)

    const y_scale = d3.scaleLinear()
    .domain([0,d3.max(y_data)])
    .range([h, 0]);

    container.selectAll('.y_axis_g')
    .data([0])
    .join('g')
    .attr('class','y_axis_g')
    .attr('transform', `translate (${margin.left},0)`)
    .call(d3.axisLeft(y_scale));

    container.select('.y_axis_g')
    .append('text')
    .attr('class','y_axis_label')
    .attr('fill', 'black')
    .text('Average Tip')
    .attr('font-size', 16)
    .attr('text-anchor', 'middle')
    .attr('font-family', 'Times New Roman')
    .attr('transform', `rotate(${-90}, ${0},${h/2})`)
    .attr('dy', (w/4)-25)
    .attr('font-weight','bold')



    container.selectAll('rect')
    .data(temp)
    .join('rect')
    .attr('x', d=> x_scale(d[0]))
    .attr('y', d=> y_scale(d[1]))
    .attr('width', x_scale.bandwidth())
    .attr('height', d=>(h-y_scale(d[1])))
    .attr('fill', '#69b3a2')

  }


  render() {
    return <svg className="child2_svg">
      <g className="g_2"></g>
    </svg>;
  }
}

export default Child2;
