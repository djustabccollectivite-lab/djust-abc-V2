import Service from '../api/Service';

export default (context: any) => ({
    async getFeatureProducts(params: any) {
        const data = context.$auth.loggedIn
            ? {
                  userId: context.$auth.user.id,
                  jwt: context.$auth.strategy.token.get(),
              }
            : null;

        const request = {
            brand: context.store.state.shop.brand,
            size: params.size ? params.size : context.store.state.shop.pageSize,
            page: context.store.state.shop.pageNumber,
            paged: context.store.state.shop.paged,
            categoryIds: params.categoryIds ? params.categoryIds : null,
            customFieldsSupplier: context.store.state.shop.customFieldsSupplier
                ? context.store.state.shop.customFieldsSupplier
                : null,
            priceMin: context.store.state.shop.priceMin ? context.store.state.shop.priceMin : null,
            priceMax: context.store.state.shop.priceMax ? context.store.state.shop.priceMax : null,
            currency: context.store.state.app.currency,
            rq: params.rq ? params.rq : null,
            locale: context.i18n.localeProperties.code.toUpperCase(),
            productTags: params.productTags ? params.productTags : null,
            skus: params.productSku ? params.productSku.toString() : null,
            'order.type': params.order?.type ? params.order.type : context.store.state.shop.sortType,
            'order.order': params.order?.order ? params.order.order : context.store.state.shop.sort,
        };
        return await Service(context.$axios)
            .product.APIgetProductThumbnails(data, request)
            .then((response: any) => {
                context.store.commit('shop/setFacets', response.data.aggregations);
                context.store.commit('shop/setProductThumbnails', response.data.productThumbnails);
                return response.data.productThumbnails.content;
            })
            .catch((error: any) => {
                console.log(error);
            });
    },
    async getFeatureProductsv2(params: any) {
        const data = context.$auth.loggedIn
            ? {
                  userId: context.$auth.user.id,
                  jwt: context.$auth.strategy.token.get(),
              }
            : null;

        const request = {
            brand: context.store.state.shop.brand,
            size: params.size ? params.size : context.store.state.shop.pageSize,
            page: context.store.state.shop.pageNumber,
            paged: context.store.state.shop.paged,
            categoryIds: params.categoryIds ? params.categoryIds : null,
            customFieldsSupplier: context.store.state.shop.customFieldsSupplier
                ? context.store.state.shop.customFieldsSupplier
                : null,
            priceMin: context.store.state.shop.priceMin ? context.store.state.shop.priceMin : null,
            priceMax: context.store.state.shop.priceMax ? context.store.state.shop.priceMax : null,
            currency: context.store.state.app.currency,
            rq: params.rq ? params.rq : null,
            locale: context.i18n.localeProperties.code.toUpperCase(),
            productTags: params.productTags ? params.productTags : null,
            skus: params.productSku ? params.productSku : null,
            aggregation: params.aggregation ? params.aggregation : null,
            sort: params.sort ? params.sort : null,
            // 'order.type': context.store.state.shop.sortType,
            // 'order.order': context.store.state.shop.sort,
        };
        return await Service(context.$axios)
            .product.APIgetProductThumbnailsv2(data, request)
            .then((response: any) => {
                context.store.commit('shop/setFacets', response.data.aggregations);
                context.store.commit('shop/setProductThumbnails', response.data.productThumbnails);
                return response.data.products.content;
            })
            .catch((error: any) => {
                console.log(error);
            });
    },
    async getFeatureProductsOnly(params: any) {
        const data = context.$auth.loggedIn
            ? {
                  userId: context.$auth.user.id,
                  jwt: context.$auth.strategy.token.get(),
              }
            : null;

        const request = {
            brand: context.store.state.shop.brand,
            size: params.size ? params.size : context.store.state.shop.pageSize,
            page: context.store.state.shop.pageNumber,
            paged: context.store.state.shop.paged,
            categoryIds: params.categoryIds ? params.categoryIds : null,
            customFieldsSupplier: context.store.state.shop.customFieldsSupplier
                ? context.store.state.shop.customFieldsSupplier
                : null,
            priceMin: context.store.state.shop.priceMin ? context.store.state.shop.priceMin : null,
            priceMax: context.store.state.shop.priceMax ? context.store.state.shop.priceMax : null,
            currency: context.store.state.app.currency,
            rq: params.rq ? params.rq : null,
            locale: context.i18n.localeProperties.code.toUpperCase(),
            productTags: params.productTags ? params.productTags : null,
            skus: params.productSku ? params.productSku.toString() : null,
            'order.type': context.store.state.shop.sortType,
            'order.order': context.store.state.shop.sort,
        };
        return await Service(context.$axios)
            .product.APIgetProductThumbnails(data, request)
            .then((response: any) => {
                return response.data.productThumbnails.content;
            })
            .catch((error: any) => {
                console.log(error);
            });
    },
});
