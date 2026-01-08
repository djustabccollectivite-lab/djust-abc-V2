import { Order, OrderLogistic, OrderLogisticItem, orderLogisticItemProduct } from '../interfaces/IOrder';
import tools from '../helpers/tools';
import { OrderGetters } from './types';

export const getProductUnitPrice = (orderLogistic: OrderLogisticItem, currency: string): number => {
    return orderLogistic.orderLogisticLinePriceDto.price;
};

export const getProductPriceHT = (
    orderLogistic: OrderLogisticItem,
    currency: string,
    maximumFractionDigits?: number,
): string => {
    return tools.formatCurrencyAuto(
        orderLogistic.orderLogisticLinePriceDto.itemPriceWithoutTaxes,
        currency,
        maximumFractionDigits,
    );
};

export const getProductTotalPriceHT = (
    orderLogistic: OrderLogisticItem,
    currency: string,
    maximumFractionDigits?: number,
): string => {
    return tools.formatCurrencyAuto(
        orderLogistic.orderLogisticLinePriceDto.totalPriceWithoutTaxes,
        currency,
        maximumFractionDigits,
    );
};

export const getOrderShippingFeesWithoutTax = (
    order: Order,
    currency: string,
    maximumFractionDigits?: number,
): string => {
    return tools.formatCurrencyAuto(
        order.orderLogisticPrices.totalShippingFeesWithoutTax,
        currency,
        maximumFractionDigits,
    );
};

export const getOrderShippingFeesWithTax = (order: Order, currency: string, maximumFractionDigits?: number): string => {
    return tools.formatCurrencyAuto(
        order.orderLogisticPrices.totalShippingFeesWithTax,
        currency,
        maximumFractionDigits,
    );
};
export const getOrderTotalTVA = (order: Order, currency: string, maximumFractionDigits?: number): string => {
    return tools.formatCurrencyAuto(order.orderLogisticPrices.totalTaxAmount, currency, maximumFractionDigits);
};

export const getOrderTotalHT = (order: Order, currency: string, maximumFractionDigits?: number): string => {
    return tools.formatCurrencyAuto(order.orderLogisticPrices.totalPriceWithoutTax, currency, maximumFractionDigits);
};

export const getOrderTotalEcoTaxHT = (
    order: Order,
    currency: string,
    CustomFieldKey: string,
    maximumFractionDigits?: number,
): string => {
    let total = 0;

    for (let i = 0; i < order.orderLogistics.length; i++) {
        const orderLogistic = order.orderLogistics[i];

        for (let j = 0; j < orderLogistic.lines.length; j++) {
            const line = orderLogistic.lines[j];

            if (!line.offerCustomFieldSnapshotDtos) continue;

            line.offerCustomFieldSnapshotDtos.forEach((f) => {
                if (
                    f.offerCustomFieldSnapshotDto.externalId === CustomFieldKey &&
                    f.offerCustomFieldSnapshotDto.type === 'NUMBER'
                ) {
                    total += parseFloat(f.value);
                }
            });
        }
    }

    return tools.formatCurrencyAuto(total, currency, maximumFractionDigits);
};

export const getOrderTotalTTC = (order: Order, currency: string, maximumFractionDigits?: number): string => {
    return tools.formatCurrencyAuto(order.orderLogisticPrices.totalPriceWithTax, currency, maximumFractionDigits);
};

export const getProductTotalPriceTTC = (
    orderLogistic: OrderLogisticItem,
    currency: string,
    maximumFractionDigits?: number,
): string => {
    return tools.formatCurrencyAuto(
        orderLogistic.orderLogisticLinePriceDto.totalPriceWithTaxes * orderLogistic.quantity,
        currency,
        maximumFractionDigits,
    );
};

export const getOrderTotalShippingFeeFromSupplierName = (
    OrderLogistic: OrderLogistic[],
    supplierName: string,
    currency: string,
    maximumFractionDigits?: number,
): string => {
    const ordersBySupplier = OrderLogistic.filter((el) => el?.supplierSnapshot.name == supplierName);
    const total = ordersBySupplier?.reduce(
        (acc, { orderLogisticPrices }) => acc + orderLogisticPrices.totalShippingFeesWithoutTax,
        0,
    );
    return tools.formatCurrencyAuto(total, currency, maximumFractionDigits);
};

export const getProductUnitPriceFormated = (
    orderLogistic: OrderLogisticItem,
    currency: string,
    maximumFractionDigits?: number,
): string => {
    return tools.formatCurrencyAuto(orderLogistic.orderLogisticLinePriceDto.price, currency, maximumFractionDigits);
};

export const getProductUnitPriceConfirmed = (orderLogistic: OrderLogisticItem, currency: string): number => {
    return orderLogistic.orderLogisticLinePriceDto.confirmedPrice;
};

export const getProductUnitPriceConfirmedFormated = (
    orderLogistic: OrderLogisticItem,
    currency: string,
    maximumFractionDigits?: number,
): string => {
    return tools.formatCurrencyAuto(
        orderLogistic.orderLogisticLinePriceDto.confirmedPrice,
        currency,
        maximumFractionDigits,
    );
};

export const getProductTotalPrice = (
    orderLogistic: OrderLogisticItem,
    currency: string,
    maximumFractionDigits?: number,
): string => {
    const quantity =
        orderLogistic.confirmedQuantity === null ? orderLogistic.quantity : orderLogistic.confirmedQuantity;
    const totalPrice =
        orderLogistic.orderLogisticLinePriceDto.confirmedPrice === null ||
        orderLogistic.orderLogisticLinePriceDto.confirmedPrice === orderLogistic.orderLogisticLinePriceDto.price
            ? orderLogistic.orderLogisticLinePriceDto.price
            : orderLogistic.orderLogisticLinePriceDto.confirmedPrice;
    return tools.formatCurrencyAuto(totalPrice * quantity, currency, maximumFractionDigits);
};

export const getQuantity = (orderLogistic: OrderLogisticItem): number => orderLogistic.quantity;
export const getConfirmedQuantity = (orderLogistic: OrderLogisticItem): number => orderLogistic.confirmedQuantity;

export const getOrderQuantity = (orderLogistic: OrderLogistic): number => {
    return orderLogistic.lines.reduce((acc, { quantity }) => acc + quantity, 0);
};

export const getOrdersOnHold = (ordersList: OrderLogistic[]): any => {
    return ordersList?.length > 0 ? ordersList.filter((order) => order.status === 'DRAFT_ORDER_ON_HOLD') : [];
};

export const getOrdersNotOnHold = (ordersList: OrderLogistic[]): any => {
    return ordersList?.length > 0 ? ordersList.filter((order) => order.status !== 'DRAFT_ORDER_ON_HOLD') : [];
};

export const getOrdersToApprove = (ordersList: OrderLogistic[], id: string): any => {
    return ordersList?.length > 0
        ? ordersList.filter(
              (order) => order.status === 'WAITING_CUSTOMER_APPROVAL' && order.customerUserSnapshot.id !== id,
          )
        : null;
};

export const getOrdersWaitingToApprove = (ordersList: OrderLogistic[], id: string): any => {
    return ordersList?.length > 0
        ? ordersList.filter(
              (order) => order.status === 'WAITING_CUSTOMER_APPROVAL' && order.customerUserSnapshot.id === id,
          )
        : null;
};

export const getOrdersWithIncidents = (ordersList: OrderLogistic[], id: string): any => {
    return ordersList.length > 0
        ? ordersList.filter(
              (order) => order.incident === true,
              //order.customerUserSnapshot.id === id
          )
        : null;
};

export const getOrdersWaitingSupplierApproval = (ordersList: OrderLogistic[]): any => {
    return ordersList?.length > 0 ? ordersList.filter((order) => order.status === 'WAITING_SUPPLIER_APPROVAL') : null;
};

export const getOrdersWaitingShipment = (ordersList: OrderLogistic[]): any => {
    return ordersList?.length > 0 ? ordersList.filter((order) => order.status === 'WAITING_SHIPMENT') : null;
};

export const getOrdersShipped = (ordersList: OrderLogistic[]): any => {
    return ordersList?.length > 0 ? ordersList.filter((order) => order.status === 'SHIPPED') : null;
};

export const getOrdersCompleted = (ordersList: OrderLogistic[]): any => {
    return ordersList?.length > 0 ? ordersList.filter((order) => order.status === 'COMPLETED') : null;
};

export const getOrdersCanceled = (ordersList: OrderLogistic[]): any => {
    return ordersList.length > 0 ? ordersList.filter((order) => order.status === 'CANCELED') : null;
};

export const getTotalOrder = (order: OrderLogistic, currency: string, maximumFractionDigits?: number): any => {
    return tools.formatCurrencyAuto(
        order.orderLogisticPrices.totalOrderPrice,
        order.orderLogisticPrices.currency,
        maximumFractionDigits,
    );
};

export const getVariantName = (order: OrderLogisticItem): string => {
    return order.orderLogisticLineProductVariantDto.name;
};

export const getSupplierName = (order: OrderLogistic): string | null => {
    return order.supplierSnapshot.name;
};

export const getVariantImg = (order: OrderLogisticItem): string | null => {
    return order.orderLogisticLineProductVariantDto.mainImageUrl;
};

export const getOrderProductSku = (order: OrderLogisticItem): string => {
    return order.orderLogisticLineProductDto.sku;
};

export const getOrderProductPerPack = (order: OrderLogisticItem): number => {
    return order.orderLogisticLinePriceDto.itemPerPack;
};

export const getOrderProductBrand = (order: OrderLogisticItem): string => {
    return order.orderLogisticLineProductDto.brand || '';
};

export const getOrderProductImage = (orderLine: OrderLogisticItem): string =>
    orderLine.orderLogisticLineProductDto.mainImageUrl || '';

export const getOrderProductName = (orderLine: OrderLogisticItem): string => {
    return orderLine.orderLogisticLineProductDto.name || '';
};

export const getOrdersWithAccident = (ordersList: OrderLogistic[]): any => {
    return ordersList.length > 0 ? ordersList.filter((order) => order.incident === true) : null;
};

export const getShippingTrackingURL = (order: Order) => {
    return order.shippingTrackingUrl;
};

export const getSuppliersList = (orderList: OrderLogistic[]): any => {
    const data = orderList.map((orderItem: any) => {
        return orderItem.supplierSnapshot.name;
    });
    return [...new Set(data)];
};

export const getOrderItemsBySuppliers = (orderList: OrderLogistic[]): any => {
    return orderList.reduce((memo: any, orderItem: OrderLogistic) => {
        if (!memo[orderItem.supplierSnapshot.name]) {
            memo[orderItem.supplierSnapshot.name] = [];
        }
        memo[orderItem.supplierSnapshot.name].push(orderItem);
        return memo;
    }, {});
};

export const getShippingAddressExternalId = (order: OrderLogistic) => {
    return order.shippingAddressSnapshot?.externalId ? order.shippingAddressSnapshot.externalId : null;
};

export const getBillingAddressExternalId = (order: OrderLogistic) => {
    return order && order.billingAddressSnapshot?.externalId ? order.billingAddressSnapshot.externalId : null;
};

export const getFirstShippingAddressExternalIdFromCommercialOrder = (commercialOrder: Order): string | null => {
    if (commercialOrder && commercialOrder.orderLogistics && commercialOrder.orderLogistics.length > 0) {
        const firstShippingAddress = commercialOrder.orderLogistics[0].shippingAddressSnapshot;
        if (firstShippingAddress && firstShippingAddress.externalId) {
            return firstShippingAddress.externalId;
        }
    }
    return null;
};

export const getBillingAddressExternalIdFromCommercialOrder = (commercialOrder: Order): string | null => {
    if (commercialOrder && commercialOrder.orderLogistics && commercialOrder.orderLogistics.length > 0) {
        const firstBillingAddress = commercialOrder.orderLogistics[0].billingAddressSnapshot;
        if (firstBillingAddress && firstBillingAddress.externalId) {
            return firstBillingAddress.externalId;
        }
    }
    return null;
};

export const getStepsOrder = (status: string): any => {
    switch (status) {
        case 'ORDER_CREATED':
            return [
                {
                    number: 1,
                    name: 'ORDER_CREATED',
                    class: 'active',
                },
                {
                    number: 2,
                    name: 'WAITING_FOR_APPROVAL',
                    class: '',
                },
                {
                    number: 3,
                    name: 'PREPARATION',
                    class: '',
                },
                {
                    number: 4,
                    name: 'WAITING_FOR_SHIPMENT',
                    class: '',
                },
                {
                    number: 5,
                    name: 'DELIVERY',
                    class: '',
                },
            ];
        case 'WAITING_CUSTOMER_APPROVAL':
            return [
                {
                    number: 1,
                    name: 'CREATED',
                    class: 'complete',
                },
                {
                    number: 2,
                    name: 'WAITING_CUSTOMER_APPROVAL',
                    class: 'active',
                },
                {
                    number: 3,
                    name: 'PREPARATION',
                    class: '',
                },
                {
                    number: 4,
                    name: 'WAITING_FOR_SHIPMENT',
                    class: '',
                },
                {
                    number: 5,
                    name: 'DELIVERY',
                    class: '',
                },
            ];
        case 'WAITING_SUPPLIER_APPROVAL':
            return [
                {
                    number: 1,
                    name: 'CREATED',
                    class: 'complete',
                },
                {
                    number: 2,
                    name: 'WAITING_SUPPLIER_APPROVAL',
                    class: 'active',
                },
                {
                    number: 3,
                    name: 'PREPARATION',
                    class: '',
                },
                {
                    number: 4,
                    name: 'WAITING_FOR_SHIPMENT',
                    class: '',
                },
                {
                    number: 5,
                    name: 'DELIVERY',
                    class: '',
                },
            ];
        case 'DECLINED_BY_CUSTOMER':
            return [
                {
                    number: 1,
                    name: 'CREATED',
                    class: 'complete',
                },
                {
                    number: 2,
                    name: 'DECLINED_BY_CUSTOMER',
                    class: 'decline',
                },
                {
                    number: 3,
                    name: 'PREPARATION',
                    class: '',
                },
                {
                    number: 4,
                    name: 'WAITING_FOR_SHIPMENT',
                    class: '',
                },
                {
                    number: 5,
                    name: 'DELIVERY',
                    class: '',
                },
            ];
        case 'PREPARED':
            return [
                {
                    number: 1,
                    name: 'CREATED',
                    class: 'complete',
                },
                {
                    number: 2,
                    name: 'VALIDATED',
                    class: 'complete',
                },
                {
                    number: 3,
                    name: 'PREPARED',
                    class: 'complete',
                },
                {
                    number: 4,
                    name: 'WAITING_FOR_SHIPMENT',
                    class: 'active',
                },
                {
                    number: 5,
                    name: 'DELIVERY',
                    class: '',
                },
            ];
        case 'WAITING_SHIPMENT':
            return [
                {
                    number: 1,
                    name: 'CREATED',
                    class: 'complete',
                },
                {
                    number: 2,
                    name: 'VALIDATED',
                    class: 'complete',
                },
                {
                    number: 3,
                    name: 'PREPARED',
                    class: 'complete',
                },
                {
                    number: 4,
                    name: 'WAITING_FOR_SHIPMENT',
                    class: 'active',
                },
                {
                    number: 5,
                    name: 'DELIVERY',
                    class: '',
                },
            ];
        case 'SHIPPED':
            return [
                {
                    number: 1,
                    name: 'CREATED',
                    class: 'complete',
                },
                {
                    number: 2,
                    name: 'VALIDATED',
                    class: 'complete',
                },
                {
                    number: 3,
                    name: 'PREPARED',
                    class: 'complete',
                },
                {
                    number: 4,
                    name: 'SHIPPED',
                    class: 'complete',
                },
                {
                    number: 5,
                    name: 'DELIVERY',
                    class: 'active',
                },
            ];
        case 'COMPLETED':
            return [
                {
                    number: 1,
                    name: 'CREATED',
                    class: 'complete',
                },
                {
                    number: 2,
                    name: 'VALIDATED',
                    class: 'complete',
                },
                {
                    number: 3,
                    name: 'PREPARED',
                    class: 'complete',
                },
                {
                    number: 4,
                    name: 'SHIPPED',
                    class: 'complete',
                },
                {
                    number: 5,
                    name: 'COMPLETED',
                    class: 'complete',
                },
            ];
        case 'CANCELED':
            return [
                {
                    number: 1,
                    name: 'CREATED',
                    class: 'complete',
                },
                {
                    number: 2,
                    name: 'VALIDATED',
                    class: 'complete',
                },
                {
                    number: 3,
                    name: 'CANCELED',
                    class: 'decline',
                },
                {
                    number: 4,
                    name: 'SHIPPED',
                    class: '',
                },
                {
                    number: 5,
                    name: 'COMPLETED',
                    class: '',
                },
            ];
        case 'DECLINED_BY_SUPPLIER':
            return [
                {
                    number: 1,
                    name: 'CREATED',
                    class: 'complete',
                },
                {
                    number: 2,
                    name: 'DECLINED_BY_SUPPLIER',
                    class: 'decline',
                },
                {
                    number: 3,
                    name: 'PREPARED',
                    class: '',
                },
                {
                    number: 4,
                    name: 'SHIPPED',
                    class: '',
                },
                {
                    number: 5,
                    name: 'COMPLETED',
                    class: '',
                },
            ];
        default:
            return [];
    }
};

export const getTotalProductTaxAmount = (order: Order) => {
    return tools.formatCurrencyAuto(
        order.orderLogisticPrices.totalProductTaxAmount,
        order.orderLogisticPrices.currency,
    );
};

const orderGetters: OrderGetters<OrderLogisticItem, OrderLogistic, Order> = {
    getProductUnitPrice: getProductUnitPrice,
    getProductUnitPriceFormated: getProductUnitPriceFormated,
    getProductUnitPriceConfirmed: getProductUnitPriceConfirmed,
    getProductUnitPriceConfirmedFormated: getProductUnitPriceConfirmedFormated,
    getProductTotalPrice: getProductTotalPrice,
    getQuantity: getQuantity,
    getConfirmedQuantity: getConfirmedQuantity,
    getOrdersOnHold: getOrdersOnHold,
    getOrdersNotOnHold: getOrdersNotOnHold,
    getOrdersToApprove: getOrdersToApprove,
    getOrdersWaitingToApprove: getOrdersWaitingToApprove,
    getOrdersWaitingSupplierApproval: getOrdersWaitingSupplierApproval,
    getOrdersWaitingShipment: getOrdersWaitingShipment,
    getOrdersShipped: getOrdersShipped,
    getOrdersCompleted: getOrdersCompleted,
    getOrdersCanceled: getOrdersCanceled,
    getOrdersWithAccident: getOrdersWithAccident,
    getShippingTrackingURL: getShippingTrackingURL,
    getStepsOrder: getStepsOrder,
    getOrdersWithIncidents: getOrdersWithIncidents,
    getTotalOrder: getTotalOrder,
    getOrderQuantity: getOrderQuantity,
    getVariantName: getVariantName,
    getVariantImg: getVariantImg,
    getOrderProductSku: getOrderProductSku,
    getOrderProductBrand: getOrderProductBrand,
    getOrderProductImage: getOrderProductImage,
    getOrderProductName: getOrderProductName,
    getOrderProductPerPack: getOrderProductPerPack,
    getBillingAddressExternalId: getBillingAddressExternalId,
    getShippingAddressExternalId: getShippingAddressExternalId,
    getProductTotalPriceHT: getProductTotalPriceHT,
    getProductTotalPriceTTC: getProductTotalPriceTTC,
    getSupplierName: getSupplierName,
    getProductPriceHT: getProductPriceHT,
    getSuppliersList: getSuppliersList,
    getOrderItemsBySuppliers: getOrderItemsBySuppliers,
    getOrderShippingFeesWithoutTax: getOrderShippingFeesWithoutTax,
    getOrderShippingFeesWithTax: getOrderShippingFeesWithTax,
    getOrderTotalShippingFeeFromSupplierName: getOrderTotalShippingFeeFromSupplierName,
    getOrderTotalTVA: getOrderTotalTVA,
    getOrderTotalHT: getOrderTotalHT,
    getOrderTotalEcoTaxHT: getOrderTotalEcoTaxHT,
    getOrderTotalTTC: getOrderTotalTTC,
    getFirstShippingAddressExternalIdFromCommercialOrder: getFirstShippingAddressExternalIdFromCommercialOrder,
    getBillingAddressExternalIdFromCommercialOrder: getBillingAddressExternalIdFromCommercialOrder,
    getTotalProductTaxAmount: getTotalProductTaxAmount,
};

export default orderGetters;
