function getLocalStorageItem(key) {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(key);
    }
    return null;
}

const state = () => ({
    cartId: getLocalStorageItem('cartId'),
    cartItems: [],
    carts: [],
    cartIdToUse: getLocalStorageItem('cartId'),
    cartInformations: {},
    cartItemsPagination: {},
    cartBillingAddressId: null,
    orderValidated: null,
    load: false,
    dateDropCustomField: null,
});

export default state;
