// import * as React from "react";
import React from "react";
import "../styles/graph.css";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import { Palette } from "@devexpress/dx-react-chart";
import { Animation } from "@devexpress/dx-react-chart";
import CharityInfo from "./CharityInfo";


const FullPageGraph = ({char}) => {
  if (!char.chart_data) return null;
  return (
    <Paper className="graph">
      <Chart data={char.chart_data} className="chart" width="650">
        <ArgumentAxis />
        <ValueAxis />
        <BarSeries
          valueField="y"
          argumentField="x"
          color="purple"
          barWidth="1"
        />

        <Title text={char.name} />

        <Animation />
      </Chart>
      <CharityInfo
        char={char}
      />
    </Paper>
  );
};

export default FullPageGraph;
