<template>
    <div class="dj-dropdown">
        <a href="#">
            {{ selectedCurrency.name }}
        </a>
        <ul class="dj-dropdown-menu">
            <li v-for="item in currencyItems" :key="item.id">
                <a href="javascript:window.location.reload(true)" @click="handleChangeCurrency(item.code)">
                    {{ item.name }}
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'CurrencyDropdown',
    data() {
        return {
            currencyItems: [
                {
                    id: 1,
                    code: 'USD',
                    name: 'US Dollar',
                },
                {
                    id: 2,
                    code: 'EUR',
                    name: 'Euro',
                },
                {
                    id: 3,
                    code: 'GBP',
                    name: 'Pound sterling',
                },
                {
                    id: 4,
                    code: 'CNY',
                    name: 'Yuan',
                },
                {
                    id: 5,
                    code: 'AUD',
                    name: 'Australian Dollar',
                },
                {
                    id: 6,
                    code: 'CAD',
                    name: 'Canadian Dollar',
                },
                {
                    id: 7,
                    code: 'CHF',
                    name: 'Swiss Franc',
                },
                {
                    id: 8,
                    code: 'INR',
                    name: 'Indian Rupee',
                },
                {
                    id: 9,
                    code: 'JPY',
                    name: 'Japanese Yen',
                },
                {
                    id: 10,
                    code: 'MYR',
                    name: 'Malaysian Ringgit',
                },
                {
                    id: 11,
                    code: 'SGD',
                    name: 'Singapore Dollar',
                },
                {
                    id: 12,
                    code: 'SEK',
                    name: 'Swedish krona',
                },
                {
                    id: 13,
                    code: 'HUF',
                    name: 'Forint',
                },
            ],
        };
    },
    computed: {
        ...mapState({
            currency: (state) => state.app.currency,
            app: (state) => state.app,
        }),
        selectedCurrency() {
            return this.currencyItems.find((item) => item.code === this.currency);
        },
    },
    methods: {
        handleChangeCurrency(code) {
            this.$core.useApp.changeCurrency(code);
            this.$core.useShop.getProductList();
        },
    },
};
</script>
