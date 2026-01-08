// NOTE : This file is only to create the Object for the API Request
// TODO : Every Function should have a header (comment) which we find the name of API
// TODO : Every Function should start with "Request"+name of API //exemple: RequestAPIgetProductThumbnails

import { RequestProductsList } from '../interfaces/IProduct';

/**
 * Request for APIgetProductThumbnails GET
 *
 * @param {RequestProductsList} request
 * @returns {RequestProductsList}
 */
const RequestAPIgetProductThumbnails = (request: RequestProductsList): RequestProductsList => {
    return {
        priceMin: request.priceMin ?? null,
        priceMax: request.priceMax ?? null,
        // categoryIds: request.categoryIds ?? null, // Temporary commented
        brand: request.brand ?? null,
        customFieldsSupplier: request.customFieldsSupplier ?? null,
        rq: request.rq ?? null,
        productTags: request.productTags ?? null,
        locale: request.locale ?? null,
        size: request.size ?? null,
        orderType: request.SortType ? request.Sort?.toUpperCase() : null,
        order: request.SortType ? request.SortType?.toUpperCase() : null,
    };
};

function RequestAPIvalidateMasterQuote(masterQuote: any): any {
    const createSupplierQuoteRequests = masterQuote?.quoteLines.map(quoteLine => {
        let totalQte = 0;
        const deliveryLineRequests = quoteLine.deliveryLines.map(deliveryLine => {
            totalQte += deliveryLine.quantity;
            return {
                quantity: deliveryLine.quantity,
                shippingAddressId: deliveryLine.addressId,
            };
        });
        return {
            masterQuoteDetailId: quoteLine.id,
            supplierIds: quoteLine.suppliersList,
            createQuoteDeliveryLineRequests: deliveryLineRequests,
            quantity: totalQte,
        };
    });

    return createSupplierQuoteRequests;
}

export default {
    RequestAPIgetProductThumbnails,
    RequestAPIvalidateMasterQuote,
};
