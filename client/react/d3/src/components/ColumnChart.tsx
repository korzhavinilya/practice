import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import randomstring from 'randomstring';

const initialData = [
  {
    name: 'foo',
    units: 100,
  },
  {
    name: 'bar',
    units: 400,
  },
  {
    name: 'baz',
    units: 300,
  },
  {
    name: 'bas',
    units: 700,
  },
  {
    name: 'bay',
    units: 200,
  },
  {
    name: 'bab',
    units: 500,
  },
];

const dimensions = {
  width: 900,
  height: 600,
};

function ColumnChart() {
  const [selection, setSelection] = useState<d3.Selection<
    SVGSVGElement | null,
    unknown,
    null,
    undefined
  > | null>(null);

  const [data, setData] = useState(initialData);

  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!selection) {
      setSelection(d3.select(svgRef.current));
    } else {
      const maxValue = d3.max(data, (d) => d.units);

      const y = d3
        .scaleLinear()
        .domain([0, maxValue!])
        .range([dimensions.height, 0]);

      const x = d3
        .scaleBand()
        .domain(data.map((d) => d.name))
        .range([0, dimensions.width])
        .paddingInner(0.05);

      selection
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('width', x.bandwidth())
        .attr('height', 0)
        .attr('fill', 'orange')
        .attr('x', (d) => x(d.name)!)
        .attr('y', dimensions.height)
        .transition()
        .duration(500)
        .delay((_, i) => i * 100)
        // .ease(d3.easeElastic)
        .attr('height', (d) => dimensions.height - y(d.units))
        .attr('y', (d) => y(d.units));
    }
  }, [selection]);

  useEffect(() => {
    if (selection) {
      const maxValue = d3.max(data, (d) => d.units);

      const y = d3
        .scaleLinear()
        .domain([0, maxValue!])
        .range([dimensions.height, 0]);

      const x = d3
        .scaleBand()
        .domain(data.map((d) => d.name))
        .range([0, dimensions.width])
        .paddingInner(0.05);

      const rects = selection.selectAll('rect').data(data);

      rects
        .exit()
        .transition()
        .duration(300)
        .attr('y', (d) => dimensions.height)
        .attr('height', 0)
        .remove();

      rects
        .transition()
        .duration(300)
        .attr('width', x.bandwidth())
        .attr('height', (d) => dimensions.height - y(d.units))
        .attr('x', (d) => x(d.name)!)
        .attr('y', (d) => y(d.units))
        .attr('fill', 'orange');

      rects
        .enter()
        .append('rect')
        .attr('width', x.bandwidth())
        .attr('fill', 'orange')
        .attr('x', (d) => x(d.name)!)
        .attr('y', (d) => dimensions.height)
        .attr('height', 0)
        .transition()
        .duration(500)
        .delay(250)
        .attr('y', (d) => y(d.units))
        .attr('height', (d) => dimensions.height - y(d.units));
    }
  }, [data]);

  function addRandomElement() {
    const dataToAdd = {
      name: randomstring.generate(10),
      units: Math.floor(Math.random() * 680 + 20),
    };
    setData([...data, dataToAdd]);
  }

  function removeLastElement() {
    if (data.length) {
      const slicedData = data.slice(0, data.length - 1);
      setData(slicedData);
    }
  }

  return (
    <div>
      <h2>ColumnChart</h2>
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
      ></svg>

      <div>
        <button onClick={addRandomElement}>Add Element</button>
        <button onClick={removeLastElement}>Remove Element</button>
      </div>
    </div>
  );
}

export default ColumnChart;
