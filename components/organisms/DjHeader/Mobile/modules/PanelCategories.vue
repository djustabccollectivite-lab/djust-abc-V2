<template>
    <div class="dj-panel--sidebar">
        <div class="dj-panel__header">
            <div class="title__h3">Categories</div>

            <a href="#" class="dj-panel__close" @click.prevent="handleClosePanel">
                <i class="icon icon-cross"></i>
            </a>
        </div>

        <div class="dj-panel__content">
            <v-list class="menu--mobile">
                <template v-for="menuItem in menuCategories">
                    <v-list-group v-if="menuItem.mega" :key="menuItem.text" no-action>
                        <template v-slot:activator>
                            <v-list-item-content>
                                <nuxt-link :to="menuItem.url" @click="handleClosePanel">
                                    {{ menuItem.text }}
                                </nuxt-link>
                            </v-list-item-content>
                        </template>

                        <v-list>
                            <template v-for="megaItem in menuItem.megaContent[0].megaItems">
                                <v-list-group
                                    v-if="megaItem.megaContent[0]"
                                    class="childNavigation"
                                    no-action
                                    :key="megaItem.text"
                                >
                                    <template v-slot:activator>
                                        <v-list-item-content>
                                            <nuxt-link :to="megaItem.url" @click="handleClosePanel">
                                                {{ megaItem.text }}
                                            </nuxt-link>
                                        </v-list-item-content>
                                    </template>

                                    <MobileSubmenu :marginForChild="25" :menu="megaItem.megaContent[0].megaItems" />
                                </v-list-group>

                                <v-list-item-content class="subTextA childNavigation" :key="megaItem.text" v-else>
                                    <nuxt-link :to="megaItem.url" @click="handleClosePanel">
                                        {{ megaItem.text }}
                                    </nuxt-link>
                                </v-list-item-content>
                            </template>
                        </v-list>
                    </v-list-group>

                    <v-list-item v-else :key="menuItem.text">
                        <v-list-item-content>
                            <nuxt-link :to="menuItem.url" @click="handleClosePanel">
                                {{ menuItem.text }}
                            </nuxt-link>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
        </div>
    </div>
</template>

<script>
import MobileSubmenu from '@components/organisms/DjHeader/Mobile/modules/MobileSubmenu.vue';
export default {
    name: 'PanelCategories',
    components: { MobileSubmenu },
    beforeMount() {
        this.$core.useCategories.getCategoriesList();
    },
    computed: {
        menuCategories() {
            return this.$core.getCategories.getMenuCategories(this.$store.state.categories.categories);
        },
    },
    methods: {
        handleClosePanel() {
            this.$store.commit('app/setCurrentDrawerContent', null);
            this.$store.commit('app/setAppDrawer', false);
        },
    },
};
</script>

<style lang="scss" scoped>
.subTextA {
    a {
        padding-left: 16px;
    }
}
.childNavigation {
    margin-left: 15px;
}
</style>
