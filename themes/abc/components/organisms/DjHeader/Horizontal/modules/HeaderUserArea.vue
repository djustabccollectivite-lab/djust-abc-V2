<template>
    <div v-if="!isLoggedIn" class="d-flex align-items-center gap-1">
        <SvgIcon name="user" />
        <div class="account-links d-flex flex-column">
            <nuxt-link :to="localePath('/auth/login')">
                <span class="text-black font-700">
                    {{ $t('header.login') }}
                </span>
            </nuxt-link>
            <nuxt-link :to="localePath('/auth/register')">
                <span class="text-black font-700">
                    {{ $t('header.register') }}
                </span>
            </nuxt-link>
        </div>
    </div>
    <div v-else class="dj-block--user-account">
        <div class="dj-block--user-header">
            <div class="dj-block__left">
                <SvgIcon name="user" />
            </div>
            <div class="dj-block__right">
                <nuxt-link :to="localePath('/account/user-information')">
                    <span class="text-black">{{ $t('header.welcome') }}</span>
                </nuxt-link>
                <nuxt-link :to="localePath('/account/user-information')">
                    <span class="text-black">{{ userName }}</span>
                </nuxt-link>
            </div>
        </div>
        <div class="dj-block__content">
            <ul class="dj-list--arrow">
                <li v-for="link in accountLinks" :key="link.text">
                    <nuxt-link :to="localePath(link.url)" v-if="link.active">
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
import SvgIcon from '@components/atoms/icons/SvgIcon.vue';

export default {
    name: 'HeaderUserArea',
    components: {
        SvgIcon
    },
    computed: {
        isLoggedIn() {
            return this.$auth.loggedIn;
        },
        userName() {
            return this.$auth.user.firstName;
        },
    },
    data() {
        return {
            accountLinks: [
                {
                    text: this.$i18n.t('header.accountMenu.accountInformation'),
                    url: '/account/user-information',
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
                    text: 'Nous contacter',
                    url: '/cms/contact-us',
                    active: true,
                },
            ],
        };
    },
    methods: {
        async handleLogout() {
            await this.$auth
                .logout({ params: { refresh_token: this.$auth.strategy.refreshToken.get() } })
                .then(() => {
                    this.$auth.$storage.setUniversal('user', false, true);
                    this.$store.commit('quote/clearQuotes');
                    this.$store.commit('wishlist/clearWishlist');
                    this.$store.commit('cart/clearCart');

                    this.$config.store_type === 'private'
                        ? this.$router.push(this.localePath('/auth/login'))
                        : this.$router.push(this.localePath('/'));
                });
        },
    },
};
</script>

<style lang="scss" scoped>
.dj-block__content {
    border: 2px solid var(--color-primary);
    border-radius: 4px;
}
</style>
