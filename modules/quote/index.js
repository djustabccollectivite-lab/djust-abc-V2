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
            name: 'quotes',
            path: '/quotes',
            component: '@modules/quote/pages/index.vue',
        });
        routes.unshift({
            name: 'payementquotes',
            path: '/quotes/payement',
            component: '@modules/quote/pages/payement.vue',
        });
        routes.unshift({
            name: 'get-quote',
            path: '/quotes/get-quote',
            component: '@modules/quote/pages/get-quote.vue',
        });
        routes.unshift({
            name: 'supplierquotes',
            path: '/supplier-quotes/:id',
            component: '@modules/quote/pages/supplier-quotes/_id.vue',
        });
    });

    // Register Store using a Plugin
    this.addPlugin(path.resolve(__dirname, 'store/registerStore.js'));
    this.addPlugin(path.resolve(__dirname, '../../plugins/core.ts'));
};
