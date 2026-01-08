<template lang="html">
    <div class="dj-block--methods">
        <v-tabs background-color="white" color="#6c7964" class="dj-tab-list" grow>
            <v-tab tag="li" class="tab-label"> Visa / Master Card </v-tab>
            <v-tab tag="li" class="tab-label"> Stripe </v-tab>
            <v-tab-item>
                <form>
                    <div class="dj-block__content">
                        <visa-method :origin="origin" :originId="originId" />
                    </div>
                </form>
            </v-tab-item>
            <v-tab-item>
                <div class="dj-block__content">
                    <!-- <stripe /> -->
                </div>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>
import PaypalMethod from '@modules/payement/components/modules/PaypalMethod.vue';
import VisaMethod from '@modules/payement/components/modules/VisaMethod.vue';
export default {
    name: 'PaymentMethods',
    components: { VisaMethod, PaypalMethod },
    props: {
        origin: {
            type: String,
            default: 'CART',
        },
        originId: {
            type: Number,
            require: false,
        },
    },
};
</script>

<style lang="scss" scoped>
.tab-label {
    font-size: 16px;
    text-transform: none;
    color: #6c7964;
}
</style>
