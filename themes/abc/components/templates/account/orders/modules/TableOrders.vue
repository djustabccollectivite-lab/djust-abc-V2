<template>
    <div>
        <div v-for="order in orders" :key="order.id">
            <TableOrdersItem
                :order="order"
                @reload-orders="$emit('reload-orders')"
                :reasonList="reasonList"
                :isDesktop="isDesktop"
            />
        </div>
    </div>
</template>

<script>
import TableOrdersItem from '@components/templates/account/orders/modules/TableOrdersItem.vue';

export default {
    name: 'TableOrders',
    components: {
        TableOrdersItem,
    },
    props: {
        orders: {
            type: Array,
            default: () => [],
        },
        reasonList: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            isDesktop: 960 < window.innerWidth
        }
    },
    mounted() {
        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
        })
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize);
    },
    methods: {
        onResize() {
            this.isDesktop = 960 < window.innerWidth;
        }
    },
};
</script>
