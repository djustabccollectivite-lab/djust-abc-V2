<template>
    <div>
        <!-- Utilisation de href pour permettre "Ouvrir dans un autre onglet" -->
        <a :href="localePath(`/product/${productSku}?variantId=${offer?.offer?.id}`)">
            <h3 class="text-blue font-700 size-16 text-ellipsis">
                {{ productTitle }}
            </h3>
        </a>
        <div class="subinfos">
            <div>
                Marque :
                <span class="font-700">
                    {{ brandName }}
                </span>
            </div>
            <div>
                Réf fournisseur :
                <span class="font-700">
                    {{ productReference }}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DjProductInfo',
    props: {
        productTitle: {
            type: String,
            default: '',
        },
        brandName: {
            type: String,
            default: '',
        },
        productSku: {
            type: String,
            default: '',
        },
        productReference: {
            type: String,
            default: '',
        },
        offer: {
            type: Object,
            default: () => ({}),
        },
    },
};
</script>

<style lang="scss" scoped>
.text-ellipsis {
    max-width: 325px;
}

.subinfos {
    color: var(--color-grey-nuance-5);
}

.acodis {
    a h3 {
        color: var(--color-primary);
    }
    .subinfos {
        color: var(--color-beige);
    }
}
</style>
