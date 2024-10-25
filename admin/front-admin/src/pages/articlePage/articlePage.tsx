import {
  Box,
  Container,
  Paper,
  Typography,
  Divider,
  Tooltip,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import "leaflet/dist/leaflet.css";
import ImagesList from "../../components/imagesList/imagesList";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import callApi from "../../api/api";
import NewsArticleCard from "../../components/newsArticle/newsArticle";
import DownloadIcon from "@mui/icons-material/Download";

const ArticlePage = () => {
  const loaderData: any = useLoaderData();
  const [latestNews, setLatestNews] = useState<any>([]);

  useEffect(() => {
    const fetchLatest = async () => {
      const response = await callApi.News.getNews(1, 4);
      setLatestNews(response);
    };
    fetchLatest();
  }, []);
  const handleDownload = async () => {
    for (const file of loaderData.Document) {
      try {
        const response = await fetch(
          `https://cors-anywhere.herokuapp.com/${file.docURL}`
        );
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = file.name || "default_filename";
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
      } catch (error) {
        console.error("Download error:", error);
      }
    }
  };
  return (
    <Container
      maxWidth="xl"
      sx={{
        padding: { xs: "20px", sm: "30px", md: "50px" },
        bgcolor: "#121212",
        color: "#fff",
      }}
    >
      <Grid container spacing={3}>
        <Grid xs={12} md={7}>
          <div style={{ position: "relative" }}>
            <img
              referrerPolicy="no-referrer"
              src={
                loaderData.Image[0]
                  ? loaderData.Image[0].imageURL
                  : "/novosti.jpg"
              }
              alt="Background"
              style={{ width: "100%", display: "block", borderRadius: "25px" }}
            />
            <Paper
              elevation={1}
              square={false}
              sx={{
                padding: "3rem 4rem",
                borderRadius: "25px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
                position: "relative",
                top: "-50px",
                width: "calc(100% - 20px)",
                margin: "0 auto",
                boxSizing: "border-box",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-end",
                    gap: "10px",
                  }}
                >
                  <Typography variant="caption" textAlign={"left"}>
                    Novost
                  </Typography>
                  |
                  <Typography variant="caption" textAlign={"left"}>
                    {new Date(loaderData.createdAt).toLocaleDateString("en-UK")}
                  </Typography>
                </div>
                {loaderData.Document.length > 0 && (
                  <Tooltip title="Preuzmi dodatni sadržaj" arrow>
                    <IconButton
                      sx={{
                        "&:focus": { outline: "none" },
                        "&:hover": {
                          background: "none",
                        },
                      }}
                      onClick={handleDownload}
                    >
                      <DownloadIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
              <Typography
                variant="h3"
                align="left"
                width="100%"
                padding={"1rem"}
                sx={{ marginBottom: "10px" }}
              >
                {loaderData.title}
                <Divider
                  sx={{ bgcolor: "pink", height: "2px", marginY: "10px" }}
                />
              </Typography>
              <Typography variant="body1" align="justify">
                {loaderData.description}
              </Typography>
            </Paper>
          </div>
        </Grid>
        <Grid
          xs={12}
          md={5}
          sx={{ gap: "25px", flexDirection: "column", display: "flex" }}
        >
          <div>
            <Paper
              square={false}
              elevation={1}
              sx={{ padding: "3%", borderRadius: "25px" }}
            >
              <Typography variant="h4" align="left" mb={"10px"}>
                Galerija
              </Typography>
              <ImagesList images={loaderData.Image} />
            </Paper>
          </div>
          <Paper
            elevation={1}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              padding: "1rem",
              borderRadius: "25px",
            }}
          >
            <Typography variant="h4" textAlign="left" mb={"10px"}>
              Najnovije vijesti
            </Typography>
            {latestNews.map((article: any) => {
              if (article.id !== loaderData.id)
                return <NewsArticleCard article={article} key={article.id} />;
            })}
          </Paper>
        </Grid>
      </Grid>

      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
    </Container>
  );
};

export default ArticlePage;
