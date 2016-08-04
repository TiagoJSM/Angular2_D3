import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'my-bar-chart',
  templateUrl: 'app/components/barChart/bar-chart.component.html',
  styleUrls: ['app/components/barChart/bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
	constructor() { }
		
	ngOnInit() {
		const data = [
			{name: "First", value: 4}, 
			{name: "Second", value: 8}, 
			{name: "Third", value: 15}, 
			{name: "Fourth", value: 16}, 
			{name: "Fifth", value: 23}, 
			{name: "Sixth", value: 42}];

		const margin = {top: 20, right: 30, bottom: 30, left: 40},
			width = 960 - margin.left - margin.right,
			height = 500 - margin.top - margin.bottom;

		const x = d3.scale.ordinal()
			.domain(data.map(function(d) { return d.name; }))
			.rangeRoundBands([0, width], .1);

		const y = d3.scale.linear()
			.domain([0, d3.max(data, function(d) { return d.value; })])
			.range([height, 0]);

		const xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom");

		const yAxis = d3.svg.axis()
			.scale(y)
			.orient("left");

		const chart = d3.select(".chart")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		chart.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis);

		chart.append("g")
			.attr("class", "y axis")
			.call(yAxis);

		chart.selectAll(".bar")
			.data(data)
			.enter().append("rect")
			.attr("class", "bar")
			.attr("x", function(d) { return x(d.name); })
			.attr("y", function(d) { return y(d.value); })
			.attr("height", function(d) { return height - y(d.value); })
			.attr("width", x.rangeBand());
	}
}