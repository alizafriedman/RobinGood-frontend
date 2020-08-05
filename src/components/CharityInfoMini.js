import React, { useEffect, setState, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { fetchCharity } from "../services/charities";
import { api } from "../config";
import Home from "./Home";
import { useAuth0 } from "../react-auth0-spa";
import "../styles/charityInfoMini.css";


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

function CharityInfoMini({
  charity
}) {
  const [open, setOpen] = React.useState(false);
  const [clicked, setClicked] = React.useState(true)
  const [clickDelete, setClickDelete] = React.useState(false)
  const { user, getTokenSilently, token } = useAuth0();
  const [einArray, setEinArray] = React.useState([]);



  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const addToProfile = async () => {
// console.log(charity.ein)
    const token = await getTokenSilently();
    await fetch(`${api}/users/${user.userId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        charity_id: charity.ein
      })
    });
    setOpen(false)
    setClicked(true)
    setClickDelete(true)
  }

  const deleteFromProfile = async () => {
    const token = await getTokenSilently();
    await fetch(`${api}/users/${user.userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        charity_id: charity.ein
      })
    });
    alert('charity has been deleted')
    setOpen(false)
    setClicked(false)
    setClickDelete(true)    

}

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Charity Information
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {charity.name}
        </DialogTitle>
        <DialogContent dividers>
          <Typography>{charity.category}</Typography>
          <Typography id='text'>Location:</Typography>
          <Typography>
            {charity.city}, {charity.state}, {charity.zip_code}
          </Typography>
          <Typography id="text">click here to visit the website:</Typography>
          <a href={charity.website} color='secondary'>{charity.website}</a>
          <Typography gutterBottom></Typography>
          {/* <a href={charity.name}>{charity.name}</a> */}
          <Typography id="text">click here to donate:</Typography>
          <a color="secondary" href={charity.donate_link}>
            {charity.donate_link}
          </a>
        </DialogContent>
        <DialogActions>
          {!clicked && (
          <Button autoFocus onClick={addToProfile} color="secondary" className="add">
              Add Charity
          </Button>
          )}
          {!clickDelete && (
            <Button autoFocus onClick={deleteFromProfile} color="secondary" className="add">
              Delete Charity
            </Button>
          )}

          

          <Button autoFocus onClick={handleClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CharityInfoMini;
