<template lang="html">
    <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                class="og-btn--currency-mobile"
                color="success"
                block
                depressed
                :ripple="false"
                v-bind="attrs"
                v-on="on"
            >
                {{ selectedCurrency.name }}
            </v-btn>
        </template>
        <v-list>
            <v-list-item v-for="item in currencyItems" :key="item.id">
                <v-list-item-title @click.prevent="handleChangeCurrency(item.code)">
                    <span class="language-item">{{ item.name }}</span>
                </v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'MobileCurrencySwitcher',
    computed: {
        ...mapState({
            currency: (state) => state.app.currency,
            app: (state) => state.app,
        }),
        selectedCurrency() {
            return this.currencyItems.find((item) => item.code === this.currency);
        },
    },
    data() {
        return {
            currencyItems: [
                {
                    id: 1,
                    code: '$',
                    name: 'US Dollar',
                },
                {
                    id: 2,
                    code: '€',
                    name: 'Euro',
                },
                {
                    id: 3,
                    code: '£',
                    name: 'GBP',
                },
            ],
        };
    },
    methods: {
        handleChangeCurrency(code) {
            this.$core.useApp.changeCurrency(code);
        },
    },
};
</script>

<style lang="scss" scoped></style>
