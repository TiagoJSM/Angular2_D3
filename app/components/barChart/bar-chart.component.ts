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

		var margin = {top: 20, right: 30, bottom: 30, left: 40},
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

		const chart = d3.select(".chart")
					.attr("width", width + margin.left + margin.right)
    				.attr("height", height + margin.top + margin.bottom)
				.append("g")
    				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		const bar = chart.selectAll("g")
					.data(data)
				.enter().append("g")
					.attr("transform", function(d, i) { return "translate(" + x(d.name) + ",0)"; });

		bar.append("rect")
				.attr("y", function(d) { 
					return y(d.value); })
				.attr("height", function(d) { return height - y(d.value); })
      			.attr("width", x.rangeBand());

		bar.append("text")
				.attr("x", x.rangeBand() / 2)
				.attr("y", function(d) { return y(d.value) + 3; })
				.attr("dy", ".75em")
				.text(function(d) { return d.value; });
	}
}