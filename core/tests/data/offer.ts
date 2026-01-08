import { FoBestOfferPrice, FoOfferInventoryWithPrices } from './../../interfaces/IOffer';
import { OfferPrice, OfferInventory, DeliveryDates } from '../../interfaces/IOffer';
import { SupplierData } from './supplier';
import { DataType } from '~/core/interfaces/ICart';

export const offerPriceDefault: OfferPrice = {
    id: '1',
    externalId:'1',
    priceRanges: [
        {
            quantity: 1,
            price: {
                itemPrice: 100,
                itemPriceTTC: 120,
                unitPrice: 100,
                unitPriceTTC: 120,
            },
            discountPrice: {
                itemPrice: 0,
                itemPriceTTC: 0,
                unitPrice: 0,
                unitPriceTTC: 0,
            },
        },
    ],
    offerPriceType: 'PUBLIC',
    itemPerPack: 1,
    customerAccountId: '0',
    customerTagId: '0',
};

export const offerInventoryDefault: OfferInventory = {
    id: '3',
    quantityPerItem: 0,
    stock: 1000,
    externalSource: 'MIRAKL',
    status: 'ACTIVE',
    currency: 'USD',
    packingType: 'BOX',
    brand: 'brand',
    productUnit: 'string',
    variant: {
        id: '0',
        mpn: '',
        skuProduct: 'string',
        skuVariant: 'string',
        name: 'string',
        mainImageUrl: 'string',
        externalId: 'externalId',
        status: "ACTIVE",
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
                    id: '0',
                    name: 'string',
                    type: 'string',
                    status: 'string',
                },
                attributeValue: {
                    id: '0',
                    value: 'string',
                    ranking: 0,
                    status: 'string',
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
};

export const estimatesDates: DeliveryDates = {
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
};

export const bestOffer: FoBestOfferPrice = {
    offerPrice: offerPriceDefault,
    offerInventory: offerInventoryDefault,
    supplier: SupplierData,
    estimatedDeliveryDates: estimatesDates,
};

export const foOfferInventoryWithPrices: FoOfferInventoryWithPrices = {
    offerPrices: [],
    offerInventory: offerInventoryDefault,
    supplier: SupplierData,
};
