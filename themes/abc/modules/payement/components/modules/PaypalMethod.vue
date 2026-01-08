<template lang="html">
    <div class="ps-payment-method" id="paypal">
        <p>
            By making this purchase you agree to
            <a href="#" class="highlight">our terms and conditions</a>.
        </p>
        <DjButton :text="$t('checkout.payment.title')" :fullWidth="true" styleButton="primary" />
    </div>
</template>

<script>
import DjButton from '@components/atoms/DjButton/DjButton.vue';

export default {
    name: 'PaypalMethod',
    components: { DjButton },
};
</script>

<style lang="scss" scoped>
#paypal {
    max-width: 500px;
}
</style>
