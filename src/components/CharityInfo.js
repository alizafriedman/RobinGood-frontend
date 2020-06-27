import React, {useEffect, setState, useState} from "react";
import {Link, NavLink} from 'react-router-dom'
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { fetchCharity } from '../services/charities'
import { api } from "../config";
import Home from './Home'
import { useAuth0 } from "../react-auth0-spa";



const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function CharityInfo( {char}) {
  const [open, setOpen] = React.useState(false);
  const { user, getTokenSilently, token } = useAuth0();
;
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const test = async () => {
    setOpen(true)
    const token = await getTokenSilently();
    await fetch(`${api}/users/${user.userId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        charity_id: char.ein
      })
    });
    setOpen(false)

  }

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        Charity Information
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {char.name}
        </DialogTitle>
        <DialogContent dividers>
          <Typography>
            Category:
            {char.category}
          </Typography>
          <Typography>
            {char.city}, {char.state}, {char.zip_code}
          </Typography>
          <Typography>click here to visit the website:</Typography>
          <a href={char.website}>{char.website}</a>
          <Typography gutterBottom></Typography>
          {/* <Link>{name}</Link> */}
          <Typography gutterBottom>click here to donate:</Typography>
          <a href={char.donate_link}>{char.donate_link}</a>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={test} color="secondary">
            Add Charity
          </Button>
          <Button autoFocus onClick={handleClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default CharityInfo;