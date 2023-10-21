import React, { useState, useEffect } from "react";
import { createTheme, makeStyles } from "@material-ui/core/styles";
import RegistrationForm from "./RegistrationForm";
import Button from "@material-ui/core/Button";
import BookmarkPopup from "./BookmarkPopUp";
import LoginForm from "./LoginForm";
import Logout from "./Logout";

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "firebrick",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
  },
  myNews: {
    textAlign: "center",
    color: "white",
    fontFamily: "'Inter', sans-serif",
    fontSize: "18px",
    fontWeight: "bold",
    letterSpacing: "1px",
  },
  secondText: {
    fontFamily: "'Inter', sans-serif",
    textAlign: "center",
    color: "white",
    fontSize: "18px",
    fontWeight: "normal",
    letterSpacing: "0.5px",
    // Hide text on small and medium screens
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
  },
}));

function MyAppBar() {
  const classes = useStyles();
  const [displayBookmarks, setDisplayBookmarks] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/checkLoginStatus", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoggedIn(data.isLoggedIn);
        console.log("isloggedin");
      })
      .catch((error) => {
        console.error("Error checking login status:", error);
      });
  }, []);

  return (
    <div className={classes.appBar}>
      <h1 className={classes.myNews}>In Between</h1>
      <h1 className={classes.secondText}>
        Every day discover what is new on the internet!
      </h1>
      <div className={classes.buttonContainer}>
        {!isLoggedIn ? (
          <>
            <RegistrationForm />
            <LoginForm />
          </>
        ) : (
          <>
            <Button
              color="inherit"
              onClick={() => {
                setDisplayBookmarks(!displayBookmarks);
              }}
            >
              My Bookmarks
            </Button>
            <Logout />
          </>
        )}
      </div>
      {isLoggedIn && displayBookmarks && (
        <BookmarkPopup onClose={() => setDisplayBookmarks(false)} />
      )}
    </div>
  );
}

export default function NavBar() {
  return <MyAppBar />;
}
