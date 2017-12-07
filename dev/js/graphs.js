

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

// Column to display
let filter = [
	{title: "Racial bias", color: "Crimson", column: "RacialBias_Total"}, 
	{title: "Ethnicity / National origin", color: "Tomato", column: "Ethnicity/NationalOrigin_Total"}, 
	{title: "Religious bias", color: "LightSlateGray", column: "ReligiousBias_Total"}, 
	{title: "Disability_Total", color: "MediumOrchid", column: "Disability_Total"},
	{title: "Sexual orientation", color: "LimeGreen", column: "SexualOrientation_Total"},
	{title: "Gender", color: "SteelBlue", column: "Gender_Total"},
	{title: "Gender identity", color: "DarkKhaki", column: "GenderIdentity_Total"}
];

// Create the svg
let svg = d3.select("body")
	.append("svg")
		.attr("width", width)
		.attr("height", height);

d3.csv("data/pute.csv", (err, data) => {
	if(err) throw err;

	// Add lines
	filter.forEach((element) => {
		let line = d3.line()
			.x(function(d) { return xScale(d.Year); })
			.y(function(d) { return yScale(d[element.column]); });
		
		svg.append("path")
			.data([data])
			.attr("class", "line")
			.attr("d", line)
			.style("fill", "none")
			.style("stroke", element.color)
			.style("stroke-width", "2px");
	});

	// Add legend
	let legend = svg
		.selectAll("g.legend")
		.data(filter)
		.enter().append("g")
		.attr("class", "legend");
		
	let w = 20;
	let h = 20;

	legend.append("rect")
		.attr("x", w)
		.attr("y", (d, i) => { return height - (i * h) - 2 * h;})
		.attr("width", w)
		.attr("height", h)
		.style("fill", (d, i) => { return d.color; })
		.style("opacity", 0.8);

	legend.append("text")
		.attr("x", 50)
		.attr("y", (d, i) => { return height - (i * h) - h - 4;})
		.text((d, i) => { return d.title; });


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
