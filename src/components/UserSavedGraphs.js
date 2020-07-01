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

const UserSavedGraphs = ({ charity }) => {
console.log(charity)
    // const fetchCharity = async () => {
    //   const res = await fetch(`${api}/charities/${ein}`, {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });

    //   if (!res.ok) throw new Error("couldnt load featured data");
    //   const test = await res.json();
    //   console.log(test.charity);
    //   setChar(test);
    // };
  // if (!charity.chart_data) return null;
  return (
    <Paper className="graph">
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

        {/* <Animation /> */}
      </Chart>
      <CharityInfo char={charity} />
    </Paper>
  );
};

export default UserSavedGraphs;
