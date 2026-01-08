<template lang="html">
    <div class="ps-form__orders dj-block--checkout-order">
        <div class="title__h3">Your Order</div>
        <div class="dj-block--checkout-order">
            <div class="dj-block__content">
                <figure>
                    <figcaption>
                        <strong>item(s)</strong>
                        <small v-html="totalOrderValidated"></small>
                    </figcaption>
                    <figcaption>
                        <strong>Shipping</strong>
                        <small>50 €</small>
                    </figcaption>
                </figure>
                <figure>
                    <figcaption>
                        <strong>Total excl. tax:</strong>
                        <small v-html="totalOrderValidatedWithShipping"></small>
                    </figcaption>
                    <figcaption>
                        <strong>VAT:</strong>
                        <small v-html="totalOrderValidatedVAT"></small>
                    </figcaption>
                </figure>
                <figure class="dj-block__shipping">
                    <figcaption>
                        <div class="title__h3">Total incl. tax:</div>
                        <small v-html="totalOrderValidatedWithVatAndShipping"></small>
                    </figcaption>
                </figure>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'ModuleOrderSummary',
    computed: {
        ...mapState({
            order: (state) => state.cart.orderValidated,
            currency: (state) => state.app.currency,
        }),
        totalOrderValidated() {
            return this.$core.getCart.getTotalOrderValidated(this.order, this.currency);
        },
        totalOrderValidatedWithShipping() {
            return this.$core.getCart.getTotalOrderValidatedWithShipping(this.order, this.currency);
        },
        totalOrderValidatedVAT() {
            return this.$core.getCart.getTotalOrderValidatedVAT(this.order, this.currency);
        },
        totalOrderValidatedWithVatAndShipping() {
            return this.$core.getCart.getTotalOrderValidatedWithVatAndShipping(this.order, this.currency);
        },
    },
};
</script>

<style lang="scss" scoped></style>
