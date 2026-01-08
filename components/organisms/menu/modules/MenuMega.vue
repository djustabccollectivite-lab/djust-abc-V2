<template>
    <div class="menu--dropdown pb-1 pt-1">
        <li class="menu-item-has-children has-mega-menu">
            <div v-if="menuData.mega" class="title" @click.prevent="showmethod">
                <DjLink>
                    {{ menuData.text }}
                </DjLink>
                <i class="icon-chevron-right mr-1"></i>
            </div>
            <div v-if="show" :class="'mega-menu new-mega-menu cursor-pointer'">
                <div v-for="item in menuData.megaContent" :key="item.id" class="mega-menu__column overflow__hide">
                    <DjLink class="backMenu" @click.prevent="backMainMenu">
                        <i class="icon-chevron-left mr-1"></i> {{ $t('menu.buttonback') }}
                    </DjLink>
                    <div class="mega-menu__column__title new-mega-menu__column cursor-pointer" @click.prevent="close">
                        <DjLink class="menu--data-text" :to="localePath(menuData.url)">
                            {{ menuData.text }}
                        </DjLink>
                    </div>
                    <ul v-for="subItem in item.megaItems" :key="subItem.id" class="mega-menu__list">
                        <li v-if="!subItem.mega" class="element elementheight" @click.prevent="close()">
                            <DjLink :to="localePath(subItem.url)">
                                {{ subItem.text }}
                            </DjLink>
                        </li>
                        <MenuMega v-else :menuData="subItem" />
                    </ul>
                </div>
            </div>
        </li>
    </div>
</template>

<script>
import { mapState } from 'vuex';
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
        };
    },
    computed: {
        ...mapState({
            shopPath: (state) => state.shop.path,
        }),
    },
    watch: {
        $route: {
            handler() {
                const isShop = this.$route.name.includes('list-id') && this.$route.params.id;

                if (!isShop || this.menuData.parentId === this.$route.params.id) this.show = false;

                const isFirstFloor = this.$store.state.categories.categories.some(
                    (category) => category.id === this.$route.params.id,
                );

                if (isFirstFloor) {
                    this.menuData.id !== this.$route.params.id ? (this.show = false) : (this.show = true);
                }
            },
        },
        shopPath: {
            handler: function () {
                if (this.shopPath?.length > 0) {
                    this.show = this.shopPath.includes(this.menuData.externalId);
                }
            },
            immediate: true,
        },
    },
    methods: {
        toggle() {
            this.show = !this.show;
        },
        close() {
            this.$nuxt.$emit('closeOverlay', true);
        },
        showmethod() {
            this.$nuxt.$emit('itShow', 1);
            this.show = true;
        },
        backMainMenu() {
            this.$nuxt.$emit('itShow', -1);
            this.show = false;
        },
    },
};
</script>

<style scoped>
.title,
.element {
    color: black;
    font-size: 15px !important;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-family: var(--font-1st) !important;
    font-weight: bold;
}

.mega-menu {
    left: 0% !important;
    visibility: visible !important;
    width: 400px !important;
    z-index: 1;
}
.backMenu {
    color: black;

    padding-left: 5px;
    padding-top: 15px;
}
.elementheight {
    height: 42px;
}
</style>
