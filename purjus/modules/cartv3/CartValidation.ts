import type { Context } from '@nuxt/types';
import type { initPaymentBody } from '../../api/actions/common/Cartv3';

export default (context: Context) => ({
    async setBillingAddress(orderId: string, addressId: string) {
        return await context.$purjus.api.cartv3.setBillingAddress(orderId, addressId);
    },
    async setShippingAddress(orderId: string, addressId: string, shippingType: string) {
        return await context.$purjus.api.cartv3.setShippingAddress(orderId, addressId, shippingType);
    },
    async setOrderToCreated(
        orderId: string,
        body: {
            mangoPayOrderOptions?: { preAuthorizationId: string };
            paymentOption: string;
            paymentProvider?: string;
            referenceType: string;
        },
    ) {
        return await context.$purjus.api.cartv3.setOrderToCreated(orderId, body);
    },
    async paymentPrecheck(orderId: string) {
        return await context.$purjus.api.cartv3.paymentPrecheck(orderId);
    },
    async initPayment(orderId: string, body: initPaymentBody) {
        return await context.$purjus.api.cartv3.initPayment(orderId, body);
    },
});
