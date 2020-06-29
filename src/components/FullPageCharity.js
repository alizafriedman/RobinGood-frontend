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
import FullPageGraph from './FullPageGraph'
import { useAuth0 } from "../react-auth0-spa";
import { api } from "../config";
import "../styles/fullPageCharity.css";

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

function FullPageCharity({char, closeDialog}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const { user, getTokenSilently, token } = useAuth0();


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
      closeDialog(null)
    
    
  };


  const addToProfile = async () => {
    const token = await getTokenSilently();

    await fetch(`${api}/users/${user.userId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        charity_id: char.ein
      })
    });
  setOpen(false)
  }
    return (
      <div>
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
                {char.name}
              </Typography>
              <Button autoFocus color="inherit" onClick={addToProfile}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <FullPageGraph char={char}/>
        </Dialog>
      </div>
    );
}

export default FullPageCharity;