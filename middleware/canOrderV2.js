export default function (context) {
    const cart = context.store.state.cart_b2b.carts?.find((c) => c.id === context.store.state.cart_b2b.cartIdToUse);
    const numberOfLines = cart ? cart.numberOfLines : 0;

    if (numberOfLines === 0 && !context.store.state.quote.quoteToOrder) {
        return context.redirect('/');
    }
}
