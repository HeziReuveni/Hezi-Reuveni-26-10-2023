import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'http://dataservice.accuweather.com'
});

export {};