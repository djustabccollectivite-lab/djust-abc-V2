import Axios from 'axios';
import type { AxiosInstance } from 'axios';
import { RefreshableScheme } from '@nuxtjs/auth-next';
import type { Context } from '@nuxt/types';
import { stringify } from 'qs';

export default (context: Context): AxiosInstance => {
    const env = context.$config.application_env;

    const privateApiKey = env === 'preprod' ? process.env.NUXT_ENV_PREPROD_APIKEY : process.env.NUXT_ENV_PROD_APIKEY;

    const instance = Axios.create({
        baseURL: context.$config.baseUrl,
        headers: {
            'Dj-Api-Key': context.$config.testingPerfEnv || !privateApiKey ? context.$config.apiKey : privateApiKey,
            'dj-client': 'ACCOUNT',
        },
        paramsSerializer: function (params) {
            return stringify(params, { arrayFormat: 'repeat' });
        },
    });
    // Interceptor to remove undefined and null headers
    instance.interceptors.request.use((config) => {
        Object.keys(config.headers).forEach((key) => {
            if (undefined === config.headers[key] || config.headers[key] === null) {
                delete config.headers[key];
            }
        });
        return config;
    });
    // Interceptor to handle 401 errors and refresh token
    instance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                await (context.$auth.strategy as RefreshableScheme).refreshController.handleRefresh();
                originalRequest.headers.Authorization = (context.$auth.strategy as RefreshableScheme).token.get();
                return instance(originalRequest);
            }

            return Promise.reject(error);
        },
    );

    return instance;
};
