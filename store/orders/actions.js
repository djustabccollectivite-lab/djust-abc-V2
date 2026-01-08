const actions = {
    async fetchOrdersToApprove({ commit }, context) {
        try {
            const param = {
                size: 10,
                locale: context.$i18n.locale,
                logisticOrderStatuses: ['WAITING_CUSTOMER_APPROVAL'],
                nbPreviewLines: 1,
                sort: 'created_at,desc',
            };

            const dataOrdersList = await context.$core.useUser.getCustomerAccountOrders(param);
            const ordersToApprove = dataOrdersList?.content || null;

            commit('setOrdersToApprove', ordersToApprove);

            if (ordersToApprove && ordersToApprove.length > 0) {
                const approbateur = await context.$core.useOrder.getOrderApprovers(ordersToApprove[0].id);
                if (approbateur) {
                    const nameOfApprobateur = approbateur[0]?.customerUser?.email;
                    const isApprobateur = approbateur[0]?.customerUser?.email === context.$auth.user.email;

                    commit('setNameOfApprobateur', nameOfApprobateur);
                    commit('setIsApprobateur', isApprobateur);
                }
            }

            return { ordersToApprove, totalPages: dataOrdersList?.totalPages || 0 };
        } catch (error) {
            console.error('Erreur lors de la récupération des commandes à approuver:', error);
            return { ordersToApprove: null, totalPages: 0 };
        }
    },

    async fetchOrdersToApprovePaginated({ commit }, { context, page = 0, size = 10 }) {
        try {
            const param = {
                size,
                page,
                locale: context.$i18n.locale,
                logisticOrderStatuses: ['WAITING_CUSTOMER_APPROVAL'],
                nbPreviewLines: 1,
                sort: 'created_at,desc',
            };

            const dataOrdersList = await context.$core.useUser.getCustomerAccountOrders(param);
            const ordersToApprove = dataOrdersList?.content || [];

            commit('setOrdersToApprove', ordersToApprove);

            return { ordersToApprove, totalPages: dataOrdersList?.totalPages || 0 };
        } catch (error) {
            console.error('Erreur lors de la récupération paginée des commandes à approuver:', error);
            return { ordersToApprove: [], totalPages: 0 };
        }
    },
};

export default actions;
