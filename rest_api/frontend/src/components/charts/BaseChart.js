
import * as d3 from 'd3';
/*
    Base chart to use as a template for various chart types.
*/

export const BaseChart = (props) => {
    props = props || {};
    let width = props.width || 600;
    let height = props.height || 400;
    let selector = "#chart";
    d3.select(selector)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("border", "1px solid black")
        .append("text")
        .attr("fill", "green")
        .attr("x", 50)
        .attr("y", 50)
        .text("BaseChart")


        
};


