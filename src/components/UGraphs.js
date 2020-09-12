import React, { useEffect, useState } from "react";
import "../styles/graph.css";
import { api } from "../config";
import UserSavedGraphs from './UserSavedGraphs'
import { useAuth0 } from "../react-auth0-spa";
import querystring from "query-string";
 

const UGraphs = ({ einArray }) => {
  const [array, setArray] = useState([]);
  const [click, setClick] = React.useState(false)
  const { loading } = useAuth0();


  //bulk load charity info for graphs from redis

  useEffect(()=>{
    const loadCharities = async() =>{
    let queryString = querystring.stringify({'eins': einArray}, {'arrayFormat': "bracket"})
      const res = await fetch(`${api}/charities/bulk?${queryString}`)
      const result = await res.json()
      setArray(result.bulk_list)
      setClick(true)
    }
    loadCharities()
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
