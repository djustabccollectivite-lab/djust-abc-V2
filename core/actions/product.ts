import { Context } from '@nuxt/types';
import { TokenableScheme } from '@nuxtjs/auth-next';
import Service from '../api/Service';
import { ProductVariant, AttributeValues, LastIncomingProduct } from '../interfaces/IProduct';

enum ProductType {
    SKU = 'SKU',
    EXTERNAL_ID = 'EXTERNAL_ID',
}

export default (context: Context) => ({
    async getProductsById(id: string, type?: string) {
        const locale = context.i18n.localeProperties.code.toUpperCase();
        const jwt = context.$auth.loggedIn ? (context.$auth.strategy as TokenableScheme).token.get() : null;
        const productIdType = type ?? 'SKU';

        const requestForGetProductBySku = {
            locale,
            jwt,
            productSku: id,
            productIdType,
        };

        try {
            const productBySkuResponse = await Service(context.$axios).product.APIGetProductbySku(
                requestForGetProductBySku,
            );
            const product = productBySkuResponse.data;
            context.store.commit('product/setProduct', product);
            return product;
        } catch (error) {
            console.error('Failed to get products', error);
            return false;
        }
    },

    async getProductsBySku(sku: string) {
        const data = {
            locale: context.i18n.localeProperties.code.toUpperCase(),
            jwt: context.$auth.loggedIn ? (context.$auth.strategy as TokenableScheme).token.get() : null,
            productSku: sku,
            productIdType: 'SKU',
        };

        const productFetch = Service(context.$axios).product.APIGetProductbySku(data);

        const product = await productFetch
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.error('error with productsBySku', error);
            });

        return product;
    },

    async getProductsReviews(productSkuId: string) {
        const data = {
            locale: context.i18n.localeProperties.code.toUpperCase(),
            jwt: context.$auth.loggedIn ? (context.$auth.strategy as TokenableScheme).token.get() : null,
            productSku: productSkuId,
        };
        const reviewsFetch = Service(context.$axios).product.APIgetProductDetailReviews(data);
        const reviews = await reviewsFetch
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.error('error with productsReviews', error);
            });
        return reviews;
    },

    async getRelatedProductsById(productSkuId: string) {
        const lang = { locale: context.i18n.localeProperties.code.toUpperCase() };
        const data = {
            locale: lang.locale,
            productSku: productSkuId,
            jwt: context.$auth.loggedIn ? (context.$auth.strategy as TokenableScheme).token.get() : null,
        };
        const relatedProductsFetch = Service(context.$axios).product.APIgetProductRelatedProducts(data, lang);
        const relatedProducts = await relatedProductsFetch
            .then((response: { data: { productThumbnails } }) => {
                return response.data.productThumbnails.content;
            })
            .catch((error) => {
                console.error('error with productsReviews', error);
            });

        return relatedProducts;
    },

    async getProductsVariants(productSkuId: string) {
        const request = {
            productSku: productSkuId,
            size: 100,
        };
        const data = {
            locale: context.i18n.localeProperties.code.toUpperCase(),
            request,
            jwt: context.$auth.loggedIn ? (context.$auth.strategy as TokenableScheme).token.get() : null,
        };
        const productVariantsRequest = Service(context.$axios).product.APIgetProductVariants(data);
        const productVariant: ProductVariant[] = [];
        const relatedProducts = await productVariantsRequest
            .then((response) => {
                const contentArray = response.data.content;
                contentArray.forEach((variant, index) => {
                    variant.attributeValues.forEach((attribut) => {
                        const result = productVariant.find(
                            (attribute) => attribute.attribute.id === attribut?.attribute.id,
                        );
                        if (result) {
                            let valueAttribute = '';
                            if (attribut?.value !== null) {
                                switch (attribut?.attribute.type) {
                                    case 'LIST_TEXT':
                                        valueAttribute = attribut?.value[0];
                                        break;
                                    case 'LIST_METRIC':
                                    case 'METRIC':
                                        valueAttribute = `${attribut?.value.selectedValue} ${attribut?.value.unit}`;
                                        break;
                                    case 'LIST_COLOR':
                                        valueAttribute = attribut?.value[0].label;
                                        break;
                                    default:
                                        valueAttribute = attribut?.value;
                                        break;
                                }
                            }
                            const resultValue = result.attributeValues.find(
                                (attributeValue) => attributeValue.value === valueAttribute,
                            );

                            if (!resultValue) {
                                result.attributeValues.push({
                                    id: index,
                                    value: valueAttribute,
                                    status: variant.status,
                                });
                            }
                        } else {
                            let valueAttribute = '';
                            if (attribut?.value) {
                                switch (attribut?.attribute.type) {
                                    case 'LIST_TEXT':
                                        valueAttribute = attribut?.value[0];
                                        break;
                                    case 'LIST_METRIC':
                                    case 'METRIC':
                                        valueAttribute = attribut?.value.selectedValue + ' ' + attribut?.value.unit;
                                        break;
                                    case 'LIST_COLOR':
                                        valueAttribute = attribut?.value[0].label;
                                        break;
                                    default:
                                        valueAttribute = attribut?.value;
                                        break;
                                }
                            }
                            productVariant.push({
                                attribute: attribut?.attribute,
                                attributeValues: [
                                    {
                                        id: index,
                                        value: valueAttribute,
                                        status: variant.status,
                                    },
                                ],
                            });
                        }
                    });
                });

                productVariant.forEach((attribute) => {
                    attribute.attributeValues.sort((a, b) => {
                        if (a.value < b.value) return -1;
                        else if (a.value > b.value) return 1;
                        else return 0;
                    });
                });
                context.store.commit('product/setAttributes', productVariant);
                context.store.commit('product/setVariants', relatedProducts);

                return response.data.content;
            })
            .catch((error) => {
                console.error('error with productVariants', error);
            });
        context.store.commit('product/setVariants', relatedProducts);
        if (relatedProducts[0]) {
            context.store.commit('offers/setVariantToDisplay', relatedProducts[0]);
        }
        return relatedProducts || [];
    },

    async getPaginatedProductsVariants(productSkuId: string, page: number, pageSize: number) {
        const request = {
            productSku: productSkuId,
            size: pageSize,
            page,
        };
        const data = {
            request,
            jwt: context.$auth.loggedIn ? (context.$auth.strategy as TokenableScheme).token.get() : null,
        };
        const productVariantsRequest = Service(context.$axios).product.APIgetProductVariants(data);

        const relatedProducts = await productVariantsRequest
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.error('error with productVariants', error);
            });

        return relatedProducts;
    },

    async getProductsAttributsVariants(productSkuId: string) {
        const data = {
            productSku: productSkuId,
            productIdType: 'SKU',
            jwt: context.$auth.loggedIn ? (context.$auth.strategy as TokenableScheme).token.get() : null,
        };
        const productsAttributsVariants_ = Service(context.$axios).product.APIgetProductDetailAttributes(data);

        const productVariant: ProductVariant[] = [];

        const productsAttributsVariants = await productsAttributsVariants_
            .then((response) => {
                const contentArray = response.data;
                contentArray.forEach((attribut) => {
                    const attributeValuesList: AttributeValues[] = [];
                    attribut?.values.forEach((value: any, index) => {
                        let valueAttribute = '';
                        if (value || value === 0) {
                            switch (attribut?.type) {
                                case 'LIST_TEXT':
                                    valueAttribute = value;
                                    break;
                                case 'LIST_METRIC':
                                case 'METRIC':
                                    valueAttribute = value.selectedValue + ' ' + value.unit;
                                    break;
                                case 'LIST_COLOR':
                                    valueAttribute = value[0].label;
                                    break;
                                default:
                                    valueAttribute = value;
                                    break;
                            }
                        }
                        attributeValuesList.push({
                            id: index,
                            value: valueAttribute,
                            status: 'ACTIVE',
                        });
                    });
                    productVariant.push({
                        attribute: {
                            externalId: attribut?.externalId,
                            id: attribut?.id,
                            type: attribut?.type,
                            name: attribut?.name,
                        },
                        attributeValues: attributeValuesList,
                    });
                });
                productVariant.forEach((attribute) => {
                    attribute.attributeValues.sort((a, b) => {
                        if (a.value < b.value) return -1;
                        else if (a.value > b.value) return 1;
                        else return 0;
                    });
                });

                context.store.commit('product/setAttributes', productVariant);

                return response.data;
            })
            .catch((error) => {
                console.error('error with productVariants', error);
            });

        context.store.commit('offers/setVariantToDisplay', productsAttributsVariants[0]);

        return productsAttributsVariants;
    },

    async postProductReview(customerUserId: string, productSku: string) {
        const data = {
            customerUserId,
            productSku,
            locale: 'FR',
        };
        const postReview = await Service(context.$axios)
            .product.APIsendProductReview((context.$auth.strategy as TokenableScheme).token.get(), data)
            .then(() => {
                return true;
            })
            .catch((error) => {
                console.error('error with productReview', error);
                return false;
            });
        return postReview;
    },

    async getProductsbySkus(skus: string) {
        const request = {
            skus,
            locale: context.i18n.localeProperties.code.toUpperCase(),
            currency: context.store.state.app.currency,
            'order.type': null,
            'order.order': null,
        };
        const resultOfApi = await Service(context.$axios)
            .product.APIgetProductsbySkus((context.$auth.strategy as TokenableScheme).token.get(), request)
            .then((response) => {
                return response.data;
            })
            .catch((error) => console.error('error in getProductsbySkus', error));

        return resultOfApi;
    },

    async getListSuppliersbyProductVariantId(productId: string) {
        const resultOfApi = await Service(context.$axios)
            .product.APIgetSuppliersByProductVariantID(
                (context.$auth.strategy as TokenableScheme).token.get(),
                productId,
            )
            .then((response) => {
                return response.data;
            })
            .catch((error) => console.error('error in getListSuppliersbyProductVariantId', error));

        return resultOfApi;
    },

    async getProductVariantbySku(sku: string) {
        const request = {
            productSku: sku,
            size: 100,
        };
        const data = {
            locale: context.i18n.localeProperties.code.toUpperCase(),
            request,
            jwt: context.$auth.loggedIn ? (context.$auth.strategy as TokenableScheme).token.get() : null,
        };
        const productVariant = await Service(context.$axios).product.APIgetProductVariants(data);

        return productVariant.data.content[0];
    },

    async getVariantsOffers(
        variantId: string,
        params?: {
            currency?: string;
            /**
             * @deprecated
             */
            productIdType?: 'EXTERNAL_ID' | 'SKU' | 'ID';
            withoutPrices?: boolean;
        },
    ) {
        const productVariantOffer = await Service(context.$axios).product.APIgetProductVariantOffers(
            variantId,
            (context.$auth.strategy as TokenableScheme).token.get(),
            params,
        );
        return productVariantOffer.data;
    },

    async getVariantsOffersByType(variantId: string, type: ProductType, currency: string, withoutPrices: boolean) {
        const productVariantOffer = await Service(context.$axios).product.APIgetProductVariantOffersByType(
            (context.$auth.strategy as TokenableScheme).token.get(),
            variantId,
            type,
            currency,
            withoutPrices,
        );
        return productVariantOffer.data;
    },

    checkHaveDiscount(products: LastIncomingProduct[]) {
        const haveDiscount = products?.some((product) =>
            product?.bestOffer?.offerPrice?.priceRanges.some((price) => price.discountPrice !== null),
        );

        context.store.commit('product/setIsDiscount', haveDiscount);
    },

    async getProductIdentifier(id: string) {
        const data = {
            jwt: (context.$auth.strategy as TokenableScheme).token.get(),
            productSku: id,
            locale: context.i18n.localeProperties.code.toUpperCase(),
        };
        const result = await Service(context.$axios)
            .product.APIgetProductDetail(data)
            .then((response) => {
                return response.data;
            })
            .catch((error) => console.error('error in getListSuppliersbyProductVariantId', error));

        return result;
    },

    async getProductAssets(payload) {
        const { id, sizeType, jwt } = payload;
        const result = await Service(context.$axios)
            .product.APIgetProductAssets(id, sizeType, jwt)
            .then((response) => {
                return response.data;
            })
            .catch((error) =>  console.error('error in getProductAssets', error));

        return result;

    },
});
