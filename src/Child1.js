import React, { Component } from "react";
import * as d3 from 'd3'
import './App.css'

class Child1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
  }

  componentDidUpdate(){

    var data = this.props.data1

    var margin = {top:20, right:20, bottom:20, left:20},
      w = 500 - margin.left - margin.right,
      h = 300 - margin.top - margin.bottom;

    var container = d3.select(".child1_svg")
    .attr("width", w+margin.left+margin.right)
    .attr('height', h+margin.top+margin.bottom)
    .select(".g_1")
    .attr('transform', `translate(${margin.left}, ${margin.right})`)





    //x axis stuff
    var x_data=data.map(item=>item.total_bill)

    const x_scale = d3.scaleLinear()
    .domain([0,d3.max(x_data)])
    .range([margin.left, w]);

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
    .text('Total Bill')
    .attr('font-size', 17)
    .attr('text-anchor', 'middle')
    .attr('font-family', 'Times New Roman')
    .attr('font-weight','bold')


    d3.select('.child1_svg')
    .append('text')
    .attr('class','title')
    .attr('x', (w+margin.right+margin.left)/2)
    .attr('y', 15)
    .attr('fill', 'black')
    .text('Total Bill vs Tips')
    .attr('font-size', 22)
    .attr('text-anchor', 'middle')
    .attr('font-family', 'Times New Roman')
    .attr('font-weight','bold')




    //y axis stuff
    var y_data=data.map(item=>item.tip)

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
    .text('Tips')
    .attr('font-size', 17)
    .attr('text-anchor', 'middle')
    .attr('font-family', 'Times New Roman')
    .attr('transform', `rotate(${-90}, ${0},${h/2})`)
    .attr('dy', (w/4)-10)
    .attr('font-weight','bold')



    container.selectAll('circle')
    .data(data)
    .join('circle')
    .attr('cx', function(d){
      return x_scale(d.total_bill)
    })
    .attr('cy', function(d){
      return y_scale(d.tip)
    })
    .attr('r',3)
    .style('fill','#69b3a2')

  }


  render() {
    return <svg className="child1_svg">
      <g className="g_1"></g>
    </svg>;
  }
}

export default Child1;
