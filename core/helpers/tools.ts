// The file is for formatting & calculing functions used only by getters
// TODO: Every formatting Function should start with "format" // exemple :formatCurrencyAuto
// TODO: Every calculing Function should start with "calcul" // exemple :formatCurrencyAuto

import { CustomFieldData, FoCustomFieldValue } from '../interfaces/ICustomField';
import { PriceRange } from '../interfaces/IOffer';
import { OrderStatus, OrderStatusNew } from '../interfaces/IOrder';
import { PaymentStatus, PaymentStatusNew } from '../interfaces/IPayment';
import { MediaInfoDTO, ProductFilters, ProductMediaInfoDTO } from '../interfaces/IProduct';
import { Address } from '../interfaces/IQuote';

/**
 * @param {number} price - Price to format.
 * @param {string} currency - Currency formatting is based on.
 *
 * @returns {string} Formatted result in html.
 */
const formatCurrencyAuto = (price: number, currency: string, maximumFractionDigits: number = 2): string => {
    let country = '';

    switch (currency) {
        case 'EUR':
            country = 'fr-FR';
            break;
        case 'USD':
            country = 'en-EN';
            break;
        case 'CNY':
            country = 'en-IN';
            break;
        default:
            country = 'en-EN';
            break;
    }

    const formatter = new Intl.NumberFormat(country, {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits,
    });
    const amount = price || 0;
    const result = formatter
        .formatToParts(amount)
        .map(({ type, value }) => {
            if (type === 'decimal' || type === 'fraction') return `<span class="currency-fraction">${value}</span>`;
            return value;
        })
        .reduce((string, part) => string + part);

    return `<span class="currency-fraction">${result}</span>`;
};

/**
 * @param {PriceRange[]} priceRanges
 * @param {number} quantity
 *
 * @returns {number}
 */
const calculDetermineProductPrice = (priceRanges: PriceRange[], quantity: number): number => {
    let result = 0;

    const getPrice = (priceRange: PriceRange) => {
        if (!priceRange.discountPrice) return priceRange.price.itemPrice;
        return priceRange.discountPrice.itemPrice;
    };

    priceRanges.forEach((priceRange, index) => {
        if (
            (priceRanges[index + 1] && priceRange.quantity <= quantity && priceRange.quantity + 1 < quantity) ||
            priceRange.quantity <= quantity
        )
            result = getPrice(priceRange);
    });
    return result;
};

/**
 *
 * @param {PriceRanges[]} pricesRanges
 * @param {number} quantity
 *
 * @returns {number}
 */
const calculDetermineProductPriceWithVat = (priceRanges: PriceRange[], quantity: number): number => {
    let result = 0;

    const getPrice = (priceRange: PriceRange) => {
        if (!priceRange.discountPrice)
            return priceRange.price.itemPriceTTC === 0 ? priceRange.price.itemPrice : priceRange.price.itemPriceTTC;
        return priceRange.discountPrice.itemPriceTTC === 0
            ? priceRange.discountPrice.itemPrice
            : priceRange.discountPrice.itemPriceTTC;
    };

    priceRanges.forEach((priceRange, index) => {
        if (
            (priceRanges[index + 1] && priceRange.quantity <= quantity && priceRange.quantity + 1 < quantity) ||
            priceRange.quantity <= quantity
        ) {
            result = getPrice(priceRange);
        }
    });

    return result;
};

/**
 * @param {PriceRange[]} priceRanges
 * @param {number} quantity
 * @returns {number}
 */
const calculDetermineVat = (priceRanges: PriceRange[], quantity: number): number => {
    let result = 0;

    const getPrice = (priceRange: PriceRange) => {
        if (!priceRange.discountPrice) return priceRange.price.itemPriceTTC - priceRange.price.itemPrice;
        return priceRange.discountPrice.itemPriceTTC - priceRange.discountPrice.itemPrice;
    };

    priceRanges.forEach((priceRange, index) => {
        if (
            (priceRanges[index + 1] && priceRange.quantity <= quantity && priceRange.quantity + 1 < quantity) ||
            priceRange.quantity <= quantity
        ) {
            result = getPrice(priceRange);
        }
    });
    return result;
};

/**
 * @param {Address} address
 * @returns {string}
 */
const formatAddress = (address: Address): string =>
    address ? `${address.fullName} - ${address.address} ${address.city} ${address.country} ${address.zipcode}` : 'vide';

function getCustomFieldData(customField: FoCustomFieldValue, locale: any): CustomFieldData {
    const checkName = Object.keys(customField.customField.name).includes(locale);
    const data: CustomFieldData = {
        name: checkName
            ? customField.customField.name[locale]
            : customField.customField.name[Object.keys(customField.customField.name)[0]],
        type: customField.customField.type,
        value: customField?.value.value as string,
        externalId: customField?.customField?.externalId,
    };
    return data;
}

const orderBadgeClass: Record<OrderStatus, string> = {
    WAITING_CUSTOMER_APPROVAL: 'dj-badge LWA',
    WAITING_SUPPLIER_APPROVAL: 'dj-badge LA',
    DECLINED_BY_CUSTOMER: 'dj-badge LD',
    DECLINED_BY_SUPPLIER: 'dj-badge LD',
    DRAFT_ORDER_ON_HOLD: 'dj-badge DOH lelele',
    WAITING_FULFILLMENT: 'dj-badge LWF',
    WAITING_SHIPMENT: 'dj-badge LWS',
    PARTIALLY_SHIPPED: 'dj-badge LS',
    PARTIALLY_CANCELED: 'dj-badge LWS',
    ACCEPTED_BY_SUPPLIER: 'dj-badge LS',
    SHIPPED: 'dj-badge LWF',
    INCIDENT: 'dj-badge LI',
    COMPLETED: 'dj-badge LC',
    CANCELED: 'dj-badge LWS',
    ORDER_CREATED: 'dj-badge LS',
};

const orderBadgeClassNew: Record<OrderStatusNew, string> = {
    CREATING: 'dj-badge CREATING',
    ORDER_CREATED: 'dj-badge OC',
    DRAFT_ORDER: 'dj-badge DO',
    DRAFT_ORDER_ON_HOLD: 'dj-badge DOH',
    WAITING_CUSTOMER_APPROVAL: 'dj-badge WCA',
    WAITING_SUPPLIER_APPROVAL: 'dj-badge WSA',
    DECLINED_BY_CUSTOMER: 'dj-badge DC',
    DECLINED_BY_SUPPLIER: 'dj-badge DS',
    ACCEPTED_BY_SUPPLIER: 'dj-badge AS',
    WAITING_FULFILLMENT: 'dj-badge WF',
    WAITING_SHIPMENT: 'dj-badge WS',
    PARTIALLY_SHIPPED: 'dj-badge PS',
    SHIPPED: 'dj-badge S',
    COMPLETED: 'dj-badge COMPLETED',
    PARTIALLY_CANCELED: 'dj-badge PC',
    CANCELED: 'dj-badge CANCELED',
    INCIDENT: 'dj-badge I',
};

const paymentBadgeClass: Record<PaymentStatus, string> = {
    AUTHORIZED: 'dj-badge PA',
    PAID: 'dj-badge PP',
    REFUNDED: 'dj-badge REFUND',
    WAITING_REFUND: 'dj-badge REFUND',
    PARTIALLY_REFUNDED: 'dj-badge REFUND',
    WAITING_AUTHORIZATION: 'dj-badge REFUND',
    WAITING_PAYMENT: 'dj-badge REFUND',
    REFUSED: 'dj-badge REFUSED',
};

const paymentBadgeClassNew: Record<PaymentStatusNew, string> = {
    AUTHORIZED: 'dj-badge A',
    WAITING_AUTHORIZATION: 'dj-badge WA',
    WAITING_PAYMENT: 'dj-badge WP',
    PAID: 'dj-badge P',
    PARTIALLY_PAID: 'dj-badge PP',
    OVER_PAID: 'dj-badge OP',
    REFUSED: 'dj-badge REFUSED',
    WAITING_REFUND: 'dj-badge WR',
    PARTIALLY_REFUNDED: 'dj-badge PR',
    REFUNDED: 'dj-badge REFUNDED',
};

function getClosestBySomme(number: number, array: MediaInfoDTO[]): MediaInfoDTO {
    let current = array[0];
    const currentSome = array[0]?.heightInPx + array[0]?.widthInPx;

    let difference = Math.abs(number - currentSome);

    for (let i = 0; i < array.length; i++) {
        const somme = array[i].heightInPx + array[i].widthInPx;
        const newDifference = Math.abs(number - somme);

        if (newDifference < difference) {
            difference = newDifference;
            current = array[i];
        }
    }

    return current;
}

function getClosestByHeight(height: number, mediaList: MediaInfoDTO[]): MediaInfoDTO {
    let current = mediaList[0];
    const currentSome = mediaList[0] ? mediaList[0].heightInPx : 0;

    let difference = Math.abs(height - currentSome);
    let index = mediaList.length;
    while (index--) {
        const value = mediaList[index].heightInPx;
        const newDifference = Math.abs(height - value);
        if (newDifference < difference) {
            difference = newDifference;
            current = mediaList[index];
        }
    }
    return current;
}

function getClosestByWidth(number: number, array: MediaInfoDTO[]): MediaInfoDTO {
    let current = array[0];
    const currentSome = array[0] ? array[0].widthInPx : 0;

    let difference = Math.abs(number - currentSome);
    let index = array.length;
    while (index--) {
        const value = array[index].widthInPx;
        const newDifference = Math.abs(number - value);
        if (newDifference < difference) {
            difference = newDifference;
            current = array[index];
        }
    }
    return current;
}
function GetImageUrlByDimensions(media: ProductMediaInfoDTO, width: number, height: number): String {
    const result = media.urls.filter((e) => e.widthInPx >= width && e.heightInPx >= height);
    const somme = width + height;
    let finalResult = media.urls[0];

    if (result.length > 0) {
        finalResult = getClosestBySomme(somme, result);
    } else {
        finalResult = getClosestBySomme(somme, media.urls);
    }

    return finalResult ? finalResult?.url : '/img/product_placeholder.png';
}

function GetImageUrlByWidth(media: ProductMediaInfoDTO, width: number): String {
    const result = media.urls.filter((e) => e.widthInPx >= width);
    let finalResult = media.urls[0];
    if (result.length > 0) {
        finalResult = getClosestByWidth(width, result);
    } else {
        finalResult = getClosestByWidth(width, media.urls);
    }
    return finalResult?.url;
}

function GetImageUrlByHeight(media: ProductMediaInfoDTO, height: number): String {
    const result = media.urls.filter((e) => e.heightInPx >= height);
    let finalResult = media.urls[0];
    if (result.length > 0) {
        finalResult = getClosestByHeight(height, result);
    } else {
        finalResult = getClosestByHeight(height, media.urls);
    }
    return finalResult?.url;
}

function GetImageUrlBySizeType(media: ProductMediaInfoDTO, sizeType?: String): String {
    const result = media.urls.find((e) => e.sizeType === sizeType);
    if (result) {
        return result.url;
    } else {
        return media.urls[0].url;
    }
}
function OptimizeImageStoryblok(image, option): String {
    if (!image) return '';
    if (!option) return '';

    return `${image}/m/${option}`;
}

function generateLink(pagelink: string, _collection: string, query: ProductFilters): string {
    const params = new URLSearchParams();
    if (query.idType) {
        params.set('idType', query.idType);
    }

    if (query.filter_tag) {
        query.filter_tag.forEach((tag) => {
            if (tag) {
                params.append('filter_tag', tag);
            }
        });
    }

    if (query.filter_brand) {
        const combinedBrand = query.filter_brand.filter((brand) => brand).join(',');
        if (combinedBrand) {
            params.append('filter_brand', combinedBrand);
        }
    }

    if (query.filter_attribute) {
        const dedoublAttrib = [...new Set(query.filter_attribute)];
        dedoublAttrib.forEach((attribute) => {
            if (attribute) {
                params.append('filter_attribute', attribute);
            }
        });
    }
    if (query.filter_customField) {
        const dedoublCustomField = [...new Set(query.filter_customField)];
        dedoublCustomField.forEach((customField) => {
            if (customField) {
                params.append('filter_customField', customField);
            }
        });
    }
    if (query.customFieldsSupplier) {
        const combinedCFSupplier = query.customFieldsSupplier.filter((CFSupplier) => CFSupplier).join(',');
        if (combinedCFSupplier) {
            params.append('customFieldsSupplier', combinedCFSupplier);
        }
    }
    if (query.customFieldsOffer) {
        const combinedCFOffer = query.customFieldsOffer.filter((CFOffer) => CFOffer).join(',');
        if (combinedCFOffer) {
            params.append('customFieldsOffer', combinedCFOffer);
        }
    }
    if (query.customField) {
        const combinedCFOffer = query.customField.filter((CFOffer) => CFOffer).join(',');
        if (combinedCFOffer) {
            params.append('customField', combinedCFOffer);
        }
    }
    if (query.filter_supplier) {
        if (Array.isArray(query.filter_supplier)) {
            const combinedSupplier = query.filter_supplier.filter((supplier) => supplier).join(',');
            if (combinedSupplier) {
                params.set('filter_supplier', combinedSupplier);
            }
        } else {
            params.set('filter_supplier', query.filter_supplier);
        }
    }

    if (query.keyword) {
        params.set('keyword', query.keyword);
    }

    if (query.sort_by) {
        params.set('sort_by', query.sort_by);
    }
    if (query.page) {
        params.set('page', query.page);
    }
    if (query.size) {
        params.set('size', query.size);
    }

    const queryString = params.toString();
    const link = `${pagelink}?${queryString}`;

    return link;
}

function parseLink(link: string): ProductFilters {
    const url = new URL(link);
    const query: ProductFilters = {};

    if (url.searchParams) {
        url.searchParams.forEach((val, key) => {
            if (key === 'filter_tag') {
                if (query.filter_tag) {
                    query.filter_tag.push(val.replace(/%20/g, ' '));
                } else {
                    query.filter_tag = [val.replace(/%20/g, ' ')];
                }
            } else if (key === 'filter_brand') {
                if (val.includes(',')) {
                    query.filter_brand = val.split(',').map((item) => item.replace(/%20/g, ' '));
                } else {
                    query.filter_brand = [val.replace(/%20/g, ' ')];
                }
            } else if (key === 'keyword') {
                query.keyword = val.replace(/%20/g, ' ');
            } else if (key === 'filter_attribute') {
                if (query.filter_attribute) {
                    query.filter_attribute.push(val.replace(/%20/g, ' '));
                } else {
                    query.filter_attribute = [val.replace(/%20/g, ' ')];
                }
            } else if (key === 'filter_customField') {
                if (query.filter_customField) {
                    query.filter_customField.push(val.replace(/%20/g, ' '));
                } else {
                    query.filter_customField = [val.replace(/%20/g, ' ')];
                }
            } else if (key === 'filter_supplier') {
                if (val.includes(',')) {
                    query.filter_supplier = val.split(',').map((item) => item.replace(/%20/g, ' '));
                } else {
                    query.filter_supplier = [val.replace(/%20/g, ' ')];
                }
            } else if (key === 'customFieldsSupplier') {
                if (val.includes(',')) {
                    query.customFieldsSupplier = val.split(',').map((item) => item.replace(/%20/g, ' '));
                } else {
                    query.customFieldsSupplier = [val.replace(/%20/g, ' ')];
                }
            } else if (key === 'customFieldsOffer') {
                if (val.includes(',')) {
                    query.customFieldsOffer = val.split(',').map((item) => item.replace(/%20/g, ' '));
                } else {
                    query.customFieldsOffer = [val.replace(/%20/g, ' ')];
                }
            } else if (key === 'customField') {
                if (val.includes(',')) {
                    query.customField = val.split(',').map((item) => item.replace(/%20/g, ' '));
                } else {
                    query.customField = [val.replace(/%20/g, ' ')];
                }
            } else {
                query[key] = val;
            }
        });
    }
    return query;
}

function sorted(values) {
    const sortedValues = [...values];
    sortedValues.sort((a, b) => {
        let valueA;
        let valueB;
        if (a?.values) {
            valueA = a.values[0];
            valueB = b.values[0];
        } else {
            valueA = a;
            valueB = b;
        }
        valueA = valueA.replace(/[éè]/gi, 'e');
        valueB = valueB.replace(/[éè]/gi, 'e');
        const isNumberA = !isNaN(valueA);
        const isNumberB = !isNaN(valueB);
        if (isNumberA && isNumberB) {
            return valueA - valueB;
        } else if (isNumberA) {
            return -1;
        } else if (isNumberB) {
            return 1;
        } else {
            const nameA = valueA.toUpperCase();
            const nameB = valueB.toUpperCase();
            if (nameA < nameB) {
                return -1;
            } else if (nameA > nameB) {
                return 1;
            } else {
                return 0;
            }
        }
    });

    return sortedValues;
}

function sortedName(values) {
    if (!values) {
        return [];
    }
    return [...values].sort((a, b) => {
        let valueA = a?.name || a;
        let valueB = b?.name || b;

        valueA = valueA.replace(/[éè]/gi, 'e');
        valueB = valueB.replace(/[éè]/gi, 'e');

        const isNumberA = !isNaN(valueA);
        const isNumberB = !isNaN(valueB);

        if (isNumberA && isNumberB) {
            return valueA - valueB;
        } else if (isNumberA) {
            return -1;
        } else if (isNumberB) {
            return 1;
        } else {
            return valueA.localeCompare(valueB, 'en', { sensitivity: 'base' });
        }
    });
}

function reduceJwtSize(jwt: string): string {
    const jwtArray = jwt.split('.');
    const header = jwtArray[0];
    const payload = jwtArray[1];
    const headerDecoded = Buffer.from(header, 'base64').toString('utf-8');
    const payloadDecoded = Buffer.from(payload, 'base64').toString('utf-8');
    const headerParsed = JSON.parse(headerDecoded);
    const payloadParsed = JSON.parse(payloadDecoded);
    for (const key in payloadParsed) {
        if (key.startsWith('customer-account-id')) {
            delete payloadParsed[key];
        }
    }
    const headerString = JSON.stringify(headerParsed);
    const payloadString = JSON.stringify(payloadParsed);
    const headerEncoded = Buffer.from(headerString).toString('base64');
    const payloadEncoded = Buffer.from(payloadString).toString('base64');
    const newJwt = `${headerEncoded}.${payloadEncoded}.${jwtArray[2]}`;
    return newJwt;
}

function getIpAddress(req: any) {
    return fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            return data
        })
        .catch(error => {
            console.error('IP not found', error);
        });
}

export default {
    formatCurrencyAuto,
    calculDetermineProductPrice,
    calculDetermineProductPriceWithVat,
    calculDetermineVat,
    getCustomFieldData,
    formatAddress,
    orderBadgeClass,
    orderBadgeClassNew,
    paymentBadgeClass,
    paymentBadgeClassNew,
    GetImageUrlBySizeType,
    GetImageUrlByDimensions,
    GetImageUrlByWidth,
    GetImageUrlByHeight,
    OptimizeImageStoryblok,
    generateLink,
    parseLink,
    sorted,
    sortedName,
    reduceJwtSize,
    getIpAddress
};
