<template>
    <div class="dj-product__content">
        <div class="dj-price d-flex align-items-center">
            <DjPrice :price="itemPrice" :originPrice="itemDiscrountPrice" :currency="currency" />
            <p class="dj-price__info">
                <span>{{ $t('common.theUnit') }}</span>
                <span v-if="quantityPerPack > 1"> ({{ $t('common.soldInPacksOf') }} {{ quantityPerPack }}) </span>
            </p>
        </div>
        <div class="d-flex align-items-center">
            <DjQuantity
                :quantityIncrement="quantityPerPack"
                :displayTitle="false"
                :showIncrement="showIncrement"
                class="mr-2"
                @child-quantity="quantityValue"
            />
            <DjButtonAddToCart
                v-if="$core.useShop.IsActive()"
                :quantity="quantity"
                :offerId="offerId"
                :productName="productName"
                styleB="icon"
                styleButton="light"
                class="mr-2"
            />
            <DjButtonAddToQuote
                v-if="$core.useQuote.IsActive()"
                :quantity="quantity"
                :productId="productVariantId"
                :productName="productName"
                styleB="icon"
                styleButton="light"
            />
            <DjButtonAddToBuyingList
                v-if="$core.useWishlist.IsActive()"
                :offerId="offerId"
                :productId="productVariantId"
                :productName="productName"
                styleB="icon"
                styleButton="light"
                class="ml-2"
            />
        </div>
    </div>
</template>

<script>
import DjQuantity from '@components/atoms/DjQuantity/DjQuantity.vue';
import DjPrice from '@components/atoms/DjPrice/DjPrice.vue';

import { defineComponent, computed, ref, useContext } from '@nuxtjs/composition-api';
import DjButtonAddToBuyingList from '@components/molecules/DjButtonAddToBuyingList/DjButtonAddToBuyingList.vue';
import DjButtonAddToCart from '@components/molecules/DjButtonAddToCart/DjButtonAddToCart.vue';
import DjButtonAddToQuote from '@components/molecules/DjButtonAddToQuote/DjButtonAddToQuote.vue';

export default defineComponent({
    name: 'DjProductThumbnailActions',
    components: {
        DjPrice,
        DjQuantity,
        DjButtonAddToCart,
        DjButtonAddToBuyingList,
        DjButtonAddToQuote,
    },
    props: {
        itemPrice: {
            type: Number,
            require: true,
            default: 0,
        },
        itemDiscrountPrice: {
            type: Number,
            require: false,
        },
        quantityPerPack: {
            type: Number,
            require: false,
            default: 1,
        },
        offerId: {
            type: String,
            require: true,
        },
        productVariantId: {
            type: String,
            require: true,
        },
        productName: {
            type: String,
            require: false,
        },
        showIncrement: {
            type: Boolean,
            require: false,
            default: true,
        },
        offer: {
            type: Object,
            default: () => {},
        },
    },
    setup(props) {
        const ctx = useContext();
        const currency = computed(() => ctx.store.state.app.currency);
        const quantity = ref(props.quantityPerPack);
        function quantityValue(params) {
            quantity.value = params;
        }

        return { currency, quantity, quantityValue };
    },
});
</script>
