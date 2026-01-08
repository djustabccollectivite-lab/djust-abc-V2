import type { Context } from '@nuxt/types';
import cartv3Store from './cartv3';

export default (context: Context) => {
    const registerCartv3Store = () => {
        const storeModule = cartv3Store(context);

        if (!context.store.hasModule('cartv3')) {
            context.store.registerModule('cartv3', storeModule);
        }
    };
    const unregisterCartv3Store = () => {
        if (context.store.hasModule('cartv3')) {
            context.store.unregisterModule('cartv3');
        }
    };

    registerCartv3Store();

    return {
        registerCartv3Store,
        unregisterCartv3Store,
    };
};
