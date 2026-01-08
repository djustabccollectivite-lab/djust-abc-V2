import { Context } from '@nuxt/types';
import Service from '../api/Service';
import tools from '../helpers/tools';
import { NavCategoriesChildren, NavCategoriesRequest } from '../interfaces/Categorie/IRequestCategorie';
import { CustomFieldData, FoCustomFieldValue } from '../interfaces/ICustomField';
import { CategorieResponse, NavigationCategoriesResponse } from '../interfaces/Categorie/IResponseCategorie';

export default (context: Context) => ({
    /**
     * Filtrer les catégories avec des offres uniquement
     */
    async getCategoriesWithOffersOnly(
        categories: NavigationCategoriesResponse[],
    ): Promise<NavigationCategoriesResponse[]> {
        const result: NavigationCategoriesResponse[] = [];

        for (const category of categories) {
            const response = await context.$core.useShop.getFiltredProductListv2WithoutUpdateStore(category.externalId);

            if (response?.totalElements > 0) {
                const filteredChildren = await this.getCategoriesWithOffersOnly(category.childrenCategories || []);

                result.push({
                    ...category,
                    childrenCategories: filteredChildren,
                });
            }
        }
        return result;
    },

    async checkIfCategoryHasOffers(externalId: string): Promise<boolean> {
        try {
            const response = await context.$core.useShop.getFiltredProductListv2WithoutUpdateStore(externalId);
            return response?.totalElements > 0;
        } catch (error) {
            console.error(`Erreur lors de la vérification des offres pour la catégorie ${externalId}:`, error);
            return false;
        }
    },

    /**
     *
     * @param {NavCategoriesRequest} categorieParam
     * @returns {NavCategoriesChildren}
     */
    buildCategory(categorieParam: NavCategoriesRequest): CategorieResponse {
        const childrenCategoriesI: NavCategoriesChildren[] = [];
        const customFieldValues: CustomFieldData[] = [];
        const locale = context.i18n.localeProperties.code.toUpperCase();
        const categorie = {
            name: categorieParam.name,
            id: categorieParam.id,
            externalId: categorieParam.externalId,
            childrenCategories: [...childrenCategoriesI],
            customFieldValues: [...customFieldValues],
        };
        if (categorieParam.customFieldValues.length > 0) {
            categorieParam.customFieldValues.forEach((customFieldValue: FoCustomFieldValue) => {
                categorie.customFieldValues.push(tools.getCustomFieldData(customFieldValue, locale));
            });
        }
        if (categorieParam.childrenCategories && categorieParam.childrenCategories.length > 0) {
            categorieParam.childrenCategories.forEach((subcat: NavCategoriesRequest) => {
                if (subcat.active === true || subcat.active === undefined) {
                    const subCategory = this.buildCategory(subcat);
                    categorie.childrenCategories.push(subCategory);
                }
            });
        }
        return categorie;
    },
    /**
     * @returns {Promise<NavCategoriesChildren[]>}
     */
    async getCategoriesList(locale?: string): Promise<NavCategoriesChildren[]> {
        try {
            const response = await Service(context.$axios).categorie.getNavigationCategories(
                locale ?? context.i18n.localeProperties.code,
            );
            
            if (response?.data) {
                const rawActiveCategories = response.data.filter(
                    (category: NavigationCategoriesResponse) => category.active === true || category.active === undefined,
                );

                const categoriesActive: NavCategoriesChildren[] = [];
                for (const category of rawActiveCategories) {
                    const activeCategory = this.buildCategory(category);
                    categoriesActive.push(activeCategory);
                }

                context.store.commit('categories/setOriginalActiveCategories', rawActiveCategories);
                context.store.commit('categories/setCategories', categoriesActive);
                return categoriesActive;
            }
        } catch (e) {
            console.error("Error fetching categories:", e);
        }
        return [];
    },

    async getNavigationCategoriesById(navigationCategoriesById: string, idType: string = 'DJUST_ID') {
        const locale = context.app.i18n.localeProperties.code;
        const navigationCategories = await Service(context.$axios)
            .categorie.getNavigationCategoriesById(navigationCategoriesById, idType, locale)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.error(error);
            });
        return navigationCategories;
    },
    
    getNavigationCategoryById(navigationCategoryId: string, idType: string = 'DJUST_ID', locale: string = 'fr') {
        return Service(context.$axios)
            .categorie.getNavigationCategory(navigationCategoryId, idType, locale)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.error(error);
            });
    },
});
