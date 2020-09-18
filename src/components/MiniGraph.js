import React from "react";
import "../styles/miniGraph.css";
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

// import { Legend } from "@devexpress/dx-react-chart";

const MiniGraph = ({ charity }) => {
  
  return (
    <Paper className="graph">
          <Chart
        data={charity.chart_data}
        className="chart"
        width="470"
        height="640"        
      >
        <ArgumentAxis />
        <ValueAxis  />
        <BarSeries
          valueField="y"
          argumentField="x"
          color="#5785C2"
          barWidth="1"
          size='10px'
          textWrapping='Wrap'
        />

        <Title text={charity.name} />

        <Animation />
      </Chart>
      <CharityInfo className='test'
       char={charity}
      />
    </Paper>
  );
};

export default MiniGraph;
