export interface MasterQuoteDetailToAdd {
    productVariantId: string;
    quantity: number;
};

export interface MasterQuoteToCreate {
    name: string;
    add: boolean;
    productToAdd: {
        masterQuoteDetailsToAdd: MasterQuoteDetailToAdd[];
    };
};

export interface MasterQuoteToDelete {
    masterQuoteId: string;
};

export interface MasterQuoteToValidate {
    billingAddressId: string;
    createSupplierQuoteRequests: CreateSupplierQuoteRequest[];
    masterQuoteId: string;
    supplierQuoteUrl: string;
};

export interface ProductToAdd {
    masterQuoteId: string;
    data: {
        masterQuoteDetailsToAdd: MasterQuoteDetailToAdd[];
    };
};

export interface ProductToRemove {
    data: {
        masterQuoteDetailsToRemove: string[];
    };
    masterQuoteId: string;
    quoteLineId: string;
};

export interface SupplierQuoteToRefuse {
    masterQuoteId: string;
    supplierQuoteId: string;
    data: {
        status: string;
    };
};

export interface SupplierQuoteRequest {
    message: string;
    username: string;
};

export interface CreateQuoteDeliveryLineRequest {
    quantity: number;
    shippingAddressId: string;
};

export interface CreateSupplierQuoteRequest {
    createQuoteDeliveryLineRequests: CreateQuoteDeliveryLineRequest[];
    masterQuoteDetailId: string;
    quantity: number;
    supplierIds: string[];
};
