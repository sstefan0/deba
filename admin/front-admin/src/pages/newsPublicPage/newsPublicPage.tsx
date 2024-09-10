import { useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import callApi from "../../api/api";
import Grid from "@mui/material/Unstable_Grid2";
import MainArticle from "../../components/mainArticle/mainArticle";
import NewsArticleCard from "../../components/newsArticle/newsArticle";
import NewsCard from "../../components/newsCard/newsCard";

const NewsPublicPage = () => {
  const news: any = useLoaderData();
  const [displayData, setDisplayData] = useState(news);
  const [page, setPage] = useState(1);
  const [end, setEnd] = useState(10);
  const [endReached, setEndReached] = useState(false);

  const handleClick = async () => {
    try {
      let nextPage;
      if (end + 3 >= displayData.length) {
        nextPage = await callApi.News.getNews(page + 1, 10);
        if (nextPage.length === 0) {
          setEndReached(true);
        } else {
          const updatedNews = [...displayData, ...nextPage];
          setDisplayData(updatedNews);
          setPage(page + 1);
        }
      }
      if (end + 3 >= nextPage.length + displayData.length)
        setEnd(displayData.length + nextPage.length);
      else setEnd(end + 3);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container
      maxWidth="xl"
      sx={{ padding: "50px", bgcolor: "#121212", color: "#fff" }}
    >
      <Grid container alignItems="stretch" spacing={3}>
        <Grid xs={12} md={8}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "5px",
              width: "100%",
              height: "100%",
            }}
          >
            <MainArticle article={news[0]} />
          </div>
        </Grid>
        <Grid xs={12} md={4}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "5px",
              width: "100%",
              height: "100%",
            }}
          >
            {news.slice(1, 6).map((article: any) => (
              <NewsArticleCard article={article} key={article.id} />
            ))}
          </div>
        </Grid>
      </Grid>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4" textAlign={"left"} padding={"3rem 0 1rem 0"}>
          Ostale novosti
        </Typography>
        <Grid container spacing={3} width={"100%"}>
          {displayData.slice(7, end).map((article: any) => (
            <Grid sm={12} md={4}>
              <NewsCard article={article} />
            </Grid>
          ))}
        </Grid>
      </div>
      <Button disabled={endReached} onClick={handleClick}>
        Prikaži više
      </Button>
    </Container>
  );
};

export default NewsPublicPage;
