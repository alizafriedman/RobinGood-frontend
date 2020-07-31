import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "../react-auth0-spa";
// import NavBarSearch from "./NavBarSearch";
// import SideBarBrowse from "./SideBarBrowse";
import "../styles/navbar.css";
import SearchDialog from './SearchDialog'
import SavedCharities from './SavedCharities'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { makeStyles, fade } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // borderBottom: "1px solid #00897b",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const { isAuthenticated, loginWithPopup, user } = useAuth0();
   const { logout } = useAuth0();

  return (
    <div className={classes.root}>
      <AppBar
        className={classes.appBar}
        style={{ backgroundColor: "white" }}
        position="fixed"
      >
        <Toolbar disableGutters={true} style={{ paddingRight: "10px" }}>
          <Typography variant="h6" className={classes.title}>
            <div>
              <Link to="/" id="navbar-logo">
                <Button
                  style={{
                    color: "secondary",
                    fontSize: 20,
                    lineHeight: "28px",
                    textDecoration: "none",
                  }}
                >
                  RobinGood
                </Button>
                {/* <img src="/utils/robinhoodLogo.png" className='logo' /> */}
              </Link>
            </div>
          </Typography>
          <SearchDialog />
          {user && (
            <SavedCharities />
          )}
          {!isAuthenticated && (
            <Button
              style={{ color: "primary" }}
              onClick={() => loginWithPopup({})}
            >
              Log in
            </Button>
          )}

          {/* {isAuthenticated && (
            <span> */}
              {/* <Link to="/">
                <Button style={{ color: "#e8eaf6" }}>Home</Button>
              </Link>
              &nbsp; */}
              {/* <Link to={"/profile"}>
                <Button
                  style={{ color: "primary", padding: "5px", minWidth: 0 }}
                >
                  <AccountCircleIcon />
                </Button>
              </Link>
            </span> */}
          )}
          {isAuthenticated && (
            <Button style={{ color: "primary" }}
              onClick={() => logout()}>
              Log out
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
};

export default NavBar;
