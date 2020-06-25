import React, { useEffect, useState } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { api } from "../config";
import { Typography } from "@material-ui/core";
import Graph from './Graph'
import MiniGraph from './MiniGraph'
import CharityInfo from './CharityInfo'
import { fetchFeaturedCharity, fetchCharity } from "../services/charities";
import "../styles/home.css";

const Home = () => {
  const { user, loading, getTokenSilently, isAuthenticated } = useAuth0();
  const [charity, setCharity] = useState();
  const[test, setTest] = useState()

  
  useEffect(() => {
    (async () => {
      try {
        const featuredCharity = await fetchFeaturedCharity();
        setCharity(featuredCharity);
      } catch (error) {
        console.error(error);
      }
    })();
    //  (async () => {
    //    try {
    //      const regularCharity = await fetchCharity();
    //      setTest(regularCharity);
    //    } catch (error) {
    //      console.error(error);
    //    }
    //  })();
  }, [loading]);
  useEffect(() => {
    (async () => {
      try {
        const regularCharity = await fetchCharity(590774235);
        setTest(regularCharity);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [])
  
 
  if (!charity) return null;
   

  return (
    <>
      <div className="home-content">
        {/* <Typography variant="h5" component="h5">
              
            </Typography> */}
        <Graph
          title={charity.name}
          data={charity.chart_data}
          url={charity.website}
          charity={charity}
        />
        <MiniGraph
          title={test.name}
          data={test.chart_data}
          url={test.website}
          charity={test}
        />
      </div>
    </>
  );
}


export default Home;
