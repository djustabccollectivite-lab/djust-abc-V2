<template>
    <div v-if="isDesktop" class="d-flex">
        <div class="quotes-tabs px-4 py-12">
            <div class="font-700 size-24 uppercase mb-2 pl-2">
                {{ $t('account.quotes.quote') }}
            </div>
            <v-tabs
                :active-class="isPrimaryColor"
                v-model="tabs"
                :color="isTransparent"
                background-color="transparent"
                :vertical="isVertical"
                class="tabs-desktop"
            >
                <v-tab class="d-flex justify-content-between px-2">
                    <div class="size-16 font-700">
                        {{ $t('account.quotes.pendingQuote') }}
                    </div>
                    <div class="size-14 font-700 quantity">
                        {{ newQuotes.length }}
                    </div>
                </v-tab>
                <v-tab class="d-flex justify-content-between px-0">
                    <div class="size-16 font-700">
                        {{ $t('account.quotes.quotesSend') }}
                    </div>
                    <div class="size-14 font-700 quantity">
                        {{ oldQuotes.length }}
                    </div>
                </v-tab>
            </v-tabs>
        </div>
        <div class="quotes-items w-full">
            <v-tabs-items v-model="tabs">
                <v-tab-item class="px-6">
                    <BreadCrumb :breadcrumb="breadCrumb" class="mb-2" />
                    <creation-quote
                        :quotes="newQuotes"
                        :shippingAddress="shippingAddress"
                        :key="increment"
                        :quoteToShow="quoteToShow"
                    ></creation-quote>
                </v-tab-item>
                <v-tab-item class="px-6">
                    <BreadCrumb :breadcrumb="breadCrumb" class="mb-2" />
                    <traitement-quote
                        :quotes="oldQuotes"
                        @refresh="refreshComponent"
                    ></traitement-quote>
                </v-tab-item>
            </v-tabs-items>
        </div>
    </div>
    <div v-else>
        <BreadCrumb :breadcrumb="breadCrumb" class="mb-2" />
        <div class="px-4 mb-4">
            <v-tabs
                :active-class="isPrimaryColor"
                v-model="tabs"
                :color="isTransparent"
                :vertical="isVertical"
                class="tabs-mobile"
            >
                <v-tab class="d-flex justify-content-between px-2">
                    <div class="size-16 font-700">
                        {{ $t('account.quotes.pendingQuote') }}
                    </div>
                </v-tab>
                <v-tab class="d-flex justify-content-between px-2">
                    <div class="size-16 font-700">
                        {{ $t('account.quotes.quotesSend') }}
                    </div>
                </v-tab>
            </v-tabs>
        </div>
        <div class="quotes-items">
            <v-tabs-items v-model="tabs">
                <v-tab-item class="px-6">
                    <creation-quote
                        :quotes="newQuotes"
                        :shippingAddress="shippingAddress"
                        :key="increment"
                        :quoteToShow="quoteToShow"
                    ></creation-quote>
                </v-tab-item>
                <v-tab-item class="px-6">
                    <traitement-quote
                        :quotes="oldQuotes"
                        @refresh="refreshComponent"
                    ></traitement-quote>
                </v-tab-item>
            </v-tabs-items>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import TabQuoteHeader from '@modules/quote/components/modules/TabQuoteHeader.vue';
import CreationQuote from '@modules/quote/components/CreationQuote.vue';
import TraitementQuote from '@modules/quote/components/traitementQuote.vue';
import BreadCrumb from '@components/atoms/DjBreadCrumb/DjBreadCrumb.vue';

export default {
    name: 'Quotes',
    components: {
        CreationQuote,
        TraitementQuote,
        TabQuoteHeader,
		BreadCrumb
    },
    data(context) {
        return {
            isDesktop: 960 < window.innerWidth,
            quoteToShow: 0,
            tabs: 0,
            increment: 0,
			breadCrumb: [
				{
					text: context.$i18n.t('common.breadscrum.home'),
					url: context.localePath('/'),
				},
				{
					text: context.$i18n.t('header.prospect.login'),
					url: context.localePath('/account/user-information'),
				},
				{
					text: context.$i18n.t('accountLayout.quotes'),
				},
			],
        };
    },
    computed: {
        ...mapState({
            currency: (state) => state.app.currency,
			quotes: (state) => state.quote.quotes,
        }),
        nbQuotes() {
            return this.quotes ? this.quotes.length : 1;
        },
		newQuotes() {
			let allNewQuotes = [];
			for (let i = 0; i < this.quotes.length; i++) {
				if (this.quotes[i].supplierQuotes.length === 0) {
					allNewQuotes.push(this.quotes[i]);
				}
			}
			return allNewQuotes;
		},
		pendingQuotes() {
			let allPendingQuotes = [];
			for (let i = 0; i < this.quotes.length; i++) {
				if (this.quotes[i].supplierQuotes.length > 0) {
					allPendingQuotes.push(this.quotes[i]);
				}
			}
			return allPendingQuotes;
		},
		oldQuotes() {
			let allOldQuotes = [];
			for (let i = 0; i < this.quotes.length; i++) {
				if (this.quotes[i].supplierQuotes.length > 0) {
					allOldQuotes.push(this.quotes[i]);
				}
			}
			return allOldQuotes;
		},
        shippingAddress() {
            return this.$store.state.user.addressShippingList;
        },
        billingAddress() {
            if (this.$store.state.user.addressBillingList) {
                let map = this.$store.state.user.addressBillingList.map(
                    (res) => res.label + ' - ' + res.address + ' ' + res.city + ' ' + res.country + ' ' + res.zipcode
                );
                this.baddress = map[0];
                return map;
            }
        },
		isVertical() {
			return this.$vuetify.breakpoint.mdAndUp;
		},
		isTransparent() {
			if (this.$vuetify.breakpoint.mdAndUp) {
				return 'transparent';
			} else {
				return 'var(--color-primary)';
			}
		},
		isPrimaryColor() {
			if (this.$vuetify.breakpoint.mdAndUp) {
				return 'text-primary';
			} else {
				return 'text-black';
			}
		}
    },
    created() {
        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
        })
        this.$nuxt.$on('refresh', () => {
            this.increment++;
        });
        this.$core.useUser.getUserBillingAddressList();
        this.$core.useUser.getUserShippingAddressList();
        this.$nuxt.$on('refreshProductToShowAfterDelete', (val) => {
            this.increment++;
            this.quoteToShow = val;
        });
        this.$store.commit('quote/setMasterQuotes', this.quotes);
    },
    methods: {
        refreshComponent() {
            this.increment++;
        },
        onResize() {
            this.isDesktop = 960 < window.innerWidth;
        }
    },
    beforeDestroy() {
        this.$nuxt.$off('refresh');
        window.removeEventListener('resize', this.onResize);
    },
};
</script>

<style lang="scss" scoped>
.quotes-tabs {
    min-width: 280px;
    background-color: var(--color-grey-nuance-9);
}

.tabs-desktop .v-tab {
    padding-left: 8px !important;
    padding-right: 8px !important;
    div {
        color: var(--color-black);
    }
}

.tabs-desktop .v-tab--active {
    background: rgba(255, 221, 0, 0.33);
    border-radius: 8px;
    div {
        color: var(--color-primary);
    }
}

.tabs-desktop .v-tab .quantity {
    background-color: var(--color-grey-nuance-4);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    color: var(--color-white);
    padding-top: 1px;
    padding-left: 1px;

}

.tabs-desktop .v-tab--active .quantity {
    background-color: var(--color-primary);
}

::v-deep .tabs-mobile .v-tabs-bar__content {
    justify-content: space-between;
}

.tabs-mobile .v-tab--active {
    background: transparent;
    div {
        color: var(--color-black);
    }
}

.tabs-mobile .v-tab:before {
    background-color: transparent;
}
</style>
