import React, {useState, setState} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { api } from "../config";
import FullPageCharity from './FullPageCharity'
function SearchDialog() {
    const [open, setOpen] = React.useState(false);
    const [ein, setEin] = React.useState()
    const [search, setSearch] = React.useState()
    const [char, setChar] = useState()

  const handleClickOpen = () => {
    setOpen(true);
  };

 
    
    const handleCloseTerm = () => {
        setOpen(false)
        //set Term function here
    }

    const handleClose = () => {
        setOpen(false)
    }

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
    //    console.log(test)
        setChar(test)
   };
    
    const handleCloseEin = () => {

       setOpen(false);
       fetchCharity();
     };
  return (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        Search For A Charity
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form >
          <DialogTitle id="form-dialog-title">Search</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To search for a charity, either enter its EIN or the name/term:
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Search By Ein"
              type="search"
              fullWidth
              value={ein}
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
            <Button onClick={handleCloseTerm} color="primary">
              Search By Term
            </Button>
            <Button onClick={handleCloseEin} color="primary">
              Search By Ein
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {char && <FullPageCharity char={char} closeDialog={setChar} />}
    </div>
  );
}


export default SearchDialog