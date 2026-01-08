<template>
    <div class="d-flex align-items-center justify-content-end gap-4 pt-2 dj-header-actions">
        <v-menu
            v-if="isLoggedIn && accountChoices.length > 1"
            v-model="menuAccounts"
            :close-on-content-click="false"
            offset-y
            bottom
            open-on-hover
            nudge-left="140"
        >
            <template #activator="{ on, attrs }">
                <div v-bind="attrs" class="header__top-links_menu" v-on="on">
                    <SvgIcon name="multi-user" />
                </div>
            </template>
            <v-card>
                <div class="p-4">
                    <div class="mb-4 font-700">Compte actuel :</div>
                    <div class="font-700">{{ accountSelected }}</div>
                </div>
                <v-divider class="m-0"></v-divider>
                <div class="mt-2 ml-4 py-2">Choisir un autre compte :</div>
                <v-list
                    v-for="(account, index) in accountChoices.filter(
                        (accountChoice) => accountChoice.name !== accountSelected,
                    )"
                    :key="index"
                >
                    <v-list-item class="account-choice" @click="changeShopAccount(account)">
                        {{ account.name }}
                    </v-list-item>
                </v-list>
            </v-card>
        </v-menu>
        <nuxt-link v-if="isLoggedIn && $core.useWishlist.IsActive()" :to="localePath('/buyinglist')">
            <SvgIcon name="heart" />
            <span class="bg-primary link_info">
                {{ buyinglistTotal }}
            </span>
        </nuxt-link>
        <nuxt-link v-if="isLoggedIn" :to="localePath('/quotes')">
            <SvgIcon name="quote" />
            <span class="bg-primary link_info">
                {{ quoteTotal }}
            </span>
        </nuxt-link>
        <a v-if="isLoggedIn && $core.useShop.IsActive()" @click="openCart">
            <SvgIcon name="cart" />
            <span class="bg-primary link_info">
                {{ totalNumberOfProductsInCart }}
            </span>
        </a>
        <HeaderUserArea />
    </div>
</template>

<script>
import HeaderUserArea from '@components/organisms/DjHeader/Horizontal/modules/HeaderUserArea.vue';
import SvgIcon from '@components/atoms/icons/SvgIcon.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'HeaderActions',
    components: { HeaderUserArea, SvgIcon },
    data() {
        return {
            accountSelected: '',
            accountChoices: [],
            cartItems: [],
            selectedAccount: null,
            menuAccounts: false,
            linesLoaded: false,
        };
    },
    computed: {
        ...mapGetters('purjus/cartv2', {
            cart: 'monoCart',
            cartDetails: 'getCartDetails',
        }),
        isLoggedIn() {
            return this.$auth.loggedIn;
        },
        buyinglistTotal() {
            return this.$core.getWishlist.getTotal(this.$store.state.wishlist.items) ?? 0;
        },
        quoteTotal() {
            if (this.$core.useQuote.IsActive()) {
                return this.$core.getQuote.getTotal(this.$store.state.quote.quotes) ?? 0;
            }
            return null;
        },
        totalNumberOfProductsInCart() {
            return this.cartDetails?.cartLines.filter((item) => item.productVariant.id !== 'FDL').length;
        },
    },
    watch: {
        cart: {
            handler() {
                if (this.cart && !this.linesLoaded) {
                    this.$purjus.useCartv2.getLines(this.cart.id);
                    this.linesLoaded = true;
                }
            },
            immediate: true,
        },
    },
    async created() {
        const jwt = this.$cookies.get('auth._token.local', { parseJSON: true });
        if (jwt) {
            const userAccount = await this.$core.useUser.getUserDataAuthenticated(jwt);
            const userAccountSelected = userAccount.accounts.find(
                (account) => account.id === this.$store.state.app.account,
            );
            this.accountSelected = userAccountSelected ? userAccountSelected.name : userAccount.account.name;
            this.accountChoices = userAccount.accounts.sort((a, b) => a.name.localeCompare(b.name));
        }
    },
    methods: {
        openCart() {
            $nuxt.$emit('opencartmodel', true);
        },
        async changeShopAccount(shopSelected) {
            await this.$core.useUser.defineAccount(shopSelected.id);
            this.accountSelected = shopSelected.name;
            this.menuAccounts = false;

            await this.$purjus.useCartv2.getLines(this.cart.id);
            if (window.location.pathname === '/') {
                location.reload();
            } else {
                window.location.href = '/';
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.account-choice:hover {
    background-color: var(--color-primary);
}
</style>
