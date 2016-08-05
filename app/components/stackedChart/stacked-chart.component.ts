import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'my-pie-chart',
  templateUrl: 'app/components/stackedChart/stacked-chart.component.html',
  styleUrls: ['app/components/stackedChart/stacked-chart.component.css']
})
export class StackedChartComponent implements OnInit {
	constructor() { }
		
	ngOnInit() {
		const data = [
			{source: "PIMCO" , returnSeeking: 0.91, capitalPreserved: 0.09},
			{source: "Market Average" , returnSeeking: 0.93, capitalPreserved: 0.07},
            {source: "Sample Client" , returnSeeking: 0.91, capitalPreserved: 0.09},
		];

		const percentages = ["returnSeeking", "capitalPreserved"];
        const svgElem = d3.select(".svg");

        //const parseDate = d3.time.format("%m/%Y").parse;

        const margin = {top: 20, right: 50, bottom: 30, left: 20},
            width = +svgElem.attr("width") - margin.left - margin.right,
            height = +svgElem.attr("height") - margin.top - margin.bottom;

        const x = d3.scale.ordinal()
                .rangeRoundBands([0, width]);

        const y = d3.scale.linear()
                .rangeRound([height, 0]);

        const z = d3.scale.category10();

        const xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

        const yAxis = d3.svg.axis()
                .scale(y)
                .orient("right");

        const svg = svgElem
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        const layers = d3.layout.stack<{x: string, y: number, y0: number}>()(percentages.map(function(c) {
            return data.map(function(d) {
                return {x: d.source, y: d[c]};
            }) as any;
        }));

        x.domain(layers[0].map(function(d) { return d.x; }) as any);
        y.domain([0, d3.max(layers[layers.length - 1], function(d) { return d.y0 + d.y; })]).nice();

        const layer = svg.selectAll(".layer")
            .data(layers)
            .enter().append("g")
            .attr("class", "layer")
            .style("fill", function(d, i) { return z(i); });

        layer.selectAll("rect")
            .data<{x: string, y: number, y0: number}>(function(d) { return d; })
            .enter().append("rect")
            .attr("x", function(d) { return x(d.x); })
            .attr("y", function(d) { return y(d.y + d.y0); })
            .attr("height", function(d) { return y(d.y0) - y(d.y + d.y0); })
            .attr("width", x.rangeBand() - 1);

        svg.append("g")
            .attr("class", "axis axis--y")
            .attr("transform", "translate(" + width + ",0)")
            .call(yAxis);

        svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
	}
}