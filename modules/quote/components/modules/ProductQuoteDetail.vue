<template>
    <div class="dj-product--cart">
        <div class="dj-product__thumbnail">
            <nuxt-link :to="localePath(`/product/${productSku}`)">
                <img :src="productImage" :alt="productName" />
            </nuxt-link>
        </div>
        <div class="dj-product__content_page">
            <nuxt-link :to="localePath(`/product/${productSku}`)" class="dj-product__title">
                {{ productName }}
            </nuxt-link>
            <p v-if="productCategory">
                <strong>{{ productCategory }}</strong>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductQuoteDetail',
    props: {
        product: {
            type: Object,
            default: () => {},
        },
        productId: {
            type: Number,
            default: 1,
        },
        productSku: {
            type: String,
            default: '',
        },
        productImage: {
            type: String,
            default: '/',
        },
        productPerPack: {
            type: Number,
            default: 1,
        },
        productName: {
            type: String,
            default: 'ProductName',
        },
        productCategory: {
            type: String,
            default: 'Category',
        },
    },
    computed: {},
};
</script>

