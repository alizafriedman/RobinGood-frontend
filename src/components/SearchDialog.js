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
import "../styles/searchDialog.css";
function SearchDialog() {
    const [open, setOpen] = React.useState(false);
    const [ein, setEin] = React.useState()
    const [search, setSearch] = React.useState()
    const [char, setChar] = React.useState()
    const [term, setTerm] = useState()

 

    const handleSearchTerm = async (e) => {
      setTerm(e.target.value);
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
       const fetchCharityTerm = async () => {
         const res = await fetch(`${api}/charities/search?term=${term}`, {
           method: "GET",
           headers: {
             "Content-Type": "application/json",
           },
         });

         if (!res.ok) throw new Error("couldnt load featured data");
         const banana = await res.json();
            console.log(banana)
         setSearch(banana[0]);
       };
    
    const handleCloseEin = () => {
       setOpen(false);
       fetchCharity();
    };
    
     const handleCloseTerm = () => {
       setOpen(false);
       fetchCharityTerm();
     };
  
  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false)
  }
  
  return (
    <div>
      <Button color="secondary" onClick={handleClickOpen}>
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
              color="secondary"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Search By Term"
              type="search"
              fullWidth
                value={term}
              onChange={handleSearchTerm}
              color="secondary"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleCloseTerm} color="secondary">
              Search By Term
            </Button>
            <Button onClick={handleCloseEin} color="secondary">
              Search By Ein
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {char && <FullPageCharity char={char} closeDialog={setChar} />}
      {search && <FullPageCharity char={search} closeDialog={setSearch} />}
      </div>
  );
}


export default SearchDialog