import React, { useState } from "react";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Box,
  Button,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { useLoaderData } from "react-router-dom";
import callApi from "../../api/api";
import { Link } from "react-router-dom";

const NewsPublicPage = () => {
  const news: any = useLoaderData();
  const [displayData, setDisplayData] = useState(news);
  const [page, setPage] = useState(1);
  const [endReached, setEndReached] = useState(false);

  const handleClick = async () => {
    try {
      const nextPage = await callApi.News.getNews(page + 1, 10);
      if (nextPage.length === 0) {
        setEndReached(true);
      } else {
        const updatedNews = [...displayData, ...nextPage];
        setDisplayData(updatedNews);
        setPage(page + 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ padding: "20px", bgcolor: "#121212", color: "#fff" }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <NewspaperIcon sx={{ mr: 1, fontSize: "2rem" }} />
        <Typography variant="h5" component="h1">
          Novosti
        </Typography>
      </Box>
      <List>
        {displayData.map((article: any) => (
          <React.Fragment key={article.id}>
            <Link
              to={`/novost/${article.id}`}
              style={{ textDecoration: "none" }}
            >
              <ListItem
                alignItems="flex-start"
                sx={{ height: 100, "&:hover": { backgroundColor: "#333" } }}
              >
                <ListItemText
                  primary={
                    <>
                      <Typography variant="h6" component="span" color="grey">
                        {article.title}
                      </Typography>
                    </>
                  }
                  secondary={
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "text.secondary",
                      }}
                    >
                      <CalendarMonthIcon sx={{ fontSize: "1rem", mr: 0.5 }} />
                      <Typography
                        component="span"
                        variant="caption"
                        color="textSecondary"
                      >
                        {new Date(article.createdAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            </Link>
            <Divider variant="fullWidth" sx={{ bgcolor: "#444", height: 2 }} />
          </React.Fragment>
        ))}
      </List>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        onClick={handleClick}
        disabled={endReached}
      >
        Pogledaj više
      </Button>
    </Container>
  );
};

export default NewsPublicPage;
