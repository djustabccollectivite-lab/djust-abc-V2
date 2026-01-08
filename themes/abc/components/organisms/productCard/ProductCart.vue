<template>
    <div v-if="isDesktop" class="d-flex align-items-center gap-2">
        <div class="dj-product__thumbnail">
            <nuxt-link v-if="productImage" :to="localePath(`/product/${productSku}`)">
                <DjImage :width="75" :height="75" :src="productImage" :alt="productName" />
            </nuxt-link>
        </div>
        <div class="product-informations text-left" style="max-width: 230px">
            <nuxt-link :to="localePath(`/product/${productSku}`)">
                <span class="font-700 size-16">{{ productName }}</span>
            </nuxt-link>
            <div v-if="productBrand" class="subinfos size-14">Marque : {{ productBrand }}</div>
            <div v-if="productExternalId" class="product-informations subinfos size-14">
                Réf : {{ productExternalId }}
            </div>
            <span v-if="isOnQuote" class="bg-dark text-white font-700 rounded px-2">Sur devis</span>
        </div>
    </div>
    <div v-else>
        <div class="mb-2">
            <nuxt-link v-if="productImage" :to="localePath(`/product/${productSku}`)">
                <DjImage :width="1000" :height="1000" :src="productImage" :alt="productName" />
            </nuxt-link>
        </div>
        <div class="product-informations text-left">
            <nuxt-link :to="localePath(`/product/${productSku}`)">
                <span class="text-blue font-700 size-16">{{ productName }}</span>
            </nuxt-link>
            <div v-if="productBrand" class="text-grey-5 size-14">Marque : {{ productBrand }}</div>
            <div v-if="productExternalId" class="product-informations text-grey-5 size-14">
                Réf : {{ productExternalId }}
            </div>
            <span v-if="isOnQuote" class="bg-dark text-white font-700 rounded px-2">Sur devis</span>
        </div>
    </div>
</template>

<script>
import DjImage from '@components/atoms/DjImage/DjImage.vue';

export default {
    name: 'ProductCart',
    components: {
        DjImage,
    },
    props: {
        productExternalId: {
            type: String,
            default: '',
        },
        productSku: {
            type: String,
            default: '',
        },
        productImage: {
            type: [Object, String],
            default: '',
        },
        productPerPack: {
            type: Number,
            default: 1,
        },
        productName: {
            type: String,
            default: 'ProductName',
        },
        productBrand: {
            type: String,
            default: null,
        },
        productNavigationCategoryName: {
            type: String,
            default: null,
        },
        supplierName: {
            type: String,
            default: 'Supplier',
        },
        isOnQuote: {
            type: Boolean,
            required: true,
            default: false,
        },
        isDesktop: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    data() {
        return {
            OnOrderValue: null,
        };
    },
};
</script>

<style lang="scss" scoped>
.dj-product__thumbnail {
    width: 75px;
}
.product-informations {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

a {
    color: var(--color-dark-blue) !important;
}

.subinfos {
    color: var(--color-grey-nuance-5);
}

.acodis .product-informations {
    a {
        color: var(--color-primary) !important;
    }
    .subinfos {
        color: var(--color-beige);
    }
}
</style>
