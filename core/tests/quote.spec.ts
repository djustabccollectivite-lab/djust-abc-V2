import quoteGetters from '../getters/quote';
import { masterQuoteDefault } from './data/quote';

describe('Quote Getters', () => {
    const quote1 = { ...masterQuoteDefault };
    const quote2 = {
        ...masterQuoteDefault,
        id: '10',
        name: 'Quote 2',
        description: null,
    };
    const quote3 = {
        ...masterQuoteDefault,
        id: '11',
        name: 'Quote 3',
        description: null,
    };
    const quote4 = {
        ...masterQuoteDefault,
        id: '12',
        name: 'Quote 4',
        description: null,
        supplierQuotes: [],
    };

    const quotes = [quote1, quote2, quote3, quote4];

    test('Get Total', () => {
        expect(quoteGetters.getTotal(quotes)).toBe(4);
    });

    test('Get Quote ID', () => {
        expect(quoteGetters.getQuoteId(quote1)).toBe('4');
        expect(quoteGetters.getQuoteId(quote2)).toBe('10');
    });

    test('Get Quote Name', () => {
        expect(quoteGetters.getQuoteName(quote1)).toBe('GTA');
    });

    test('Get Quote Nb Items', () => {
        expect(quoteGetters.getQuoteNbItems(quote1)).toBe(3);
    });

    test('Get Supplier Quotes', () => {
        expect(quoteGetters.getSupplierQuotes(quote1)).toBe(quote1.supplierQuotes);
        expect(quoteGetters.getSupplierQuotes(quote4)).toBe(quote4.supplierQuotes);
    });

    test('Get Quote Create', () => {
        expect(quoteGetters.getQuoteCreate(quote1)).toBe(true);
        expect(quoteGetters.getQuoteCreate(quote4)).toBe(false);
    });

    test('Get MasterQuoteLines', () => {
        expect(quoteGetters.getMasterQuoteLines(quote1)).toBe(quote1.quoteLines);
    });

    test('Get SupplierQuotesTotalAmount', () => {
        const currency = 'USD';
        expect(quoteGetters.getSupplierQuoteTotalAmount(quote1.supplierQuotes[0], currency)).toBe(
            '<span class="currency-fraction">$50<span class="currency-fraction">.</span><span class="currency-fraction">00</span></span>'
        );
    });

    test('Get SuppliersForProduct', () => {
        expect(quoteGetters.getSuppliersForProduct('8', quote1.supplierQuotes)).toStrictEqual(['Default']);
    });

    test('Get DeliveryLinesForProduct', () => {
        expect(quoteGetters.getDeliveryLinesForProduct('8', quote1.supplierQuotes)).toBe(
            quote1.supplierQuotes[0].quoteLines[0].quoteDeliveryLines
        );
    });

    test('Get SupplierQuoteLineTotalAmount', () => {
        const currency = 'USD';
        expect(quoteGetters.getSupplierQuoteLineTotalAmount(quote1.supplierQuotes[0].quoteLines[0], currency)).toBe(
            '<span class="currency-fraction">$50<span class="currency-fraction">.</span><span class="currency-fraction">00</span></span>'
        );
    });
});
