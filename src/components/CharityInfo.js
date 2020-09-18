import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { api } from "../config";
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


function CharityInfo( {char}) {
  const [open, setOpen] = React.useState(false);
  const [clicked, setClicked] = React.useState(false);
  const [clickDelete, setClickDelete] = React.useState(false);
  const { user, getTokenSilently } = useAuth0();

  
  const handleClickOpen = () => {
    setOpen(true);
    
  };
  const handleClose = () => {
    setOpen(false);
  };

  //test Auth0 logged user in first
  const test = async () => {
    if (!user) {
      alert('please log in first');
      setOpen(false)
      return
    }

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
    alert("Charity has been successfully added and will appear in your saved charities.")
    setOpen(false)
    setClicked(true)
    setClickDelete(true)
  }

  //delete ein from user array

  const deleteFromProfile = async () => {
    const token = await getTokenSilently();
    await fetch(`${api}/users/${user.userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        charity_id: char.ein
      })
    });
    setOpen(false)
    setClicked(false)
    setClickDelete(false)
  };

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
          <Typography>{char.category}</Typography>
          <Typography id="text">Location:</Typography>

          <Typography>
            {char.city}, {char.state}, {char.zip_code}
          </Typography>
          <Typography id="text">click here to visit the website:</Typography>
          <a href={char.website}>{char.website}</a>
          <Typography gutterBottom></Typography>
          <Typography gutterBottom id="text">
            click here to donate:
          </Typography>
          <a href={char.donate_link} color='secondary'>{char.donate_link}</a>
        </DialogContent>
        <DialogActions>
          {!clicked && (
            <Button autoFocus onClick={test} color="secondary" className="add">
              Add Charity
            </Button>
          )}
          {clickDelete && (
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


export default CharityInfo;