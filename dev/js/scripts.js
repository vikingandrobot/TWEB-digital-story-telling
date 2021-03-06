$(document).ready(function() {

  // Animate scroll to target when clicking on .scroll-link links
  $('.scroll-link').click(function(e) {
    e.preventDefault();

    // Get the target ID
    const targetID = $(this).attr('href');

    // Animate the scroll
    $('html, body').animate({
      scrollTop: $(targetID).offset().top - $('header').outerHeight()
    }, 500);
  });

  const hateCrimesGraph = new LineGraph({
    containerID: '#hate-crime-line-graphe',
    dataFile: 'data/hate_crimes.csv',
    yAxisColumnName: 'Year',
    width: $('#hate-crime-line-graphe').outerWidth(),
    height: 0.56 * $('#hate-crime-line-graphe').outerWidth(),
    xScaleDomain: [2000, 2015], // Domain of the x scale domain
    yScaleDomain: [0, 4500], // Domain of the y scale domain
    xAxisLabel: 'Year',
    yAxisLabel: 'Number of registered offenses',
    filters: [
      {title: "Racial bias", color: "Crimson", column: "RacialBias_Total"},
      {title: "Ethnicity / National origin", color: "Tomato", column: "Ethnicity/NationalOrigin_Total"},
      {title: "Religious bias", color: "LightSlateGray", column: "ReligiousBias_Total"}
    ],
  });
  hateCrimesGraph.display();

  const numberOfImmigrantsGraph = new LineGraph({
    containerID: '#number-immigrant-graph',
    dataFile: 'data/number_of_immigrants.csv',
    yAxisColumnName: 'Year',
    width: $('#number-immigrant-graph').outerWidth(),
    height: 0.56 * $('#number-immigrant-graph').outerWidth(),
    xScaleDomain: [2000, 2015], // Domain of the x scale domain
    yScaleDomain: [0, 44000000], // Domain of the y scale domain
    margins: {
      top: 20,
      right: 20,
      bottom: 40,
      left: 50
    },
    xAxisLabel: 'Year',
    yAxisLabel: 'Number of immigrants',
    filters: [
      {title: "Immigrants population", color: "DarkGreen", column: "number_immigrants"},
    ],
  });
  numberOfImmigrantsGraph.display();
  
  const numberOfNewImmigrantsGraph = new LineGraph({
    containerID: '#number-new-immigrant-graph',
    dataFile: 'data/number_of_new_immigrants.csv',
    yAxisColumnName: 'Year',
    width: $('#number-new-immigrant-graph').outerWidth(),
    height: 0.56 * $('#number-new-immigrant-graph').outerWidth(),
    xScaleDomain: [2000, 2015], // Domain of the x scale domain
    yScaleDomain: [0, 1300000], // Domain of the y scale domain
    margins: {
      top: 20,
      right: 20,
      bottom: 40,
      left: 50
    },
    xAxisLabel: 'Year',
    yAxisLabel: 'Number of new immigrants',
    filters: [
      {title: "New immigrants", color: "DarkOrange", column: "number_immigrants"},
    ],
  });
  numberOfNewImmigrantsGraph.display();
  
  const sexualOrientationGraph = new LineGraph({
    containerID: '#sexual-orientation-graph',
    dataFile: 'data/hate_crimes.csv',
    yAxisColumnName: 'Year',
    width: $('#sexual-orientation-graph').outerWidth(),
    height: 0.56 * $('#sexual-orientation-graph').outerWidth(),
    xScaleDomain: [2000, 2015], // Domain of the x scale domain
    yScaleDomain: [0, 1400], // Domain of the y scale domain
    xAxisLabel: 'Year',
    yAxisLabel: 'Number of registered offenses',
    filters: [
      {title: "Sexual orientation", color: "LightSlateGray", column: "SexualOrientation_Total"}
    ],
  });
  sexualOrientationGraph.display();

  const choroplethGraph = new ChoroplethGraph({
    containerID: "#hate-crime-choropleth-graphe",
    topoJson: "data/us-10m.v1.json",
    csv: "data/reported_incident_state_2000_2015.csv",
  });
  choroplethGraph.display();
  
  $('.map-range').on('input', function() {
      $('.display-value').html( $(this).val() );

      // TODO update the map 
      choroplethGraph.year = $(this).val();
      //choroplethGraph.display();
      
      choroplethGraph.update();
  });
});
