<template>
    <li class="menu-item-has-children dropdown">
        <nuxt-link :to="localePath(menuData.url)">
            {{ menuData.text }}
        </nuxt-link>
        <ul v-if="menuData.subMenu" class="sub-menu">
            <MenuDropdown v-for="item in menuData.subMenu" :key="item.text" :menu-data="item" />
        </ul>
    </li>
</template>

<script>
export default {
    name: 'MenuDropdown',
    props: {
        menuData: {
            type: Object,
            defaut: {},
        },
    },
    data: () => {
        return {};
    },
};
</script>

<style scoped></style>
