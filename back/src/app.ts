import express from "express";
import ErrorHandler from "./middleware/error-handler";
import bodyParser from "body-parser";
import cors from "cors";
import authRouter from "./router/auth-router";
import swaggerjsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import touristSpotRouter from "./router/tourist-spot-router";
import uploadRouter from "./router/uploads-router";
import newsRouter from "./router/news-router";

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(
  cors({
    origin: [
      "https://localhost:3000",
      "https://localhost:5173",
      "http://192.168.60.121:5173",
    ],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      title: "Diplomski API",
      description: "API dokumentacija za diplomski",
      version: "1.0",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/router/*.ts"],
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const swaggerDocs = swaggerjsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api/auth", authRouter);
app.use("/api/touristSpot", touristSpotRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/news", newsRouter);

app.use(ErrorHandler);

app.listen(port, () => {
  console.log("server is running on port " + port);
});
