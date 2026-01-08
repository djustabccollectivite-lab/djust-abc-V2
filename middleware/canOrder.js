export default function(context) {
    if (context.store.state.cart.cartItems.length === 0 && !context.store.state.quote.quoteToOrder) {
        return context.redirect('/');
    }
}
