import React, { useEffect, useState } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { api } from "../config";
import { Typography } from "@material-ui/core";

const Home = () => {
  const { user, loading } = useAuth0();


  return (
    <>
          <div className="home-content">
            <Typography variant="h5" component="h5">
              hi
            </Typography>
            
          </div>
          
    </>
  );
};

export default Home;
