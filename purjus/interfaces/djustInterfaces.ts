import type { OrderLine } from '~/core/interfaces/Order/IOrderResponse';

enum CustomerOrganisationStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}

enum ExternalSource {
    MIRAKL = 'MIRAKL',
    CLIENT = 'CLIENT',
    NOT_DEFINED = 'NOT_DEFINED',
    EXTERN = 'EXTERN',
    SYSTEM = 'SYSTEM',
}

enum CustomFieldRole {
    PRODUCT_TAX_RATE = 'PRODUCT_TAX_RATE',
    SHIPPING_TAX_RATE = 'SHIPPING_TAX_RATE',
    SHIPPING_TAX_CODE = 'SHIPPING_TAX_CODE',
    PRODUCT_TAX_CODE = 'PRODUCT_TAX_CODE',
    ORDERS_MANAGED_INTERNALLY = 'ORDERS_MANAGED_INTERNALLY',
}

enum SealedTarget {
    OFFER = 'OFFER',
    ACCOUNT = 'ACCOUNT',
    NAVIGATION_CATEGORY = 'NAVIGATION_CATEGORY',
    SUPPLIER = 'SUPPLIER',
    CUSTOMER_USER = 'CUSTOMER_USER',
    CUSTOMER_ORGANISATION = 'CUSTOMER_ORGANISATION',
    ORDER_LOGISTIC = 'ORDER_LOGISTIC',
    ORDER_LOGISTIC_LINE = 'ORDER_LOGISTIC_LINE',
    QUOTE = 'QUOTE',
}

enum CustomFieldStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}

type CustomField = {
    externalId: string;
    externalSource: ExternalSource;
    id?: string;
    mandatory: boolean;
    name: Record<string, string>;
    role?: CustomFieldRole;
    sealedTarget: SealedTarget;
    status?: CustomFieldStatus;
    type: string;
};

export type CustomFieldValueObject = {
    customField?: CustomField;
    value?: Record<string, any>;
};

export type FoAddressDto = {
    additionalAddress?: string;
    address?: string;
    billing?: boolean;
    city?: string;
    company?: string;
    country?: string;
    externalId?: string;
    fullName?: string;
    id?: string;
    label?: string;
    phone?: string;
    shipping?: boolean;
    state?: string;
    zipcode?: string;
};

export type FoCustomerOrganisationDto = {
    accountId?: string;
    addresses?: Array<FoAddressDto>;
    children?: Array<FoCustomerOrganisationDto>;
    customFieldValues?: Array<CustomFieldValueObject>;
    id?: string;
    mainOrganisation?: boolean;
    name?: string;
    status?: CustomerOrganisationStatus;
};

export interface Supplier {
    id: string;
    name: string;
    externalId: string;
    supplierStatus: string;
    totalOffers: number;
    totalOrders: number;
    totalSales: number;
    supplierRating: any;
    description: any;
    additionalImageLink: Array<any>;
    logo: any;
    isDefault: boolean;
    evaluationCount: any;
    externalSource: string;
    returnPolicy: any;
    createdAt: string;
    updatedAt: string;
    banner: any;
    paymentDueDate: {
        paymentDueDateDelay: number;
        paymentDueDateMode: string;
    };
    customFieldValues: Array<{
        customField: {
            type: string;
            id: string;
            name: {
                FR: string;
            };
            externalId: string;
            externalSource: string;
            mandatory: boolean;
            status: string;
            sealedTarget: string;
            role: any;
        };
        value: any;
        type: string;
    }>;
}

export interface ProductThumbnailsResponsev2 {
    facets: {
        attributs: Array<{
            id: number;
            name: string;
            values: Array<string>;
        }>;
        brands: Array<{
            id: number;
            name: string;
        }>;
        customFields: Array<{
            id: number;
            name: string;
            values: Array<string>;
        }>;
        suppliers: Array<{
            id: number;
            name: string;
        }>;
    };
    products: {
        content: Array<{
            offer: {
                brand: string;
                currency: string;
                customFields: Array<{
                    externalId: string;
                    id: string;
                    name: string;
                    value: {};
                }>;
                id: string;
                leadTimeToShip: number;
                maxOrderQuantity: number;
                minOrderQuantity: number;
                minShippingPrice: number;
                minStockAlert: number;
                packingType: string;
                productUnit: string;
                quantityPerItem: number;
                stock: number;
            };
            offerPrice: {
                id: string;
                itemPerPack: number;
                offerPriceType: string;
                price: number;
            };
            product: {
                brand: string;
                description: string;
                externalId: string;
                id: string;
                mainPictureUrl: string;
                name: string;
                sku: string;
                tags: Array<{
                    id: string;
                    name: string;
                }>;
                unit: {
                    id: string;
                    type: string;
                    unit: string;
                };
            };
            supplier: {
                externalId: string;
                id: string;
                name: string;
            };
            variant: {
                description: string;
                ean: string;
                externalId: string;
                id: string;
                mpn: string;
                name: string;
                pictureUrls: [
                    {
                        formatType: string;
                        heightInPx: number;
                        main: boolean;
                        sizeType: string;
                        url: string;
                        widthInPx: number;
                    },
                ];
                sku: string;
            };
        }>;
    };
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: {
        offset: number;
        pageNumber: number;
        pageSize: number;
        paged: boolean;
        sort: Array<{
            ascending: boolean;
            descending: boolean;
            direction: string;
            ignoreCase: boolean;
            nullHandling: string;
            property: string;
        }>;
        unpaged: boolean;
    };
    size: number;
    sort: Array<{
        ascending: boolean;
        descending: boolean;
        direction: string;
        ignoreCase: boolean;
        nullHandling: string;
        property: string;
    }>;
    totalElements: number;
    totalPages: number;
}

export interface ProductThumbnailsResponse {
    aggregations: Array<{
        buckets: Array<{
            count: number;
            key: string;
            values: Array<string>;
        }>;
        type: string;
    }>;
    productThumbnails: {
        content: Array<{
            bestOffer: {
                offerInventory: {
                    brand: string;
                    currency: string;
                    customFieldValues: Array<{
                        customField: {
                            externalId: string;
                            id: string;
                            name: {
                                additionalProp1: string;
                                additionalProp2: string;
                                additionalProp3: string;
                            };
                            type: string;
                        };
                        value: {};
                    }>;
                    externalSource: string;
                    id: string;
                    leadTimeToShip: number;
                    maxOrderQuantity: number;
                    minOrderQuantity: number;
                    minShippingPrice: number;
                    minShippingPriceAdditional: number;
                    minShippingType: string;
                    minShippingZone: string;
                    minStockAlert: number;
                    packingType: string;
                    productUnit: string;
                    quantityPerItem: number;
                    status: string;
                    stock: number;
                    variant: {
                        attributeValues: Array<{
                            attribute: {
                                externalId: string;
                                id: string;
                                name: {
                                    additionalProp1: string;
                                    additionalProp2: string;
                                    additionalProp3: string;
                                };
                                type: string;
                            };
                            value: {};
                        }>;
                        attributesDetails: Array<{
                            attribute: {
                                id: string;
                                name: string;
                                status: string;
                                type: string;
                            };
                            attributeValue: {
                                id: string;
                                ranking: number;
                                status: string;
                                value: string;
                            };
                        }>;
                        description: string;
                        ean: string;
                        externalId: string;
                        id: string;
                        mpn: string;
                        name: string;
                        productMediaInfoDTO: {
                            isMain: boolean;
                            urls: Array<{
                                formatType: string;
                                heightInPx: number;
                                sizeType: string;
                                url: string;
                                widthInPx: number;
                            }>;
                        };
                        productPictures: Array<{
                            isMain: boolean;
                            urls: Array<{
                                formatType: string;
                                heightInPx: number;
                                sizeType: string;
                                url: string;
                                widthInPx: number;
                            }>;
                        }>;
                        skuProduct: string;
                        skuVariant: string;
                        status: string;
                    };
                };
                offerPrice: {
                    customerAccountId: string;
                    customerTagId: string;
                    externalId: string;
                    id: string;
                    itemPerPack: number;
                    offerPriceType: string;
                    priceRanges: Array<{
                        discountPrice: {
                            itemPrice: number;
                            itemPriceTTC: number;
                            unitPrice: number;
                            unitPriceTTC: number;
                        };
                        price: {
                            itemPrice: number;
                            itemPriceTTC: number;
                            unitPrice: number;
                            unitPriceTTC: number;
                        };
                        quantity: number;
                    }>;
                };
                supplier: {
                    customFieldValues: Array<{
                        customField: {
                            externalId: string;
                            externalSource: string;
                            id: string;
                            mandatory: boolean;
                            name: {
                                additionalProp1: string;
                                additionalProp2: string;
                                additionalProp3: string;
                            };
                            role: string;
                            sealedTarget: string;
                            status: string;
                            type: string;
                        };
                        value: {};
                    }>;
                    id: string;
                    name: string;
                    returnPolicy: string;
                    supplierRating: string;
                };
            };
            product: {
                attributeValues: Array<{
                    attribute: {
                        externalId: string;
                        id: string;
                        name: {
                            additionalProp1: string;
                            additionalProp2: string;
                            additionalProp3: string;
                        };
                        type: string;
                    };
                    value: {};
                }>;
                brand: string;
                classificationCategory: {
                    externalId: string;
                    externalSource: string;
                    id: string;
                    name: string;
                };
                description: {
                    additionalProp1: string;
                    additionalProp2: string;
                    additionalProp3: string;
                };
                externalId: string;
                externalSource: string;
                id: string;
                name: {
                    additionalProp1: string;
                    additionalProp2: string;
                    additionalProp3: string;
                };
                productPictures: Array<{
                    isMain: boolean;
                    urls: Array<{
                        formatType: string;
                        heightInPx: number;
                        sizeType: string;
                        url: string;
                        widthInPx: number;
                    }>;
                }>;
                productStatus: string;
                productUnit: {
                    id: string;
                    type: string;
                    unit: string;
                };
                sku: string;
                tags: Array<{
                    id: string;
                    name: string;
                }>;
            };
            productReviewRatings: {
                countRating: number;
                rating: number;
            };
        }>;
        empty: boolean;
        first: boolean;
        last: boolean;
        number: number;
        numberOfElements: number;
        pageable: {
            offset: number;
            pageNumber: number;
            pageSize: number;
            paged: boolean;
            sort: Array<{
                ascending: boolean;
                descending: boolean;
                direction: string;
                ignoreCase: boolean;
                nullHandling: string;
                property: string;
            }>;
            unpaged: boolean;
        };
        size: number;
        sort: Array<{
            ascending: boolean;
            descending: boolean;
            direction: string;
            ignoreCase: boolean;
            nullHandling: string;
            property: string;
        }>;
        totalElements: number;
        totalPages: number;
    };
}

export interface CustomerAccountUsersRaw {
    content: Array<{
        customerAccount: Array<{
            id: string;
            name: string;
        }>;
        customerUser: {
            civility: string;
            createdAt: string;
            customFieldValues: Array<{
                customField: {
                    externalId: string;
                    externalSource: string;
                    id: string;
                    mandatory: boolean;
                    name: {
                        additionalProp1: string;
                        additionalProp2: string;
                        additionalProp3: string;
                    };
                    role: string;
                    sealedTarget: string;
                    status: string;
                    type: string;
                };
                value: {};
            }>;
            email: string;
            externalId: string;
            firstName: string;
            groups: Array<string>;
            id: string;
            lastName: string;
            mainOrganisationId: string;
            organisations: Array<{
                id: string;
                name: string;
            }>;
            phone: string;
            status: string;
            updatedAt: string;
        };
    }>;
    currentPage: number;
    pageSize: number;
    pagesCount: number;
    totalElementsCount: number;
}

export interface CustomerAccountRaw {
    accountIds: Array<string>;
    customerAccount: Array<{
        id: string;
        name: string;
    }>;
    civility: string;
    createdAt: string;
    customFieldValues: Array<{
        customField: {
            externalId: string;
            externalSource: string;
            id: string;
            mandatory: boolean;
            name: {
                additionalProp1: string;
                additionalProp2: string;
                additionalProp3: string;
            };
            role: string;
            sealedTarget: string;
            status: string;
            type: string;
        };
        value: any;
    }>;
    email: string;
    externalId: string;
    firstName: string;
    groups: Array<string>;
    id: string;
    lastName: string;
    mainOrganisationId: string;
    organisations: Array<{
        id: string;
        name: string;
    }>;
    phone: string;
    status: string;
    updatedAt: string;
}

export interface BuyingList {
    buyingListItems: Array<{
        id: string;
        offerInventory: {
            brand: string;
            currency: string;
            customFieldValues: Array<{
                customField: {
                    externalId: string;
                    id: string;
                    name: {
                        additionalProp1: string;
                        additionalProp2: string;
                        additionalProp3: string;
                    };
                    type: string;
                };
                value: {};
            }>;
            externalSource: string;
            id: string;
            leadTimeToShip: number;
            maxOrderQuantity: number;
            minOrderQuantity: number;
            minShippingPrice: number;
            minShippingPriceAdditional: number;
            minShippingType: string;
            minShippingZone: string;
            minStockAlert: number;
            packingType: string;
            productUnit: string;
            quantityPerItem: number;
            status: string;
            stock: number;
            variant: {
                attributeValues: Array<{
                    attribute: {
                        externalId: string;
                        id: string;
                        name: {
                            additionalProp1: string;
                            additionalProp2: string;
                            additionalProp3: string;
                        };
                        type: string;
                    };
                    value: {};
                }>;
                attributesDetails: Array<{
                    attribute: {
                        id: string;
                        name: string;
                        status: string;
                        type: string;
                    };
                    attributeValue: {
                        id: string;
                        ranking: number;
                        status: string;
                        value: string;
                    };
                }>;
                description: string;
                ean: string;
                externalId: string;
                id: string;
                info: {
                    description: string;
                    ean: string;
                    mpn: string;
                    name: string;
                    sku: string;
                };
                mpn: string;
                name: string;
                productMediaInfoDTO: {
                    isMain: boolean;
                    urls: Array<{
                        formatType: string;
                        heightInPx: number;
                        sizeType: string;
                        url: string;
                        widthInPx: number;
                    }>;
                };
                productPictures: Array<{
                    isMain: boolean;
                    urls: Array<{
                        formatType: string;
                        heightInPx: number;
                        sizeType: string;
                        url: string;
                        widthInPx: number;
                    }>;
                }>;
                skuProduct: string;
                skuVariant: string;
                status: string;
            };
        };
        offerPrice: {
            customerAccountId: string;
            customerTagId: string;
            externalId: string;
            id: string;
            itemPerPack: number;
            offerPriceType: string;
            priceRanges: Array<{
                discountPrice: {
                    itemPrice: number;
                    itemPriceTTC: number;
                    unitPrice: number;
                    unitPriceTTC: number;
                };
                price: {
                    itemPrice: number;
                    itemPriceTTC: number;
                    unitPrice: number;
                    unitPriceTTC: number;
                };
                quantity: number;
            }>;
        };
        quantity: number;
        supplier: {
            customFieldValues: Array<{
                customField: {
                    externalId: string;
                    externalSource: string;
                    id: string;
                    mandatory: boolean;
                    name: {
                        additionalProp1: string;
                        additionalProp2: string;
                        additionalProp3: string;
                    };
                    role: string;
                    sealedTarget: string;
                    status: string;
                    type: string;
                };
                value: {};
            }>;
            id: string;
            name: string;
            returnPolicy: string;
            supplierRating: string;
        };
    }>;
    createdAt: string;
    customerUserId: string;
    id: string;
    name: string;
}

export type OfferResponse = {
    estimatedDeliveryDates: Array<{
        code: string;
        deliveryTimeRange: {
            earliestDeliveryDate: string;
            latestDeliveryDate: string;
        };
        label: string;
        shippingPriceUnit: number;
        shippingZone: {
            code: string;
            label: string;
        };
    }>;
    offerInventory: {
        brand: string;
        currency: string;
        customFieldValues: Array<{
            customField: {
                externalId: string;
                id: string;
                name: {
                    additionalProp1: string;
                    additionalProp2: string;
                    additionalProp3: string;
                };
                type: string;
            };
            value: {};
        }>;
        externalSource: string;
        id: string;
        leadTimeToShip: number;
        maxOrderQuantity: number;
        minOrderQuantity: number;
        minShippingPrice: number;
        minShippingPriceAdditional: number;
        minShippingType: string;
        minShippingZone: string;
        minStockAlert: number;
        packingType: string;
        productUnit: string;
        quantityPerItem: number;
        status: string;
        stock: number;
        variant: {
            attributeValues: Array<{
                attribute: {
                    externalId: string;
                    id: string;
                    name: {
                        additionalProp1: string;
                        additionalProp2: string;
                        additionalProp3: string;
                    };
                    type: string;
                };
                value: {};
            }>;
            attributesDetails: Array<{
                attribute: {
                    id: string;
                    name: string;
                    status: string;
                    type: string;
                };
                attributeValue: {
                    id: string;
                    ranking: number;
                    status: string;
                    value: string;
                };
            }>;
            description: string;
            ean: string;
            externalId: string;
            id: string;
            info: {
                description: string;
                ean: string;
                mpn: string;
                name: string;
                sku: string;
            };
            mpn: string;
            name: string;
            productMediaInfoDTO: {
                isMain: boolean;
                urls: Array<{
                    formatType: string;
                    heightInPx: number;
                    sizeType: string;
                    url: string;
                    widthInPx: number;
                }>;
            };
            productPictures: Array<{
                isMain: boolean;
                urls: Array<{
                    formatType: string;
                    heightInPx: number;
                    sizeType: string;
                    url: string;
                    widthInPx: number;
                }>;
            }>;
            skuProduct: string;
            skuVariant: string;
            status: string;
        };
    };
    offerPrices: Array<{
        customerAccountId: string;
        customerTagId: string;
        externalId: string;
        id: string;
        itemPerPack: number;
        offerPriceType: string;
        priceRanges: Array<{
            discountPrice: {
                itemPrice: number;
                itemPriceTTC: number;
                unitPrice: number;
                unitPriceTTC: number;
            };
            price: {
                itemPrice: number;
                itemPriceTTC: number;
                unitPrice: number;
                unitPriceTTC: number;
            };
            quantity: number;
        }>;
    }>;
    supplier: {
        customFieldValues: Array<{
            customField: {
                externalId: string;
                externalSource: string;
                id: string;
                mandatory: boolean;
                name: {
                    additionalProp1: string;
                    additionalProp2: string;
                    additionalProp3: string;
                };
                role: string;
                sealedTarget: string;
                status: string;
            };
            value: {};
        }>;
        id: string;
        name: string;
        returnPolicy: string;
        supplierRating: string;
    };
};

export interface Sort {
    ascending: boolean;
    descending: boolean;
    direction: string;
    ignoreCase: boolean;
    nullHandling: string;
    property: string;
}

export interface LogisticOrderLinesResponse {
    content: OrderLine[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: {
        offset: number;
        pageNumber: number;
        pageSize: number;
        paged: boolean;
        sort: Sort;
        unpaged: boolean;
    };
    size: number;
    sort: Sort[];
    totalElements: number;
    totalPages: number;
}

export type LogisticOrderAccountingDocumentsResponse = Array<{
    dateUploaded: string;
    fileName: string;
    id: string;
    type: string;
}>;

export interface AuthenticatedUserUser {
    civility: string;
    createdAt: string;
    customFieldValues: Array<{
        customField: {
            externalId: string;
            externalSource: string;
            id: string;
            mandatory: boolean;
            name: {
                additionalProp1: string;
                additionalProp2: string;
                additionalProp3: string;
            };
            role: string;
            sealedTarget: string;
            status: string;
            type: string;
        };
        value: any;
    }>;
    email: string;
    firstName: string;
    groups: [string];
    id: string;
    lastName: string;
    locale: string;
    password: string;
    phone: string;
    status: string;
    updatedAt: string;
}

export interface AuthenticatedUser {
    account: {
        externalId: string;
        id: string;
        name: string;
    };
    accounts: [
        {
            externalId: string;
            id: string;
            name: string;
        },
    ];
    user: AuthenticatedUserUser;
}
