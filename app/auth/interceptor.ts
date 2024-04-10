import axios, {InternalAxiosRequestConfig} from "axios";
import {Globals} from "@/app/common/globals"

const axiosPrepared = axios.create({
    baseURL: Globals.baseUrl,
});


axiosPrepared.interceptors.request.use(
    (config:any) => {
        const token =  Globals.token
        return {
            ...config,
            headers: {
                ...(token !== null && { Authorization: `Bearer ${token}` }),
                ...config.headers,
            },
        };
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosPrepared.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
        }
        return Promise.reject(error);
    }
);

export default axiosPrepared;