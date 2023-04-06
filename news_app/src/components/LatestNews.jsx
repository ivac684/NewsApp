import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

const LatestNews = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleScroll = useCallback(
    (event) => {
      const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
      if (scrollHeight - scrollTop <= clientHeight + 10 && !isLoading) {
        setPage((prevPage) => prevPage + 1);
      }
    },
    [isLoading]
  );

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        "https://newsapi.org/v2/everything?domains=wsj.com&sortBy=publishedAt&apiKey=11b19690c5c14f7093066018d1790865"
      )
      .then((response) => {
        setArticles((prevArticles) => [
          ...prevArticles,
          ...response.data.articles,
        ]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
  };

  const useStyles = makeStyles({
    layout: {
      marginTop: 150,
      backgroundColor: "white",
      overflow: "hidden",
      borderRadius: "3%",
      padding: "0 auto 0 calc((100% - 70%)/2)",
      height: "400px",
      maxHeight: "100%",
      overflowY: "scroll",
      width: "100%",
      "&::-webkit-scrollbar": {
        width: "8px",
      },
      "&::-webkit-scrollbar-track": {
        background: "#f1f1f1",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "grey",
        borderRadius: "8px",
        width: "16px",
      },
    },
    text: {
      textDecoration: "none",
      color: "black",
      overflow: "hidden",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      fontSize: "16px",
      fontWeight: "bold",
      marginLeft: 10,
      fontFamily: "'Inter', sans-serif",
      textAlign: "left",
      lineClamp: 2,
      WebkitBoxOrient: "vertical",
    },
    divider: {
      borderBottom: "1px solid gray",
      paddingBottom: "5px",
    },
    time: {
      fontWeight: "bold",
      margin: 10,
      fontSize: "12px",
      textAlign: "left",
      color: "rgba(30, 113, 187, 1)",
      lineHeight: "16px",
    },
    latestNews: {
      fontSize: "16px",
      lineHeight: "20px",
      fontFamily: "'Inter', sans-serif",
      textAlign: "left",
      paddingLeft: "10px",
    },
    radioIcon: {
      color: "firebrick",
      marginRight: "5px",
      verticalAlign: "middle",
    },
  });
  const classes = useStyles();

  return (
    <div className={classes.layout} onScroll={handleScroll}>
      <h3 className={classes.latestNews}>
        <RadioButtonCheckedIcon className={classes.radioIcon} />
        Latest news
      </h3>
      {articles.map((article) => (
        <div key={article.url} className={classes.divider}>
          <Typography className={classes.time}>
            {formatDate(article.publishedAt)}
          </Typography>
          <Typography>
            <a href={article.url} className={classes.text}>
              {article.title}
            </a>
          </Typography>
        </div>
      ))}
      {isLoading && <p>Loading more articles...</p>}
    </div>
  );
};

export default LatestNews;
