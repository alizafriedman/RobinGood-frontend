import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { useAuth0 } from "../react-auth0-spa";
import { api } from "../config";
import UGraphs from './UGraphs';
import "../styles/profileGraph.css";


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 3,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function SavedCharities() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { user, getTokenSilently, token, isAuthenticated, loading } = useAuth0();
  const [einArray, setEinArray] = React.useState([]);
  const [loaded, setLoaded] = useState(false);
  const [test, setTest] = React.useState(user)


//get user saved charities

  const fetchSaved = async () => {
  const token = await getTokenSilently();
    const res = await fetch(`${api}/users/${user.userId}`, {
      method: "GET",
      headers: {
                Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

  if (!res.ok) throw new Error("couldnt load featured data");
    const fetchResult = await res.json();
  setEinArray(fetchResult.charity);
  
};
  


  
  const handleClickOpen = () => {
  
  // safety if Auth0 loads incorrectly
  if (!user.userId) {
    return alert("oops! something went wrong. Please add a charity and refresh the page")
  }

  fetchSaved();
  setOpen(true);
  setLoaded(true)
};

  const handleClose = () => {   
  setOpen(false);
  };
    
  
  return (
    <>
      {!loading && (
        <>
          <div>
            <Button color="secondary" onClick={handleClickOpen}>
              View Saved Charities
            </Button>
            <Dialog
              fullScreen
              open={open}
              onClose={handleClose}
              TransitionComponent={Transition}
              className="scroll"
              scroll="paper"
              
            >
              <AppBar className={classes.appBar}>
                <Toolbar>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                  >
                    <CloseIcon />
                  </IconButton>
                  
                  <Typography>
                    Saved Charities
                </Typography>
                </Toolbar>
              </AppBar>
              <div className="saved" >
              {einArray.length > 0 &&
                  <UGraphs einArray={einArray} fetchSaved={fetchSaved} />}
              </div>
            </Dialog>
          </div>
        </>
      )}
    </>
  );
  
}


export default SavedCharities;