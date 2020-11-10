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

// append the svg object to the body of the page
var svg = d3
    .select("#root")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json(source).then((data) => {
    // Add X axis
    var x = d3
        .scaleTime()
        .domain([new Date("1992-01-01"), new Date("2016-01-01")])
        .range([0, width]);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add Y axis

    var timeParser = d3.timeParse("%M:%S");

    var from = new Date("1995-01-01 00:36:30");
    var to = new Date("1995-01-01 00:40:00");

    var y = d3
        .scaleTime()
        .domain([from, to])
        .range([height, 0]);

    var y_axis = d3
        .axisLeft(y)
        .tickFormat((d) => {
            let t = d.toTimeString().replace(/.*:(\d{2}:\d{2}).*/, "$1");
            console.log(t)
            return t
        });

    svg.append("g").call(y_axis);

    svg.append("g")
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d) => { 
            return x(new Date(d["Year"]+"-01-01")); 
        })
        .attr("cy", (d) => { 
            return y(new Date("1995-01-01 00:"+d["Time"])); 
        })
        .attr("r", 3)
        .style("fill", "#69b3a2");
});
