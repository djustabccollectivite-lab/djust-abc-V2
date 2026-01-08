import { DataType, FoProductVariant } from '~/core/interfaces/ICart';
import { ProductVariant } from '../../interfaces/IOffer';
import { Product, ProductReview, Review } from '../../interfaces/IProduct';

export const productVariantTest: ProductVariant = {
    id: '99',
    version: 0,
    createdAt: '2021-08-02T14:28:56.995Z',
    updatedAt: '2021-09-15T11:50:55.725276Z',
    skuProduct: 'string',
    skuVariant: 'string',
    name: 'VARIANT TEST 1',
    externalReference: '111',
    externalId: null,
    externalSource: 'string',
    gtin: 'GTIN',
    mpn: 'NPM',
    mainImageUrl: 'string',
    additionalImageLink: ['string'],
    status: 'ACTIVE',
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
};

export const foproductVariantTest: FoProductVariant = {
    id: '99',
    skuProduct: 'string',
    skuVariant: 'string',
    externalId: 'externalId',
    name: 'VARIANT TEST 1',
    mainImageUrl: 'string',
    status: 'ACTIVE',
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
    attributesDetails: [],
    attributeValues: [
        {
          attribute: {
            externalId: "string",
            id: "string",
            name: {
              additionalProp1: "string",
              additionalProp2: "string",
              additionalProp3: "string"
            },
            type: DataType.LONG_TEXT
          },
          value: {}
        }
      ],
    default: true,
    mpn: '',
};

export const productDefault: Product = {
    id: '0',
    sku: 'string',
    name: {
        EN: 'String',
    },
    description: {
        FR: 'String ',
    },
    productStatus: 'NEW',
    brand: 'string',
    classificationCategory: {
        id: '0',
        name: 'string',
        externalId: 'string',
        externalSource: 'MIRAKL',
    },
    attributeValues: [
        {
            attribute: {
              externalId: "string",
              id: "string",
              name: {
                additionalProp1: "string",
                additionalProp2: "string",
                additionalProp3: "string"
              },
              type: DataType.LONG_TEXT
            },
            value: {}
          }
    ],
    productUnit: {
        type: 'ITEM',
        unit: 'string',
    },
    imageLinks: ['string'],
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
            id: '0',
            name: 'string',
        },
    ],
    specifications: [
        {
            attribute: 'string',
            value: 'string',
        },
    ],
    tags: [
        {
            id: '0',
            name: 'string',
        },
    ],
    djustProductUuid: 'string',
    mpn: 'string',
    gtin: 'string',
    externalId: 'string',
    externalSource: 'MIRAKL',
};

export const productReview: ProductReview = {
    productReviews: {
        id: '1',
        version: 1,
        createdAt: 'xxx',
        customerUserId: '2',
        productId: '2',
        rating: 4,
        message: 'message',
    },
    user: {
        id: '2',
        specificUserId: '2',
        email: 'email@email;fr',
        firstName: 'firstname',
        lastName: 'lastname',
    },
};

export const reviewDefault: Review = {
    id: '1',
    version: 1,
    createdAt: 'xxx',
    customerUserId: '2',
    productId: '2',
    rating: 4,
    message: 'message',
};
