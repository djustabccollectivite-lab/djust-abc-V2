<template>
    <v-list>
        <template v-for="menuItem in menu">
            <v-list-group
                v-if="menuItem.megaContent[0]"
                class="ml-3"
                no-action
                :key="menuItem.text"
            >
                <template v-slot:activator>
                    <v-list-item-content>
                        <nuxt-link :to="menuItem.url" @click.prevent="handleClosePanel">
                            <span class="text-black font-700">{{ menuItem.text }}</span>
                        </nuxt-link>
                    </v-list-item-content>
                </template>
                <MobileSubmenu :menu="menuItem.megaContent[0].megaItems" />
            </v-list-group>
            <v-list-item v-else no-action class="ml-3" :key="menuItem.text">
                <v-list-item-content>
                    <div v-if="'logout' === menuItem.url" @click="handleLogout">
                        <span class="text-black font-700">{{ menuItem.text }}</span>
                    </div>
                    <nuxt-link v-else :to="menuItem.url" @click.prevent="handleClosePanel">
                        <span class="text-black font-700">{{ menuItem.text }}</span>
                    </nuxt-link>
                </v-list-item-content>
            </v-list-item>
        </template>
    </v-list>
</template>

<script>
import MobileSubmenu from '@components/organisms/DjHeader/Mobile/modules/MobileSubmenu.vue';

export default {
    name: 'MobileSubmenu',
    components: { MobileSubmenu },
    props: {
        menu: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        handleClosePanel() {
            this.isMenuOpen = false;
            this.$store.commit('app/setCurrentDrawerContent', null);
            this.$store.commit('app/setAppDrawer', false);
        },
        async handleLogout() {
            this.handleClosePanel();
            await this.$auth
                .logout({ params: { refresh_token: this.$auth.strategy.refreshToken.get() } })
                .then(() => {
                    this.$auth.$storage.setUniversal('user', false, true);
                    this.$store.commit('quote/clearQuotes');
                    this.$store.commit('wishlist/clearWishlist');
                    this.$store.commit('cart/clearCart');
                    if ('private' === this.$config.store_type) {
                        this.$router.push(this.localePath('/auth/login'));
                    } else {
                        this.$router.push(this.localePath('/'));
                    }
                });
        },
    },
};
</script>
