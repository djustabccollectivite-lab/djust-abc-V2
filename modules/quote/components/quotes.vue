<template>
    <div class="ps-fastorder ps-section--shopping">
        <div class="dj-section__content ps-fastorder__menu">
            <div class="title__h3 ps-fastorder__menu__title">{{ $t('accountLayout.quotes') }}</div>
            <v-tabs
                v-model="tabs"
                grow
                vertical
                background-color="tansparent"
                center-active
                active-class="order__active"
                class="ps-fastorder__menu__list"
            >
                <v-tabs-slider color="transparent"></v-tabs-slider>
                <v-tab>
                    <div class="ps-fastorder__menu__list__item">
                        <div class="ps-fastorder__menu__list__item__label">
                            {{ $t('account.quotes.oldQuote') }}
                        </div>
                        <div class="ps-fastorder__menu__list__item__number">
                            {{ oldQuotes.length }}
                        </div>
                    </div>
                </v-tab>
                <v-tab>
                    <div class="ps-fastorder__menu__list__item">
                        <div class="ps-fastorder__menu__list__item__label">
                            {{ $t('account.quotes.pendingQuote') }}
                        </div>
                        <div class="ps-fastorder__menu__list__item__number">
                            {{ newQuotes.length }}
                        </div>
                    </div>
                </v-tab>
            </v-tabs>
        </div>
        <div class="dj-section__content ps-fastorder__content">
            <bread-crumb :breadcrumb="breadCrumb" />
            <v-tabs-items v-model="tabs">
                <v-tab-item>
                    <traitement-quote :quotes="oldQuotes" @refresh="refreshComponent"></traitement-quote>
                </v-tab-item>
                <v-tab-item>
                    <creation-quote
                        :key="increment"
                        :quotes="newQuotes"
                        :shippingAddress="shippingAddress"
                        :quoteToShow="quoteToShow"
                    ></creation-quote>
                </v-tab-item>
            </v-tabs-items>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import CreationQuote from '@modules/quote/components/CreationQuote.vue';
import TraitementQuote from '@modules/quote/components/traitementQuote.vue';
import BreadCrumb from '@components/atoms/DjBreadCrumb/DjBreadCrumb.vue';

export default {
    name: 'QuotesModules',
    components: {
        CreationQuote,
        TraitementQuote,
        BreadCrumb,
    },
    data(context) {
        return {
            step1: false,
            step2: false,
            step3: false,
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
            return this.quotes.filter(({ supplierQuotes }) => supplierQuotes.length === 0);
        },
        oldQuotes() {
            return this.quotes.filter(({ supplierQuotes }) => supplierQuotes.length > 0);
        },
        shippingAddress() {
            return this.$store.state.user.addressShippingList;
        },
        billingAddress() {
            if (this.$store.state.user.addressBillingList) {
                const map = this.$store.state.user.addressBillingList.map(
                    (res) => res.label + ' - ' + res.address + ' ' + res.city + ' ' + res.country + ' ' + res.zipcode,
                );
                this.baddress = map[0];
                return map;
            }
            return null;
        },
    },

    beforeDestroy() {
        this.$nuxt.$off('refresh');
    },

    created() {
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
    },
};
</script>

<style lang="scss" scoped>
.fast-order__form .row label {
    display: none;
}

.fast-order__form .row:first-child label {
    display: block;
}

.quote-enter-active,
.quote-leave-active {
    transition: opacity 0.5s;
}
.quote-enter,
.quote-leave-active {
    opacity: 0;
}
.ps-fastorder::v-deep {
    display: flex;
    flex-direction: column;
    @media (min-width: 1024px) {
        flex-direction: row;
    }
    .ps-fastorder__menu {
        background: var(--background-global);
        padding: 32px 16px;
        width: 100%;
        min-width: 100%;
        @media (min-width: 640px) {
            padding: 32px;
        }
        @media (min-width: 1024px) {
            width: 288px;
            min-width: 288px;
            min-height: 100%;
            padding: 64px 32px;
        }
        .v-tabs-bar {
            background: transparent;
            .v-tab {
                height: auto;
                padding: 0;
                &:before,
                .v-ripple__container {
                    display: none;
                }
                &.v-tab--active {
                    .ps-fastorder__menu__list__item {
                        color: var(--color-primary);
                        position: relative;
                        &:before {
                            content: '';
                            width: calc(100% + 32px);
                            height: 100%;
                            border-radius: 8px;
                            background: var(--color-primary);
                            opacity: 0.15;
                            position: absolute;
                            left: -16px;
                            top: 0;
                        }
                        &__number {
                            background: var(--color-primary);
                        }
                    }
                }
            }
            .v-tabs-bar__content {
                transform: none !important;
            }
            .v-slide-group__wrapper {
                contain: inherit;
                overflow: visible;
            }
        }
        &__title {
            font-size: 24px;
            line-height: 28px;
            font-weight: 500;
            border-bottom: 1px solid var(--color-grey);
            padding-bottom: 32px;
            margin-bottom: 32px;
        }
        &__list {
            list-style: none;
            &__item {
                color: var(--color-body);
                font-size: 16px;
                line-height: 24px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px 0;
                width: 100%;
                text-transform: none;
                letter-spacing: normal;
                &__number {
                    width: 16px;
                    min-width: 16px;
                    height: 16px;
                    background: var(--color-body-2);
                    border-radius: 50%;
                    font-size: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 10px;
                    font-weight: 700;
                    color: #ffffff;
                }
            }
        }
    }
    .ps-fastorder__content {
        width: 100%;
        min-width: 100%;
        padding: 32px 16px;
        margin-bottom: 0;
        background: #ffffff;
        @media (min-width: 640px) {
            padding: 32px;
        }
        @media (min-width: 1024px) {
            width: calc(100% - 288px);
            min-width: calc(100% - 288px);
            padding: 64px 32px;
        }
        .dj-breadcrumb {
            padding: 0;
            margin-bottom: 8px;
            .container {
                max-width: 100%;
                padding: 0;
            }
        }
        .dj-quote {
            &__title {
                font-size: 34px;
                line-height: 40px;
                margin-bottom: 32px;
            }
        }
        .dj-section__content_invoices {
            &__title {
                font-size: 18px;
                line-height: 24px;
            }
        }
        .v-sheet.v-card:not(.v-sheet--outlined) {
            box-shadow: none;
            .v-card__title {
                padding: 0;
            }
        }
        .v-slide-group__content {
            gap: 32px;
            border-bottom: 1px solid var(--color-grey);
        }
        .v-tab {
            padding: 0;
            font-size: 16px !important;
            line-height: 24px;
            border-radius: 0;
            color: var(--color-body);
            text-transform: none;
            letter-spacing: inherit;
            font-weight: 400;
            min-width: inherit;
            border-bottom: 4px solid transparent;
            &:before {
                display: none;
            }
            .v-ripple__container {
                display: none;
            }
            &.v-tab--active {
                color: var(--color-primary) !important;
                border-bottom: 4px solid var(--color-primary);
                color: var(--color-primary) !important;
                font-weight: 500;
            }
        }
        .v-tabs-items {
            margin: 32px 0;
        }
    }
}
</style>
