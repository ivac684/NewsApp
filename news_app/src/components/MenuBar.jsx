import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import BiotechIcon from "@mui/icons-material/Biotech";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import MenuIcon from "@mui/icons-material/Menu";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import { useMediaQuery } from "@mui/material";

const categories = [
  { name: "General", value: "general", icon: <ReceiptLongIcon /> },
  { name: "Business", value: "business", icon: <BusinessCenterIcon /> },
  { name: "Technology", value: "technology", icon: <DevicesOtherIcon /> },
  { name: "Health", value: "health", icon: <MonitorHeartIcon /> },
  { name: "Science", value: "science", icon: <BiotechIcon /> },
  { name: "Sports", value: "sports", icon: <SportsBasketballIcon /> },
];

const MenuBar = ({ setSelectedCategoryProp, selectedCategoryProp }) => {
  const [isCategorySelected, setIsCategorySelected] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const selectedCategory = selectedCategoryProp || categories[0].value;
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const handleClick = (category) => {
    setSelectedCategoryProp(category);
    setIsCategorySelected(true);
    setShowMenu(false);
  };

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const useStyles = makeStyles((theme) => ({
    dummyButton: {
      color: "rgb(122,122,124)",
      flexDirection: "column",
      textTransform: "none",
      "&:hover": {
        color: "firebrick",
        backgroundColor: "white",
      },
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      height: 70,
      width: 120,
      fontSize: 10,
    },

    column: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textTransform: "none",
      marginTop: isSmallScreen ? 5 : 50,
    },
    container: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: isSmallScreen ? "center" : "flex-end",
    },
    iconTextWrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontSize: 12,
    },
    burgerButton: {
      position: "absolute",
      top: showMenu ? "35rem" : "8rem",
      right: "1rem",
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.container}>
      {isSmallScreen && (
        <IconButton className={classes.burgerButton} onClick={handleToggleMenu}>
          <MenuIcon />
        </IconButton>
      )}
      <div className={classes.column}>
        {(showMenu || !isSmallScreen) && (
          <div className={classes.column}>
            {categories.map((category) => (
              <Button
                key={category.name}
                onClick={() => handleClick(category.value)}
                className={classes.dummyButton}
                startIcon={
                  <div className={classes.iconTextWrapper}>
                    {category.icon}
                    {category.name}
                  </div>
                }
                style={{
                  fontWeight:
                    selectedCategory === category.value ? "bold" : "normal",
                }}
              ></Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuBar;
