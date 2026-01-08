import { StatGetters } from './types';

import { OrderLogistic } from '../interfaces/IOrder';

//Stat of last 30 days

/**
 * Get Number of Orders in Progress
 * @param  {OrderLogistic[]} orders
 * @returns Number
 */
export const getNbOrdersInProgress = (orders: OrderLogistic[]): Number => {
    const count = orders.filter((item) => {
        const today = new Date();
        const d = new Date(item.createdAt);
        const greaterThan30Days = +d < +today + 30 * 24 * 60 * 60 * 1000;
        return greaterThan30Days && item.status !== 'COMPLETED' ? item : null;
    }).length;
    return count;
};

/**
 * Get Number of Orders with status 'Shipped'
 * @param  {OrderLogistic[]} orders
 * @returns Number
 */
export const getNbOrdersShipped = (orders: OrderLogistic[]): Number => {
    const count = orders.filter((item) => {
        const today = new Date();
        const d = new Date(item.createdAt);
        const greaterThan30Days = +d < +today + 30 * 24 * 60 * 60 * 1000;
        return greaterThan30Days && item.status === 'SHIPPED' ? item : null;
    }).length;
    return count;
};

/**
 * Get Number of Orders with incident (incdence = true)
 * @param  {OrderLogistic[]} orders
 * @returns Number
 */
export const getNbOrdersWithIncident = (orders: OrderLogistic[]): Number => {
    const count = orders.filter((item) => {
        const today = new Date();
        const d = new Date(item.createdAt);
        const greaterThan30Days = +d < +today + 30 * 24 * 60 * 60 * 1000;
        return greaterThan30Days && item.incident === true ? item : null;
    }).length;
    return count;
};

/**
 * Get Total of Purchases (Achats)
 * @param  {OrderLogistic[]} orders
 * @returns Number
 */
export const getTotalPurchases = (orders: OrderLogistic[]): Number => {
    const ordersGreaterThan30Days = orders.filter((item) => {
        const today = new Date();
        const d = new Date(item.createdAt);
        const greaterThan30Days = +d < +today + 30 * 24 * 60 * 60 * 1000;
        return greaterThan30Days ? item : null;
    });
    const total = ordersGreaterThan30Days.reduce(
        (acc, { orderLogisticPrices }) => acc + orderLogisticPrices.totalOrderPrice,
        0
    );

    return parseFloat(total.toFixed(2));
};

const statGetters: StatGetters = {
    getNbOrdersInProgress: getNbOrdersInProgress,
    getNbOrdersShipped: getNbOrdersShipped,
    getNbOrdersWithIncident: getNbOrdersWithIncident,
    getTotalPurchases: getTotalPurchases,
};

export default statGetters;
