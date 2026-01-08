<template>
    <div class="d-flex align-items-center gap-2">
        <div class="dj-product__thumbnail">
            <nuxt-link v-if="!isDeliveryFee" :to="localePath(`/product/${product.sku}`)">
                <DjImage v-if="product.thumbnail" class="img_size" :src="product.thumbnail" :alt="product.name" />
                <DjImage v-else class="img_size" :src="product.mainImageUrl" :alt="product.name" />
            </nuxt-link>
        </div>
        <div class="dj-product__content_page">
            <nuxt-link :to="localePath(`/product/${product.sku}`)">
                <span class="font-700 size-16">
                    {{ isDeliveryFee ? 'Frais de livraison' : (product.title ?? product.name) }}
                </span>
            </nuxt-link>
            <div v-if="product.brand && !isDeliveryFee" class="subinfos">
                Marque : <span class="font-700">{{ product.brand }}</span>
            </div>
            <div v-if="product.externalId && !isDeliveryFee" class="subinfos">
                Réf : <span class="font-700">{{ product.externalId }}</span>
            </div>
            <p v-for="attribut in attributes" :key="attribut.id" class="ma-0">
                <strong>{{ attribut.code }}</strong>
            </p>
        </div>
    </div>
</template>

<script>
import DjImage from '@components/atoms/DjImage/DjImage.vue';

export default {
    components: {
        DjImage,
    },
    props: {
        product: {
            type: Object,
            required: true,
            default: () => {},
        },
        productVariant: {
            type: Object,
            required: true,
            default: () => {},
        },
        price: {
            type: Object,
            required: true,
            default: () => {},
        },
        mpnVariantProduct: {
            type: String,
            required: false,
            default: null,
        },
    },
    computed: {
        attributes() {
            return this.productVariant.attributeValues.map((attribut) => {
                return { code: attribut.code, label: attribut.attributeValue };
            });
        },
        isDeliveryFee() {
            return this.productVariant.externalId === 'FDL';
        },
    },
};
</script>

<style lang="scss" scoped>
.img_size {
    width: 100%;
    max-width: 60px;
    max-height: 60px;
    min-width: 60px;
    min-height: 60px;
}

a {
    color: var(--color-dark-blue) !important;
}

.subinfos {
    color: var(--color-grey-nuance-5);
}

.acodis {
    a {
        color: var(--color-primary) !important;
    }
    .subinfos {
        color: var(--color-beige);
    }
}
</style>
