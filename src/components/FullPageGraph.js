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
import { Animation } from "@devexpress/dx-react-chart";
import CharityInfo from "./CharityInfo";
import PopPagePics from './PopPagePics'


//pop page graphs

const FullPageGraph = ({ char }) => {
  
  if (!char.chart_data) return null;
  
  return (
    <Paper className="graph">
      <Chart data={char.chart_data} className="chart" width="650">
        <ArgumentAxis />
        <ValueAxis />
        <BarSeries
          valueField="y"
          argumentField="x"
          color="#141D42"
          barWidth="1"
        />

        <Title text={char.name} color="#5785C2" />

        <Animation />
        <CharityInfo char={char} />
      </Chart>

      <PopPagePics />
    </Paper>
  );
};

export default FullPageGraph;
