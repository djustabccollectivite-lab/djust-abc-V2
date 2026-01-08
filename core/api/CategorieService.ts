import { locale } from 'moment';
import {
    NavigationCategoriesBreadCrumbResponse,
    NavigationCategoriesResponse,
} from '../interfaces/Categorie/IResponseCategorie';
import { NuxtAxiosInstance } from '@nuxtjs/axios';

export default (axios: NuxtAxiosInstance) => ({
    /**
     * Function getNavigationCategories
     * Get All navigation category
     *
     * @returns {NavigationCategoriesResponse[]}
     */
    getNavigationCategories(locale?: string) {
        const params: any = {};
        if (locale) {
            params.locale = locale;
        }
        return axios.get<NavigationCategoriesResponse[]>('/v1/shop/navigation-category/online', {
            params,
        });
    },
    /**
     * Function getNavigationCategoriesById
     * Get navigation category by id
     * @param {string} navigationCategoryId
     * @param {string} idType
     * @returns {NavigationCategoriesResponse}
     */
    getNavigationCategory(navigationCategoryId: string, idType: string = 'DJUST_ID', locale: string = 'fr') {
        return axios.get<NavigationCategoriesResponse>(`/v1/shop/navigation-category/${navigationCategoryId}`, {
            params: { idType, locale },
        });
    },
    /**
     *
     * @param {string} navigationCategoryId
     * @returns {NavigationCategoriesBreadCrumbResponse[]}
     */
    getNavigationCategoriesById(navigationCategoryId: string, idType: string = 'DJUST_ID', locale: string = 'fr') {
        return axios.get<NavigationCategoriesBreadCrumbResponse>(
            '/v1/shop/navigation-category/' + navigationCategoryId + '/breadcrumb' + '?locale=' + locale,
            {
                params: { idType: idType },
            }
        );
    },
});
