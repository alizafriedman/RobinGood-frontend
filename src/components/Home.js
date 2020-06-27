import React, { useEffect, useState } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { api } from "../config";
import { Typography } from "@material-ui/core";
import Graph from './Graph'
import MGraphs from './MGraphs'
import CharityInfo from './CharityInfo'
import { fetchFeaturedCharity, fetchCharity } from "../services/charities";
import "../styles/home.css";

const Home = () => {
  const { user, loading, getTokenSilently, isAuthenticated } = useAuth0();
  const [featured, setFeatured] = useState();
  

  
  useEffect(() => {
    (async () => {
      try {
        const featCharity = await fetchFeaturedCharity();
        setFeatured(featCharity);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [loading]);
 
  
 
  if (!featured) return null;
   

  return (
    <>
      <div className="home-content">
        {/* <Typography variant="h5" component="h5">
              
            </Typography> */}
        <Graph
          featured={featured}
          
        />
        <MGraphs/>
      </div>
    </>
  );
}


export default Home;
