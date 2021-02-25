import * as d3 from 'd3';

export const BarChart = (props) => {
    props = props || {};
    let width = props.width || 600;
    let height = props.height || 400;
    let selector = "#chart";
    let margin = props.margin || { top: 20, right: 20, bottom: 30, left: 40 };
    width = width - margin.left - margin.right;
    height = height - margin.top - margin.bottom;

    // set the ranges
    let x = d3.scaleBand()
        .range([0, width])
        .padding(0.1);
    let y = d3.scaleLinear()
        .range([height, 0]);

    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    let aaa = d3.select(selector)
    let svg = d3.select(selector).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // get the data


    let data = props.data || [{event_type: "Me", occurences: 100}, {event_type: "you", occurences: 99}]
    // format the data
    data.forEach(function (d) {
        d.occurences = +d.occurences;
    });

    // Scale the range of the data in the domains
    x.domain(data.map(function (d) { return d.event_type; }));
    y.domain([0, d3.max(data, function (d) { return d.occurences; })]);

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return x(d.event_type); })
        .attr("width", x.bandwidth())
        .attr("y", function (d) { return y(d.occurences); })
        .attr("height", function (d) { return height - y(d.occurences); });

    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y));





};



