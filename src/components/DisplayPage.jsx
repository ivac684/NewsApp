import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import NewsList from "./NewsList";
import MenuBar from "./MenuBar";
import LatestNews from "./LatestNews";
import CategoryList from "./CategoryList";
import Button from "@mui/material/Button";
import { useMediaQuery } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const DisplayPage = () => {
  const theme = createTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  const [selectedCategory, setSelectedCategory] = useState("general");
  const [isNewsListOpen, setIsNewsListOpen] = useState(true);
  const [isLatestNewsOpen, setIsLatestNewsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/checkLoginStatus", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoggedIn(data.isLoggedIn);
      })
      .catch((error) => {
        console.error("Error checking login status:", error);
      });
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={2}>
          <MenuBar
            setSelectedCategoryProp={setSelectedCategory}
            selectedCategoryProp={selectedCategory}
            categoriesProp={MenuBar.categories}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          sx={{ display: { xs: "flex", sm: "none" } }}
          style={{ justifyContent: "center" }}
        >
          <Button
            sx={{
              color: "black",
              "&:hover": {
                color: "firebrick",
                backgroundColor: "rgba(187, 30, 30, 0.1)",
                borderRadius: "20px",
              },
              "&:active": {
                backgroundColor: "rgba(187, 30, 30, 0.1)",
                borderRadius: "20px",
                fonteWeight: "bold",
              },
            }}
            onClick={() => {
              setIsNewsListOpen(true);
              setIsLatestNewsOpen(false);
            }}
          >
            Featured
          </Button>
          <Button
            sx={{
              color: "black",
              "&:hover": {
                color: "firebrick",
                backgroundColor: "rgba(187, 30, 30, 0.1)",
                borderRadius: "20px",
              },
              "&:active": {
                backgroundColor: "rgba(187, 30, 30, 0.1)",
                borderRadius: "20px",
                fonteWeight: "bold",
              },
            }}
            onClick={() => {
              setIsLatestNewsOpen(true);
              setIsNewsListOpen(false);
            }}
          >
            Latest
          </Button>
        </Grid>
        <Grid item xs={12} md={7}>
          {(isNewsListOpen || isLargeScreen) && (
            <>
              {selectedCategory === "general" ? (
                <NewsList isLoggedIn={isLoggedIn} 
                handleLogin={handleLogin} 
                handleLogout={handleLogout}/>
              ) : (
                <Grid container spacing={3}>
                  <Grid item xs={12} md={12}>
                    <CategoryList
                      category={selectedCategory}
                      categoriesProp={MenuBar.categories}
                      isLoggedIn={isLoggedIn}
                      handleLogin={handleLogin} 
                      handleLogout={handleLogout}
                    />
                  </Grid>
                </Grid>
              )}
            </>
          )}
        </Grid>
          <Grid item xs={12} md={3}>
            {(isLatestNewsOpen || isLargeScreen) && <LatestNews />}
          </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default DisplayPage;
