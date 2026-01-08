const state = () => ({
    cartId: null,
    cartItems: [],
    cartBillingAddressId: null,
    cartShippingAddressId: null,
    loading: false,
    productToCart: false,
    orderValidated: null,
    totalOrderValidated: 0,
    load: false
});

export default state;
