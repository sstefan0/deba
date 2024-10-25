import axios, { AxiosInstance, AxiosResponse } from "axios";

const baseURL = "http://localhost:3000/api";

const responseBody = (response: AxiosResponse) => response.data;

const api: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
const imageApi = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart:form-data",
    // Authorization: "Bearer " + localStorage.getItem("accessToken"),
  },
});

imageApi.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
const requests = {
  get: (url: string) => api.get(url).then(responseBody),
  post: (url: string, body: {}) => api.post(url, body).then(responseBody),
  put: (url: string, body: {}) => api.put(url, body).then(responseBody),
  delete: (url: string, body: {}) => api.post(url, body).then(responseBody),
  deleteOne: (url: string) => api.delete(url).then(responseBody),
};

const TouristSpots = {
  getAllTable: () => requests.get("/touristSpot/getAllTable"),
  getById: (spotId: string) =>
    requests.get(`/touristSpot/getById?id=${spotId}`),
  getTypes: () => requests.get("/touristSpot/getTypes"),
  createSpot: (body: any) => requests.post("/touristSpot/create", body),
  addPath: (body: any) => requests.post("/touristSpot/addCoordinates", body),
  addVideos: (body: any) => requests.post("/touristSpot/addVideos", body),
  updateSpot: (spotId: string, body: any) =>
    requests.put(`/touristSpot/update?id=${spotId}`, body),
  deleteVideos: (spotId: string) =>
    requests.deleteOne(`/touristSpot/deleteVideos?id=${spotId}`),
  deletePath: (spotId: string) =>
    requests.deleteOne(`/touristSpot/deleteCoordinates?id=${spotId}`),
  deleteSpot: (spotId: string) =>
    requests.deleteOne(`/touristSpot/delete?id=${spotId}`),
  getAllPublic: () => requests.get("/touristSpot/getAll"),
  getCounts: () => requests.get("/touristSpot/getCounts"),
  getByType: () => requests.get("touristSpot/getByType"),
  getRecommendations: () => requests.get("/touristSpot/getRecommendations"),
};

const News = {
  addNews: (body: any) => requests.post("/news/add", body),
  getAllAdmin: (page: number, limit: number) =>
    requests.get(`/news/getByUser?page=${page}&limit=${limit}`),
  getCount: () => requests.get("/news/getCount"),
  getById: (articleId: string) => requests.get(`/news/getById?id=${articleId}`),
  updateNews: (body: any) => requests.put("/news/update", body),
  deleteNews: (articleId: string) =>
    requests.deleteOne(`/news/delete?id=${articleId}`),
  getNews: (page: number, limit: number) =>
    requests.get(`/news/getPublic?page=${page}&limit=${limit}`),
};

const Upload = {
  uploadImages: (image: any) =>
    imageApi.post("/upload/images", image).then(responseBody),
  deleteImage: (imageId: string) =>
    requests.deleteOne(`/upload/deleteImage?id=${imageId}`),
  uploadFiles: (file: any) =>
    imageApi.post("/upload/files", file).then(responseBody),
  deleteFile: (fileId: string) =>
    requests.deleteOne(`/upload/deleteFile?id=${fileId}`),
};

const Auth = {
  login: (body: any) => requests.post("/auth/login", body),
  getAllAccounts: () => requests.get("/auth/getUsers"),
  toggleActive: (userId: string) =>
    requests.put(`/auth/toggleActive?id=${userId}`, {}),
  register: (body: any) => requests.post("/auth/register", body),
  getOne: (userId: string) => requests.get(`/auth/getById?id=${userId}`),
  update: (userId: string, body: any) =>
    requests.put(`/auth/updateUser?id=${userId}`, body),
  forgotPassword: (body: any) => requests.post("/auth/forgotPassword", body),
  resetPassword: (body: any) => requests.post("/auth/resetPassword", body),
};

const callApi = {
  TouristSpots,
  Upload,
  Auth,
  News,
};

export default callApi;
