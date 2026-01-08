const mutations = {
    setOrders(state, payload) {
        state.orders = payload;
    },
    setCommercialOrder(state, payload) {
        state.commercialOrder = payload;
    },
    setCurrentOrder(state, payload) {
        state.currentOrder = payload;
    },
    setCurrentLogisticOrder(state, payload) {
        state.currentOrder.orderLogistics[0] = payload;
    },
    setOrder(state, order) {
        if (order.id && state.orders) {
            const index = state.orders.findIndex((item) => item.id === order.id);
            if (index !== -1) {
                state.orders[index] = order;
            } else {
                state.orders.push(order);
            }
        }
    },
    setOrdersToApprove(state, payload) {
        state.ordersToApprove = payload;
    },
    setNameOfApprobateur(state, payload) {
        state.nameOfApprobateur = payload;
    },
    setIsApprobateur(state, payload) {
        state.isApprobateur = payload;
    },
    setApprobateur(state, payload) {
        state.approbateur = payload;
    },
    setNotFoundOffersId(state, payload) {
        state.notAvailableOffersId = payload;
    },
};

export default mutations;
