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



function HomeGraphInfo({
  donate_link,
  website,
  ein,
  name,
  city,
  state,
  zip_code,
  category }) {
  
  const [open, setOpen] = React.useState(false);
  const { user, getTokenSilently, token, loading } = useAuth0();
    

  const handleClickOpen = () => {
      setOpen(true);
  };
  const handleClose = () => {
      setOpen(false);
  };

  //patch charity EIN to user array + test ensured logged in

  const test = async () => {
    if (!user) {
      alert('please log in first');
      setOpen(false)
      return
    }

    const token = await getTokenSilently();
    await fetch(`${api}/users/${user.userId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        charity_id: ein
      })
    });
    setOpen(false)
  };
  

  return (
    <>
      {!loading && (
        <>
          <div>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClickOpen}
            >
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
                <Typography>{category}</Typography>
                <Typography id="text">Location:</Typography>
                <Typography>
                  {city}, {state}, {zip_code}
                </Typography>
                <Typography gutterBottom></Typography>
                <Typography id="text">
                  click here to visit the website:
                </Typography>
                <a href={website} color="secondary">
                  {website}
                </a>
                <Typography gutterBottom></Typography>
                <Typography id="text">click here to donate:</Typography>
                <a href={donate_link} color="secondary">
                  {donate_link}
                </a>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={test} color="primary">
                  Add Charity
                </Button>
                <Button autoFocus onClick={handleClose} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </>
      )}
    </>
  );
}


export default HomeGraphInfo;