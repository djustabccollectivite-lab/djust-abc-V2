import type { Cart, CartLinesResponse } from '~/purjus/interfaces/common/cartv2';
const state = (): { carts: Cart[]; cartDetails: CartLinesResponse | null } => ({
    carts: [],
    cartDetails: null,
});

export type Cartv2State = ReturnType<typeof state>;

export default state;
