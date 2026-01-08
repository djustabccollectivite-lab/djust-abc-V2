import orderGetters from '../getters/order';
import { orderFromBasket } from './data/order';

describe('Order Getters', () => {
    const orderBasket = { ...orderFromBasket };

    const orderQuote = { ...orderFromBasket, id: '301', orderOrigin: 'SUPPLIER_QUOTE' };

    const orderWaitingToApprove = { ...orderFromBasket, id: '302', status: 'WAITING_CUSTOMER_APPROVAL' };

    const orderCompleted = { ...orderFromBasket, id: '303', status: 'COMPLETED' };
    const orderShipped = { ...orderFromBasket, id: '304', status: 'SHIPPED' };

    const OrderWithAccident = { ...orderFromBasket, id: '305', incident: true };

    const OrderWithAccident1 = { ...orderFromBasket, id: '306', incident: true };

    const listOrders = [
        orderBasket,
        orderQuote,
        orderCompleted,
        orderWaitingToApprove,
        orderShipped,
        OrderWithAccident,
        OrderWithAccident1,
    ];
    const listOrders1 = [orderBasket, orderQuote, orderCompleted];

    const currency = 'USD';

    test('getProductUnitPrice', () => {
        expect(orderGetters.getProductUnitPrice(orderBasket.lines[0], currency)).toBe(90);
    });

    test('getProductTotalPrice', () => {
        expect(orderGetters.getProductTotalPrice(orderBasket.lines[0], currency)).toBe(
            '<span class="currency-fraction">$900<span class="currency-fraction">.</span><span class="currency-fraction">00</span></span>'
        );
    });

    test('getQuantity', () => {
        expect(orderGetters.getQuantity(orderBasket.lines[0])).toBe(10);
    });

    test('getOrdersToApprove', () => {
        expect(orderGetters.getOrdersToApprove(listOrders, '10')).toStrictEqual([orderWaitingToApprove]);
        expect(orderGetters.getOrdersToApprove(listOrders1, '10')).toStrictEqual([]);
        expect(orderGetters.getOrdersToApprove(listOrders, '1')).toStrictEqual([]);
        expect(orderGetters.getOrdersToApprove([], '1')).toStrictEqual(null);
    });

    test('getOrdersWaitingToApprove', () => {
        expect(orderGetters.getOrdersWaitingToApprove(listOrders, '1')).toStrictEqual([orderWaitingToApprove]);
        expect(orderGetters.getOrdersWaitingToApprove(listOrders1, '1')).toStrictEqual([]);
        expect(orderGetters.getOrdersWaitingToApprove(listOrders, '10')).toStrictEqual([]);
        expect(orderGetters.getOrdersWaitingToApprove([], '1')).toStrictEqual(null);
    });

    test('getOrdersShipped', () => {
        expect(orderGetters.getOrdersShipped(listOrders)).toStrictEqual([orderShipped]);
        expect(orderGetters.getOrdersShipped(listOrders1)).toStrictEqual([]);
        expect(orderGetters.getOrdersShipped([])).toStrictEqual(null);
    });

    test('getOrdersWithAccident', () => {
        expect(orderGetters.getOrdersWithAccident(listOrders)).toStrictEqual([OrderWithAccident, OrderWithAccident1]);
        expect(orderGetters.getOrdersWithAccident(listOrders1)).toStrictEqual([]);
        expect(orderGetters.getOrdersWithAccident([])).toStrictEqual(null);
    });
});
