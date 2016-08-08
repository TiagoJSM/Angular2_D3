import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'my-pie-chart',
  templateUrl: 'app/components/stackedAreaChart/stacked-area-chart.component.html',
  styleUrls: ['app/components/stackedAreaChart/stacked-area-chart.component.css']
})
export class StackedAreaChartComponent implements OnInit {
	constructor() { }
		
	ngOnInit() {
		const data = [
			{key: "Group1" , value: 37, date: new Date(2012, 4, 23)},
			{key: "Group2" , value: 12, date: new Date(2012, 4, 23)},
            {key: "Group3" , value: 46, date: new Date(2012, 4, 23)},
            
            {key: "Group1" , value: 32, date: new Date(2012, 4, 24)},
			{key: "Group2" , value: 19, date: new Date(2012, 4, 24)},
            {key: "Group3" , value: 42, date: new Date(2012, 4, 24)},
            
            {key: "Group1" , value: 45, date: new Date(2012, 4, 25)},
			{key: "Group2" , value: 16, date: new Date(2012, 4, 25)},
            {key: "Group3" , value: 44, date: new Date(2012, 4, 25)},

            {key: "Group1" , value: 24, date: new Date(2012, 4, 26)},
			{key: "Group2" , value: 52, date: new Date(2012, 4, 26)},
            {key: "Group3" , value: 64, date: new Date(2012, 4, 26)},
		];

        const svgElem = d3.select(".svg");

		const margin = {top: 20, right: 30, bottom: 30, left: 40},
            width = +svgElem.attr("width") - margin.left - margin.right,
            height = +svgElem.attr("height") - margin.top - margin.bottom;

        const x = d3.time.scale()
            .range([0, width]);

        const y = d3.scale.linear()
            .range([height, 0]);

        const z = d3.scale.category10();

        const xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .ticks(d3.time.days);

        const yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        const stack = d3.layout.stack<{key: string , value: number, date: Date, values: any}>()
            .offset("zero")
            .values(d => d.values as any)
            .x(d => d.date as any)
            .y(d => d.value as any);

        const nest = d3.nest<{key: string , value: number, date: Date}>()
            .key(d => 
                d.key);

        const area = d3.svg.area<{key: string , value: number, date: Date, y: number, y0: number}>()
            .interpolate("cardinal")
            .x(d => x(d.date))
            .y0(d => y(d.y0))
            .y1(d => y(d.y0 + d.y));

        const svg = svgElem
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        const layers = stack(nest.entries(data as any) as any);

        x.domain(d3.extent(data, d => d.date as any));
        y.domain([0, d3.max(data, d => (d as any).y0 + (d as any).y)]);

        svg.selectAll(".layer")
            .data(layers)
            .enter().append("path")
            .attr("class", "layer")
            .attr("d", d => area(d.values as any))
            .style("fill", (d, i) => z(i.toString()));

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);
	}
}