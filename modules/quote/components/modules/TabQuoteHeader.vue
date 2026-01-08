<template>
    <div class="ps-fastorder__menu__list__item">
        <div class="ps-fastorder__menu__list__item__label">
            {{ $core.getQuote.getQuoteName(item) }}
        </div>
        <div class="ps-fastorder__menu__list__item__number">
            {{ $core.getQuote.getQuoteNbItems(item) }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'TabQuoteHeader',
    props: {
        item: {
            type: Object,
            default: {},
        },
    },
};
</script>

<style></style>
