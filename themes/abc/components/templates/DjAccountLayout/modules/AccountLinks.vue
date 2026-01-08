<template>
    <div>
        <template v-for="link in links">
            <nuxt-link :to="link.url">
                <div
                    v-if="link.show"
                    :key="link.text"
                    :class="[
                        'link d-flex align-items-center pl-4 font-500',
                        link.active ? 'active-page text-white' : 'text-grey-4',
                    ]"
                >
                    <i :class="link.icon" class="mr-4"></i>
                    {{ link.text }}
                </div>
            </nuxt-link>
        </template>
        <button v-if="this.$auth?.user" @click.prevent="handleLogout">
            <div class="link d-flex align-items-center pl-4 text-grey-4 font-500">
                <i class="icon-power-switch mr-4"></i>
                {{ $t('header.accountMenu.logout') }}
            </div>
        </button>
    </div>
</template>

<script>
export default {
    name: 'AccountLinks',
    components: {},
    props: {
        links: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        async handleLogout() {
            await this.$auth.logout({ params: { refresh_token: this.$auth.strategy.refreshToken.get() } }).then(() => {
                this.$auth.$storage.setUniversal('user', false, true);
                this.$store.commit('quote/clearQuotes');
                this.$store.commit('wishlist/clearWishlist');
                this.$store.commit('cart/clearCart');

                this.$config.store_type === 'private'
                    ? this.$router.push(this.localePath('/login'))
                    : this.$router.push(this.localePath('/'));
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.link {
    height: 64px;
    line-height: 0;
}
.link:hover {
    color: var(--color-black) !important;
}
.active-page {
    background-color: var(--color-black);
}
.active-page:hover {
    color: var(--color-white) !important;
}

.acodis {
    .active-page {
        background-color: var(--color-primary);
    }
}
</style>
