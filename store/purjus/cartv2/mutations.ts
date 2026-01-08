import type { Cart, CartLinesResponse } from '../../../purjus/interfaces/common/cartv2';
import state from './state';

type State = ReturnType<typeof state>;

const mutations = {
    addCart(state: State, payload: { cart: Cart }) {
        state.carts.push(payload.cart);
    },
    removeCart(state: State, payload: { cart: Cart }) {
        state.carts = state.carts.filter((c) => c !== payload.cart);
    },
    addCarts(state: State, payload: { carts: Cart[] }) {
        state.carts = [...state.carts, ...payload.carts];
    },
    updateOneCart(state: State, payload: { cart: Cart }) {
        const cartIndex = state.carts.findIndex((c) => c.id === payload.cart.id);
        if (cartIndex !== -1) {
            state.carts = [...state.carts.slice(0, cartIndex), payload.cart, ...state.carts.slice(cartIndex + 1)];
        }
    },
    clearCarts(state: State) {
        state.carts = [];
    },
    setCartDetails(state: State, payload: { cartDetails: CartLinesResponse }) {
        state.cartDetails = payload.cartDetails;
    },
    clearCartDetails(state: State) {
        state.cartDetails = null;
    },
};

export default mutations;
