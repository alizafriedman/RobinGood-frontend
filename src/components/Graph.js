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
import InfoIcon from "@material-ui/icons/Info";
import CharityInfo from './CharityInfo'
// import { Legend } from "@devexpress/dx-react-chart";

const Graph = ({ data, title }) => {
   

if (!data) return null
        
    return (
      <Paper className="graph">
        {/* <InfoIcon /> */}
        <Chart data={data} className="chart" width="750">
          <ArgumentAxis />
          <ValueAxis />
          <BarSeries
            valueField="y"
            argumentField="x"
            color="purple"
            width="70"
          />

          <Title text={title} /> 

          <Animation />
            </Chart>
            <CharityInfo />
      </Paper>
    );
    

}




export default Graph