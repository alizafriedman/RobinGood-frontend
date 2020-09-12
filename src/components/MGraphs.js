import React, { useEffect, useState } from "react";
import "../styles/graph.css";
import MiniGraph from './MiniGraph'
import { api } from "../config";
import { useAuth0 } from "../react-auth0-spa";




const MGraphs = () => {
    const [array, setArray] = useState([])
    const {loading } = useAuth0();

  //load mini graphs
    useEffect(() => {
        const graphs = async () => {
            const res = await fetch(`${api}/charities/mini`)
            const result = await res.json()
            setArray(result.charities)
            
        }
        graphs()
    },[])

    return (
      <>
        {!loading && (
          <>
            {array.map((charity) => {
              return <MiniGraph charity={charity} key={charity.ein} />;
            })}
          </>
        )}
      </>
    );
}

export default MGraphs;