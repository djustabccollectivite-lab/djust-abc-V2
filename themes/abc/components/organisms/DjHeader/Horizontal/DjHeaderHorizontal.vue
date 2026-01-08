<template>
    <header id="headerSticky" class="header header--standard w-full">
        <div v-if="headerContent && headerContent.showHeaderTop" class="bg-black py-2 text-white">
            <div class="abc-container">
                <p class="mb-0 text-uppercase font-700 size-18 d-flex align-items-center">
                    {{ headerContent.HeaderTopText }}
                    <a :href="headerContent.HeaderTopLink.url" target="_blank" class="text-primary">
                        {{ headerContent.HeaderTopLinkText }}
                    </a>
                </p>
            </div>
        </div>
        <div class="header__content px-10 py-6 d-flex justify-space-between align-items-center bg-white shadow">
            <div v-if="headerLogo" class="header-logo">
                <nuxt-link :to="localePath('/')">
                    <DjImage :src="`${headerLogo}`" :alt="'logo ABC'" />
                </nuxt-link>
            </div>
            <div class="px-16 ml-6 flex-grow-1 search-header">
                <SearchHeader />
            </div>
            <HeaderActions />
        </div>
        <nav class="bg-black">
            <div class="d-flex justify-content-between flex-wrap px-10 py-4">
                <v-menu
                    v-for="(category, index) in categories"
                    :key="index"
                    open-on-hover
                    offset-y
                    rounded-sm
                    nudge-left="0"
                    nudge-bottom="-5"
                    :content-class="isAcodis ? 'acodis-menu' : ''"
                >
                    <template #activator="{ on, attrs }">
                        <div
                            v-bind="attrs"
                            class="d-flex justify-content-between align-items-center"
                            :class="index !== categories.length - 1 ? 'flex-grow-1' : 'flex-grow-0'"
                            v-on="on"
                        >
                            <nuxt-link :to="`/list/${slugify(category.text)}`" class="size-16 font-700 text-white">
                                {{ category.text }}
                            </nuxt-link>

                            <span
                                v-if="index !== categories.length - 1"
                                class="flex-grow-1 d-flex justify-content-center"
                            >
                                <span class="text-white size-18 font-700">|</span>
                            </span>
                        </div>
                    </template>
                    <!--                    <div class="d-flex justify-content-center" style="height: 0">
                        <div class="tooltip-triangle"></div>
                    </div>-->
                    <div class="dropdown_menu mt-2 p-0 d-flex justify-content-between flex-wrap bg-white">
                        <div
                            v-for="(subcategory, key) in category.megaContent[0]?.megaItems"
                            :key="key"
                            :class="['py-4 flex-grow-1', key !== 0 ? 'border-left' : '']"
                        >
                            <div>
                                <nuxt-link :to="`/list/${slugify(subcategory.text)}`">
                                    <div class="submenu_link pl-4 p-2">
                                        <span class="text-black font-700 size-16">{{ subcategory.text }}</span>
                                    </div>
                                </nuxt-link>
                                <div
                                    v-for="(subSubcategory, subKey) in subcategory.megaContent[0]?.megaItems"
                                    :key="subKey"
                                >
                                    <nuxt-link :to="`/list/${slugify(subSubcategory.text)}`">
                                        <div class="submenu_link pl-8 py-2">
                                            <span class="text-black">{{ subSubcategory.text }}</span>
                                        </div>
                                    </nuxt-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </v-menu>
            </div>
        </nav>
        <div
            v-if="headerContent && 0 < headerContent.HeaderBottom.length && headerContent.showHeaderBottom"
            class="d-flex justify-space-between bg-primary"
        >
            <HeaderBottomItem
                v-for="item in headerContent.HeaderBottom"
                :key="item.id"
                :link="item.Link"
                :text="item.Text"
                :icon="item.Icon"
            />
        </div>
    </header>
</template>

<script>
import SearchHeader from '@components/organisms/DjHeader/Horizontal/modules/SearchHeader.vue';
import HeaderActions from '@components/organisms/DjHeader/Horizontal/modules/HeaderActions.vue';
import HeaderBottomItem from '@components/organisms/DjHeader/Horizontal/modules/HeaderBottomItem.vue';
import DjImage from '@components/atoms/DjImage/DjImage.vue';
import { stickyHeader } from '~/utilities/common-helpers';
import { slugify } from '~/purjus/helpers/common/urlHelper';

export default {
    name: 'DjHeaderHorizontal',
    components: {
        SearchHeader,
        HeaderActions,
        HeaderBottomItem,
        DjImage,
    },
    data() {
        return {
            headerLogo: null,
            headerContent: null,
            displayMenu: false,
        };
    },
    computed: {
        categories() {
            return this.$core.getCategories.getMenuCategoriesv2(this.$store.state.categories.categories);
        },
        isAcodis() {
            return this.$config.storeId === 'acodis';
        },
    },
    async created() {
        this.headerLogo = await this.$core.useStoryblok.getLogo();
        this.headerContent = await this.$core.useStoryblok.getHeader();
        this.$nuxt.$on('closeOverlay', (value) => {
            this.displayMenu = !value;
        });
        window.addEventListener('scroll', stickyHeader);
    },
    methods: {
        slugify,
        show() {
            this.displayMenu = true;
        },
        closeOverlay() {
            this.displayMenu = false;
        },
    },
};
</script>

<style lang="scss" scoped>
.search-header {
    max-width: 690px;
}

.header-logo {
    width: 120px; // Augmenté de 100px à 120px
    height: 120px; // Augmenté de 100px à 120px
    min-width: 120px;
}

.v-menu__content {
    box-shadow: none;
    overflow-y: hidden;
    width: 100%;
    max-width: 100%;
    left: 0;
}

.dropdown_menu {
    border: 2px solid var(--color-primary);
}
.submenu_link:hover {
    background-color: var(--color-primary);
}

.header__content {
    z-index: 200 !important;
}

.acodis-menu {
    .dropdown_menu {
        border: 2px solid #00afa6;
    }
    .submenu_link:hover {
        background-color: #00afa6;
    }
}
</style>
