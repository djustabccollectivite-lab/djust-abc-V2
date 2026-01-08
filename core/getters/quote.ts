import { QuoteLine, Quote, SupplierQuote } from '../interfaces/IQuote';
import tools from '../helpers/tools';
import { QuoteGetters } from './types';

export const getTotal = (quotes: Quote[]): number => quotes.length;

export const getQuoteId = (quote: Quote): string => quote.id;

export const getQuoteName = (quote: any): string => {
    return quote.name;
};

export const getQuoteNbItems = (quote: any): any => {
    return quote.quoteLines.length;
};

export const getSupplierQuotes = (quote: any): any => {
    return quote.supplierQuotes;
};

export const getQuoteCreate = (quote: Quote): boolean => quote.supplierQuotes.length > 0;

export const getMasterQuoteLines = (quote: Quote): QuoteLine[] => quote.quoteLines;

export const getSupplierQuoteTotalAmount = (supplierQuote: any, currency: any): string => {
    let total = 0;

    supplierQuote.quoteLines.forEach((quoteLine: any) => {
        total += quoteLine.price * quoteLine.quantity;
    });
    return tools.formatCurrencyAuto(total, currency);
};

export const getSupplierQuoteLineTotalAmount = (supplierQuoteLine: any, currency: any): string => {
    let total = 0;
    total = supplierQuoteLine.price * supplierQuoteLine.quantity;
    return tools.formatCurrencyAuto(total, currency);
};

export const getSuppliersForProduct = (productVariantId: string, supplierQuotes: SupplierQuote[]): any => {
    const list: any = [];
    supplierQuotes.forEach((supplierQuote) =>
        supplierQuote.quoteLines.forEach((line) =>
            line.productVariant.id === productVariantId ? list.push(supplierQuote.supplier.name) : null,
        ),
    );

    return list;
};

export const getDeliveryLinesForProduct = (productVariantId: string, supplierQuotes: any): any => {
    let list: any = [];
    supplierQuotes.forEach((supplierQuote: any) =>
        supplierQuote.quoteLines.forEach((line: any) =>
            line.productVariant.id === productVariantId ? (list = line.quoteDeliveryLines) : null,
        ),
    );
    return list;
};

export const getProductAttributesValues = (productVariant: any, locale: string): any => {
    const res = productVariant.attributeValuesVariant.map((attribut: any): any => {
        let valueAttribute: any = '';

        if (attribut.value) {
            const attributValueLocale = Object.entries(attribut.value).find(([id, _value]) => id.includes(locale));

            const value = attributValueLocale ? attributValueLocale[1] : Object.entries(attribut.value[0])[1];

            if (['LIST_METRIC', 'METRIC'].includes(attribut.attribute.type)) {
                valueAttribute = `${value} ${attribut.attribute.properties.metric.unit}`;
            } else {
                valueAttribute = value;
            }
        }

        const attributNameLocale = Object.entries(attribut.attribute.names).find(([id, _value]) => id.includes(locale));

        return {
            externalId: attribut.attribute.externalId,
            label: attributNameLocale ? attributNameLocale[1] : Object.entries(attribut.attribute.names[0])[1],
            value: valueAttribute,
        };
    });

    return res;
};

export const getStepsQuote = (status: string): any => {
    // Default Status NEW
    let QuoteSteps;
    switch (status) {
        case 'NEW':
            QuoteSteps = [
                {
                    number: 1,
                    name: 'CREATED',
                    class: 'complete',
                },
                {
                    number: 2,
                    name: 'WAITING_FOR_SUPPLIER',
                    class: 'active',
                },
                {
                    number: 3,
                    name: 'ORDER_PASSED',
                    class: '',
                },
            ];
            break;
        case 'WAITING_FOR_SUPPLIER_INFOS':
            QuoteSteps = [
                {
                    number: 1,
                    name: 'CREATED',
                    class: 'complete',
                },
                {
                    number: 2,
                    name: 'WAITING_FOR_SUPPLIER',
                    class: 'active',
                },
                {
                    number: 3,
                    name: 'ORDER_PASSED',
                    class: '',
                },
            ];
            break;
        case 'DECLINED_BY_SUPPLIER':
            QuoteSteps = [
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
                    name: 'ORDER_PASSED',
                    class: '',
                },
            ];

            break;
        case 'WAITING_FOR_CUSTOMER':
            QuoteSteps = [
                {
                    number: 1,
                    name: 'CREATED',
                    class: 'complete',
                },
                {
                    number: 2,
                    name: 'WAITING_FOR_CUSTOMER',
                    class: 'active',
                },
                {
                    number: 3,
                    name: 'ORDER_PASSED',
                    class: '',
                },
            ];
            QuoteSteps[1] = {
                number: 2,
                name: 'WAITING_FOR_CUSTOMER',
                class: 'active',
            };
            break;
        case 'DECLINED_BY_CUSTOMER':
            QuoteSteps = [
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
                    name: 'ORDER_PASSED',
                    class: '',
                },
            ];
            break;
        case 'VALIDATED':
            QuoteSteps = [
                {
                    number: 1,
                    name: 'CREATED',
                    class: 'complete',
                },
                {
                    number: 2,
                    name: 'WAITING_FOR_CUSTOMER',
                    class: 'complete',
                },
                {
                    number: 3,
                    name: 'ORDER_PASSED',
                    class: 'complete',
                },
            ];
            break;
        case 'EXPIRED':
            QuoteSteps = [
                {
                    number: 1,
                    name: 'CREATED',
                    class: 'complete',
                },
                {
                    number: 2,
                    name: 'EXPIRED',
                    class: 'expired',
                },
            ];
            break;
        default:
            break;
    }

    return QuoteSteps;
};

export const getStatusQuote = (status: string): string => {
    let StatusToShow = '';
    switch (status) {
        case 'NEW':
            StatusToShow = 'En cours de traitement';
            break;
        case 'DECLINED_BY_SUPPLIER':
            StatusToShow = 'Refused by Supplier';
            break;
        case 'VALIDATED':
            StatusToShow = 'Commande Passée';
            break;
        case 'WAITING_FOR_CUSTOMER':
            StatusToShow = 'En attente du client';
            break;
        case 'DECLINED_BY_CUSTOMER':
            StatusToShow = 'Refused by client';
            break;

        default:
            StatusToShow = 'En cours de traitement';
            break;
    }
    return StatusToShow;
};

export const getSupplierQuoteTotalProductsNoTax = (supplierQuote: any, currency: any): string => {
    let total = 0;
    supplierQuote.quoteLines.forEach((quoteLine: any) => {
        total += quoteLine.price * quoteLine.quantity;
    });
    return tools.formatCurrencyAuto(total, currency);
};
export const getSupplierQuoteTotalProductsTax = (supplierQuote: any, currency: any): string => {
    let total = 0;
    supplierQuote.quoteLines.forEach((quoteLine: any) => {
        total += quoteLine.productTaxAmount;
    });
    return tools.formatCurrencyAuto(total, currency);
};
export const getSupplierQuoteTotalShippingNotTax = (supplierQuote: any, currency: any): string => {
    let total = 0;
    supplierQuote.quoteLines.forEach((quoteLine: any) => {
        total += quoteLine.shippingPrice;
    });
    return tools.formatCurrencyAuto(total, currency);
};

export const getSupplierQuoteTotalShippingTax = (supplierQuote: any, currency: any): string => {
    let total = 0;
    supplierQuote.quoteLines.forEach((quoteLine: any) => {
        total += quoteLine.shippingTaxAmount;
    });
    return tools.formatCurrencyAuto(total, currency);
};

export const getSupplierQuoteTotalTVA = (supplierQuote: any, currency: any): string => {
    let total = 0;
    supplierQuote.quoteLines.forEach((quoteLine: any) => {
        total += quoteLine.shippingTaxAmount + quoteLine.productTaxAmount;
    });
    return tools.formatCurrencyAuto(total, currency);
};

export const getSupplierQuoteTotalTax = (supplierQuote: any, currency: any): string => {
    let total = 0;
    let totalpte = 0;
    let totalpt = 0;
    let totalste = 0;
    let totalst = 0;

    supplierQuote.quoteLines.forEach((quoteLine: any) => {
        totalpte += quoteLine.price * quoteLine.quantity;
        totalpt += quoteLine.productTaxAmount;
        totalste += quoteLine.shippingPrice;
        totalst += quoteLine.shippingTaxAmount;
    });
    total = totalpte + totalpt + totalste + totalst;
    return tools.formatCurrencyAuto(total, currency);
};

const quoteGetters: QuoteGetters<Quote, SupplierQuote> = {
    getTotal,
    getQuoteId,
    getQuoteName,
    getQuoteNbItems,
    getSupplierQuotes,
    getQuoteCreate,
    getMasterQuoteLines,
    getSupplierQuoteTotalAmount,
    getSuppliersForProduct,
    getDeliveryLinesForProduct,
    getSupplierQuoteLineTotalAmount,
    getStepsQuote,
    getStatusQuote,
    getSupplierQuoteTotalProductsNoTax,
    getSupplierQuoteTotalProductsTax,
    getSupplierQuoteTotalShippingNotTax,
    getSupplierQuoteTotalShippingTax,
    getSupplierQuoteTotalTax,
    getSupplierQuoteTotalTVA,
    getProductAttributesValues,
};

export default quoteGetters;
