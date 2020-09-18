import React, { useEffect, useState } from "react";
import { useAuth0 } from "../react-auth0-spa";
import Graph from './Graph'
import MGraphs from './MGraphs'
import { fetchFeaturedCharity } from "../services/charities";
import "../styles/home.css";
import HomeImage from './HomeImage'
import DemoCard from './DemoCard'


const Home = () => {
  const { user, loading, isAuthenticated } = useAuth0();
  const [featured, setFeatured] = useState();
  const [fetch, setFetched] = useState(false)
  

  //load home charity
  useEffect(() => {
    (async () => {
      try {
        const featCharity = await fetchFeaturedCharity();
        setFeatured(featCharity);
        setFetched(true)
      } catch (error) {
        console.error(error);
      }
    })();
  }, [user, isAuthenticated]);
 
  
  if (!featured) return null;
   

  return (
    <>
      {!loading && (
        <>
          <div className="home-content">
            <HomeImage />
            <div className="upper-page">
              <DemoCard />
              <Graph featured={featured[0]} />
            </div>
            <div className="lower-page">
              <MGraphs className="mini-graphs" />
            </div>
          </div>
        </>
      )}
    </>
  );
};


export default Home;
