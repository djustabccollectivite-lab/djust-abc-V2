export default function (context) {
    if (context.$config.isMaintenanceMode && !context.route.name?.startsWith('maintenance')) {
        return context.redirect('/maintenance')
    }
    if (!context.$config.isMaintenanceMode && context.route.name?.startsWith('maintenance')) {
        return context.redirect('/')
    }
}
