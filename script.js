let source =
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

d3.json(source).then((data) => {
    console.log(data[0]);
    data.forEach((element) => {
        // console.log(element["Time"]);
    });
});

// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 660 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var legendWidth = width - 100;

// append the svg object to the body of the page
var svg = d3
    .select("#root")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.select("#root")
    .append("div")
    .attr("id", "legend")

svg.append("circle")
    .attr("cx", legendWidth)
    .attr("cy", 30)
    .attr("r", 6)
    .style("fill", "#dd9866");
svg.append("circle")
    .attr("cx", legendWidth)
    .attr("cy", 50)
    .attr("r", 6)
    .style("fill", "#69b3a2");
svg.append("text")
    .attr("x", legendWidth + 10)
    .attr("y", 30)
    .text("Free from Doping")
    .style("font-size", "15px")
    .attr("alignment-baseline", "middle");
svg.append("text")
    .attr("x", legendWidth + 10)
    .attr("y", 50)
    .text("Caught in Doping")
    .style("font-size", "15px")
    .attr("alignment-baseline", "middle");

d3.json(source).then((data) => {
    // Add X axis
    var x = d3
        .scaleTime()
        .domain([new Date("1992-01-01"), new Date("2016-01-01")])
        .range([0, width]);

    svg.append("g")
        .attr("id", "x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add Y axis

    var timeParser = d3.timeParse("%M:%S");

    var from = new Date("1995-01-01 00:36:45");
    var to = new Date("1995-01-01 00:40:00");

    var y = d3.scaleTime().domain([to, from]).range([height, 0]);

    var y_axis = d3.axisLeft(y).tickFormat((d) => {
        let t = d.toTimeString().replace(/.*:(\d{2}:\d{2}).*/, "$1");
        return t;
    });

    svg.append("g").attr("id", "y-axis").call(y_axis);

    svg.append("g")
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("data-xvalue", (d) => {
            return new Date(d["Year"] + "-01-01");
        })
        .attr("cx", (d) => {
            return x(new Date(d["Year"] + "-01-01"));
        })
        .attr("data-yvalue", (d) => {
            return new Date("1995-01-01 00:" + d["Time"]);
        })
        .attr("cy", (d) => {
            return y(new Date("1995-01-01 00:" + d["Time"]));
        })
        .attr("r", 3)
        .style("fill", (d) => {
            if (d["Doping"] === "") {
                return "#dd9866";
            }
            return "#69b3a2";
        });
});
