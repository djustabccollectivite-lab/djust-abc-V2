import type { Cartv2State } from './state';
import type { Cart, CartLinesResponse } from '~/purjus/interfaces/common/cartv2';

const getters = {
    monoCart: (state: Cartv2State): Cart | null => state.carts[0] ?? null,
    getCartDetails: (state: Cartv2State): CartLinesResponse | null => state.cartDetails ?? null,
};

export default getters;
