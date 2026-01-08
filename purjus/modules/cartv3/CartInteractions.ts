import type { Context } from '@nuxt/types';
import type { updateLineBody, UpdateOrderCustomFieldsBody } from '@/purjus/api/actions/common/Cartv3';

type Line = updateLineBody['updateOrderCommercialLines'][number];

export default (context: Context) => ({
    async retrieveOrders() {
        return await context.$purjus.api.cartv3.getNonValidatedOrders();
    },

    async getOrderById(orderId: string) {
        return await context.$purjus.api.cartv3.getOrderByid(orderId);
    },

    async createOrder() {
        return await context.$purjus.api.cartv3.createOrder();
    },

    async updateOrderLines(orderId: string, lines: Line[]) {
        return await context.$purjus.api.cartv3.updateOrderLines(orderId, {
            customFieldIdType: 'EXTERNAL_ID',
            lineIdType: 'EXTERNAL_ID',
            lineType: 'OFFER_PRICE',
            updateOrderCommercialLines: lines,
        });
    },
    async retrieveOrderLines(orderId: string, params?: Object) {
        return await context.$purjus.api.cartv3.getOrderLines(orderId, {
            size: 100,
            ...params,
        });
    },

    async deleteOrderLines(orderId: string, orderIds: string[]) {
        return await context.$purjus.api.cartv3.deleteOrderLines(
            orderId,
            orderIds.map((id) => ({
                offerPriceId: id,
            })),
        );
    },
    async updateOrderCustomFields(orderId: string, body: UpdateOrderCustomFieldsBody) {
        return await context.$purjus.api.cartv3.updateOrderCustomFields(orderId, body);
    },
    async setShippingType(orderId: string, shippingType: string) {
        return await context.$purjus.api.cartv3.setShippingType(orderId, shippingType);
    },
});
