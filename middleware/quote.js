export default function (context) {
    if (!context.$core.useQuote.IsActive(context)) {
        return context.redirect('/');
    }
}
