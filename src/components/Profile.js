import React, { useState, useEffect } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { api } from "../config";
import "../styles/profile.css";
import {apple} from  '../services/charities'
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ProfileChar from './ProfileChar'
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Profile = () => {
  const { user, loading, getTokenSilently, token, isAuthenticated } = useAuth0();
  const [userCharities, setUserCharities] = useState([]);
  const [favoriteSets, setFavoriteSets] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [value, setValue] = React.useState(0);
  const { logout } = useAuth0();
  const [test, setTest] = useState()



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };





  // useEffect(() => {
  //   console.log(user)
  //   const loadCharities =  () => {
  //     console.log(user)
  //     const token = await getTokenSilently();
  //     const res = await fetch(`${api}/users/sets`, {
  //         headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //         },
  //       })
  //     const data = await res.json();
  //     // console.log(data)
  //     setFetched(true)
  //     setUserCharities(data.charity);
  //     // setFavoriteSets(data.favoriteSets);
  //   };
  //   loadCharities();
  // }, [getTokenSilently]);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="user-info-container">
        <img
          src={user.picture}
          alt="Profile"
          style={{ borderRadius: "50%", width: "120px", height: "120px", color:"white" }}
        />
        <h2>{user.name}</h2>
      </div>

      <Paper square className="profile-tabs-container">
        <Tabs
          value={value}
          // inkBarStyle={{ background: "cadetblue" }}
          indicatorColor="secondary"
          textColor="secondary"
          onChange={handleChange}
          aria-label="disabled tabs example"
          color="white"
        >
          <Tab
            // inkBarStyle={{ background: "cadetblue" }}
            label="Liked Charities"
            {...a11yProps(0)}
          />
          <Tab label="My Charities" {...a11yProps(1)} />
          <Tab label="Logout" {...a11yProps(2)} />
        </Tabs>
      </Paper>
      {/* <TabPanel value={value} index={0}>
        <div>
          <h1>Favorited charities:</h1> */}
          {/* <div className="sets-container" id="profile-sets">
            {fetched &&
              favoriteSets.map((set) => (
                <Set set={set} key={set.id} setFetched={setFetched} />
              ))}
          </div> */}
        {/* </div>
      </TabPanel> */}
      <TabPanel value={value} index={1}>
        <div>
          <h1>saved charities:</h1>
          <div className="sets-container" id="profile-sets">
            {fetched &&
              userCharities.map((charity) => (
                <ProfileChar charity={charity} key={charity.id} setFetched={setFetched} />
              ))}
          </div>
        </div>
      </TabPanel>
      <TabPanel
        value={value}
        index={2}
        style={{ minHeight: "calc(100vh - 473px)" }}
      >
        <div className="logout">
          <Button
            className="logout-button"
            style={{ color: "#e8eaf6" }}
            onClick={() => logout()}
          >
            Confirm Log out
          </Button>
        </div>
      </TabPanel>
    </>
  );
};

export default Profile;
