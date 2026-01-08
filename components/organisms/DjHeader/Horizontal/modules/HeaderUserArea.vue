<template>
    <div v-if="!isLoggedIn" class="dj-block--user-header">
        <div class="dj-block__left">
            <i class="icon-user"></i>
        </div>
        <div class="dj-block__right">
            <nuxt-link :to="localePath('/auth/login')">
                {{ $t('header.login') }}
            </nuxt-link>
            <nuxt-link :to="localePath('/auth/register')">
                {{ $t('header.register') }}
            </nuxt-link>
        </div>
    </div>
    <div v-else class="dj-block--user-account">
        <div class="dj-block--user-header">
            <!--<i class="icon-user"></i>-->
            <div class="dj-block__left">
                <i class="icon-user"></i>
            </div>
            <div class="dj-block__right">
                <nuxt-link class="right_block_color" :to="localePath('/account/user-information')">
                    {{ $t('header.welcome') }}
                </nuxt-link>
                <nuxt-link class="right_block_color" :to="localePath('/account/user-information')">
                    {{ userName }}
                </nuxt-link>
            </div>
        </div>
        <div class="dj-block__content">
            <ul class="dj-list--arrow">
                <li v-for="link in accountLinks" :key="link.text" v-if="link.active">
                    <nuxt-link :to="localePath(link.url)">
                        {{ link.text }}
                    </nuxt-link>
                </li>
                <li class="dj-block__footer">
                    <a href="#" @click.prevent="handleLogout">
                        {{ $t('header.accountMenu.logout') }}
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HeaderUserArea',
    computed: {
        isLoggedIn() {
            return this.$auth.loggedIn;
        },
        userName() {
            return this.$auth.user.firstName;
        },
        accountLinks() {
            return [
                {
                    text: this.$i18n.t('header.accountMenu.accountInformation'),
                    url: '/account/user-information',
                    active: true,
                },
                {
                    text: this.$i18n.t('header.accountMenu.organization'),
                    url: '/account/organisation',
                    active: true,
                },
                {
                    text: this.$i18n.t('header.accountMenu.quotes'),
                    url: '/quotes',
                    active: this.$core.useQuote.IsActive(),
                },
                {
                    text: this.$i18n.t('header.accountMenu.orders'),
                    url: '/account/orders',
                    active: true,
                },
                {
                    text: this.$i18n.t('header.accountMenu.address'),
                    url: '/account/addresses',
                    active: true,
                },
                {
                    text: this.$i18n.t('header.accountMenu.buyingList'),
                    url: '/buyinglist',
                    active: this.$core.useWishlist.IsActive(),
                },
                {
                    text: 'Contact',
                    url: '/cms/contact-us',
                    active: true,
                },
            ];
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
                        ? this.$router.push(this.localePath('/auth/login'))
                        : this.$router.push(this.localePath('/'));
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
};
</script>

<style lang="scss" scoped>
.right_block_color {
    color: black;
}
</style>
