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

function CharityInfo( {donate_link, website, name, city, state, zip_code, category, addToProfile}) {
    const [open, setOpen] = React.useState(false);
;
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const addCharity = () => {
    //add to display mini graph with matching ein on this page
            addToProfile()
    window.location.href = '/profile';

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
          {name}
        </DialogTitle>
        <DialogContent dividers>
          <Typography>
            Category:
            {category}
          </Typography>
          <Typography>
            {city}, {state}, {zip_code}
          </Typography>
          <Typography>click here to visit the website:</Typography>
          <a href={website}>{website}</a>
          <Typography gutterBottom></Typography>
          {/* <Link>{name}</Link> */}
          <Typography gutterBottom>click here to donate:</Typography>
          <a href={donate_link}>{donate_link}</a>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={addCharity} color="primary">
            Add Charity
          </Button>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default CharityInfo;