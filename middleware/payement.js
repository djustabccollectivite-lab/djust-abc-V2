export default function (context) {
    if (!context.$core.usePayement.IsActive(context)) {
        return context.redirect('/');
    }
}
