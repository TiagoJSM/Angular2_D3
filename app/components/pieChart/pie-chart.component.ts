import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'my-pie-chart',
  templateUrl: 'app/components/pieChart/pie-chart.component.html',
  styleUrls: ['app/components/pieChart/pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
	constructor() { }
		
	ngOnInit() {
		const data = [
			{age: "<5" , population: 2704659},
			{age: "5-13" , population: 4499890},
			{age: "14-17" , population: 2159981},
			{age: "18-24" , population: 3853788},
			{age: "25-44" , population: 14106543},
			{age: "45-64" , population: 8819342},
			{age: "≥65" , population: 612463}
		];

		const pieSvg = d3.select(".pie");

		const width = +pieSvg.attr("width"), 
				height = +pieSvg.attr("height"), 
				radius = Math.min(width, height) / 2;

		const color = d3.scale.ordinal()
    		.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

		const arc = d3.svg.arc()
			.outerRadius(radius - 10)
			.innerRadius(0);

		const labelArc = d3.svg.arc()
			.outerRadius(radius - 40)
			.innerRadius(radius - 40);

		const pie = d3.layout.pie<{age: string, population: number}>()
			.sort(null)
			.value(function(d) { return d.population; });

		const svg = d3.select(".pie")
			.append("g")
			.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

		const g = svg.selectAll(".arc")
					.data(pie(data))
				.enter().append("g")
					.attr("class", "arc");

		g.append("path")
			.attr("d", arc as any)
			.style("fill", function(d) { return color(d.data.age); } as any);

		g.append("text")
			.attr("transform", function(d) { 
				return "translate(" + labelArc.centroid(d as any) + ")"; 
			})
			.attr("dy", ".35em")
			.text(function(d) { 
				return d.data.age; 
			});

	}
}