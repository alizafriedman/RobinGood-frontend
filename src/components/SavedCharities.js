import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
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
import UGraphs from './UGraphs'
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function SavedCharities() {
  const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [saved, setSaved] = React.useState([])
      const { user, getTokenSilently, token } = useAuth0();
  const [einArray, setEinArray] = React.useState();
  const [char, setChar] = React.useState()


  if (!user) return null;

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
       const test = await res.json();
      setEinArray(test.charity);
    };
  

//has ein broken at this point so can pass into fetch

  console.log(einArray)
    const handleClickOpen = () => {
      fetchSaved();
      setOpen(true); 
  };

    const handleClose = () => {   
    setOpen(false);
    };
    


  return (
    <div>
      <Button  color="secondary" onClick={handleClickOpen}>
        View Saved Charities
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
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
            <Typography variant="h6" className={classes.title}>
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
            <UGraphs einArray={einArray} />
          </Toolbar>
        </AppBar>
      </Dialog>
    </div>
  );
}


export default SavedCharities;