import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { InputAdornment, TextField } from "@mui/material";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import Divider from "@mui/material/Divider";
import "typeface-inter";
import { useMediaQuery } from "@mui/material";

const NewsList = ({ isLoggedIn }) => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookmarks, setBookmarks] = useState([]);

  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const handleSearch = async () => {
    if (searchTerm) {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?q=${searchTerm}&country=us&category=business&apiKey=11b19690c5c14f7093066018d1790865`
      );
      setArticles(response.data.articles);
    }
  };

  const handleBookmark = async (article) => {
    try {
      if (!isLoggedIn) {
        console.log("User is not logged in");
        return;
      }

      const response = await fetch("http://localhost:8080/api/bookmark", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookmarks: [{ title: article.title, url: article.url }],
        }),
        credentials: "include",
      });

      if (response.ok) {
        if (bookmarks.some((bookmark) => bookmark.title === article.title)) {
          setBookmarks((prevBookmarks) =>
            prevBookmarks.filter((bookmark) => bookmark.title !== article.title)
          );
        } else {
          setBookmarks((prevBookmarks) => [...prevBookmarks, article]);
        }
      } else {
        console.error("Bookmark toggle failed");
      }
    } catch (error) {
      console.error("Error during bookmark toggle:", error);
    }
  };

  useEffect(() => {
    const getArticles = async () => {
      const response = await axios.get(
        "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=11b19690c5c14f7093066018d1790865"
      );
      console.log(response);
      setArticles(response.data.articles);
    };
    getArticles();
  }, []);

  const useStyles = makeStyles({
    gridContainer: {
      display: "grid",
      overflow: "hidden",
    },
    card: {
      position: "relative",
      overflow: "hidden",
      borderRadius: "3%",
      padding: "0 auto 0 calc((100% - 70%)/2)",
      paddingBlockEnd: "4%",
    },
    cardMedia: {
      paddingTop: "30%",
      position: "relative",
    },
    title: {
      fontFamily: "'Inter', sans-serif",
      textDecoration: "none",
      color: "black",
      fontSize: "16px",
      fontWeight: "bold",
      textAlign: "start",
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      lineClamp: 2,
      WebkitBoxOrient: "vertical",
    },
    author: {
      fontFamily: "'Inter', sans-serif",
      textAlign: "left",
      fontSize: "12px",
      font: "InterV",
    },
    news: {
      fontFamily: "'Inter', sans-serif",
      textAlign: "left",
      fontSize: "18px",
      fontWeight: "bold",
    },
    myrednews: {
      fontFamily: "'Inter', sans-serif",
      textAlign: "left",
      color: "rgb(187, 30, 30)",
      marginTop: 45,
      fontWeight: "bold",
    },
    mynews: {
      fontFamily: "'Inter', sans-serif",
      marginTop: 45,
      fontWeight: "bold",
    },
  });

  const classes = useStyles();

  return (
    <div>
      <div
        id="titleAndSearchContainer"
        style={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
        }}
      >
        <div style={{ display: "flex", marginLeft: isSmallScreen ? 25 : 0 }}>
          <h1 className={classes.myrednews}>My</h1>
          <h1 className={classes.mynews}>News</h1>
        </div>
        <Box
          sx={{
            border: "none",
            "& > :not(style)": {
              marginLeft: isSmallScreen ? 0 : 5,
              marginTop: isSmallScreen ? 0 : 5,
              width: isSmallScreen ? "90%" : "75ch",
              borderRadius: 5,
              overflow: "hidden",
            },
          }}
        >
          <TextField
            variant="filled"
            type="text"
            placeholder="Search news"
            value={searchTerm}
            sx={{ bgcolor: "white" }}
            onChange={(event) => setSearchTerm(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearch();
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment sx={{ ml: 1 }}>
                  <SearchIcon></SearchIcon>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment>
                  <Button
                    type="button"
                    onClick={handleSearch}
                    variant="contained"
                    style={{
                      backgroundColor: "rgb(187,30,30)",
                      borderRadius: 10,
                    }}
                  >
                    SEARCH
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </div>
      <Grid item xs={12} sm={12} className={classes.gridContainer}>
        <Divider variant="inset" style={{ width: "150%", margin: "0" }} />
        <h1 className={classes.news}> News </h1>
        <Grid container spacing={3}>
          {articles?.map((article) => (
            <Grid
              item
              key={article.url}
              xs={12}
              sm={3}
              md={4}
              style={{ display: "grid" }}
            >
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={article.urlToImage}
                  title={article.title}
                />
                <CardContent className={classes.cardContent}>
                  <Typography>
                    <a className={classes.title} href={article.url}>
                      {article.title}
                    </a>
                  </Typography>
                  <Typography className={classes.author}>
                    {article.author ? article.author : "Anonymous"}
                  </Typography>
                  {isLoggedIn && (
                    <Button
                      style={{
                        color: "grey",
                        position: "absolute",
                        bottom: "10px",
                        right: "10px",
                      }}
                      onClick={() => {
                        handleBookmark(article);
                      }}
                    >
                      {bookmarks.includes(article) ? (
                        <TagFacesIcon style={{ color: "rgb(255, 219, 88)" }} />
                      ) : (
                        <SentimentSatisfiedAltIcon />
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};
export default NewsList;
