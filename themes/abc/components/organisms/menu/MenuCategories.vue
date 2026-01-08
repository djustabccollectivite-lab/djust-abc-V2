<template>
    <ul class="menu--dropdown new--dropdown">
        <div class="header-categorie-section">
            <div class="title-categorie">{{ $t('menu.navigationList.categories') }}</div>
            <i class="icon icon-cross cursor-pointer i--style" size="32" @click="closeOverlay"> </i>
        </div>
        <v-divider></v-divider>
        <div class="menu">
            <template v-for="item in menuCategories2">
                <MenuDropdown v-if="item.subMenu" :menu-data="item" @closeOverlay="closeOverlay" :key="item.id" />
                <MenuMega v-else-if="item.mega" :menu-data="item" @closeOverlay="closeOverlay" :key="item.id" />
                <div v-else-if="itshow === 0" :key="item.id">
                    <li class="element" :key="item.text" @click.prevent="closeOverlay" @closeOverlay="closeOverlay">
                        <nuxt-link :to="localePath(item.url)">
                            {{ item.text }}
                        </nuxt-link>
                    </li>
                </div>
            </template>
        </div>
    </ul>
</template>

<script>
import { mapState } from 'vuex';
import MenuDropdown from '@components/organisms/menu/modules/MenuDropdown.vue';
import MenuMega from '@components/organisms/menu/modules/MenuMega.vue';
import DjLink from '@components/atoms/DjLink/DjLink.vue';

export default {
    name: 'MenuCategories',
    components: { MenuMega, MenuDropdown, DjLink },
    data() {
        return {
            logo: null,
            itshow: 0,
        };
    },
    computed: {
        ...mapState({
            categories: (state) => state.categories,
        }),
        menuCategories2() {
            return this.$core.getCategories.getMenuCategoriesv2(this.$store.state.categories.categories);
        },
    },
    async created() {
        this.logo = await this.$core.useStoryblok.getLogoWithColor();
        this.$nuxt.$on('itShow', (val) => {
            if (val === -1) {
                this.itshow = this.itshow - 1;
            } else if (val === 1) {
                this.itshow = this.itshow + 1;
            } else {
                this.itshow = 0;
            }
            if (this.itshow < 0) {
                this.itshow = 0;
            }
        });
    },
    beforeMount() {
        this.$core.useCategories.getCategoriesList();
    },
    methods: {
        closeOverlay() {
            this.$nuxt.$emit('closeOverlay', true);
        },
    },
};
</script>

<style lang="scss" scoped>
.header-categorie-section {
    margin-top: 15px;
    margin-bottom: 15px;
    padding-left: 10px;
    padding-right: 10px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    .title-categorie {
        font-size: 20px;
        font-weight: 700;
        color: var(--color-secondary);
        display: flex;
        justify-content: center;
    }
    i {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 700;
    }
}
.title,
.element {
    color: black;
    font-size: 15px !important;
    height: 43px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 500;
    line-height: 2em;
}
.new--dropdown {
    width: 100% !important;
}
.i--style {
    cursor: pointer;
    font-size: 25px;
    color: var(--color-secondary);
}
</style>
