const mutations = {
    setProduct(state, payload) {
        state.product = payload;
    },
    setReviews(state, payload) {
        state.reviews = payload;
    },
    setAttributes(state, payload) {
        state.attributes = payload;
    },
    sortAttributeValues(state) {
        const sorting = (a, b) => {
            if (!isNaN(a.value) && !isNaN(b.value)) {
                return a.value - b.value;
            }
            if (!isNaN(a.value) && isNaN(b.value)) {
                return -1;
            }
            if (isNaN(a.value) && !isNaN(b.value)) {
                return 1;
            }
            if (isNaN(a.value) && isNaN(b.value)) {
                if (a.value < b.value) return -1;
                else return 1;
            }
            return 0
        }

        state.attributes?.forEach((attribute) => {
            attribute.attributeValues.sort(sorting);
        });
    },
    sortAttributes(state, payload) {
        state.attributes.forEach((attribute) => {
            attribute.order = payload[attribute.attribute.externalId];
        });

        state.attributes.sort((a, b) => a.order - b.order)

    },
    setVariants(state, payload) {
        state.variants = payload;
    },
    clearAttributes(state, payload) {
        state.attributes = null;
    },
    updateReviews(state, payload) {
        const newProduct = { ...state.product };
        newProduct.rating = payload;
        state.product = newProduct;
    },
    setIsDiscount(state, payload) {
        state.anyDiscount = payload
    }
};

export default mutations;
