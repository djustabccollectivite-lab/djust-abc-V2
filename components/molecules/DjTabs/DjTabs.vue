<template>
    <nav>
        <ul class="tabs" style="gap: 20px">
            <li v-for="(tab, index) in tabs" :key="`order-tab-${index}`">
                <div @click="activateTab(index)">
                    <DjButton :text="tab" size="small" :styleButton="activeStyle(index)" />
                </div>
            </li>
        </ul>
    </nav>
</template>

<script>
import DjButton from '@components/atoms/DjButton/DjButton.vue';

export default {
    name: "DjTabs",
    components: {DjButton},
    props: {
        tabs: {
            required: true,
            type: []
        }
    },
    data() {
        return {
            activeTab: 0,
        }
    },
    methods: {
        activateTab(index) {
            this.activeTab = index;
            this.$emit("changeActiveTab", index);
        },
        activeStyle(index) {
            return index === this.activeTab ? 'primary' : 'outline';
        },
    }
}
</script>

<style lang="scss" scoped>
.tabs {
    display: flex;
    flex-wrap: wrap;
    flex-direction: rows;
    align-items: center;
    justify-content: flex-start;
    gap: 3rem;
    list-style: none;
}
</style>