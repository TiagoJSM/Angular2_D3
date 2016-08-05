import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'my-circles',
  templateUrl: 'app/components/circles/circles.component.html',
  styleUrls: ['app/components/circles/circles.component.css']
})
export class CirclesComponent implements OnInit {
	constructor() { }
		
	ngOnInit() {
		const data = [45, 78, 144];

		const width = 500, height = 500;

		const chart = d3.select(".circles")
			.attr("width", width)
			.attr("height", height);
			
		chart.selectAll(".circle")
			.data(data)
			.enter().append("circle")
			.attr("class", "circle")
			.attr("cy", 60)
			.attr("cx", function(d, i) { return i * 100 + 30; })
			.attr("r", function(d) { return Math.sqrt(d); });
	}
}