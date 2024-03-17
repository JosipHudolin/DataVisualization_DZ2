function visualizeData(data) {
    const svgWidth = 1000;
    const svgHeight = 600;
    const radius = Math.min(svgWidth, svgHeight) / 2;

    const svg = d3.select("body")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .append("g")
        .attr("transform", "translate(" + svgWidth / 2 + "," + svgHeight / 2 + ")");

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie()
        .value(d => d.cases)
        .sort(null);

    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    const arcs = svg.selectAll("arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc");

    arcs.append("path")
        .attr("d", arc)
        .attr("fill", d => color(d.data.continent));

    d3.select("body")
        .append("h2")
        .text("COVID-19 Cases by Continent");

    const legend = svg.selectAll(".legend")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", (d, i) => "translate(0," + (i * 20 - 100) + ")");

    legend.append("rect")
        .attr("x", svgWidth / 2 - 18)
        .attr("width", 18)
        .attr("height", 18)
        .attr("fill", d => color(d.continent));

    legend.append("text")
        .attr("x", svgWidth / 2 - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(d => d.continent);
}

// Fetch data from API
fetch('https://disease.sh/v3/covid-19/continents')
    .then(response => response.json())
    .then(data => {
        visualizeData(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
