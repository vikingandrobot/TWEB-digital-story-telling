

let width = 960;
let height = 600;

let margins = {
	top: 20,
	right: 20,
	bottom: 20,
	left: 50
};

let xScale = d3.scaleLinear()
	.range([margins.left, width - margins.right])
	.domain([2000, 2015]);

let yScale = d3.scaleLinear()
	.range([height - margins.top, margins.bottom])
	.domain([0, 4500]);

let xAxis = d3.axisBottom(xScale);
let yAxis = d3.axisLeft(yScale);

// Create the svg
let svg = d3.select("body")
	.append("svg")
		.attr("width", width)
		.attr("height", height);

var valueline = d3.line()
    .x(function(d) { return xScale(d.Year); })
    .y(function(d) { return yScale(d.RacialBias_Total); });

d3.csv("data/pute.csv", (err, data) => {
	if(err) throw err;

	svg.append("path")
		.data([data])
		.attr("class", "line")
		.attr("d", valueline)
		.style("fill", "none")
		.style("stroke", "steelblue")
		.style("stroke-width", "2px");

	// Create x axis
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + (height - margins.bottom) + ")")
		.call(xAxis);

	// Create y axis
	svg.append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(" + (margins.left) + ",0)")
		.call(yAxis);

});
