<template>
    <div>
        <div v-if="offers && offers.length" @click="drawer = true" class="dj-product__price-right ps-more__offers">
            <DjLink class="font-weight-bold dj-more__offers__title">
                <i class="icon-tag"></i>
                {{
                    $tc('product.tabs.offers.otheroffers', offers.length, {
                        nbOffers: offers.length,
                    })
                }}
            </DjLink>
            <div v-for="offer in offers" :key="offer.id">
                <div :class="['dj-property']">
                    <span class="dj-property__name">
                        {{ $core.getOffer.getOfferSupplierName(offer) }}
                    </span>
                    <span class="dj-property__separator"> - </span>
                    <span class="dj-property__value" v-html="`${GetValueOffer(offer)} HT`"> </span>
                </div>
            </div>
        </div>
        <v-navigation-drawer v-model="drawer" app right temporary width="450" height="100%" class="pa-3 pt-6">
            <div v-if="offers">
                <div v-for="offer in offers" :key="offer.id" class="ma-0 mt-2 mb-4 dj-product__price-right">
                    <PartialOfferRightItem :offer="offer" :product="product" />
                </div>
            </div>
        </v-navigation-drawer>
    </div>
</template>

<script>
import { computed, defineComponent, ref, useContext } from '@nuxtjs/composition-api';
import PartialOfferRightItem from '@components/templates/product/modules/PartialOfferRightItem.vue';
import DjLink from '@components/atoms/DjLink/DjLink.vue';

export default defineComponent({
    components: {
        PartialOfferRightItem,
        DjLink,
    },
    props: {
        offers: {
            type: Array,
            require: true,
            default: () => [],
        },
        product: {
            type: Object,
            require: false,
            default: () => {},
        },
    },
    setup() {
        const selectedItem = ref(1);
        const ctx = useContext();
        const currency = computed(() => ctx.store.state.app.currency);
        const drawer = ref(false);
        function GetValueOffer(offer) {
            return ctx.$core.getOffer.getBestOfferPriceFromOfferInventory(offer)
                ? ctx.$core.getOffer.getFirstPriceFromOfferPrice(
                      ctx.$core.getOffer.getBestOfferPriceFromOfferInventory(offer),
                      currency.value,
                      true
                  )
                : '0';
        }
        return { currency, drawer, GetValueOffer, selectedItem };
    },
});
</script>

<style lang="scss" scoped>
.dj-property {
    display: flex;
    cursor: pointer;
    @media (max-width: 349px) {
        flex-direction: column;
    }
    &__name {
        margin: 5px;
    }
    &__separator {
        margin: 5px;
    }
    &__value {
        margin: 5px;
        font-family: var(--font-2nd) !important;
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 24px;
        color: #1c1c1c;
    }
}

.dj-more__offers__title {
    font-size: 1.2em;
    color: var(--color-primary);
}
</style>
