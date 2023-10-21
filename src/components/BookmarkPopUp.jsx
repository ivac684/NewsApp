import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  popupContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000, // da je iznad svega
  },
  popupContent: {
    backgroundColor: "white",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    maxWidth: "90%",
    maxHeight: "90%",
    overflow: "auto",
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
}));

const BookmarkPopup = ({ onClose }) => {
  const classes = useStyles();
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);

  useEffect(() => {
    async function fetchBookmarkedArticles() {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/bookmarks",
          {
            withCredentials: true,
          }
        );
        setBookmarkedArticles(response.data);
      } catch (error) {
        console.error("Error fetching bookmarked articles:", error);
      }
    }

    fetchBookmarkedArticles();
  }, []);

  return (
    <div className={classes.popupContainer}>
      <div className={classes.popupContent}>
        {bookmarkedArticles.map((bookmark, index) => (
          <Card key={index} style={{ marginBottom: "10px" }}>
            <CardContent>
              <Typography>
                    <a className={classes.title} href={bookmark.url}>
                      {bookmark.title}
                    </a>
                  </Typography>
            </CardContent>
          </Card>
        ))}

        <Button variant="contained" color="primary" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default BookmarkPopup;
