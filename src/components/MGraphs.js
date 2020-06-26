import React, { useEffect, useState } from "react";
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
import { fetchCharity } from "../services/charities";
import Home from "./Home";
import MiniGraph from './MiniGraph'
import { api } from "../config";



const MGraphs = () => {
    const [array, setArray] = useState([])

    useEffect(() => {
        const graphs = async () => {
            const res = await fetch(`${api}/charities/mini`)
            const result = await res.json()
            setArray(result.charities)
            
        }
        graphs()
    },[])

    console.log(array)
    return (
        <>
            {array.map(charity => {
               return  <MiniGraph charity={charity} key={charity.id} />
            })}
    </>
)

}


export default MGraphs