<template lang="html">
    <ul class="menu">
        <li v-for="item in menuItems" :key="item.text">
            <nuxt-link :to="item.url" class="menu__text">
                <i :class="item.icon"> </i>
                <span>{{ item.text }}</span>
            </nuxt-link>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'MenuSidebar',
    data() {
        return {
            menuItems: [
                {
                    text: 'Dashboard',
                    url: '/',
                    icon: 'icon-home',
                },
                {
                    text: 'Orders',
                    url: '/products',
                    icon: 'icon-bag2',
                },
                {
                    text: 'Quotes',
                    url: '/quotes',
                    icon: 'icon-papers',
                },
                {
                    text: 'BuyingList',
                    url: '/customers',
                    icon: 'icon-heart',
                },
                {
                    text: 'Shop',
                    url: '/products',
                    icon: 'icon-store',
                },
                {
                    text: 'Addresses',
                    url: '/categories',
                    icon: 'icon-map',
                },
                {
                    text: 'Settings',
                    url: '/settings',
                    icon: 'icon-cog',
                },
                {
                    text: 'Logout',
                    url: '/settings',
                    icon: 'icon-lock',
                },
            ],
        };
    },
};
</script>

<style lang="scss" scoped></style>
