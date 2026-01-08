<template lang="html">
    <form class="pa-4">
        <div class="form-group">
            <label>
                {{ $t('checkout.payment.cardNumber') }}
            </label>
            <input type="text" class="form-control" />
        </div>
        <div class="form-group">
            <label>
                {{ $t('checkout.payment.cardHoders') }}
            </label>
            <input type="text" class="form-control" />
        </div>
        <div class="row">
            <div class="col-8">
                <div class="form-group">
                    <label>
                        {{ $t('checkout.payment.expirationDate') }}
                    </label>
                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <select class="form-control">
                                    <option v-for="month in months">
                                        {{ month }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <select class="form-control">
                                    <option v-for="year in years">
                                        {{ year }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="form-group">
                    <label> CVV </label>
                    <input type="text" class="form-control" />
                </div>
            </div>
        </div>
        <div class="form-group">
            <p>
                {{ $t('checkout.payment.condition') }}
            </p>
            <div @click.prevent="submitOrder()">
                <DjButton :text="$t('checkout.payment.submit')" :fullWidth="true" styleButton="primary" />
            </div>
        </div>
    </form>
</template>

<script>
import DjButton from '@components/atoms/DjButton/DjButton.vue';

export default {
    name: 'VisaMethod',
    components: { DjButton },
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
    computed: {
        days() {
            let days = [];
            for (let i = 1; i <= 31; i++) {
                days.push(i);
            }
            return days;
        },
        months() {
            let month = [];
            for (let i = 1; i <= 12; i++) {
                month.push(i);
            }
            return month;
        },
        years() {
            let year = [];
            for (let i = 1; i <= 12; i++) {
                year.push(i);
            }
            return year;
        },
    },
    methods: {
        async submitOrder() {
            const result = await this.$core.useCart.createOrder(this.origin, this.originId);
            if (result) {
                this.$router.push(this.localePath('/checkout/order-validation'));
            } else {
                this.$toast.error(result);

                // this.$notify({
                //         group: 'error',
                //         title: '',
                //         text: result
                //     });
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>
