const mutations = {
    setCategoryIds(state, payload) {
        state.categoryIds = payload;
    },
    setBrand(state, payload) {
        state.brand = payload;
    },
    setSupplier(state, payload) {
        state.supplier = payload;
    },
    setPriceMin(state, payload) {
        state.priceMin = payload;
    },
    setPriceMax(state, payload) {
        state.priceMax = payload;
    },
    setRq(state, payload) {
        state.rq = payload;
    },
    setSortType(state, payload) {
        state.sortType = payload;
    },
    setSort(state, payload) {
        state.sort = payload;
    },
    setCustomFieldsSupplier(state, payload) {
        state.customFieldsSupplier = payload;
    },
    setProductThumbnails(state, payload) {
        state.productThumbnails = payload;
    },
    setFacets(state, payload) {
        state.facets = payload;
    },
    setSelectedFacets(state, payload) {
        if (payload.facetName) {
            if (payload.values && payload.values.length > 0) {
                state.facetsSelected[payload.facetName] = payload.values;
            } else {
                const facetsSelectedTemp = { ...state.facetsSelected };
                delete facetsSelectedTemp[payload.facetName];
                state.facetsSelected = facetsSelectedTemp;
            }
        } else if (payload) {
            state.facetsSelected = {};
        }
    },
    setSelectedCustomFields(state, payload) {
        if (payload.facetName) {
            if (payload.values && payload.values.length > 0) {
                state.customFieldsSelected[payload.facetName] = payload.values;
            } else {
                const facetsSelectedTemp = { ...state.customFieldsSelected };
                delete facetsSelectedTemp[payload.facetName];
                state.customFieldsSelected = facetsSelectedTemp;
            }
        }
    },
    setPageNumber(state, payload) {
        state.pageNumber = payload;
    },
    setPageSize(state, payload) {
        state.pageSize = payload;
    },
    setProductsTags(state, payload) {
        state.productsTags = payload;
    },
    initShop(state) {
        state.categoryIds = null;
        state.facetsSelected = {};
        state.brand = null;
        state.priceMin = 0;
        state.priceMax = null;
        state.rq = '';
        state.sortType = 'CREATION';
        state.sort = 'DESC';
        state.pageSize = 20;
        state.pageNumber = 0;
        state.paged = true;
        state.productThumbnails = null;
        state.productsTags = [];
    },
    setIsLoading(state, payload) {
        state.isLoading = payload;
    },
    setAskApi(state, payload) {
        state.askApi = payload;
    },
    setIdType(state, payload) {
        state.idType = payload;
    },
    setPath(state, payload) {
        state.path = payload;
    },
    setSuppliers(state, payload) {
        state.suppliers = payload;
    },
    setListType(state, payload) {
        state.listType = payload;
    },
};

export default mutations;
