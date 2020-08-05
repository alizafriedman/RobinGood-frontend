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
import HomeGraphInfo from './HomeGraphInfo'
// import { Legend } from "@devexpress/dx-react-chart";



//main graph displayed on the home page
const Graph = ({featured: { name, website, chart_data, ein, donate_link, city, state, zip_code, category  }}) => {
   
  // console.log(chart_data)
  // console.log(name)
if (!chart_data) return null
    return (
      <Paper className="graph">
        <Chart data={chart_data} className="chart" width="650">
          <ArgumentAxis />
          <ValueAxis />
          <BarSeries
            valueField="y"
            argumentField="x"
            color="#141D42"
                    barWidth="1"
          />

          <Title text={name} /> 

          <Animation />
            </Chart>
        <HomeGraphInfo ein={ein} name={name} donate_link={donate_link} city={city} state={state} zip_code={zip_code} category={category}  />
      </Paper>
    );
    

}




export default Graph