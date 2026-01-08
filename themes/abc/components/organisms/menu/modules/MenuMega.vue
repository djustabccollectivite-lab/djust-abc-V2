<template>
    <ul class="menu--dropdown">
        <li
            class="menu-item-has-children has-mega-menu"
            @mouseleave="show = !show"
        >
            <div
                class="title"
                @mouseover="show = true"
                @click.prevent="closeOverlay"
            >
                <DjLink :href="localePath(menuData.url)" :to="localePath(menuData.url)">
                    {{ menuData.text }}
                    <i class="icon-chevron-right mr-1" />
                </DjLink>
            </div>
            <div
                v-if="show"
                :class="show ? 'mega-menu hidden' : null"
                @mouseleave="show = !show"
            >
                <div
                    v-for="item in menuData.megaContent"
                    :key="item.heading"
                    class="mega-menu__column"
                >
                    <div class="mega-menu__column__title">
                        {{ menuData.text }}
                    </div>
                    <ul
                        v-for="subItem in item.megaItems"
                        :key="subItem.text"
                        class="mega-menu__list"
                    >
                        <li
                            v-if="!subItem.mega"
                            class="element"
                            @click.prevent="closeOverlay"
                        >
                            <DjLink :href="localePath(subItem.url)" :to="localePath(subItem.url)">
                                {{ subItem.text }}
                            </DjLink>
                        </li>
                        <MenuMega
                            v-else
                            :key="increment"
                            :menuData="subItem"
                            @closeOverlay="closeOverlay"
                        />
                    </ul>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
import DjLink from '@components/atoms/DjLink/DjLink.vue';

export default {
    name: 'MenuMega',
    components: {
        DjLink,
    },
    props: {
        menuData: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            show: false,
            increment: Math.random(),
        };
    },
    methods: {
        toggle() {
            this.show = !this.show;
            this.increment++;
        },
        closeOverlay() {
            this.$emit('closeOverlay', true);
        },
    },
};
</script>

<style lang="scss" scoped>
.menu--dropdown > li:hover > .title > a {
    color: white;
}
</style>
