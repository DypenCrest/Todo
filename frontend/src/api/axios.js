import axios from "axios";

const localhostUrl = "http://localhost:8000";
export const $axios = axios.create({ baseURL: localhostUrl, timeout: 5000 });
// to add access token to every request
$axios.interceptors.request.use(function (config) {
  const accessToken = localStorage.getItem("accesstoken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
