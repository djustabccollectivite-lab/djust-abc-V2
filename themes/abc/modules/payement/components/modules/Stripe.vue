<!-- <template lang="html">
    <div class="ma-2">
        <stripe-element-card ref="elementRef" :pk="pulishableKey" @token="tokenCreated" :hidePostalCode="true" />
        <button @click="submit">Generate token</button>
        <stripe-checkout ref="checkoutRef" :pk="pk" :items="items" :successUrl="successUrl" :cancelUrl="cancelUrl">
            <template slot="checkout-button">
                <v-button class="text-none" @click="checkout"> Checkout </v-button>
            </template>
        </stripe-checkout>
    </div>
</template> -->

<script>
/* import { StripeElementCard } from '@vue-stripe/vue-stripe';

export default {
    components: {
        StripeElementCard,
    },
    data() {
        this.pulishableKey = process.env.STRIPE_PK;

        return {
            pk: process.env.STRIPE_PK,
            token: null,
            items: [
                {
                    sku: 'sku_FdQKocNoVzznpJ',
                    quantity: 1,
                },
            ],
            successUrl: 'https://localhost:3000',
            cancelUrl: 'https://localhost:3000',
        };
    },
    methods: {
        checkout() {
            this.$refs.checkoutRef.redirectToCheckout();
        },
        submit() {
            // this will trigger the process
            this.$refs.elementRef.submit();
        },
        tokenCreated(token) {
            // handle the token
            // send it to your server
        },
    },
}; */
</script>
