<template lang="html">
    <DjCard title="Statistiques">
        <div>
            <DjBlockStat title="Total orders" value="254" icon="icon-cart" position="vertical" />
            <DjBlockStat title="Pending Orders" value="54" icon="icon-timer" position="vertical" />
            <DjBlockStat title="Shipped Orders" value="200" icon="icon-truck" position="vertical" />
            <DjBlockStat title="Total Quotes" value="83" icon="icon-papers" position="vertical" />
            <DjBlockStat title="Purchase amount" value="$ 2,500" icon="icon-bag-dollar" position="vertical" />
        </div>
    </DjCard>
</template>

<script>
import DjBlockStat from '@components/molecules/DjBlockStat/DjBlockStat.vue';
import DjCard from '@components/molecules/DjCard/DjCard.vue';

export default {
    name: 'CardStatics',
    components: { DjBlockStat, DjCard },
};
</script>

<style lang="scss" scoped></style>
