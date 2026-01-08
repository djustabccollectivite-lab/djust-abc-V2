/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-console */
import type { ProductStatus, OfferInventoryStatus, VariantStatus, OfferPriceStatus } from '../api/OfferService';
import { HasStock } from '../api/OfferService';
import Service from '../api/Service';
import offerGetters from '../getters/offer';

export default (context: any) => ({
    async getProductOffers(productSku: string, productIdType: string = 'SKU', reset: boolean = true) {
        if (reset) {
            context.store.commit('offers/setOffers', null);
            context.store.commit('offers/setOffersToDisplay', null);
        }

        const currency: string = context.store.state.app.currency;

        const data = {
            productSku,
            jwt: context.$auth.loggedIn && context.$auth.user.id ? context.$auth.strategy.token.get() : null,
            locale: context.i18n.code,
        };

        return await Service(context.$axios)
            .product.APIgetProductDetailOffers(data, currency, true, productIdType)
            .then((response: any) => {
                response.data.forEach((offer: any) => {
                    return (offer.offerPrices = offerGetters.getOfferPrices(offer));
                });

                context.store.commit(
                    'offers/setOffers',
                    response.data.filter((offer: any) => {
                        return offer.offerPrices.length > 0;
                    }),
                );
                context.store.commit(
                    'offers/setOffersToDisplay',
                    response.data.filter((offer: any) => offer.offerPrices.length > 0),
                );
                return response.data;
            })
            .catch((error: any) => {
                console.log('pb avec les offres', error);
            });
    },
    async getProductOffersPaginated(
        productSku: string,
        page: number = 0,
        size: number = 20,
        sort: string = '',
        productIdType: string = 'SKU',
        reset: boolean = true,
    ) {
        if (reset) {
            context.store.commit('offers/setOffers', null);
            context.store.commit('offers/setOffersToDisplay', null);
        }

        const data = {
            jwt: context.$auth.loggedIn && context.$auth.user.id ? context.$auth.strategy.token.get() : null,
            productSku,
            productIdType,
            pageable: {
                page,
                size,
                sort,
            },
            currency: context.store.state.app.currency,
            locale: context.i18n.code,
        };

        return await Service(context.$axios)
            .product.APIgetProductDetailOffersPaginated(data, true)
            .then((response: any) => {
                response.data.content.forEach((offer: any) => {
                    offer.offerPrices = offerGetters.getOfferPrices(offer);
                });

                context.store.commit(
                    'offers/setOffers',
                    response.data.content.filter((offer: any) => {
                        return offer.offerPrices.length > 0;
                    }),
                );

                context.store.commit(
                    'offers/setOffersToDisplay',
                    response.data.content.filter((offer: any) => offer.offerPrices.length > 0),
                );

                return response.data;
            })
            .catch(() => {});
    },
    async getProductOffersWithoutUpdateStore(productSku: string) {
        const currency: string = context.store.state.app.currency;
        const data = {
            productSku,
            jwt: context.$auth.loggedIn && context.$auth.user.id ? context.$auth.strategy.token.get() : null,
            locale: context.i18n.code,
        };

        return await Service(context.$axios)
            .product.APIgetProductDetailOffers(data, currency)
            .then((response: any) => {
                response.data.forEach((offer: any) => {
                    return (offer.offerPrices = offerGetters.getOfferPrices(offer));
                });
                return response.data;
            })
            .catch((error: any) => {
                console.log('pb avec les offres', error);
            });
    },
    async getProductOffersWithVariants(productSku: any, noPrice: false, locale: string = 'fr-FR') {
        context.store.commit('offers/setOffers', null);
        context.store.commit('offers/setOffersToDisplay', null);
        context.store.commit('product/setVariants', null);

        const currency = context.store.state.app.currency;
        const data = {
            productSku,
            jwt: context.$auth.loggedIn && context.$auth.user.id ? context.$auth.strategy.token.get() : null,
            locale,
        };
        return await Service(context.$axios)
            .product.APIgetProductDetailOffers(data, currency)
            .then((response: any) => {
                const productVariant: any = [];

                const productVariantsList = offerGetters.getProductsVariantsFromOffers(response.data);
                productVariantsList.forEach((variant, index) => {
                    variant.attributeValues.forEach((attribut) => {
                        const result: any = productVariant.find(
                            (attribute: any) => attribute.attribute.id === attribut.attribute.id,
                        );
                        if (result) {
                            let valueAttribute: any = null;
                            if (attribut.value !== null) {
                                switch (attribut.attribute.type) {
                                    case 'LIST_TEXT':
                                        valueAttribute = attribut.value[0];
                                        break;
                                    case 'LIST_METRIC':
                                    case 'METRIC':
                                        valueAttribute = attribut.value.selectedValue + ' ' + attribut.value.unit;
                                        break;
                                    case 'LIST_COLOR':
                                        valueAttribute = attribut.value[0].label;
                                        break;
                                    default:
                                        valueAttribute = attribut.value;
                                        break;
                                }
                            }

                            const resultValue: any = result.attributeValues.find(
                                (attributeValue: any) => attributeValue.value === valueAttribute,
                            );

                            if (!resultValue) {
                                result.attributeValues.push({
                                    id: index,
                                    value: valueAttribute,
                                    status: variant.status,
                                });
                            }
                        } else {
                            let valueAttribute: any = null;
                            if (attribut.value) {
                                switch (attribut.attribute.type) {
                                    case 'LIST_TEXT':
                                        valueAttribute = attribut.value[0];
                                        break;
                                    case 'LIST_METRIC':
                                    case 'METRIC':
                                        valueAttribute = attribut.value.selectedValue + ' ' + attribut.value.unit;
                                        break;
                                    case 'LIST_COLOR':
                                        valueAttribute = attribut.value[0].label;
                                        break;
                                    default:
                                        valueAttribute = attribut.value;
                                        break;
                                }
                            }
                            productVariant.push({
                                attribute: attribut.attribute,
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
                context.store.commit('offers/setVariantToDisplay', productVariantsList[0]);
                productVariant.forEach((attribute: { attributeValues: any[] }) => {
                    attribute.attributeValues.sort((a: { value: number | string }, b: { value: number | string }) => {
                        if (a.value < b.value) return -1;
                        else if (a.value > b.value) return 1;
                        else return 0;
                    });
                });

                context.store.commit('product/setAttributes', productVariant);
                context.store.commit('product/setVariants', productVariantsList);

                if (noPrice) {
                    context.store.commit('offers/setOffers', response.data);
                } else {
                    context.store.commit(
                        'offers/setOffers',
                        response.data.filter((offer: any) => {
                            return offer.offerPrices.length > 0;
                        }),
                    );
                }

                context.store.commit(
                    'offers/setOffersToDisplay',
                    response.data.filter((offer: any) => offer.offerPrices.length > 0),
                );
                return response.data;
            })
            .catch((error: any) => {
                console.log('pb avec les offres', error);
            });
    },
    async getProductOffersWithoutPrices(productSku: any, withoutPrices: boolean = false) {
        context.store.commit('offers/setOffers', null);
        context.store.commit('offers/setOffersToDisplay', null);
        const currency = context.store.state.app.currency;
        const data = {
            productSku,
            jwt: context.$auth.loggedIn && context.$auth.user.id ? context.$auth.strategy.token.get() : null,
            locale: context.i18n.code,
        };
        return await Service(context.$axios)
            .product.APIgetProductDetailOffers(data, currency, withoutPrices)
            .then((response: any) => {
                response.data.forEach((offer: any) => (offer.offerPrices = offerGetters.getOfferPrices(offer)));
                context.store.commit('offers/setOffers', response.data);
                context.store.commit('offers/setOffersToDisplay', response.data);
                return response.data;
            })
            .catch((error: any) => {
                console.log('pb avec les offres', error);
            });
    },
    findOfferIdToDisplay(attributes: { attributId: string; valueId: string }[], excludedAttributes: string[] = []) {
        context.store.commit('offers/setOffersToDisplay', null);
        if (context.store.state.offers.offers) {
            let valueAttribute: string | number;
            const offersListToDisplay = context.store.state.offers.offers.filter(
                (offer: { offerInventory: { variant: { attributeValues: any[] } } }) =>
                    offer.offerInventory.variant.attributeValues
                        .filter(
                            ({ attribute }) => !excludedAttributes.some((attr) => attribute.externalId.includes(attr)),
                        )
                        ?.every((attribut) => {
                            if (attribut.value !== null) {
                                switch (attribut.attribute.type) {
                                    case 'LIST_TEXT':
                                        valueAttribute = attribut.value[0];
                                        break;
                                    case 'LIST_METRIC':
                                    case 'METRIC':
                                        valueAttribute = `${attribut.value.selectedValue} ${attribut.value.unit}`;
                                        break;
                                    case 'LIST_COLOR':
                                        valueAttribute = attribut.value[0].label;
                                        break;
                                    default:
                                        valueAttribute = attribut.value;
                                        break;
                                }
                            }

                            return attributes.find((item) => {
                                return attribut.attribute.id === item.attributId && valueAttribute === item.valueId;
                            });
                        }),
            );
            context.store.commit('offers/setOffersToDisplay', offersListToDisplay);
        }
    },
    hasAttributeValueAtLeastOneOffer({ attributeId, valueId }) {
        if (context.store.state.offers.offers) {
            return context.store.state.offers.offers.some(
                (offer: { offerInventory: { variant: { attributeValues: any[] } } }) =>
                    offer.offerInventory.variant.attributeValues.some((attribute) => {
                        let valueAttribute = '';
                        switch (attribute.attribute.type) {
                            case 'LIST_TEXT':
                                valueAttribute = attribute.value[0];
                                break;
                            case 'LIST_METRIC':
                            case 'METRIC':
                                valueAttribute = `${attribute.value.selectedValue} ${attribute.value.unit}`;
                                break;
                            case 'LIST_COLOR':
                                valueAttribute = attribute.value[0].label;
                                break;
                            default:
                                valueAttribute = attribute.value;
                                break;
                        }
                        return attribute.attribute.id === attributeId && valueAttribute === valueId;
                    }),
            );
        }
    },
    findVariantIdToDisplay(payload: any[], excludedAttributes: string[] = [], asList: boolean = false) {
        const productVariantList = context.store.state.product.variants?.filter((variant: any) => {
            return variant.attributeValues
                .filter(({ attribute }) => !excludedAttributes.some((attr) => attribute.externalId.includes(attr)))
                ?.every((attribute: any) => {
                    let valueAttribute = '';
                    switch (attribute.attribute.type) {
                        case 'LIST_TEXT':
                            valueAttribute = attribute.value[0];
                            break;
                        case 'LIST_METRIC':
                        case 'METRIC':
                            valueAttribute = `${attribute.value.selectedValue} ${attribute.value.unit}`;
                            break;
                        case 'LIST_COLOR':
                            valueAttribute = attribute.value[0].label;
                            break;
                        default:
                            valueAttribute = attribute.value;
                            break;
                    }
                    return payload.find(
                        (item) => attribute.attribute.id === item.attributId && valueAttribute === item.valueId,
                    );
                });
        });
        if (asList) {
            productVariantList?.length > 0
                ? context.store.commit('offers/setVariantListToDisplay', productVariantList)
                : context.store.commit('offers/setVariantListToDisplay', []);
        } else {
            const productVariantToDisplay = productVariantList?.[0];
            productVariantToDisplay
                ? context.store.commit('offers/setVariantToDisplay', productVariantToDisplay)
                : context.store.commit('offers/setVariantToDisplay', null);
        }
    },

    async getOfferList(
        productStatus: ProductStatus,
        offerInventoryStatus: OfferInventoryStatus,
        variantStatus: VariantStatus,
        offerPriceStatus: OfferPriceStatus,
        supplierId: string,
        offerIds: string[],
        offerPriceIds: string[],
        currency: string,
        page: number = 0,
        size: number = 20,
        sort: string[] = [],
        hasStock: HasStock = 'FALSE',
    ) {
        const jwt = context.$auth.loggedIn && context.$auth.user.id ? context.$auth.strategy.token.get() : null;
        return await Service(context.$axios)
            .offer.APIGetOffersList(
                jwt,
                productStatus,
                offerInventoryStatus,
                variantStatus,
                offerPriceStatus,
                supplierId,
                offerIds,
                offerPriceIds,
                currency,
                page,
                size,
                sort,
                hasStock,
            )
            .then((response) => {
                return response.data;
            });
    },
    async getOfferListWithUpdateStore({
        productStatus,
        offerInventoryStatus,
        variantStatus,
        offerPriceStatus,
        supplierId,
        offerIds,
        offerPriceIds,
        currency,
        page = 0,
        size = 20,
        sort = [],
        hasStock = 'FALSE',
    }: {
        productStatus: ProductStatus;
        offerInventoryStatus: OfferInventoryStatus;
        variantStatus: VariantStatus;
        offerPriceStatus: OfferPriceStatus;
        supplierId: string;
        offerIds: string[];
        offerPriceIds: string[];
        currency: string;
        page?: number;
        size?: number;
        sort?: string[];
        hasStock?: HasStock;
    }) {
        const jwt = context.$auth.loggedIn && context.$auth.user.id ? context.$auth.strategy.token.get() : null;
        return await Service(context.$axios)
            .offer.APIGetOffersList(
                jwt,
                productStatus,
                offerInventoryStatus,
                variantStatus,
                offerPriceStatus,
                supplierId,
                offerIds,
                offerPriceIds,
                currency,
                page,
                size,
                sort,
                hasStock,
            )
            .then((response) => {
                response.data.content.forEach((offer: any) => {
                    offer.offerPrices = offerGetters.getOfferPrices(offer);
                });

                context.store.commit('offers/setOffers', response.data.content);

                context.store.commit('offers/setOffersToDisplay', response.data.content);

                return response.data;
            });
    },
});
