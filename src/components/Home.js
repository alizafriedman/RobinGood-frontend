import React, { useEffect, useState } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { api } from "../config";
import { Typography } from "@material-ui/core";
import Graph from './Graph'
import CharityInfo from './CharityInfo'
import { fetchFeaturedCharity } from "../services/charities";
import "../styles/home.css";

const Home = () => {
  const { user, loading, getTokenSilently, isAuthenticated } = useAuth0();
  const [charity, setCharity] = useState();

  
   useEffect(() => {
     (async () => {
       try {
         const featuredCharity = await fetchFeaturedCharity();
         setCharity(featuredCharity);
       } catch (error) {
         console.error(error);
       }
     })();
   }, [loading]);
  
 
  if (!charity) return null;
   

  return (
    <>
          <div className="home-content">
            {/* <Typography variant="h5" component="h5">
              
            </Typography> */}
        <Graph
          title={charity.name}
          data={charity.chart_data} 
         
          />
            
          </div>
          
    </>
  );
};

export default Home;
