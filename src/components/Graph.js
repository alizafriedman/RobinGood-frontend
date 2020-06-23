// import * as React from "react";
import React from "react";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";

import { Animation } from "@devexpress/dx-react-chart";

const Graph = (props) => {
   

if (!props.data) return null
        
    return (

            <Paper>
                <Chart data={props.data}>
                    <ArgumentAxis />
                    <ValueAxis />

                    <BarSeries valueField="y" argumentField="x" />
                    <Title text={props.title} />
                <Animation />
                
                </Chart>
            </Paper>
        );
    

}




export default Graph