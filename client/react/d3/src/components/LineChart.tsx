import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

const dataset1 = [
  [1, 1],
  [12, 20],
  [24, 36],
  [32, 50],
  [40, 70],
  [50, 100],
  [55, 106],
  [65, 123],
  [73, 130],
  [78, 134],
  [83, 136],
  [89, 138],
  [100, 140],
];

const dimensions = {
  width: 500,
  height: 400,
  chartWidth: 300,
  chartHeight: 200,
};

export default function LineChart() {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    if (svg) {
      const xScale = d3
        .scaleLinear()
        .domain([0, 100])
        .range([0, dimensions.chartWidth]);

      const yScale = d3
        .scaleLinear()
        .domain([0, 200])
        .range([dimensions.chartHeight, 0]);

      const g = svg
        .append('g')
        .attr('transform', 'translate(' + 100 + ',' + 100 + ')');

      // Title
      svg
        .append('text')
        .attr('x', dimensions.chartWidth / 2 + 100)
        .attr('y', 100)
        .attr('text-anchor', 'middle')
        .style('font-family', 'Helvetica')
        .style('font-size', 20)
        .text('Line Chart');

      // X label
      svg
        .append('text')
        .attr('x', dimensions.chartWidth / 2 + 100)
        .attr('y', dimensions.chartHeight - 15 + 150)
        .attr('text-anchor', 'middle')
        .style('font-family', 'Helvetica')
        .style('font-size', 12)
        .text('Independant');

      // Y label
      svg
        .append('text')
        .attr('text-anchor', 'middle')
        .attr(
          'transform',
          'translate(60,' + dimensions.chartHeight + ')rotate(-90)'
        )
        .style('font-family', 'Helvetica')
        .style('font-size', 12)
        .text('Dependant');

      g.append('g')
        .attr('transform', 'translate(0,' + dimensions.chartHeight + ')')
        .call(d3.axisBottom(xScale));

      g.append('g').call(d3.axisLeft(yScale));

      svg
        .append('g')
        .selectAll('dot')
        .data(dataset1)
        .enter()
        .append('circle')
        .attr('cx', function (d) {
          return xScale(d[0]);
        })
        .attr('cy', function (d) {
          return yScale(d[1]);
        })
        .attr('r', 3)
        .attr('transform', 'translate(' + 100 + ',' + 100 + ')')
        .style('fill', '#CC0000');

      var line = d3
        .line()
        .x(function (d) {
          return xScale(d[0]);
        })
        .y(function (d) {
          return yScale(d[1]);
        })
        .curve(d3.curveMonotoneX);

      svg
        .append('path')
        .datum(dataset1)
        .attr('class', 'line')
        .attr('transform', 'translate(' + 100 + ',' + 100 + ')')
        .attr('d', line as any)
        .style('fill', 'none')
        .style('stroke', '#CC0000')
        .style('stroke-width', '2');
    }
  }, []);

  return (
    <div>
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
      ></svg>
    </div>
  );
}
