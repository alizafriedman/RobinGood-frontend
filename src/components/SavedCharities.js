import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
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
import Box from '@material-ui/core/Box';


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
    const [saved, setSaved] = React.useState([])
      const { user, getTokenSilently, token, isAuthenticated, loading } = useAuth0();
  const [einArray, setEinArray] = React.useState([]);
  const [char, setChar] = React.useState()
   const [fetched, setFetched] = useState(false);
  const [loaded, setLoaded] = useState(false);
  // const [user, setUser] = useState();
  const [test, setTest] = React.useState(user)
  const [scroll, setScroll] = React.useState('paper');



  

  // if (!token) return null;
  // console.log(user.userId)
    const fetchSaved = async () => {
      const token = await getTokenSilently();
      // console.log(token, user.userId)
       const res = await fetch(`${api}/users/${user.userId}`, {
         method: "GET",
         headers: {
                   Authorization: `Bearer ${token}`,
           "Content-Type": "application/json",
         },
       });

       
      if (!res.ok) throw new Error("couldnt load featured data");
      // console.log('banana', res)
       const banana = await res.json();
      setEinArray(banana.charity);
      // setUser(user)
      // setFetched(true)
    };
  


  
  const handleClickOpen = (scrollType) => {
    if (!user.userId) {
      return alert("oops! something went wrong. Please refresh the page")
    }

    // else if (!einArray.length) {
    //   console.log(einArray)
    //   return alert("please add a charity first")
    // }
    
    // console.log(banana.charity)
    setOpen(true);
    // setScroll(scrollType);
    fetchSaved();
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
                  <UGraphs einArray={einArray} />}
              </div>
            </Dialog>
          </div>
        </>
      )}
    </>
  );
  
}


export default SavedCharities;