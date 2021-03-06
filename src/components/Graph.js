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
import HomeGraphInfo from './HomeGraphInfo'



//main graph displayed on the home page

const Graph = ({ featured: {
  name,
  website,
  chart_data,
  ein,
  donate_link,
  city,
  state,
  zip_code,
  category } }) => {
   
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
        <HomeGraphInfo
          ein={ein}
          name={name}
          donate_link={donate_link}
          city={city}
          state={state}
          zip_code={zip_code}
          category={category} 
          />
      </Paper>
    );
    

}




export default Graph