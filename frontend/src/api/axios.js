import axios from "axios";

const localhostUrl = "http://localhost/8000";
const $axios = axios.create({ baseURL: localhostUrl, timeout: 5000 });
