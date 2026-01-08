export default function (context) {
    if (!context.$core.useWishlist.IsActive()) {
        return context.redirect('/');
    }
}
