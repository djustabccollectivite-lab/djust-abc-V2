<template>
    <div v-if="originPrice > price">
        <span class="dj-product__price sale" :class="size" v-html="$core.getOffer.getFormatedPrice(price, currency)">
            <span v-if="displayTax" class="dj-product__price">{{ $t('product.exclTax') }}</span>
            <del class="ml-1" v-html="$core.getOffer.getFormatedPrice(originPrice, currency)"> </del>
            <small>{{ ((1 - price / originPrice) * 100).toFixed(0) }}% off</small>
        </span>
    </div>
    <div v-else>
        <span class="dj-product__price" v-html="$core.getOffer.getFormatedPrice(price, currency)" :class="size"> </span>
        <span v-if="displayTax" class="dj-product__price">{{ $t('product.exclTax') }}</span>
    </div>
</template>

<script>
export default {
    name: 'DjPrice',
    props: {
        price: {
            type: Number,
            require: true,
            default: 0,
        },
        originPrice: {
            type: Number,
            require: false,
            default: 0,
        },
        currency: {
            type: String,
            require: true,
        },
        displayTax: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String,
            default: 'normal',
            validator: function (value) {
                return ['xsmall', 'small', 'normal', 'large', 'xlarge'].indexOf(value) !== -1;
            },
        },
    },
};
</script>
