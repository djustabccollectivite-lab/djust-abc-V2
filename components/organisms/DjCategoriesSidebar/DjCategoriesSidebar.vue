<template>
    <div class="menuLeftCategorie">
        <div class="menu__toggle" @click="showCatMenu(sideBar)">
            <i class="icon-menu" aria-hidden="true"></i>
        </div>
        <div class="menu__content">
            <div class="sidenav" ref="catMenu" :class="{ openSide: sideBar }">
                <DjLink class="sidebar-overlay" @click="hideCatMenu(sideBar)"></DjLink>
                <nav>
                    <DjLink @click="hideCatMenu(sideBar)">
                        <div class="sidebar-back text-left">
                            <i class="fa fa-angle-left pr-2" aria-hidden="true"></i>
                            Back
                        </div>
                    </DjLink>
                    <ul id="sub-menu" class="sidebar-menu" v-for="item in menuCategories" :key="item.position">
                        <li v-if="item.mega">
                            <DjLink href="javascript:void(0)" @click="setActive('test')">
                                {{ item.text }}
                                <span class="sub-arrow"></span>
                            </DjLink>
                            <ul
                                :class="{ opensub1: isActive('test') }"
                                v-for="(i, index) in item.megaContent"
                                :key="index"
                            >
                                <li v-for="j in i.megaItems" :key="j.position">
                                    <DjLink :to="localePath(j.url)">
                                        {{ j.text }}
                                    </DjLink>
                                </li>
                            </ul>
                        </li>
                        <li v-else>
                            <DjLink :to="localePath(item.url)">
                                {{ item.text }}
                            </DjLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
import DjLink from '@components/atoms/DjLink/DjLink.vue';
export default {
    name: 'DjCategoriesSidebar',
    components: {
        DjLink,
    },
    data() {
        return {
            activeItem: 'test',
            sideBar: false,
        };
    },

    watch: {
        $route: function () {
            this.$refs.catMenu.classList.remove('openSide');
        },
    },
    beforeMount() {
        this.$core.useCategories.getCategoriesList();
    },
    computed: {
        menuCategories() {
            return this.$core.getCategories.getMenuCategories(this.$store.state.categories.categories);
        },
    },
    methods: {
        showCatMenu: function (sideBar) {
            this.$refs.catMenu.classList.add('openSide');
        },
        hideCatMenu: function (sideBar) {
            this.$refs.catMenu.classList.remove('openSide');
        },
        isActive: function (menuItem) {
            return this.activeItem === menuItem;
        },
        setActive: function (menuItem) {
            if (this.activeItem === menuItem) {
                this.activeItem = '';
            } else {
                this.activeItem = menuItem;
            }
        },
    },
};
</script>
