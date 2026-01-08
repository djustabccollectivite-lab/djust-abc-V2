<template>
    <div class="header__actions">
        <nuxt-link :to="localePath('/quotes')" class="header__extra" v-if="$core.useQuote.IsActive()">
            <i class="icon-papers"></i>
            <span>
                <i>{{ quoteTotal ? quoteTotal : 0 }}</i>
            </span>
        </nuxt-link>

        <nuxt-link :to="localePath('/buyinglist')" class="header__extra" v-if="$core.useWishlist.IsActive()">
            <i class="icon-heart"></i>

            <span>
                <i>{{ buyinglistTotal ? buyinglistTotal : 0 }}</i>
            </span>
        </nuxt-link>

        <a class="header__extra" @click="openCart" v-if="$core.useShop.IsActive()">
            <i class="icon-cart"></i>

            <span>
                <i>{{ totalNumberOfProductsInCart }}</i>
            </span>
        </a>
        <HeaderUserArea />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import HeaderUserArea from '@components/organisms/DjHeader/Horizontal/modules/HeaderUserArea.vue';

export default {
    name: 'HeaderActions',
    components: { HeaderUserArea },
    data() {
        return {
            accountChoices: {
                name: [],
                id: [],
            },
            menuAccounts: false,
            currentAccount: this.selectedAccount?.name,
        };
    },
    async created() {
        const jwt = this.$cookies.get('auth._token.local', { parseJSON: true });
        if (jwt) {
            const userAccounts = await this.$core.useUser.getUserDataAuthenticated(jwt);
            userAccounts.accounts.forEach((account) => {
                this.accountChoices.name.push(account.name);
                this.accountChoices.id.push(account.id);
            });
        }
    },
    computed: {
        ...mapState({
            selectedAccount: (state) => state.account.customerAccount,
        }),
        buyinglistTotal() {
            return this.$core.getWishlist.getTotal(this.$store.state.wishlist.items);
        },
        quoteTotal() {
            if (this.$core.useQuote.IsActive()) {
                return this.$core.getQuote.getTotal(this.$store.state.quote.quotes);
            }
            return null;
        },
        totalNumberOfProductsInCart() {
            return this.$core.getCart.getTotalNumberCartItems(this.$store.state.cart.cartItems);
        },
    },
    methods: {
        openCart() {
            $nuxt.$emit('opencartmodel', true);
        },
        async changeShopAccount(index) {
            await this.$core.useUser.defineAccount(this.accountChoices.id[index]);
            this.menuAccounts = false;
            this.$core.useCart.deleteCart();
            await new Promise((resolve) => setTimeout(resolve, 200));
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
.icon {
    text-align: center;
    .icon-users2 {
        font-size: 33px;
        font-weight: 500;
    }
}
.selectedAcc {
    margin-left: 8px;
    font-size: 14px;
    font-weight: 700;
}
.account {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 0px;
}
.changeAcc {
    font-size: 12px;
    margin-left: 8px;
    font-weight: 700;
    color: grey;
}
</style>
