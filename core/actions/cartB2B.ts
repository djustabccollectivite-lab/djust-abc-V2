import Service from '../api/Service';
import { CartInformations, CartItem, CartResume } from '../interfaces/ICartB2B';

export const CARTSTATUSACTIVE = ['INIT', 'LOADING', 'ON_GOING'];
export const CARTTYPE = ['CART'];

export default (context: any) => ({
    // ************ NEW CART V2 Actions ****************

    async createNewCart_B2B(name: String, store: boolean = false): Promise<CartResume | Boolean> {
        const body = { name };
        const jwt = context.$auth.strategy.token.get();
        const cartResume = await Service(context.$axios)
            .cart.APICreateNewCart_B2B(body, jwt)
            .then((response: any) => {
                context.store.commit('cart_b2b/setCartId', response.data.id);
                context.store.commit('cart_b2b/setCartIdToUse', response.data.id);
                if (this.isUniqSessionCartV2Logic()) {
                    context.store.commit('uniqCartV2ForSession/setCartId', response.data.id);
                    context.store.commit('uniqCartV2ForSession/setCartIdToUse', response.data.id);
                }
                if (store) {
                    context.store.commit(
                        'cart_b2b/setCarts',
                        context.store.state.cart_b2b.carts.concat([response.data]),
                    );
                    if (this.isUniqSessionCartV2Logic()) {
                        context.store.commit(
                            'uniqCartV2ForSession/setCarts',
                            context.store.state.uniqCartV2ForSession.carts.concat([response.data]),
                        );
                    }
                }
                return response.data;
            })
            .catch(() => {
                return false;
            });
        return cartResume;
    },

    /**
     *
     * @param status
     * @param type
     * @param autoActive it's optionnal default true
     * @param size it's optionnal default 20
     * @returns
     */
    async getAllCarts_B2B(
        status: string[],
        type: string[],
        autoActive: boolean = true,
        size: number = 20,
        jwtOverride?: string,
    ): Promise<CartInformations[] | Boolean> {
        const currency = context.store.state.app.currency;
        const jwt = jwtOverride ?? context.$auth.strategy.token.get();
        const cartsList = await Service(context.$axios)
            .cart.APIGetCartsList_B2B(jwt, currency, status, type, size)
            .then((response: any) => {
                if (response.data.carts.length === 0) {
                    // this.createNewCart_B2B("new cart")
                } else {
                    context.store.commit('cart_b2b/setCarts', response.data.carts);
                    if (this.isUniqSessionCartV2Logic()) {
                        context.store.commit('uniqCartV2ForSession/setCarts', response.data.carts);
                    }
                    if (autoActive) {
                        const cartId = response.data.carts[0].id;
                        const uniqCartId = this.getUniqSessionCartV2Id();

                        context.store.commit('cart_b2b/setCartIdToUse', cartId);
                        if (this.isUniqSessionCartV2Logic()) {
                            if (uniqCartId && this.isValidLocalStorageValue(uniqCartId)) {
                                context.store.commit('uniqCartV2ForSession/setCartIdToUse', cartId);
                                this.getCartInformations_B2B(uniqCartId);
                                this.getCartProductList_B2B(uniqCartId, 1);
                            } else {
                                const randomNumber = Math.floor(Math.random() * 1000);
                                this.createNewCart_B2B(`cart${randomNumber}`);
                            }
                        } else {
                            this.getCartInformations_B2B(cartId);
                            this.getCartProductList_B2B(cartId, 1);
                        }
                    }
                    return response.data.carts;
                }
                return response.data.carts;
            })
            .catch(() => {
                return false;
            });
        return cartsList;
    },
    async getAllCartsPaginated_B2B(
        status: string[],
        type: string[],
        page: number,
        size: number,
    ): Promise<CartInformations[] | Boolean> {
        const currency = context.store.state.app.currency;
        const jwt = context.$auth.strategy.token.get();
        const [cartsList, totalElement]: any = await Service(context.$axios)
            .cart.APIGetPaginatedCartsList_B2B(jwt, currency, status, type, page, size)
            .then((response: any) => {
                return [response.data.carts, response.data.totalElement];
            })
            .catch((_error: { response: any }) => {
                return false;
            });
        return [cartsList, totalElement];
    },

    async updateCartLines_B2B(
        data: { offerPriceId: String; quantity: Number; updateAction: String }[],
        cartId_?: String,
        returnResponse: boolean = false,
        nbCartReturn: number = 20,
    ): Promise<Boolean | Object> {
        const cartId = cartId_ || context.store.state.cart_b2b.cartIdToUse;
        const jwt = context.$auth.strategy.token.get();
        const result = await Service(context.$axios)
            .cart.APIUpdateCartLine_B2B(data, cartId, jwt)
            .then((response: any) => {
                this.getAllCarts_B2B(CARTSTATUSACTIVE, CARTTYPE, true, nbCartReturn).then(() => {
                    context.store.commit('cart_b2b/setCartIdToUse', cartId);
                    if (this.isUniqSessionCartV2Logic()) {
                        context.store.commit('uniqCartV2ForSession/setCartIdToUse', cartId);
                    }
                    this.getCartInformations_B2B(cartId);
                    this.getCartProductList_B2B(cartId, 1);
                });

                if (returnResponse) {
                    return response.data;
                } else {
                    return true;
                }
            })
            .catch((error: { response: any }) => {
                if (returnResponse) {
                    return error.response.data;
                } else {
                    return false;
                }
            });
        return result;
    },
    async updateCartLines_B2B_ForUniqSessionCart(
        data: { offerPriceId: String; quantity: Number; updateAction: String }[],
        cartId_?: String,
        returnResponse: boolean = false,
        nbCartReturn: number = 20,
    ): Promise<Boolean | Object> {
        const uniqSessionCartId = cartId_ || context.store.state.uniqCartV2ForSession.cartIdToUse;
        const jwt = context.$auth.strategy.token.get();
        const result = await Service(context.$axios)
            .cart.APIUpdateCartLine_B2B(data, uniqSessionCartId, jwt)
            .then((response: any) => {
                this.getAllCarts_B2B(CARTSTATUSACTIVE, CARTTYPE, true, nbCartReturn).then(() => {
                    if (this.isUniqSessionCartV2Logic()) {
                        context.store.commit('uniqCartV2ForSession/setCartIdToUse', uniqSessionCartId);
                    }
                    this.getCartInformations_B2B(uniqSessionCartId);
                    this.getCartProductList_B2B(uniqSessionCartId, 1);
                });

                if (returnResponse) {
                    return response.data;
                } else {
                    return true;
                }
            })
            .catch((error: { response: any }) => {
                if (returnResponse) {
                    return error.response.data;
                } else {
                    return false;
                }
            });
        return result;
    },

    async updateCartLines_B2B_V2(
        data: { offerPriceId: String; quantity: Number; updateAction: String }[],
        cartId_?: String,
        store: boolean = false,
        nbCartReturn: number = 20,
    ): Promise<Boolean | Object | unknown> {
        const cartId = cartId_ || context.store.state.cart_b2b.cartIdToUse;
        const jwt = context.$auth.strategy.token.get();
        try {
            const result = await Service(context.$axios).cart.APIUpdateCartLine_B2B(data, cartId, jwt);
            if (store) {
                this.getAllCarts_B2B(CARTSTATUSACTIVE, CARTTYPE, true, nbCartReturn).then(() => {
                    context.store.commit('cart_b2b/setCartIdToUse', cartId);
                    if (this.isUniqSessionCartV2Logic()) {
                        context.store.commit('uniqCartV2ForSession/setCartIdToUse', cartId);
                    }
                    this.getCartInformations_B2B(cartId);
                    this.getCartProductList_B2B(cartId, 1);
                });
            }
            return result;
        } catch (error: any) {
            throw new Error(error.response.data.code || error);
        }
    },

    async getCartInformations_B2B(cartId: String): Promise<Boolean | Object> {
        const jwt = context.$auth.strategy.token.get();
        const currency = context.store.state.app.currency;
        const result = await Service(context.$axios)
            .cart.APIGetCart_B2B(cartId, currency, jwt)
            .then((response: any) => {
                context.store.commit('cart_b2b/setCartIdToUse', cartId);
                context.store.commit('cart_b2b/setCartInformations', response.data);
                const uniqCartId = this.getUniqSessionCartV2Id();
                if (this.isUniqSessionCartV2Logic() && this.isValidLocalStorageValue(uniqCartId)) {
                    context.store.commit('uniqCartV2ForSession/setCartIdToUse', cartId);
                    context.store.commit('uniqCartV2ForSession/setCartInformations', response.data);
                }
                return response.data;
            })
            .catch(() => {
                return false;
            });
        return result;
    },

    async getCartProductList_B2B(cartId: String, pageNumber_?: number, sort?: string): Promise<Boolean | Object> {
        const jwt = context.$auth.strategy.token.get();
        const paginateSize = context.$config.cart_paginate_size;
        const request = {
            currency: context.store.state.app.currency,
            size: paginateSize || 1000,
            sorts: sort || 'CREATED_AT_DESC',
            page: pageNumber_ ? pageNumber_ - 1 : 0,
        };

        const result = await Service(context.$axios)
            .cart.APIGetCartDetailProducts_B2B(cartId, request, jwt)
            .then((response: any) => {
                context.store.commit('cart_b2b/setCartIdToUse', cartId);
                context.store.commit('cart_b2b/setCartProductDetail', response.data);
                if (this.isUniqSessionCartV2Logic()) {
                    const uniqCartId = this.getUniqSessionCartV2Id();
                    if (uniqCartId && this.isValidLocalStorageValue(uniqCartId)) {
                        context.store.commit('uniqCartV2ForSession/setCartIdToUse', cartId);
                        context.store.commit('uniqCartV2ForSession/setCartProductDetail', response.data);
                    }
                }
                return response.data;
            })
            .catch(() => {
                return false;
            });

        return result;
    },

    async getCartProductList_B2BforOneSupplier(
        cartId: String,
        pageNumber_?: number,
        supplierId_?: string,
    ): Promise<Object> {
        const jwt = context.$auth.strategy.token.get();
        const request = {
            currency: context.store.state.app.currency,
            supplierId: supplierId_ || null,
            size: 10,
            sorts: 'CREATED_AT_DESC',
            page: pageNumber_ ? pageNumber_ - 1 : 0,
        };
        const result = await Service(context.$axios)
            .cart.APIGetCartDetailProducts_B2B(cartId, request, jwt)
            .then((response: any) => {
                return response.data;
            })
            .catch(() => {
                return false;
            });
        return result;
    },

    async deleteCart_B2B(
        id: String,
        reset: boolean = true,
        setCartIdToUse: boolean = true,
        nbCartReturn: number = 20,
    ): Promise<CartResume | Boolean> {
        const jwt = context.$auth.strategy.token.get();
        const cartResume = await Service(context.$axios)
            .cart.APIDeleteCart_B2B(id, jwt)
            .then(async (response: any) => {
                if (reset) {
                    context.store.commit('cart_b2b/resetCarts', id);
                    if (this.isUniqSessionCartV2Logic()) {
                        context.store.commit('uniqCartV2ForSession/resetCarts', id);
                    }
                    const randomNumber = Math.floor(Math.random() * 1000);
                    context.$core.useCartB2B.createNewCart_B2B('cart' + randomNumber);
                }
                await this.getAllCarts_B2B(CARTSTATUSACTIVE, CARTTYPE, setCartIdToUse, nbCartReturn);
                return response.data;
            })
            .catch(() => {
                return false;
            });
        return cartResume;
    },

    async deleteCartLines_B2B(data: { offerPriceId: String }[], cartId_?: String): Promise<Boolean> {
        const cartId = cartId_ || context.store.state.cart_b2b.cartIdToUse;
        const jwt = context.$auth.strategy.token.get();
        const result = await Service(context.$axios)
            .cart.APIDeleteCartLine_B2B(data, cartId, jwt)
            .then(() => {
                this.getAllCarts_B2B(CARTSTATUSACTIVE, CARTTYPE, false).then(() => {
                    context.store.commit('cart_b2b/setCartIdToUse', cartId);
                    if (this.isUniqSessionCartV2Logic()) {
                        context.store.commit('uniqCartV2ForSession/setCartIdToUse', cartId);
                    }
                    this.getCartInformations_B2B(cartId);
                    this.getCartProductList_B2B(cartId, 1);
                });
                return true;
            })
            .catch(() => {
                return false;
            });
        return result;
    },

    async initializeOrder_B2B(id: String): Promise<CartResume | Boolean> {
        const jwt = context.$auth.strategy.token.get();
        const initializeOrder = await Service(context.$axios)
            .cart.APIInitializeOrderFromCart_B2B(id, jwt)
            .then((response: any) => {
                return response.data;
            })
            .catch(() => {
                return false;
            });
        return initializeOrder;
    },

    async setBillingAddress(id: String): Promise<CartResume | Boolean> {
        const jwt = context.$auth.strategy.token.get();
        const initializeOrder = await Service(context.$axios)
            .cart.APIInitializeOrderFromCart_B2B(id, jwt)
            .then((response: any) => {
                return response.data;
            })
            .catch(() => {
                return false;
            });
        return initializeOrder;
    },

    /**
     * @param {CartItem[]} cartLines
     */
    checkCartV2Stock(cartLines: CartItem[]) {
        let controlResult = true;
        if (context.$config.checkStock) {
            cartLines.forEach((cartLine) => {
                if (cartLine.quantity > cartLine.offer.stock) {
                    controlResult = false;
                }
            });
        }
        return controlResult;
    },

    isUniqSessionCartV2Logic() {
        return context.$config.use_uniq_cart;
    },
    getUniqSessionCartV2Id() {
        return localStorage.getItem('cartId');
    },
    isValidLocalStorageValue(value) {
        return ![null, undefined, '', 'null', 'undefined', 'false'].includes(value);
    },
});
