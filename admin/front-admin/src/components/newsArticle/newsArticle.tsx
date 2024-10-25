import NewspaperOutlined from "@mui/icons-material/NewspaperOutlined";
import { Typography, Box, Paper } from "@mui/material";
import { Link } from "react-router-dom";

const NewsArticleCard = (props: any) => {
  const timeAgo = (createdAt: string) => {
    const now = new Date();
    const publishedDate = new Date(createdAt);
    const differenceInSeconds = Math.floor(
      (now.getTime() - publishedDate.getTime()) / 1000
    );

    const intervals = [
      { label: "godina", seconds: 31536000 },
      { label: "mjeseci", seconds: 2592000 },
      { label: "sedmice", seconds: 604800 },
      { label: "dana", seconds: 86400 },
      { label: "sati", seconds: 3600 },
      { label: "minuta", seconds: 60 },
    ];

    for (let i = 0; i < intervals.length; i++) {
      const interval = intervals[i];
      const time = Math.floor(differenceInSeconds / interval.seconds);

      if (time >= 1) {
        return `Prije ${time} ${interval.label}`;
      }
    }

    return "Sada";
  };
  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "10px",
        borderRadius: "10px",
        boxSizing: "border-box",
        "&:hover": {
          background: "#000",
        },
      }}
    >
      <Link
        to={`/novost/${props.article.id}`}
        style={{
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          color: "white",
        }}
      >
        <Box
          sx={{
            flexShrink: 0,
          }}
        >
          <img
            referrerPolicy="no-referrer"
            src={props.article.imageUrl || "/novosti.jpg"}
            alt="News"
            style={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
        </Box>

        <Box sx={{ marginLeft: "15px" }}>
          <Typography variant="subtitle2" sx={{ display: "flex", gap: "5px" }}>
            <NewspaperOutlined />

            <span>Novost</span>
            <span>• {timeAgo(props.article.createdAt)}</span>
          </Typography>

          <Typography
            variant="body1"
            fontWeight="bold"
            textAlign={"left"}
            sx={{ marginTop: "5px", marginBottom: "5px" }}
          >
            {props.article.title}
          </Typography>

          <Typography
            variant="body2"
            textAlign={"left"}
            sx={{ display: "flex", gap: "10px" }}
          >
            <span>{props.article.description.substring(0, 50)}...</span>
          </Typography>
        </Box>
      </Link>
    </Paper>
  );
};

export default NewsArticleCard;
