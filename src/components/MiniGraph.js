// import * as React from "react";
import React, {useEffect, useState} from "react";
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
import CharityInfoMini from "./CharityInfoMini";
import { fetchCharity } from '../services/charities'
import Home from './Home'
import MGraphs from './MGraphs'
// import { Legend } from "@devexpress/dx-react-chart";

const MiniGraph = ({
  charity: {
    name,
    website,
    chart_data,
    donate_link,
    city,
    state,
    zip_code,
    category,
    ein
  },
}) => {
const [char, setChar] = useState();
 
  // if (!char) return null;
  // console.log(charity)

  return (
    <Paper className="graph">
          <Chart
        data={chart_data}
        className="chart"
        width="320"
        height="420"
      >
        <ArgumentAxis />
        <ValueAxis />
        <BarSeries
          valueField="y"
          argumentField="x"
          color="purple"
          barWidth="1"
        />

        <Title text={name} />

        <Animation />
      </Chart>
      <CharityInfoMini
        website={website}
        donate_link={donate_link}
        name={name}
        city={city}
        state={state}
        zip_code={zip_code}
        category={category}
        ein={ein}
      />
    </Paper>
  );
};

export default MiniGraph;
