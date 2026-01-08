const calculateAmount = (obj) =>
    Object.values(obj)
        .reduce((acc, { quantity, price }) => acc + quantity * price, 0)
        .toFixed(2);

const mutations = {
    setProductToCart(state, payload) {
        state.productToCart = payload;
    },
    setCart(state, payload) {
        payload.sort((a, b) => {
            return a.offerPrice.id - b.offerPrice.id;
        });
        state.cartItems = payload;
    },
    setCartId(state, payload) {
        state.cartId = payload;
    },
    setBillingAddressId(state, payload) {
        state.cartBillingAddressId = payload;
    },
    setShippingAddressId(state, payload) {
        state.cartShippingAddressId = payload;
    },
    setLoading(state, payload) {
        state.load = payload;
    },
    setCartLineQuantity(state, payload) {
        const objIndex = state.cartItems.findIndex((obj) => obj.id === payload.basketLineId);
        const deliveryLineIndex = state.cartItems[objIndex].deliveryLines.findIndex(
            (obj) => obj.id === payload.deliveryLineId,
        );
        state.cartItems[objIndex].deliveryLines[deliveryLineIndex].quantity = payload.quantity;
        // this.$core.useCart.validAddress()
    },

    setCartLineAddress(state, payload) {
        const objIndex = state.cartItems.findIndex((obj) => obj.id === payload.basketLineId);
        const deliveryLineIndex = state.cartItems[objIndex].deliveryLines.findIndex(
            (obj) => obj.id === payload.deliveryLineId,
        );
        state.cartItems[objIndex].deliveryLines[deliveryLineIndex].addressId = payload.addressId;
    },

    setCartLineShippingType(state, payload) {
        const objIndex = state.cartItems.findIndex((obj) => obj.id === payload.basketLineId);
        const deliveryLineIndex = state.cartItems[objIndex].deliveryLines.findIndex(
            (obj) => obj.id === payload.deliveryLineId,
        );
        state.cartItems[objIndex].deliveryLines[deliveryLineIndex].selectedShippingType = payload.selectedShippingType;
    },

    addDeliveryLine(state, payload) {
        const objIndex = state.cartItems.findIndex((obj) => obj.id === payload.id);
        state.cartItems[objIndex].deliveryLines.push(payload.line);
    },
    deleteDeliveryLine(state, payload) {
        const result = state.cartItems.filter((obj) => obj.id !== payload.id);
        const line = state.cartItems.find((obj) => obj.id === payload.id);
        const lineCopy = { ...line };
        line.deliveryLines = lineCopy.deliveryLines.filter((address) => address.id !== payload.AddressLineId);
        result.push(line);
        state.cartItems = result;
    },

    initCart(state, payload) {
        state.cartItems = payload.cartItems;
        state.amount = payload.amount;
        state.total = payload.total;
    },

    setOrderValidated(state, payload) {
        state.orderValidated = payload;
        localStorage.setItem('orderValidated', payload);

        /* let total = 0;
        payload.orderLogistics.forEach(orderLogistic => {
            orderLogistic.items.forEach(item => {
                total +=
                    item.offerPriceSnapshot.salePriceExcVat * item.quantity;
            });
        });
        state.totalOrderValidated = total; */
    },
    addItem(state, payload) {
        state.cartItems.push(payload);
        state.total = state.cartItems.length;
        state.amount = calculateAmount(state.cartItems);
    },

    clearCart: (state) => {
        state.cartItems = [];
        state.amount = 0;
        state.total = 0;
    },
    setAllCartLineShippingType(state) {
        state.cartItems.forEach((cartItem) => {
            cartItem.deliveryLines.forEach((deliveryLineItem) => {
                deliveryLineItem.selectedShippingType = deliveryLineItem.shippingTypes[0].code;
            });
        });
    },

    setAllCartLineAddress(state, payload) {
        state.cartItems.forEach((cartItem) => {
            cartItem.deliveryLines.forEach((deliveryLineItem) => {
                deliveryLineItem.addressId = payload.shippingAddressId;
            });
        });
    },
    setCartLineDeliveryDate(state, payload) {
        const objIndex = state.cartItems.findIndex((obj) => obj.id === payload.basketLineId);
        state.cartItems[objIndex].deliveryDate = payload.deliveryDate;
    },

    setCartLineShippingInstructions(state, payload) {
        const objIndex = state.cartItems.findIndex((obj) => obj.id === payload.basketLineId);
        state.cartItems[objIndex].shippingInstructions = payload.shippingInstructions;
    },
};

export default mutations;
