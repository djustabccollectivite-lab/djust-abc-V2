<template lang="html">
    <section>
        <div class="title__h4">Account Details</div>

        <aside class="widget widget_product widget_features">
            <p><i class="icon-user"></i>Name: <strong> DJUST B2B</strong></p>
            <p><i class="icon-bag-euro"></i> Total Commandé : <strong> 5012 €</strong></p>
            <p><i class="icon-receipt"></i> Nombre de commandes: <strong> 12 </strong></p>
            <p>
                <i class="icon-map-marker"></i>Address:
                <strong>21 Rue de Boetie 75008 Paris</strong>
                <br />
                <a href="account/addresses">View Addresses (2)</a>
            </p>
        </aside>
    </section>
</template>

<script>
import ProductThumbnail from '@components/organisms/productCard/ProductThumbnail.vue';

export default {
    name: 'WidgetUserInfo',
    components: { ProductThumbnail },
};
</script>

<style lang="scss" scoped></style>
