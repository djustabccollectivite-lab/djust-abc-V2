export function formatCurrencyAuto(num, currency_) {
    let country = '';
    switch (currency_) {
        case 'EUR':
            country = 'fr-FR';
            break;
        case 'USD':
            country = 'en-IN';
            break;
    }
    var formatter = new Intl.NumberFormat(country, {
        style: 'currency',
        currency: currency_,
    });
    const result = formatter
        .formatToParts(num)
        .map(({ type, value }) => {
            switch (type) {
                case 'decimal':
                    return `<span class="currency-fraction">${value}</span>`;
                case 'fraction':
                    return `<span class="currency-fraction">${value}</span>`;
                default:
                    return value;
            }
        })
        .reduce((string, part) => string + part);
    return result;
}

export function getListOfProductId(products) {
    let queries = [];
    products.forEach((item) => {
        queries.push(item.id);
    });
    if (queries.length > 0) {
        return queries;
    } else {
        return [];
    }
}

export const determineProductPrice = function (priceRanges, quantity) {
    let result = 0;
    for (var i = 0; i < priceRanges.length; i++) {
        if (priceRanges[i + 1] && priceRanges[i].quantity <= quantity && priceRanges[i] + 1 < quantity) {
            result = priceRanges[i].price.itemPrice;
        } else if (priceRanges[i].quantity <= quantity) {
            result = priceRanges[i].price.itemPrice;
        } else {
            null;
        }
    }
    return result;
};
