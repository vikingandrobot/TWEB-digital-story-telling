
// Margin to use inside the SVG tag
let margins = {
	top: 20,
	right: 20,
	bottom: 20,
	left: 60
};

// The width of the g inside the svg tag
let width = 800 - margins.left - margins.right;
let height = 480 - margins.top - margins.bottom;

let xScale = d3.scaleLinear()
	.range([margins.left, width])
	.domain([2000, 2015]);

let yScale = d3.scaleLinear()
	.range([height, margins.bottom])
	.domain([0, 4500]);

let xAxis = d3.axisBottom(xScale);
let yAxis = d3.axisLeft(yScale);

// Column to display
let filter = [
	{title: "Racial bias", color: "Crimson", column: "RacialBias_Total"},
	{title: "Ethnicity / National origin", color: "Tomato", column: "Ethnicity/NationalOrigin_Total"},
	{title: "Religious bias", color: "LightSlateGray", column: "ReligiousBias_Total"},
	// {title: "Disability", color: "MediumOrchid", column: "Disability_Total"},
	// {title: "Sexual orientation", color: "LimeGreen", column: "SexualOrientation_Total"},
	// {title: "Gender", color: "SteelBlue", column: "Gender_Total"},
	// {title: "Gender identity", color: "DarkKhaki", column: "GenderIdentity_Total"}
];

// Create the svg, append a <g> group and we call 'svg' the <g> inside the real svg
let svg = d3.select("body")
	.append("svg")
		.attr("width", width + margins.left + margins.right)
		.attr("height", height + margins.top + margins.bottom + 40)
	.append("g")
		.attr("transform", "translate(" + margins.left + ", " + margins.top + ")");

// Append a label for the X axis
svg.append("text")
      .attr("transform",
            "translate(" + (width/2) + " ," +
                           (height + 40) + ")")
      .style("text-anchor", "middle")
      .text("Year");

// Append a label to the Y axis
svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margins.left / 2)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Number of registered offenses");

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
	let legends = svg
		.append("g")
		.attr("class", "legends")
		.attr("transform", "translate(" + (width - 250) + "," + 50 + ")");

	let legend = legends
		.selectAll("g.legend")
		.data(filter)
		.enter().append("g")
		.attr("class", "legend");


	let w = 20;
	let h = 20;

	legend.append("rect")
		.attr("x", w)
		.attr("y", (d, i) => { return (i * h) - 2 * h;})
		.attr("width", w)
		.attr("height", h)
		.style("fill", (d, i) => { return d.color; })
		.style("opacity", 0.8);

	legend.append("text")
		.attr("x", 50)
		.attr("y", (d, i) => { return (i * h) - h - 4;})
		.text((d, i) => { return d.title; });


	// Create x axis
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + (height) + ")")
		.call(xAxis);

	// Create y axis
	svg.append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(" + (margins.left) + ",0)")
		.call(yAxis);

});
