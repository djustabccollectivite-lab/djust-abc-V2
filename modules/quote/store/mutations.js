const mutations = {
    addMasterQuote(state, payload) {
        state.quotes.push(payload);
    },
    setSupplierId(state, payload) {
        state.supplierId = payload;
    },
    setCanOrder(state, payload) {
        state.canOrder = payload;
    },

    setMasterQuote(state, payload) {
        state.quote = payload;
    },

    setMasterQuotes(state, payload) {
        state.quotes = payload;
    },

    setQuoteToOrder(state, payload) {
        state.quoteToOrder = payload;
    },

    setSelectedQuote(state, payload) {
        state.selectedQuote = payload;
    },

    rmQuote(state, payload) {
        const quoteIndex = state.quotes.findIndex((quote) => quote.id === payload.masterQuoteId);
        const QuoteLineIndex = state.quotes[quoteIndex].quoteLines.findIndex((obj) => obj.id === payload.quoteLineId);

        state.quotes[quoteIndex].quoteLines.splice(QuoteLineIndex, 1);
    },

    rmMasterQuote(state, payload) {
        const quoteIndex = state.quotes.findIndex((quote) => quote.id === payload.masterQuoteId);

        state.quotes.splice(quoteIndex, 1);
    },
    setQuote(state, payload) {
        const quotes = state.quotes.filter((item) => item.id != payload.id);

        let quoteLinesNew = [];

        payload.masterQuoteDetails.forEach((element) => {
            let quoteLine = {
                id: element.id,
                quantity: element.quantity,
                productVariant: element.productVariant,
                deliveryLines: [],
                suppliersList: [],
            };
            quoteLinesNew.push(quoteLine);
        });

        let quoteFo = {
            id: payload.id,
            name: payload.name,
            description: payload.description,
            quoteLines: quoteLinesNew,
            supplierQuotes: payload.supplierQuotes,
        };
        quotes.push(quoteFo);
        state.quotes = quotes;
    },

    setSupplierQuote(state, payload) {
        let quoteIndex = state.quotes.findIndex((quote) => quote.id === payload.masterQuoteId);
        state.quotes[quoteIndex].supplierQuotes = payload.supplierQuote;
    },

    setSupplierQuoteStatus(state, payload) {
        let quoteIndex = state.quotes.findIndex((quote) => quote.id === payload.masterQuoteId);

        let supplierQuoteIndex = state.quotes[quoteIndex].supplierQuotes.findIndex(
            (squote) => squote.id === payload.supplierQuoteId
        );

        let quotes = state.quotes;

        quotes[quoteIndex].supplierQuotes[supplierQuoteIndex] = payload.supplierQuote;

        state.quotes = quotes;
    },

    setQuantity(state, payload) {
        let quoteIndex = state.quotes.findIndex((quote) => quote.id === payload.quoteId);
        let productIndex = state.quotes[quoteIndex].masterQuoteLines.findIndex(
            (product) => product.productId === payload.productId
        );
        let newArray = [...state.quotes];
        newArray[quoteIndex].masterQuoteLines[productIndex].quantity = Number(payload.quantity);
        state.quotes = newArray;
    },

    addQuote(state, payload) {
        let quoteLinesNew = [];
        payload.masterQuoteDetails.forEach((element) => {
            let quoteLine = {
                ...element,
                id: element.id,
                quantity: element.quantity,
                productVariant: element.productVariant,
                deliveryLines: [],
                suppliersList: [],
            };
            quoteLinesNew.push(quoteLine);
        });
        let quoteFo = {
            ...payload,
            id: payload.id,
            name: payload.name,
            description: payload.description,
            quoteLines: quoteLinesNew,
            supplierQuotes: payload.supplierQuotes,
        };
        state.quotes.push(quoteFo);
    },
    clearQuotes(state) {
        state.quotes = [];
    },

    addDeliveryLine(state, payload) {
        const quoteIndex = state.quotes.findIndex((quote) => quote.id === payload.MasterQuoteId);
        const QuoteLineIndex = state.quotes[quoteIndex].quoteLines.findIndex((obj) => obj.id === payload.QuoteLineId);
        state.quotes[quoteIndex].quoteLines[QuoteLineIndex].deliveryLines.push(payload.line);
    },

    setQuoteLineAddress(state, payload) {
        const quoteIndex = state.quotes.findIndex((quote) => quote.id === payload.MasterQuoteId);
        const QuoteLineIndex = state.quotes[quoteIndex].quoteLines.findIndex((obj) => obj.id === payload.QuoteLineId);
        const deliveryLineIndex = state.quotes[quoteIndex].quoteLines[QuoteLineIndex].deliveryLines.findIndex(
            (obj) => obj.id === payload.deliveryLineId
        );
        state.quotes[quoteIndex].quoteLines[QuoteLineIndex].deliveryLines[deliveryLineIndex].addressId =
            payload.addressId;
    },

    setQuoteLineQuantity(state, payload) {
        const quoteIndex = state.quotes.findIndex((quote) => quote.id === payload.MasterQuoteId);
        const QuoteLineIndex = state.quotes[quoteIndex].quoteLines.findIndex((obj) => obj.id === payload.QuoteLineId);
        const deliveryLineIndex = state.quotes[quoteIndex].quoteLines[QuoteLineIndex].deliveryLines.findIndex(
            (obj) => obj.id === payload.deliveryLineId
        );
        state.quotes[quoteIndex].quoteLines[QuoteLineIndex].deliveryLines[deliveryLineIndex].quantity =
            payload.quantity;
    },

    setQuoteLineSuppliersEiffage(state, payload) {
        const quoteIndex = state.quotes.findIndex((quote) => quote.id === payload.MasterQuoteId);
        const quoteLineIndex = state.quotes[quoteIndex]?.quoteLines.findIndex((obj) => obj.id === payload.QuoteLineId);
        if (quoteLineIndex) {
            state.quotes[quoteIndex].quoteLines[quoteLineIndex].suppliersList = payload.suppliersIds;
        }
    },
    
    setQuoteLineSuppliers(state, payload) {
        const quoteIndex = state.quotes.findIndex((quote) => quote.id === payload.MasterQuoteId);
        const QuoteLineIndex = state.quotes[quoteIndex].quoteLines.findIndex((obj) => obj.id === payload.QuoteLineId);
        state.quotes[quoteIndex].quoteLines[QuoteLineIndex].suppliersList = payload.suppliersIds;
    },

    setPreorderLinePrice(state, payload) {
        const quoteIndex = state.quotes.findIndex((quote) => quote.id === payload.MasterQuoteId);
        const QuoteLineIndex = state.quotes[quoteIndex].quoteLines.findIndex((obj) => obj.id === payload.QuoteLineId);
        state.quotes[quoteIndex].quoteLines[QuoteLineIndex].priceHT = payload.priceHT;
        state.quotes[quoteIndex].quoteLines[QuoteLineIndex].totalHT = payload.totalHT;
        state.quotes[quoteIndex].quoteLines[QuoteLineIndex].productInfo = payload.productInfo;
    },
    setQuoteLineQTEPRICE(state, payload) {
        const quoteIndex = state.quotes.findIndex((quote) => quote.id === payload.MasterQuoteId);
        const QuoteLineIndex = state.quotes[quoteIndex].quoteLines.findIndex((obj) => obj.id === payload.QuoteLineId);
        state.quotes[quoteIndex].quoteLines[QuoteLineIndex].quantity =
            payload.quantity;
        state.quotes[quoteIndex].quoteLines[QuoteLineIndex].totalHT = payload.quantity * state.quotes[quoteIndex].quoteLines[QuoteLineIndex].priceHT;
    },
};

export default mutations;
