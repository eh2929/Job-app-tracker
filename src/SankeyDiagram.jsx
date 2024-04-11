import React from "react";
import Plot from "react-plotly.js";

function SankeyDiagram({ data }) {
  const trace = {
    type: "sankey",
    domain: {
      x: [0, 1],
      y: [0, 1],
    },
    orientation: "h",
    valueformat: ".0f",
    node: {
      pad: 10,
      thickness: 30,
      line: {
        color: "black",
        width: 0.5,
      },
      label: data.labels,
      color: data.colors,
    },
    link: {
      source: data.sources,
      target: data.targets,
      value: data.values,
    },
  };

  const layout = {
    title: "Sankey Diagram",
    height: 600,
    width: 600,
    font: {
      size: 10,
    },
  };

  return <Plot data={[trace]} layout={layout} />;
}

export default SankeyDiagram;
