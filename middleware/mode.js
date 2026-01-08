export default function (context) {
    if (context.$config.store_type === 'private' && !context.$auth.loggedIn) {
        return context.redirect('/auth/login');
    }
}
