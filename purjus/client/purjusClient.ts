import Axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { Context } from '@nuxt/types';

export default (context: Context): AxiosInstance => {
    return Axios.create({
        baseURL: context.$config.pjProxyApi,
        headers: {
            'X-API-KEY': context.$config.pjProxyApiKey,
            'X-API-USERNAME': context.$config.pjProxyApiUsername,
        },
    });
};
