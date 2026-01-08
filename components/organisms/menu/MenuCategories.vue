<template>
    <ul class="menu--dropdown new--dropdown">
        <div class="header-categorie-section">
            <div class="title-categorie">{{ $t('menu.navigationList.categories') }}</div>
            <i
                class="icon icon-cross cursor-pointer"
                size="32"
                style="cursor: pointer; font-size: 25px; color: var(--color-secondary)"
                @click="closeOverlay"
            >
            </i>
        </div>

        <v-divider></v-divider>
        <div class="menu">
            <template v-for="item in menuCategories2">
                <MenuDropdown v-if="item.subMenu" :key="item.id" :menu-data="item" @closeOverlay="closeOverlay" />
                <MenuMega v-else-if="item.mega" :key="item.id" :menu-data="item" @closeOverlay="closeOverlay" />
                <div v-else-if="itshow === 0" :key="item.id">
                    <li :key="item.text" class="element" @click.prevent="closeOverlay" @closeOverlay="closeOverlay">
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

export default {
    name: 'MenuCategories',
    components: { MenuMega, MenuDropdown },
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
            const categories = this.$core.getCategories.getMenuCategories(this.$store.state.categories.categories);

            function setParentsIds(category) {
                const parentId = category.id;

                category.megaContent.forEach((cat) => {
                    cat.megaItems.forEach((elt) => {
                        elt.parentId = parentId;

                        if (elt.megaContent.length > 0) setParentsIds(elt);
                    });
                });
            }

            categories.forEach((category) => {
                setParentsIds(category);
            });

            return categories;
        },
    },
    async created() {
        this.logo = await this.$core.useStoryblok.getLogoWithColor();

        this.$nuxt.$on('closeOverlay', () => {
            this.closeOverlay();
        });

        this.$nuxt.$on('itShow', (val) => {
            if (val) {
                this.itshow += val;
            } else {
                this.itshow = 0;
            }

            if (this.itshow < 0) this.itshow = 0;
        });
    },
    beforeMount() {
        this.$core.useCategories.getCategoriesList();
    },

    methods: {
        closeOverlay() {
            this.$emit('closeOverlay', true);
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
</style>
