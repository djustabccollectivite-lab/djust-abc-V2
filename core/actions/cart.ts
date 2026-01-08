import { Context } from '@nuxt/types';
import { TokenableScheme } from '@nuxtjs/auth-next';
import Service from '../api/Service';
import { CartDeliveryLine, CartImportResponse, CartLine } from '../interfaces/ICart';
import { DjustApiResponse } from '../interfaces/IDjust';
import { RequestUpdateCartLine } from '../interfaces/Cart/IRequestCart';
import { CreateOrder } from '../interfaces/Order/IOrderRequest';

const moment = require('moment');

export default (context: Context) => ({
    /**
     * @param {RequestUpdateCartLine[]} cartLines
     */
    async updateCartLines(cartLines: RequestUpdateCartLine[]) {
        const result = { value: true, message: '' };
        const lang = { locale: context.i18n.localeProperties.code.toUpperCase() };

        await Service(context.$axios)
            .cart.APIputCartLine(
                context.store.state.cart.cartId,
                cartLines,
                (context.$auth.strategy as TokenableScheme).token.get(),
                lang,
            )
            .then(async (response) => {
                result.value = true;
                result.message = 'panier mis à jour';
                await this.getCartDetail((context.$auth.strategy as TokenableScheme).token.get());
                context.store.commit('cart/setProductToCart', true);
            })
            .catch((error) => {
                console.error('Failed to update cart line -> ', error);
                result.value = false;
                result.message = 'panier non mis à jour';
            });
        return result;
    },

    async validAddress() {
        const lang = { locale: context.i18n.localeProperties.code.toUpperCase() };
        const request: RequestUpdateCartLine[] = [];
        context.store.state.cart.cartItems.forEach((item: CartLine) => {
            let qteTotal = 0;
            if (item.deliveryLines.length > 0)
                item.deliveryLines.forEach((deliveryLine: CartDeliveryLine) => (qteTotal += deliveryLine.quantity));
            else qteTotal = item.quantity;
            request.push({
                deliveryLines: item.deliveryLines,
                offerPriceId: item.offerPrice.id,
                quantity: qteTotal,
            });
        });
        await Service(context.$axios)
            .cart.APIputCartLine(
                context.store.state.cart.cartId,
                request,
                (context.$auth.strategy as TokenableScheme).token.get(),
                lang,
            )
            .then((response) => {
                context.store.commit('cart/setCart', response.data.focCartLineDtos);
                context.store.commit('cart/setCartId', response.data.id);
            })
            .catch((error) => {
                console.error('Failed to update cartline -> ', error);
            });
    },

    /**
     * @param {string | boolean} jwt
     */
    async getCartDetail(jwt: string | boolean) {
        const lang = { locale: context.i18n.localeProperties.code.toUpperCase() };
        await Service(context.$axios)
            .cart.APIgetCartDetail(jwt, lang)
            .then((response) => {
                context.store.commit('cart/setCart', response.data.focCartLineDtos);
                context.store.commit('cart/setCartId', response.data.id);
            })
            .catch((error) => {
                if (error.response.status) {
                    this.deleteCart();
                }
                console.error('Failed to get cart details -> ', error.response.status);
            });
    },

    /**
     * @param {CartLine[]} cartLines
     */
    checkCartStock(cartLines: CartLine[]) {
        let controlResult = true;
        if (context.$config.checkStock) {
            cartLines.forEach((cartLine) => {
                cartLine.quantity > cartLine.offerInventory.stock ? (controlResult = false) : null;
            });
        }
        return controlResult;
    },

    /**
     * @param {CartLine} cartLine
     */
    async removeProductFromCart(cartLine: CartLine | CartLine[]) {
        const offerId: string[] = [];
        if (Array.isArray(cartLine)) cartLine.forEach((line: any) => offerId.push(line.offerPrice.id));
        else offerId.push(cartLine.offerPrice.id);
        const locale = context.i18n.localeProperties.code.toUpperCase();
        const jwt = (context.$auth.strategy as TokenableScheme).token.get();

        await Service(context.$axios)
            .cart.APIdeleteCartLine(context.store.state.cart.cartId, offerId, jwt, locale)
            .then(() => {
                Service(context.$axios)
                    .cart.APIgetCartDetail(jwt, { locale })
                    .then((response) => {
                        context.store.commit('cart/setCart', response.data.focCartLineDtos);
                        context.store.commit('cart/setCartId', response.data.id);
                    })
                    .catch((error) => {
                        console.error('Failed to get cart details -> ', error.response.code);
                    });
            })
            .catch((error) => {
                console.error('Failed to remove cart line -> ', error);
            });
    },

    async addBillingAddress() {
        const lang = context.i18n.localeProperties.code.toUpperCase();
        await Service(context.$axios)
            .cart.APIputBillingAddress(
                context.store.state.cart.cartId,
                { addressId: context.store.state.cart.cartBillingAddressId },
                (context.$auth.strategy as TokenableScheme).token.get(),
                lang,
            )
            .then((response) => {
                context.store.commit('cart/setCart', response.data.focCartLineDtos);
                context.store.commit('cart/setCartId', response.data.id);
            })
            .catch((error) => {
                console.error('Failed to add billing address -> ', error);
            });
    },

    /**
     *
     * @param {string} origin
     * @param {string} originId
     * @returns {string}
     */
    async createOrder(origin: string, originId: string) {
        const lang = { locale: context.app.i18n.localeProperties.code.toUpperCase() };
        const params = {
            originId: originId || context.store.state.cart.cartId,
            channel: 'DESKTOP',
            locale: context.app.i18n.localeProperties.code.toUpperCase(),
            origin,
        };

        const statut = await Service(context.$axios)
            .order.APIcreateOrder(params, (context.$auth.strategy as TokenableScheme).token.get())
            .then((response) => {
                context.store.commit('cart/setOrderValidated', response.data);
                return response.data;
            })
            .catch((error) => {
                return error.response?.data?.code === 'OR0006'
                    ? "il n'y a pas assez de stock"
                    : 'problème avec la commande';
            });
        if (statut) {
            Service(context.$axios)
                .cart.APIdeteleCart((context.$auth.strategy as TokenableScheme).token.get())
                .then(() => {
                    context.store.commit('cart/clearCart');
                    Service(context.$axios)
                        .cart.APIcreateCart((context.$auth.strategy as TokenableScheme).token.get(), lang)
                        .then((response) => {
                            context.store.commit('cart/setCartId', response.data.id);
                            return response.data;
                        })
                        .catch((error: any) => {
                            console.error('Failed to create new cart -> ', error);
                        });
                })
                .catch((error: any) => {
                    console.error('Failed to delete cart -> ', error);
                });
        }
        return statut;
    },

    /**
     *
     * @param {string} origin
     * @param {string} originId
     * @param {string} paymentOption
     * @param {string} paymentProvider
     */
    async createOrderWithPayment(
        origin: string,
        originId: string,
        paymentOption: string,
        paymentProvider: string = 'THUNES',
        referenceType: string = 'COMMERCIAL',
        customFields?: { customFieldId: string; customFieldValue: string }[],
    ) {
        const params = {
            originId: originId || context.store.state.cart.cartId,
            channel: 'DESKTOP',
            locale: context.app.i18n.localeProperties.code.toUpperCase(),
            origin,
            paymentInfo: {
                paymentProvider,
                paymentOption,
                referenceType,
            },
            customFields,
        };
        const statut = await Service(context.$axios)
            .order.APIcreateOrder(params, (context.$auth.strategy as TokenableScheme).token.get())
            .then((response) => {
                context.store.commit('cart/setOrderValidated', response.data);

                return response.data;
            })
            .catch(() => {
                return false;
            });
        return statut;
    },

    clearCart() {
        context.store.commit('cart/clearCart');
    },

    deleteCart() {
        const lang = { locale: context.app.i18n.localeProperties.code.toUpperCase() };
        const response = Service(context.$axios)
            .cart.APIdeteleCart((context.$auth.strategy as TokenableScheme).token.get())
            .then(() => {
                context.store.commit('cart/clearCart');
                const res = Service(context.$axios)
                    .cart.APIcreateCart((context.$auth.strategy as TokenableScheme).token.get(), lang)
                    .then((response) => {
                        context.store.commit('cart/setCartId', response.data.id);
                        return 'succes';
                    })
                    .catch((error) => {
                        console.error('Failed to create cart -> ', error);
                    });
                return res;
            })
            .catch((error) => {
                console.error('Failed to delete cart -> ', error);
            });
        return response;
    },

    // ************ FAST CART Actions ****************

    async getCartStatus() {
        const CartStatus = await Service(context.$axios)
            .cart.APIgetCartStatus((context.$auth.strategy as TokenableScheme).token.get())
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.error('Failed to get cart status -> ', error.response.status);
                return false;
            });
        return CartStatus;
    },

    async getCartErrorReport() {
        const CartErrorReport = await Service(context.$axios)
            .cart.APIgetCartErrorReport((context.$auth.strategy as TokenableScheme).token.get())
            .then((response) => {
                const typeDocument = 'csv';
                const blob = new Blob(response.data, { type: typeDocument });
                const url = URL.createObjectURL(blob);
                const date = moment(new Date()).format('DD/MM/YYYY hh:mm');
                const link = document.createElement('a');
                link.download = `errorReport_${date}`;
                link.href = url;
                link.click();
                URL.revokeObjectURL(link.href);
            })
            .catch((error) => {
                console.error('Failed to get cart report -> ', error.response.status);
            });
        return CartErrorReport;
    },

    async getCartErrorReportData() {
        const CartErrorReport = await Service(context.$axios)
            .cart.APIgetCartErrorReport((context.$auth.strategy as TokenableScheme).token.get())
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.error('Failed to get cart report data -> ', error.response.status);
            });
        return CartErrorReport;
    },

    async uploadCartFile(file: File) {
        const CartStatusAfterUpload = await Service(context.$axios)
            .cart.APIUploadCartFile((context.$auth.strategy as TokenableScheme).token.get(), file)
            .then((response) => {
                return {
                    ok: true,
                    data: response,
                };
            })
            .catch((error) => {
                console.error('Failed to upload file', error.response);
                const errorObj: DjustApiResponse = error.response.data;
                return {
                    ok: false,
                    errorMsg: errorObj.errors[0].message,
                };
            });
        return CartStatusAfterUpload;
    },
});
