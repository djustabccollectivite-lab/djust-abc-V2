<template>
    <div v-if="offer && offerPrice">
        <div class="dj-offer--info-content">
            <div class="dj-offer-items">
                <dl class="items-list">

                    <div class="item">
                        <dd class="item-value">
                            <DjPrice
                                :price="offerPrice.priceRanges[0].price.itemPrice"
                                :originPrice="
                                    offerPrice.priceRanges[0].discountPrice &&
                                    offerPrice.priceRanges[0].discountPrice.itemPrice
                                "
                                :currency="currency"
                                :displayTax="true"
                                size="large"
                            />
                            <small v-if="offerPrice.itemPerPack > 1" class="d-flex ">
                                <DjPrice
                                    :price="offerPrice.priceRanges[0].price.itemPrice * offerPrice.itemPerPack"
                                    :currency="currency"
                                    :displayTax="true"
                                    size="xsmall"
                                />
                                <span> &nbsp; {{ $t('product.perSet') }}</span>
                            </small>
                        </dd>
                    </div>


                </dl>
            </div>
        </div>
        <div class="dj-product__price__ranges" v-if="offerPrice.priceRanges.length > 1">
            <small
                ><DjLink class="view" @click="displayPricesRanges = !displayPricesRanges">{{
                    $t('product.viewPriceRange')
                }}</DjLink></small
            >
            <transition name="fade">
                <table class="table dj-table--responsive">
                    <thead>
                        <tr class="text-body-1">
                            <th>{{ $t('product.quantity') }}</th>
                            <th>{{ $t('product.price') }}</th>
                            <th>{{ $t('product.discount') }}</th>
                        </tr>
                    </thead>
                    <tbody class="text-h6">
                        <tr v-for="price in offerPrice.priceRanges" :key="price.id">
                            <td>{{ price.quantity }}</td>
                            <td>
                                <DjPrice
                                    :price="price.price.itemPrice * price.quantity"
                                    :currency="currency"
                                    :displayTax="true"
                                    size="xsmall"
                                />
                            </td>
                            <td>
                                <del>
                                    <DjPrice
                                        v-if="price.quantity > 1"
                                        :price="offerPrice.priceRanges[0].price.itemPrice * price.quantity"
                                        :currency="currency"
                                        :displayTax="true"
                                        size="xsmall"
                                    />
                                </del>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </transition>
        </div>
         <div class="dj-offer--info-content">
            <div class="dj-offer-items">
                <dl class="items-list">

                    <div class="item">
                        <dt class="item-props">{{ $t('product.quantityPer', { offerPackingType }) }}</dt>
                        <dd class="item-value">{{ quantityPerItem }}</dd>
                    </div>
                     <div class="item">
                        <dt class="item-props">{{ $t('product.typeOfPackaging') }}</dt>
                        <dd class="item-value">{{ offerPackingType }}</dd>
                    </div>

                </dl>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, defineComponent, ref, useContext } from '@nuxtjs/composition-api';
import DjPrice from '@components/atoms/DjPrice/DjPrice.vue';
import DjLink from '@components/atoms/DjLink/DjLink.vue';

export default defineComponent({
    name: 'BuyingZonePrice',
    components: {
        DjLink,
        DjPrice,
    },
    props: {
        offerPrice: {
            type: Object,
            require: true,
            default: () => {},
        },
        offer: {
            type: Object,
            require: true,
            default: () => {},
        },
        option: {
            type: Object,
            require: true,
            default: () => {},
        },
    },
    setup(props) {
        const ctx = useContext();

        const currency = computed(() => ctx.store.state.app.currency);
        const displayPricesRanges = ref(false);
        const offerPackingType = computed(() => ctx.$core.getOffer.getOfferPackingType(props.offer));
        const quantityPerItem = computed(() => ctx.$core.getOffer.getQuantityPerItem(props.offer));

        return { currency, displayPricesRanges, offerPackingType, quantityPerItem };
    },
});

</script>

<style lang="scss" scoped>

.dj-offer--info-content {
    overflow: hidden;
    .dj-offer-items {
        padding-top: 1.25rem;
        padding-bottom: 1.25rem;
        @media (min-width: 640px) {
            padding: 0;
        }
        .items-list {
            .item {
                padding-bottom: 1rem;

                @media (min-width: 640px) {
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    gap: 1rem;
                }
                .item-props {
                    font-family: var(--font-1st);
                    font-style: normal;
                    font-weight: 400;
                    font-size: 14px;
                    //text-transform: lowercase !important;
                    line-height: 17px;
                    color: #000000;
                }
                .item-value {
                    margin-top: 0.25rem;
                    font-family: var(--font-1st);
                    font-style: normal;
                    font-weight: 400;
                    font-size: 14px;
                    text-transform: lowercase !important;

                    line-height: 19px;
                    color: #000000;

                    @media (min-width: 640px) {
                        margin-top: 0;
                        grid-column: span 2 / span 2;
                    }
                }
            }
        }
    }
}
</style>
