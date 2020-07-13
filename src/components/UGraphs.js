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
import MiniGraph from "./MiniGraph";
import { api } from "../config";
import UserSavedGraphs from './UserSavedGraphs'
import { useAuth0 } from "../react-auth0-spa";
import querystring from "query-string";
 

const UGraphs = ({ einArray }) => {
    const [array, setArray] = useState([]);
    let [ein, setEin] = React.useState()
     const [fetched, setFetched] = useState(false);
  const [loaded, setLoaded] = useState(false);
  // const [einArray, setEinArray] = React.useState();

  const { user, getTokenSilently, token, loading } = useAuth0();


console.log(einArray)
// if (!loading) return null

useEffect(()=>{
  const loadCharities = async() =>{
    // einArray.forEach(async (ein) => {
    //     const res = await fetch(`${api}/charities/${ein}`);
    //     if (!res.ok) throw new Error("couldnt load featured data");
    //   const test = await res.json();
    //   console.log(test)
    //     setArray([...array, test]);
    //     setFetched(true)
    // })
   let queryString = querystring.stringify({'eins': einArray}, {'arrayFormat': "bracket"})
    const res = await fetch(`${api}/charities/bulk?${queryString}`)
    const result = await res.json()
    console.log(result.banana)
    setArray(result.banana)
  }
  loadCharities()
  // console.log(array);
},[])


    

 
    return (
      <>
        {!loading && (
          <>
            {array.map((charity) => {
              return <UserSavedGraphs charity={charity} key={charity.ein} />;
            })}
          </>
        )}
      </>
    );
  
};

export default UGraphs;
