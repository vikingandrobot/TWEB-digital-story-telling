/**
  Utility class to facilitate the creation of line graphs for this project.

  You can specify various options to display data as line graphs.
*/
class LineGraph {

  /**
    Computes the options to build the graph.

    All possible optinos ared defined in the defaultOptions object below.
  */
  constructor(options) {
    const defaultOptions = {
      containerID: undefined, // ID of the container to put the graph in
      dataFile: undefined, // Path to the data file (CSV)
      yAxisColumnName: '', // name to use for the yAxisValue
      width: 800, // The total width of the graph
      height: 480, // The total height of the graph
      margins: { // Margins
        top: 20,
        right: 20,
        bottom: 20,
        left: 60
      },
      xScaleDomain: [0, 10], // Domain of the x scale domain
      yScaleDomain: [0, 100], // Domain of the y scale domain
      xAxisLabel: '',
      yAxisLabel: '',
      filters: [], // Filter to choose what to display
    };

    // Merge the options
    this.options = Object.assign({}, defaultOptions, options);
  }

  /**
    Loads and displays the graph.
  */
  display() {
    // We need these options
    if(this.options.containerID === undefined || this.options.dataFile === undefined) {
      return;
    }
    
    // Margin to use inside the SVG tag
    let margins = this.options.margins;

    // The width of the g inside the svg tag
    let width = this.options.width - margins.left - margins.right;
    let height = this.options.height - margins.top - margins.bottom;

    let xScale = d3.scaleLinear()
      .range([margins.left, width])
      .domain(this.options.xScaleDomain);

    let yScale = d3.scaleLinear()
      .range([height, margins.bottom])
      .domain(this.options.yScaleDomain);

    let xAxis = d3.axisBottom(xScale);
    let yAxis = d3.axisLeft(yScale);

    // Create the svg, append a <g> group and we call 'svg' the <g> inside the real svg
    let svg = d3.select(this.options.containerID)
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
          .text(this.options.xAxisLabel);

    // Append a label to the Y axis
    svg.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 0 - margins.left / 2)
          .attr("x",0 - (height / 2))
          .attr("dy", "1em")
          .style("text-anchor", "middle")
          .text(this.options.yAxisLabel);

    const options = this.options;

    d3.csv(this.options.dataFile, (err, data) => {
      if(err) throw err;

      // Add lines
      this.options.filters.forEach((element) => {
        let line = d3.line()
          .x(function(d) { return xScale(d[options.yAxisColumnName]); })
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
        .data(this.options.filters)
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
    
    console.log("looool");
  }
}
