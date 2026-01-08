import Service from '../api/Service';
import { ProductFilters, AggreationQuerySearch } from '../interfaces/IProduct';
import { SearchWithDataResponse } from '../interfaces/Product/IResponseProduct';

export default (context: any) => ({
    IsActive(): boolean {
        return !!context.$config.checkoutIsActive;
    },

    async getProductList(params: any, _facet: { facetName: string; values: string[] }) {
        // context.store.commit('shop/setProductThumbnails', {});
        context.store.commit('shop/setIsLoading', true);
        const data = context.$auth.loggedIn
            ? {
                  userId: context.$auth.user.id,
                  jwt: context.$auth.strategy.token.get(),
              }
            : null;

        const facetsToSend = { ...context.store.state.shop.facetsSelected };

        const facetRequest: string[] = [];

        for (const key in facetsToSend) {
            if (facetsToSend[key]) {
                facetsToSend[key].forEach((item) => {
                    const value: string = key + '|' + item;
                    facetRequest.push(value);
                });
            }
        }

        const request = {
            attribute: [...facetRequest],
            categoryIds: params?.categoryIds
                ? params.categoryIds
                : context.store.state.shop.categoryIds
                  ? context.store.state.shop.categoryIds
                  : null,
            supplier: params?.supplierName ? params.supplierName : context.store.state.shop.supplier,
            priceMin: context.store.state.shop.priceMin ? context.store.state.shop.priceMin : null,
            priceMax: context.store.state.shop.priceMax ? context.store.state.shop.priceMax : null,
            currency: context.store.state.app.currency,
            customFieldsSupplier: context.store.state.shop.customFieldsSupplier
                ? context.store.state.shop.customFieldsSupplier
                : null,
            locale: context.i18n.localeProperties.code.toUpperCase(),
            rq: context.store.state.shop.rq ? context.store.state.shop.rq : null,
            brand: context.store.state.shop.brand,
            size: context.store.state.shop.pageSize,
            page: context.store.state.shop.pageNumber,
            paged: context.store.state.shop.paged,
            'order.type': context.store.state.shop.sortType,
            'order.order': context.store.state.shop.sort,
            productTags: context.store.state.shop.productsTags,
            idType: params?.idType ?? context.store.state.shop.idType,
        };
        return await Service(context.$axios)
            .product.APIgetProductThumbnails(data, request)
            .then((response: any) => {
                const productThumbnails = response.data.productThumbnails;
                const productThumbnailsList = response.data.productThumbnails.content;
                productThumbnailsList.filter((product) => product.bestOffer !== null);
                context.store.commit('shop/setFacets', response.data.aggregations);
                context.store.commit('shop/setProductThumbnails', productThumbnails);
                context.store.commit('shop/setIsLoading', false);
                return productThumbnails;
            })
            .catch((error: any) => {
                context.store.commit('shop/setIsLoading', false);

                throw new Error('pb avec les produits' + error);
            });
    },

    async getFiltredProductList(categoryIds?: string, params?: ProductFilters) {
        // context.store.commit('shop/setProductThumbnails', {});
        context.store.commit('shop/setIsLoading', true);
        const data = context.$auth.loggedIn
            ? {
                  userId: context.$auth.user.id,
                  jwt: context.$auth.strategy.token.get(),
              }
            : null;

        const facetsToSend = { ...context.store.state.shop.facetsSelected };

        const facetRequest: string[] = [];

        for (const key in facetsToSend) {
            if (facetsToSend[key]) {
                facetsToSend[key].forEach((item) => {
                    const value: string = key + '|' + item;
                    facetRequest.push(value);
                });
            }
        }
        const request = {
            attribute: params?.filter_attribute ?? [],
            categoryIds:
                categoryIds || (context.store.state.shop.categoryIds ? context.store.state.shop.categoryIds : null),
            suppliers: params?.filter_supplier,
            customFieldsSupplier: context.store.state.shop.customFieldsSupplier
                ? context.store.state.shop.customFieldsSupplier
                : params?.customFieldsSupplier,
            customFieldsOffer: params?.customFieldsOffer,
            priceMin: context.store.state.shop.priceMin ? context.store.state.shop.priceMin : null,
            priceMax: context.store.state.shop.priceMax ? context.store.state.shop.priceMax : null,
            currency: context.store.state.app.currency,
            locale: context.i18n.localeProperties.code.toUpperCase(),
            rq: context.store.state.shop.rq ? context.store.state.shop.rq : params?.keyword,
            brand: params?.filter_brand ? params.filter_brand : context.store.state.shop.brand,
            size: context.store.state.shop.pageSize,
            page: params?.page,
            paged: context.store.state.shop.paged,
            'order.type': context.store.state.shop.sortType,
            'order.order': context.store.state.shop.sort,
            productTags: params?.filter_tag ? params.filter_tag : context.store.state.shop.productsTags,
            idType: params?.idType ? params?.idType : context.store.state.shop.idType,
        };
        const filtredProductList = await Service(context.$axios)
            .product.APIgetProductThumbnails(data, request)
            .then((response: any) => {
                const productThumbnails = response.data.productThumbnails;
                context.store.commit('shop/setFacets', response.data.aggregations);
                context.store.commit('shop/setProductThumbnails', productThumbnails);
                context.store.commit('shop/setIsLoading', false);
                return productThumbnails;
            })
            .catch((error: any) => {
                context.store.commit('shop/setIsLoading', false);

                throw new Error('pb avec les produits' + error);
            });
        return filtredProductList;
    },
    async getFiltredProductListv2(categoryIds?: string, params?: ProductFilters, aggregation?: AggreationQuerySearch) {
        // context.store.commit('shop/setProductThumbnails', {});
        context.store.commit('shop/setIsLoading', true);
        const data = context.$auth.loggedIn
            ? {
                  userId: context.$auth.user.id,
                  jwt: context.$auth.strategy.token.get(),
              }
            : null;

        const facetsToSend = { ...context.store.state.shop.facetsSelected };

        const facetRequest: string[] = [];

        for (const key in facetsToSend) {
            if (facetsToSend[key]) {
                facetsToSend[key].forEach((item) => {
                    const value: string = key + '|' + item;
                    facetRequest.push(value);
                });
            }
        }

        let sort = context.store.state.shop.sort;
        if (sort === 'DESC' || sort === 'ASC') {
            sort = '';
        }

        const request = {
            attributes: params?.filter_attribute ?? [],
            categoryIds:
                categoryIds || (context.store.state.shop.categoryIds ? context.store.state.shop.categoryIds : null),
            suppliers: params?.filter_supplier,
            customFieldsSupplier: context.store.state.shop.customFieldsSupplier
                ? context.store.state.shop.customFieldsSupplier
                : params?.customFieldsSupplier,
            customFieldsOffer: params?.customFieldsOffer,
            customFields: params?.customField,
            currency: context.store.state.app.currency,
            locale: context.i18n.localeProperties.code.toUpperCase(),
            query: context.store.state.shop.rq ? context.store.state.shop.rq : params?.keyword,
            brand: params?.filter_brand ? params.filter_brand : context.store.state.shop.brand,
            size: params?.size ?? context.store.state.shop.size,
            page: params?.page,
            productTags: params?.filter_tag ? params.filter_tag : context.store.state.shop.productsTags,
            skus: params?.skus,
            sort,
            aggregation,
            withFacets: params?.withFacets ?? true,
        };

        const filtredProductList = await Service(context.$axios)
            .product.APIgetProductThumbnailsv2(data, request)
            .then((response: SearchWithDataResponse) => {
                const products = response.data.products;
                if (params?.withFacets === undefined || params?.withFacets === true) {
                    context.store.commit('shop/setFacets', response.data.facets ?? []);
                }
                context.store.commit('shop/setProductThumbnails', products);
                context.store.commit('shop/setIsLoading', false);
                return products;
            })
            .catch((error: any) => {
                context.store.commit('shop/setIsLoading', false);

                throw new Error('pb avec les produits' + error);
            });
        return filtredProductList;
    },
    async getFiltredProductListv2WithoutUpdateStore(
        categoryIds?: string,
        params?: ProductFilters,
        aggregation?: AggreationQuerySearch,
    ) {
        const data = context.$auth.loggedIn
            ? {
                  userId: context.$auth.user.id,
                  jwt: context.$auth.strategy.token.get(),
              }
            : null;

        const facetsToSend = { ...context.store.state.shop.facetsSelected };

        const facetRequest: string[] = [];

        for (const key in facetsToSend) {
            if (facetsToSend[key]) {
                facetsToSend[key].forEach((item) => {
                    const value: string = key + '|' + item;
                    facetRequest.push(value);
                });
            }
        }
        let sort = context.store.state.shop.sort;
        if (sort === 'DESC' || sort === 'ASC') {
            sort = '';
        }

        // Récupérer les custom fields depuis les paramètres ou le store
        const customFieldsSupplier = params?.customFieldsSupplier || context.store.state.shop.customFieldsSupplier;
        const customFieldsOffer = params?.customFieldsOffer || context.store.state.shop.customFieldsOffer;
        const customFields = params?.customField || context.store.state.shop.customFieldsSelected;

        const request = {
            attributes: params?.filter_attribute ?? [],
            categoryIds:
                categoryIds || (context.store.state.shop.categoryIds ? context.store.state.shop.categoryIds : null),
            suppliers: params?.filter_supplier,
            customFieldsSupplier,
            customFieldsOffer,
            customFields,
            currency: context.store.state.app.currency,
            locale: context.i18n.localeProperties.code.toUpperCase(),
            query: context.store.state.shop.rq ? context.store.state.shop.rq : params?.keyword,
            brand: params?.filter_brand ? params.filter_brand : context.store.state.shop.brand,
            size: params?.size ? params.size : context.store.state.shop.size,
            page: params?.page,
            productTags: params?.filter_tag ? params.filter_tag : context.store.state.shop.productsTags,
            skus: params?.skus,
            aggregation,
            sort,
        };
        const filtredProductList = await Service(context.$axios)
            .product.APIgetProductThumbnailsv2(data, request)
            .then((response: SearchWithDataResponse) => {
                const products = response.data.products;

                return products;
            })
            .catch((error: any) => {
                throw new Error('pb avec les produits' + error);
            });
        return filtredProductList;
    },

    async getAllFiltredProductListv2RecursivelyWithoutUpdateStore(
        categoryIds?: string,
        params?: ProductFilters,
        aggregation?: AggreationQuerySearch,
    ) {
        try {
            const apiResponse = await this.getFiltredProductListv2WithoutUpdateStore(categoryIds, params, aggregation);
            const { size, totalElements, content } = apiResponse;
            let productsArray = content;

            if (size < totalElements) {
                const iteration = Math.floor(totalElements / size);

                const promises: Array<Promise<any>> = [];

                for (let index = 1; index < iteration + 1; index++) {
                    const promise: Promise<any> = new Promise((resolve) => {
                        this.getFiltredProductListv2WithoutUpdateStore(
                            categoryIds,
                            { ...params, page: String(index) },
                            aggregation,
                        ).then((result) => resolve(result));
                    });

                    promises.push(promise);
                }

                for (const products of await Promise.all(promises)) {
                    productsArray = productsArray.concat(products.content);
                }
            }

            return productsArray;
        } catch (error) {
            return error;
        }
    },

    async searchProducts(request: any) {
        const data = context.$auth.loggedIn
            ? {
                  userId: context.$auth.user.id,
                  jwt: context.$auth.strategy.token.get(),
              }
            : null;
        const results = await Service(context.$axios)
            .product.APIsearch(request, data, context.i18n.localeProperties.code.toUpperCase())
            .then((response: { data: { content: any } }) => {
                return response.data;
            })
            .catch((error: any) => {
                throw new Error('error with autocomplete' + error);
            });
        return results;
    },
    async searchAutocomplete(request: any, aggregation_?: string) {
        const data = context.$auth.loggedIn
            ? {
                  userId: context.$auth.user.id,
                  jwt: context.$auth.strategy.token.get(),
              }
            : null;
        const aggregation = aggregation_ || 'VARIANT';
        const results = await Service(context.$axios)
            .product.APIsearchv2(
                request,
                data,
                context.i18n.localeProperties.code.toUpperCase(),
                context.store.state.app.currency,
                aggregation,
            )
            .then((response: { data: { content: any } }) => {
                return response.data;
            })
            .catch((_error: any) => {});
        return results;
    },
    async getAllSupplierProductsRecursively(params: object) {
        try {
            let data;

            if (context.$auth.loggedIn) {
                data = {
                    userId: context.$auth.user.id,
                    jwt: context.$auth.strategy.token.get(),
                };
            }

            const requestBody = {
                locale: context.i18n.localeProperties.code.toUpperCase(),
                currency: context.store.state.app.currency,
            };

            const apiResponse = await Service(context.$axios).product.APIgetProductsBySupplier(data?.jwt ?? null, {
                ...requestBody,
                ...params,
            });

            const { size, totalElements, content } = apiResponse.data.products;

            let productsArray = content;

            if (size < totalElements) {
                const iteration = Math.floor(totalElements / size);

                const promises: Array<Promise<any>> = [];

                for (let index = 1; index < iteration + 1; index++) {
                    const promise: Promise<any> = new Promise((resolve) => {
                        Service(context.$axios)
                            .product.APIgetProductsBySupplier(data, {
                                ...params,
                                ...requestBody,
                                page: String(index),
                            })
                            .then((result) => resolve(result.data.products));
                    });

                    promises.push(promise);
                }

                for (const products of await Promise.all(promises)) {
                    productsArray = productsArray.concat(products.content);
                }
            }

            return productsArray;
        } catch (error) {
            return error;
        }
    },
});
