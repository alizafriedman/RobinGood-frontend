import React, {useState, setState} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { api } from "../config";
function SearchDialog() {
    const [open, setOpen] = React.useState(false);
    const [ein, setEin] = React.useState()
    const [search, setSearch] = React.useState()
    const [char, setChar] = useState()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    const handleSearchTerm = async (e) => {
      setSearch(e.target.value);
    };

    const handleSearchEin = async (e) => {
      setEin(e.target.value);
    };

   const fetchCharity = async () => {
     const res = await fetch(`${api}/charities/${ein}`, {
       method: "GET",
       headers: {
         "Content-Type": "application/json",
       },
     });
     
     if (!res.ok) throw new Error("couldnt load featured data");
       const test = await res.json();
       console.log(test)
       setChar(test)
       window.location.href = `/profile`;
   };
    
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Search For A Charity
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={fetchCharity}>
          <DialogTitle id="form-dialog-title">Search</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Search By Ein"
              type="search"
              fullWidth
              //   value={setSearch}
              onChange={handleSearchEin}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Search By Term"
              type="search"
              fullWidth
              //   value={setSearch}
              onChange={handleSearchTerm}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              Search
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}


export default SearchDialog