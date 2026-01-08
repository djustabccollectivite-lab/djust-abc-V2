import type { Context } from '@nuxt/types';

export interface NonValidatedOrdersState {
    orders: any[];
}

export default (context: Context) => ({
    namespaced: true,
    state: (): NonValidatedOrdersState => ({
        orders: [],
    }),

    mutations: {
        SET_ORDERS(state: NonValidatedOrdersState, orders: any[]) {
            state.orders = orders;
        },
    },

    actions: {
        async initializeNonValidatedOrders({ commit }) {
            const ordersResponse = await context.$purjus.common.cartv3.cartInteractions.retrieveOrders();
            if (!ordersResponse || ordersResponse.content.length === 0) {
                await context.$purjus.common.cartv3.cartInteractions.createOrder();
                const newOrdersResponse = await context.$purjus.common.cartv3.cartInteractions.retrieveOrders();
                commit('SET_ORDERS', newOrdersResponse.content);
                return newOrdersResponse.content;
            }
            commit('SET_ORDERS', ordersResponse.content);
            return ordersResponse.content;
        },
        async refreshNonValidatedOrders({ commit }) {
            const ordersResponse = await context.$purjus.common.cartv3.cartInteractions.retrieveOrders();
            commit('SET_ORDERS', ordersResponse.content);
            return ordersResponse.content;
        },
        async updateOrderLine({ dispatch }, { orderId, line }) {
            try {
                await context.$purjus.common.cartv3.cartInteractions.updateOrderLines(orderId, [line]);
            } catch (error) {
                return Promise.reject(error);
            }
            await dispatch('refreshNonValidatedOrders');
            return Promise.resolve();
        },
        async deleteOrderLines({ dispatch }, { orderId, lineIds }) {
            try {
                await context.$purjus.common.cartv3.cartInteractions.deleteOrderLines(orderId, lineIds);
            } catch (error) {
                return Promise.reject(error);
            }
            await dispatch('refreshNonValidatedOrders');
            return Promise.resolve();
        },
        async updateOrderLines({ dispatch }, { orderId, lines }) {
            try {
                await context.$purjus.common.cartv3.cartInteractions.updateOrderLines(orderId, lines);
            } catch (error) {
                return Promise.reject(error);
            }
            await dispatch('refreshNonValidatedOrders');
            return Promise.resolve();
        },
        async setBillingAddress({ dispatch }, { orderId, addressId }) {
            try {
                await context.$purjus.common.cartv3.cartValidation.setBillingAddress(orderId, addressId);
            } catch (error) {
                return Promise.reject(error);
            }
            await dispatch('refreshNonValidatedOrders');
            return Promise.resolve();
        },
        async setShippingAddress({ dispatch }, { orderId, addressId, shippingType }) {
            try {
                await context.$purjus.common.cartv3.cartValidation.setShippingAddress(orderId, addressId, shippingType);
            } catch (error) {
                return Promise.reject(error);
            }
            await dispatch('refreshNonValidatedOrders');
            return Promise.resolve();
        },
        async setShippingType({ dispatch }, { orderId, shippingType }) {
            try {
                await context.$purjus.common.cartv3.cartInteractions.setShippingType(orderId, shippingType);
            } catch (error) {
                return Promise.reject(error);
            }
            await dispatch('refreshNonValidatedOrders');
            return Promise.resolve();
        },
    },

    getters: {
        singleOrder(state: NonValidatedOrdersState) {
            if (state.orders.length > 0) {
                return state.orders[0];
            }
            return null;
        },
        singleOrderRef(state: NonValidatedOrdersState) {
            if (state.orders.length > 0) {
                return state.orders[0].reference;
            }
            return null;
        },
        singleOrderId(state: NonValidatedOrdersState) {
            if (state.orders.length > 0) {
                return state.orders[0].id;
            }
            return null;
        },
        singleOrderNumberOfProducts(state: NonValidatedOrdersState) {
            if (state.orders.length > 0) {
                return {
                    productCount: state.orders[0].productCount,
                    lineCount: state.orders[0].lineCount,
                };
            }
            return {
                productCount: 0,
                lineCount: 0,
            };
        },
        singleOrderPrices(state: NonValidatedOrdersState) {
            if (state.orders.length > 0) {
                return state.orders[0].orderLogisticPrices;
            }
            return null;
        },
        singleOrderBillingAddress(state: NonValidatedOrdersState) {
            if (state.orders.length > 0) {
                return state.orders[0].orderLogistics[0]?.billingAddressSnapshot;
            }
            return null;
        },
    },
});
