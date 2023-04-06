import React from "react";
import { Button } from "@mui/material";
import { createTheme, makeStyles } from "@material-ui/core/styles";

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "firebrick",
    height: "60px",
    display: "flex",
    alignItems: "center",
  },
  myNews: {
    textAlign: "center",
    color: "white",
    fontFamily: "'Inter', sans-serif",
    fontSize: "18px",
    fontWeight: "bold",
    letterSpacing: "1px",
    marginRight: "20px",
    marginLeft: "150px",
  },
  secondText: {
    fontFamily: "'Inter', sans-serif",
    textAlign: "center",
    color: "white",
    fontSize: "18px",
    fontWeight: "normal",
    letterSpacing: "0.5px",
  },
  whiteButton: {
    color: "white",
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "#f5f5f5", // added hover background color
    },
  },
  // Hide the AppBar on screens smaller than 600px
  [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
    appBar: {
      display: "none",
    },
  },
}));

function MyAppBar() {
  const classes = useStyles();
  return (
    <div className={classes.appBar}>
      <h1 className={classes.myNews}>Make MyNews your homepage</h1>
      <h1 className={classes.secondText}>
        Every day discover what is new on the internet!
      </h1>
      <Button
        size="large"
        variant="contained"
        style={{
          backgroundColor: "white",
          color: "black",
          marginLeft: "25%",
          borderRadius: "14px",
          fontWeight: "bold",
        }}
      >
        GET
      </Button>
      <Button
        size="large"
        style={{ color: "white", fontWeight: "bold", textTransform: "none" }}
      >
        No, thanks
      </Button>
    </div>
  );
}

export default function NavBar() {
  return <MyAppBar />;
}
