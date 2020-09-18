import React from "react";
import "../styles/profileGraph.css";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import CharityInfoMini from "./CharityInfoMini";

const UserSavedGraphs = ({ charity, fetchSaved }) => {

  return (
    <Paper className="saved">
      <Chart data={charity.chart_data} className="chart" 
        width="560"
        height="420">
        <ArgumentAxis />
        <ValueAxis />
        <BarSeries
          valueField="y"
          argumentField="x"
          color="#141D42"
          barWidth="1"
        />

        <Title text={charity.name} color="#5785C2" />
      </Chart>
      <CharityInfoMini charity={charity} fetchSaved={fetchSaved} />
    </Paper>
  );
};

export default UserSavedGraphs;
