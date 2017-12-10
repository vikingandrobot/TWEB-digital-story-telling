class ChoroplethGraph {

  constructor(options) {

    const defaultOptions = {
      containerID: undefined, // ID of the container to put the graph in
      topoJson: undefined,
      csv: undefined,
      minColor: "#fcd4ad",
      maxColor: "#d62b1d",
      defaultColor: "SteelBlue"
    };

    // Merge the options
    this.options = Object.assign({}, defaultOptions, options);


    this.path = d3.geoPath();

    // Choropleth color
    this.color = d3.scaleLinear()
      .range([this.options.minColor, this.options.maxColor]);

    // Creates svg
    this.svg = d3.select(this.options.containerID)
      .append("svg")
      .attr("width", "100%")
      .append("g");

    // Handle window resize
    let resize = () => {
      this.svg
        .attr(
          "transform",
          "scale(" + $(this.options.containerID).width() / 950 + ")"
        );

      d3.select(this.options.containerID + " svg")
        .attr("height", $(this.options.containerID).width() * 0.65)
    }

    // Callback when window is resized
    d3.select(window).on("resize", resize);

    this.year = 2000;

    // Scale
    resize();
  }

  display() {
    // We need these options
    if(this.options.containerID === undefined ||
       this.options.topoJson === undefined ||
       this.options.csv === undefined) {
      return;
    }

    // Year to display
    let year = 'Year_' + this.year;

    // Handle data
    let ready = (err, us, csv) => {
      if(err) throw err;

      // Sort by number of reported incidents
      let top = csv.sort((a, b) => {
        return d3.descending(+a[year], +b[year]);
      });

      // We just create a name map to store the name of the state by code
      let nameMap = new Map()
      top.forEach((d) => {
        nameMap.set(d.Code, {
          state: d.State,
          value: d[year]
        });
      });

      top = top.slice(0, 10);

      // Get min and max value
      let max = d3.max(top, function(d) { return +d[year]; });
      let min = d3.min(top, function(d) { return +d[year]; });

      // Set the color domain
      this.color.domain([min, max]);

      // Create a map
      let map = d3.map();
      top.forEach((d) => {
        map.set(d.Code, +d[year]);
      });

      // Sets the path and color for the map
      this.svg
        .append("g")
          .attr("class", "states")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
          .attr("d", this.path)
          .attr("data-code", (d) => { return d.properties.code })
          .style("fill", (d) => {
            let n = map.get(d.properties.code);

            if(n ===  undefined) {
              return this.options.defaultColor;
            }
            else {
              return this.color(map.get(d.properties.code));
            }
          });

      // Event to display tooltip on mouse over
      $(this.options.containerID + ' svg path').mouseover(function(e) {
        const code = $(this).attr('data-code');
        const value = nameMap.get($(this).attr('data-code')).value;
        let text = '';
        text = nameMap.get(code).state + " (" + code + ")" + "<br/>" + value + " registered offenses.";

        $('.tooltip').css('border-color', $(this).css('fill'));
        $('.tooltip').addClass('active');
        $('.tooltip').html(text);
      });

      $(this.options.containerID).mouseleave(function() {
        $('.tooltip').removeClass('active');
      });
    }

    // Load data
    d3.queue()
      .defer(d3.json, this.options.topoJson)
      .defer(d3.csv, this.options.csv)
      .await(ready);
  }

  update() {
    let year = 'Year_' + this.year;

    d3.csv(this.options.csv, (us) => {
      // Sort by number of reported incidents
      let top = us.sort((a, b) => {
        return d3.descending(+a[year], +b[year]);
      })

      // We just create a name map to store the name of the state by code
      let nameMap = new Map();
      top.forEach((d) => {
        nameMap.set(d.Code, {
          state: d.State,
          value: d[year]
        });
      });

      top = top.slice(0, 10);

      // Get min and max value
      let max = d3.max(top, function(d) { return +d[year]; });
      let min = d3.min(top, function(d) { return +d[year]; });

      // Set the color domain
      this.color.domain([min, max]);

      // Create a map
      let map = d3.map();
      top.forEach((d) => {
        map.set(d.Code, +d[year]);
      });


      this.svg
        .selectAll("path")
        .style("fill", (d) => {
            let n = map.get(d.properties.code);

            if(n ===  undefined) {
              return this.options.defaultColor;
            }
            else {
              return this.color(map.get(d.properties.code));
            }
          });

      // Event to display tooltip on mouse over
      $(this.options.containerID + ' svg path').mouseover(function(e) {
        const code = $(this).attr('data-code');
        const value = nameMap.get($(this).attr('data-code')).value;
        let text = '';
        text = nameMap.get(code).state + " (" + code + ")" + "<br/>" + value + " registered offenses.";

        $('.tooltip').css('border-color', $(this).css('fill'));
        $('.tooltip').addClass('active');
        $('.tooltip').html(text);
      });

      $(this.options.containerID).mouseleave(function() {
        $('.tooltip').removeClass('active');
      });
    });
  }
}
