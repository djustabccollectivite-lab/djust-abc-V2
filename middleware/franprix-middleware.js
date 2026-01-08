export default function (context) {
    if (context.$config.clientName !== 'franprix' || !context.$auth.loggedIn) return;

    if (localStorage.getItem('loggedAsReviewer') === 'true') {
        if (!context.route.path.includes('reviewing-engagements')) {
            context.redirect('/reviewing-engagements');
        }

        return;
    }

    if (context.route.path.includes('reviewing-engagements')) {
        context.redirect('/');
    }
}
