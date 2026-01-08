<template lang="html">
    <ul>
        <template v-for="link in links">
            <li v-if="link.show" :key="link.text" :class="link.active ? 'active' : ''">
                <DjLink :to="link.url">
                    <i :class="link.icon"></i>
                    {{ link.text }}
                </DjLink>
            </li>
        </template>
        <li>
            <a href="#" @click.prevent="handleLogout">
                <i class="icon-power-switch"></i>
                {{ $t('header.accountMenu.logout') }}
            </a>
        </li>
    </ul>
</template>

<script>
import DjLink from '@components/atoms/DjLink/DjLink.vue';
export default {
    name: 'AccountLinks',
    components: {
        DjLink,
    },
    props: {
        links: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        async handleLogout() {
            await this.$auth
                .logout({ params: { refresh_token: this.$auth.strategy.refreshToken.get() } })
                .then((result) => {
                    this.$auth.$storage.setUniversal('user', false, true);
                    this.$store.commit('quote/clearQuotes');
                    this.$store.commit('wishlist/clearWishlist');
                    this.$store.commit('cart/clearCart');

                    this.$config.store_type === 'private'
                        ? this.$router.push(this.localePath('/login'))
                        : this.$router.push(this.localePath('/'));
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>

<style lang="scss" scoped>
.backgrey {
    background-color: var(--color-title-user-information);
    text-align: center;
    font-size: large;
    height: 25px;
}
</style>
