import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import TouristSpotsPage, {
  loader as touristSpotsLoader,
} from "./pages/touristSpots/touristSpotsPage.tsx";
import SpotDetailsPage from "./pages/spotDetailsPage/spotDetailsPage.tsx";
import { ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material";
import callApi from "./api/api.ts";
import AddSpotPage from "./pages/addSpotPage/addSpotPage.tsx";
import EditSpotPage from "./pages/editSpotPage/editSpotPage.tsx";
import Login from "./pages/loginPage/loginPage.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import NewsPage from "./pages/newsPage/newsPage.tsx";
import AddNewsPage from "./pages/addNewsPage/addNews.tsx";
import EditNewsPage from "./pages/editNewsPage/editNewsPage.tsx";
import ArticlePage from "./pages/articlePage/articlePage.tsx";
import AccountsPage from "./pages/accountsPage/accountsPage.tsx";
import RegisterPage from "./pages/registerPage/registerPage.tsx";
import EditUserPage from "./pages/editUserPage/editUserPage.tsx";
import ForgotPasswordPage from "./pages/forgotPasswordPage/forgotPasswordPage.tsx";
import ResetPasswordPage from "./pages/resetPasswordPage/resetPasswordPage.tsx";
import PresentationPage from "./pages/presentationPage/presentationPage.tsx";
import NewsPublicPage from "./pages/newsPublicPage/newsPublicPage.tsx";
let theme = createTheme({
  palette: {
    mode: "dark",
  },
});
theme = responsiveFontSizes(theme);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        // Redirect the root path to "/turistickaMjesta"
        index: true, // This matches the root path "/"
        element: <Navigate to="/turistickaMjesta" replace />,
      },
      {
        path: "/turistickaMjesta",
        element: <TouristSpotsPage />,
        loader: touristSpotsLoader,
      },
      {
        path: "/createSpot",
        element: <AddSpotPage></AddSpotPage>,
      },
      {
        path: "/editSpot/:id",
        element: <EditSpotPage></EditSpotPage>,
        loader: async ({ params }) => {
          const response = await callApi.TouristSpots.getById(params.id!);
          return response;
        },
      },
      {
        path: "/novosti/:p",
        element: <NewsPage />,
        loader: async ({ params }) => {
          try {
            const response = await callApi.News.getAllAdmin(
              params.p! as unknown as number,
              10
            );
            return response;
          } catch (error) {
            console.error(error);
            return null;
          }
        },
      },
      { path: "/dodajNovost", element: <AddNewsPage /> },
      {
        path: "/urediNovost/:id",
        element: <EditNewsPage />,
        loader: async ({ params }) => {
          try {
            const response = await callApi.News.getById(params.id!);
            return response;
          } catch (error) {
            return null;
          }
        },
      },
      {
        path: "/korisnickiNalozi",
        element: <AccountsPage />,
        loader: async () => {
          try {
            const response = callApi.Auth.getAllAccounts();
            return response;
          } catch (error) {
            return null;
          }
        },
      },
      {
        path: "/urediNalog/:id",
        element: <EditUserPage />,
        loader: async ({ params }) => {
          try {
            const response = await callApi.Auth.getOne(params.id!);
            return response;
          } catch (error) {
            return null;
          }
        },
      },
      { path: "/register", element: <RegisterPage /> },
    ],
  },
  { path: "/login", element: <Login /> },
  {
    path: "/novost/:id",
    element: <ArticlePage />,
    loader: async ({ params }) => {
      try {
        const response = await callApi.News.getById(params.id!);
        return response;
      } catch (error) {
        return null;
      }
    },
  },
  { path: "/forgotPassword", element: <ForgotPasswordPage /> },
  { path: "/resetPassword/:token", element: <ResetPasswordPage /> },
  {
    path: "/view/:id",
    element: <SpotDetailsPage />,
    loader: async ({ params }) => {
      const response = await callApi.TouristSpots.getById(params.id!);
      return response;
    },
  },
  {
    path: "/public",
    element: <PresentationPage />,
    loader: async () => {
      try {
        const response = await callApi.TouristSpots.getAllPublic();
        return response;
      } catch (error) {
        return null;
      }
    },
  },
  {
    path: "/sveNovosti/:p",
    element: <NewsPublicPage />,
    loader: async ({ params }) => {
      try {
        const response = await callApi.News.getNews(
          params.p! as unknown as number,
          10
        );
        return response;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
