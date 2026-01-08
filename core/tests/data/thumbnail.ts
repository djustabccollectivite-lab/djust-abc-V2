import { DataType } from '~/core/interfaces/ICart';
import { Product } from '~/core/interfaces/IProduct';
import { ProductThumbnail } from '~/core/interfaces/IThumbnail';

export const thumbnailProduct: ProductThumbnail = {
    product: {
        id: '46602',
        sku: '10129',
        name: {
            EN: 'Bottle of water',
        },
        description: {
            FR: 'WATER',
        },
        productStatus: 'ACTIVE',
        brand: 'DJUST',
        classificationCategory: {
            id: '10115',
            name: 'Groceries',
            externalId: '58',
            externalSource: 'MIRAKL',
        },
        attributeValues: [
            {
                attribute: {
                    externalId: 'string',
                    id: 'string',
                    name: {
                        additionalProp1: 'string',
                        additionalProp2: 'string',
                        additionalProp3: 'string',
                    },
                    type: DataType.LONG_TEXT,
                },
                value: {},
            },
        ],
        productUnit: {
            type: 'VOLUME_METRIC',
            unit: 'L',
        },
        imageLinks: [
            'https://s3.eu-west-3.amazonaws.com/djust.dam.noprod/1644592496499-Bouteille-plastique_default_default_default_default_default.jpg',
        ],
        productPictures: [
            {
                urls: [
                    {
                        widthInPx: 200,
                        heightInPx: 200,
                        formatType: 'JPG',
                        sizeType: 'large',
                        url: 'https://s3.eu-west-3.amazonaws.com/djust.dam.noprod/1644592496499-Bouteille-plastique_default_default_default_default_default_large.jpg',
                    },
                    {
                        widthInPx: 200,
                        heightInPx: 200,
                        formatType: 'JPG',
                        sizeType: 'small',
                        url: 'https://s3.eu-west-3.amazonaws.com/djust.dam.noprod/1644592496499-Bouteille-plastique_default_default_default_default_default_small.jpg',
                    },
                    {
                        widthInPx: 200,
                        heightInPx: 200,
                        formatType: 'JPG',
                        sizeType: 'medium',
                        url: 'https://s3.eu-west-3.amazonaws.com/djust.dam.noprod/1644592496499-Bouteille-plastique_default_default_default_default_default_medium.jpg',
                    },
                    {
                        widthInPx: 200,
                        heightInPx: 200,
                        formatType: 'GIF',
                        sizeType: 'small',
                        url: 'https://s3.eu-west-3.amazonaws.com/djust.dam.noprod/1644592496499-Bouteille-plastique_default_default_default_default_default_small.gif',
                    },
                    {
                        widthInPx: 200,
                        heightInPx: 200,
                        formatType: 'WEBP',
                        sizeType: 'large',
                        url: 'https://s3.eu-west-3.amazonaws.com/djust.dam.noprod/1644592496499-Bouteille-plastique_default_default_default_default_default_large.webp',
                    },
                    {
                        widthInPx: 200,
                        heightInPx: 200,
                        formatType: 'WEBP',
                        sizeType: 'small',
                        url: 'https://s3.eu-west-3.amazonaws.com/djust.dam.noprod/1644592496499-Bouteille-plastique_default_default_default_default_default_small.webp',
                    },
                    {
                        widthInPx: 200,
                        heightInPx: 200,
                        formatType: 'WEBP',
                        sizeType: 'medium',
                        url: 'https://s3.eu-west-3.amazonaws.com/djust.dam.noprod/1644592496499-Bouteille-plastique_default_default_default_default_default_medium.webp',
                    },
                    {
                        widthInPx: 200,
                        heightInPx: 200,
                        formatType: 'GIF',
                        sizeType: 'large',
                        url: 'https://s3.eu-west-3.amazonaws.com/djust.dam.noprod/1644592496499-Bouteille-plastique_default_default_default_default_default_large.gif',
                    },
                    {
                        widthInPx: 200,
                        heightInPx: 200,
                        formatType: 'GIF',
                        sizeType: 'medium',
                        url: 'https://s3.eu-west-3.amazonaws.com/djust.dam.noprod/1644592496499-Bouteille-plastique_default_default_default_default_default_medium.gif',
                    },
                ],
                isMain: true,
            },
        ],
        navigationCategories: [
            {
                id: '1',
                name: 'boisson',
            },
        ],
        specifications: [
            {
                attribute: 'Test spec',
                value: 'specspecspecspecspecspec',
            },
        ],
        tags: [
            {
                id: '47051',
                name: 'BIO',
            },
        ],
        djustProductUuid: '71c12440-2b13-4d15-b9a6-08a54fbf367f',
        mpn: '1234',
        gtin: '5678',
        externalId: 'null',
        externalSource: 'CLIENT',
    },
    productReviewRatings: {
        rating: 5,
        countRating: 5,
    },
    attributeViewDetails: [],
    bestOffer: {
        estimatedDeliveryDates: {
            code: 'EXP',
            deliveryTimeRange: {
                earliestDeliveryDate: '2023-04-14T12:14:53.972Z',
                latestDeliveryDate: '2023-04-15T12:14:53.972Z',
            },
            label: 'Express',
            shippingPriceUnit: 5,
            shippingZone: {
                code: 'FR',
                label: 'France',
            },
        },
        offerInventory: {
            id: '46708',
            quantityPerItem: 1.5,
            stock: 3,
            externalSource: 'CLIENT',
            brand: 'brand',
            status: 'ACTIVE',
            currency: 'EUR',
            packingType: 'BOTTLE',
            productUnit: 'L',
            variant: {
                id: '46653',
                mpn: '',
                skuProduct: '10129',
                skuVariant: '10130',
                name: 'Bottle of water',
                externalId: 'externalId',
                status: 'ACTIVE',
                mainImageUrl:
                    'https://s3.eu-west-3.amazonaws.com/djust.dam.noprod/1644592496499-Bouteille-plastique_default.jpg',
                productMediaInfoDTO: {
                    urls: [
                        {
                            widthInPx: 200,
                            heightInPx: 200,
                            formatType: 'JPG',
                            sizeType: 'large',
                            url: 'https://s3.eu-west-3.amazonaws.com/djust.dam.noprod/1644592496499-Bouteille-plastique_default_default_default_default_default_large.jpg',
                        },
                    ],
                    isMain: true,
                },
                attributeValues: [
                    {
                        attribute: {
                            externalId: 'string',
                            id: 'string',
                            name: {
                                additionalProp1: 'string',
                                additionalProp2: 'string',
                                additionalProp3: 'string',
                            },
                            type: DataType.LONG_TEXT,
                        },
                        value: {},
                    },
                ],
                attributesDetails: [
                    {
                        attribute: {
                            id: '1',
                            name: 'bottle',
                            type: 'text',
                            status: 'active',
                        },
                        attributeValue: {
                            id: '0',
                            value: 'value',
                            ranking: 1,
                            status: 'Active',
                        },
                    },
                ],
                default: true,
            },
            maxOrderQuantity: 5,
            minOrderQuantity: 0,
            minStockAlert: 0,
            minShippingPrice: 0,
            minShippingPriceAdditional: 0,
            minShippingType: 0,
            minShippingZone: 'french',
            leadTimeToShip: 0,
            customFieldValues: [
                {
                    customField: {
                        externalId: '54120',
                        id: '39951',
                        name: 'To delete custom field',
                        type: 'LIST_TEXT',
                    },
                    value: {
                        customField: {
                            type: 'STRING',
                            id: '39951',
                            name: {
                                FR: 'To delete custom field',
                                EN: 'To delete custom field',
                            },
                            externalId: '54120',
                            externalSource: 'string',
                            mandatory: false,
                            status: 'ACTIVE',
                            sealedTarget: 'string',
                            role: null,
                        },
                        value: 'value',
                        type: 'STRING',
                    },
                },
            ],
        },
        supplier: {
            id: '47001',
            name: 'FR Boisson',
        },
        offerPrice: {
            id: '46759',
            externalId: '1',
            offerPriceType: 'PUBLIC',
            itemPerPack: 1,
            customerAccountId: '1',
            customerTagId: '1',
            priceRanges: [
                {
                    quantity: 1,
                    price: {
                        itemPrice: 1,
                        itemPriceTTC: 1,
                        unitPrice: 0.667,
                        unitPriceTTC: 0.667,
                    },
                    discountPrice: {
                        itemPrice: 1,
                        itemPriceTTC: 1,
                        unitPrice: 0.667,
                        unitPriceTTC: 0.667,
                    },
                },
                {
                    quantity: 10,
                    price: {
                        itemPrice: 0.9,
                        itemPriceTTC: 0.9,
                        unitPrice: 0.6,
                        unitPriceTTC: 0.6,
                    },
                    discountPrice: {
                        itemPrice: 1,
                        itemPriceTTC: 1,
                        unitPrice: 0.667,
                        unitPriceTTC: 0.667,
                    },
                },
            ],
        },
    },
};

export const product: Product = {
    id: '46602',
    sku: '10129',
    name: {
        EN: 'Bottle of water',
    },
    description: {
        FR: 'WATER',
    },
    productStatus: 'ACTIVE',
    brand: 'DJUST',
    classificationCategory: {
        id: '10115',
        name: 'Groceries',
        externalId: '58',
        externalSource: 'MIRAKL',
    },
    attributeValues: [
        {
            attribute: {
                externalId: 'string',
                id: 'string',
                name: {
                    additionalProp1: 'string',
                    additionalProp2: 'string',
                    additionalProp3: 'string',
                },
                type: DataType.LONG_TEXT,
            },
            value: {},
        },
    ],
    productUnit: {
        type: 'VOLUME_METRIC',
        unit: 'L',
    },
    imageLinks: [
        'https://s3.eu-west-3.amazonaws.com/djust.dam.noprod/1644592496499-Bouteille-plastique_default_default_default_default_default.jpg',
    ],
    productPictures: [
        {
            urls: [
                {
                    widthInPx: 200,
                    heightInPx: 200,
                    formatType: 'JPG',
                    sizeType: 'large',
                    url: 'https://s3.eu-west-3.amazonaws.com/djust.dam.noprod/1644592496499-Bouteille-plastique_default_default_default_default_default_large.jpg',
                },
                {
                    widthInPx: 200,
                    heightInPx: 200,
                    formatType: 'JPG',
                    sizeType: 'small',
                    url: 'https://s3.eu-west-3.amazonaws.com/djust.dam.noprod/1644592496499-Bouteille-plastique_default_default_default_default_default_small.jpg',
                },
                {
                    widthInPx: 200,
                    heightInPx: 200,
                    formatType: 'JPG',
                    sizeType: 'medium',
                    url: 'https://s3.eu-west-3.amazonaws.com/djust.dam.noprod/1644592496499-Bouteille-plastique_default_default_default_default_default_medium.jpg',
                },
                {
                    widthInPx: 200,
                    heightInPx: 200,
                    formatType: 'GIF',
                    sizeType: 'small',
                    url: 'https://s3.eu-west-3.amazonaws.com/djust.dam.noprod/1644592496499-Bouteille-plastique_default_default_default_default_default_small.gif',
                },
                {
                    widthInPx: 200,
                    heightInPx: 200,
                    formatType: 'WEBP',
                    sizeType: 'large',
                    url: 'https://s3.eu-west-3.amazonaws.com/djust.dam.noprod/1644592496499-Bouteille-plastique_default_default_default_default_default_large.webp',
                },
                {
                    widthInPx: 200,
                    heightInPx: 200,
                    formatType: 'WEBP',
                    sizeType: 'small',
                    url: 'https://s3.eu-west-3.amazonaws.com/djust.dam.noprod/1644592496499-Bouteille-plastique_default_default_default_default_default_small.webp',
                },
                {
                    widthInPx: 200,
                    heightInPx: 200,
                    formatType: 'WEBP',
                    sizeType: 'medium',
                    url: 'https://s3.eu-west-3.amazonaws.com/djust.dam.noprod/1644592496499-Bouteille-plastique_default_default_default_default_default_medium.webp',
                },
                {
                    widthInPx: 200,
                    heightInPx: 200,
                    formatType: 'GIF',
                    sizeType: 'large',
                    url: 'https://s3.eu-west-3.amazonaws.com/djust.dam.noprod/1644592496499-Bouteille-plastique_default_default_default_default_default_large.gif',
                },
                {
                    widthInPx: 200,
                    heightInPx: 200,
                    formatType: 'GIF',
                    sizeType: 'medium',
                    url: 'https://s3.eu-west-3.amazonaws.com/djust.dam.noprod/1644592496499-Bouteille-plastique_default_default_default_default_default_medium.gif',
                },
            ],
            isMain: true,
        },
    ],
    navigationCategories: [
        {
            id: '1',
            name: 'boisson',
        },
    ],
    specifications: [
        {
            attribute: 'Test spec',
            value: 'specspecspecspecspecspec',
        },
    ],
    tags: [
        {
            id: '47051',
            name: 'BIO',
        },
    ],
    djustProductUuid: '71c12440-2b13-4d15-b9a6-08a54fbf367f',
    mpn: '1234',
    gtin: '5678',
    externalId: 'null',
    externalSource: 'CLIENT',
};
