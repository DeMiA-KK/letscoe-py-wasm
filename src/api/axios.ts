import axios, { AxiosInstance } from "axios";

// APIURL
const apiURLDomain = process.env.REACT_APP_API_URL_DOMAIN;

export default axios.create({baseURL: apiURLDomain});

export const authAxios: AxiosInstance = axios.create({
    baseURL: apiURLDomain,
    headers: {"Content-Type": "application/json"},
    withCredentials: true,
});