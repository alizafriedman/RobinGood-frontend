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
    einArray.forEach(async (ein) => {
        const res = await fetch(`${api}/charities/${ein}`);
        if (!res.ok) throw new Error("couldnt load featured data");
      const test = await res.json();
      console.log(test)
        setArray([...array, test]);
        setFetched(true)
    })
    

  }
  loadCharities()
  console.log(array);
},[])


    
//   useEffect(() => {
//     const graphs = async () => {
//       const res = await fetch(`${api}/charities/${ein}`);
//       const result = await res.json();
//       setArray(result.charities);
//     };
//     graphs();
//   }, []);

    //   const fetchCharity = async () => {
    //     const res = await fetch(`${api}/charities/${ein}`, {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     });

    //     if (!res.ok) throw new Error("couldnt load featured data");
    //     const test = await res.json();
    //     console.log(test.charity);
    //     setArray(test);
    //   };
 
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
