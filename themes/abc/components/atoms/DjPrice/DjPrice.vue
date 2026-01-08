<template>
    <div v-if="price">
        <span class="dj-product__price" :class="size" v-html="$core.getOffer.getFormatedPrice(price, currency)"> </span>
        <span v-if="displayTax" class="dj-product__price">{{ $t('product.exclTax') }}</span>
    </div>
</template>

<script>
export default {
    name: 'DjPrice',
    props: {
        price: {
            type: Number,
            required: false,
            default: 0,
        },
        currency: {
            type: String,
            required: false,
        },
        displayTax: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String,
            default: 'normal',
            validator: function (value) {
                return ['xsmall', 'small', 'normal', 'large', 'xlarge'].includes(value);
            },
        },
    },
};
</script>
