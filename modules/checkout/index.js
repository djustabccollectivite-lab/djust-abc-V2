const path = require('path');

// moduleOptions can pass config params from nuxt.config.js
module.exports = function registerModule(moduleOptions) {
    // Automatically register all components of the module
    this.nuxt.hook('components:dirs', (dirs) => {
        // Add ./components dir to the list
        dirs.push({
            path: path.resolve(__dirname, 'components'),
        });
    });

    // Add module routes to global router list
    this.extendRoutes((routes) => {
        routes.unshift({
            name: 'checkout Billing',
            path: '/checkout/billing',
            component: '@modules/checkout/pages/billing.vue',
            middleware: ['auth'],
        });
        routes.unshift({
            name: 'checkout OrderValidation',
            path: '/checkout/order-validation',
            component: '@modules/checkout/pages/order-validation.vue',
            middleware: ['auth'],
        });
        routes.unshift({
            name: 'checkout Shipping',
            path: '/checkout/shipping',
            component: '@modules/checkout/pages/shipping.vue',
            middleware: ['auth'],
        });
        routes.unshift({
            name: 'checkout/shopping-cart',
            path: '/checkout/shopping-cart',
            component: '@modules/checkout/pages/shopping-cart.vue',
            middleware: ['auth'],
        });
        routes.unshift({
            name: 'checkout OrderCheck',
            path: '/checkout/order-check',
            component: '@modules/checkout/pages/order-check.vue',
            middleware: ['auth'],
        });
        routes.unshift({
            name: 'checkout GroupOrder',
            path: '/checkout/group',
            component: '@modules/checkout/pages/GroupOrder.vue',
            middleware: ['auth'],
        });
    });

    // Register Store using a Plugin
    this.addPlugin(path.resolve(__dirname, '../../plugins/core.ts'));
};
