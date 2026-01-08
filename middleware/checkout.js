export default function (context) {
    if (!context.$core.useShop.IsActive()) {
        return context.redirect('/');
    }
}
