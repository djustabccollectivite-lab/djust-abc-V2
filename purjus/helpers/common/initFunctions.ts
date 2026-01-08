import type { Context } from '@nuxt/types';

function randomHex() {
    return Array.from({ length: 12 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
}

export default (context: Context) => ({
    initStore(): void {
        switch (context.$config.themeName) {
            // dans le cas d'un client eiffage, on récupère les paniers et on en crée un s'il n'y en a pas
            // le but est d'avoir un mono panier
            case 'eiffage':
                context.store.dispatch('purjus/cartv2/retrieveCarts').then(async () => {
                    if (context.store.state.purjus.cartv2.carts.length === 0) {
                        await context.$purjus.useCartv2.createCart(`cart-${randomHex()}`);
                        context.store.dispatch('purjus/cartv2/retrieveCarts');
                    }
                });
                break;
            // Même principe pour ABC (monopanier)
            case 'ABC':
                context.store.dispatch('purjus/cartv2/retrieveCarts').then(async () => {
                    if (context.store.state.purjus.cartv2.carts.length === 0) {
                        await context.$purjus.useCartv2.createCart(`cart-${randomHex()}`);
                        context.store.dispatch('purjus/cartv2/retrieveCarts');
                    }
                });
                break;
            case 'Acodis':
                context.store.dispatch('purjus/cartv2/retrieveCarts').then(async () => {
                    if (context.store.state.purjus.cartv2.carts.length === 0) {
                        await context.$purjus.useCartv2.createCart(`cart-${randomHex()}`);
                        context.store.dispatch('purjus/cartv2/retrieveCarts');
                    }
                });
                break;
            case 'socoda':
                context.store.dispatch('cartv3/initializeNonValidatedOrders');
                break;
            default:
                break;
        }
    },
});
