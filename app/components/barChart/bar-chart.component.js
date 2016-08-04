"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var d3 = require('d3');
var BarChartComponent = (function () {
    function BarChartComponent() {
    }
    BarChartComponent.prototype.ngOnInit = function () {
        var data = [
            { name: "First", value: 4 },
            { name: "Second", value: 8 },
            { name: "Third", value: 15 },
            { name: "Fourth", value: 16 },
            { name: "Fifth", value: 23 },
            { name: "Sixth", value: 42 }];
        var margin = { top: 20, right: 30, bottom: 30, left: 40 }, width = 960 - margin.left - margin.right, height = 500 - margin.top - margin.bottom;
        var x = d3.scale.ordinal()
            .domain(data.map(function (d) { return d.name; }))
            .rangeRoundBands([0, width], .1);
        var y = d3.scale.linear()
            .domain([0, d3.max(data, function (d) { return d.value; })])
            .range([height, 0]);
        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");
        var chart = d3.select(".chart")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        var bar = chart.selectAll("g")
            .data(data)
            .enter().append("g")
            .attr("transform", function (d, i) { return "translate(" + x(d.name) + ",0)"; });
        bar.append("rect")
            .attr("y", function (d) {
            return y(d.value);
        })
            .attr("height", function (d) { return height - y(d.value); })
            .attr("width", x.rangeBand());
        bar.append("text")
            .attr("x", x.rangeBand() / 2)
            .attr("y", function (d) { return y(d.value) + 3; })
            .attr("dy", ".75em")
            .text(function (d) { return d.value; });
    };
    BarChartComponent = __decorate([
        core_1.Component({
            selector: 'my-bar-chart',
            templateUrl: 'app/components/barChart/bar-chart.component.html',
            styleUrls: ['app/components/barChart/bar-chart.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], BarChartComponent);
    return BarChartComponent;
}());
exports.BarChartComponent = BarChartComponent;
//# sourceMappingURL=bar-chart.component.js.map