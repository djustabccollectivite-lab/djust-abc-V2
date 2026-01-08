<template lang="html">
    <div class="dj-panel--sidebar">
        <div class="dj-panel__header">
            <div class="title__h3">Menu</div>
            <a href="#" class="dj-panel__close" @click.prevent="handleClosePanel">
                <i class="icon icon-cross"></i>
            </a>
        </div>
        <div class="dj-panel__content">
            <div class="ps-site-actions">
                <div class="row">
                    <div class="col-6">
                        <mobile-currency-switcher />
                    </div>
                    <div class="col-6">
                        <mobile-languge-switcher />
                    </div>
                </div>
            </div>
            <v-list class="menu--mobile">
                <template v-for="menuItem in menu">
                    <v-list-group v-if="menuItem.subMenu" no-action>
                        <template v-slot:activator>
                            <v-list-item-content>
                                <nuxt-link :to="menuItem.url" @click="handleClosePanel">
                                    {{ menuItem.text }}
                                </nuxt-link>
                            </v-list-item-content>
                        </template>
                        <mobile-submenu :menu="menuItem.subMenu" />
                    </v-list-group>
                    <v-list-group v-else-if="menuItem.mega" no-action>
                        <template v-slot:activator>
                            <v-list-item-content>
                                <nuxt-link :to="menuItem.url" @click="handleClosePanel">
                                    {{ menuItem.text }}
                                </nuxt-link>
                            </v-list-item-content>
                        </template>
                        <v-list>
                            <template v-for="megaItem in menuItem.megaContent">
                                <v-list-group no-action>
                                    <template v-slot:activator>
                                        <v-list-item-content>
                                            <nuxt-link :to="menuItem.url" @click="handleClosePanel">
                                                {{ megaItem.heading }}
                                            </nuxt-link>
                                        </v-list-item-content>
                                    </template>
                                    <mobile-submenu :menu="megaItem.megaItems" />
                                </v-list-group>
                            </template>
                        </v-list>
                    </v-list-group>
                    <v-list-item v-else>
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
import MobileCurrencySwitcher from '@components/organisms/DjHeader/Mobile/modules/MobileCurrencySwitcher.vue';
import MobileLangugeSwitcher from '@components/organisms/DjHeader/Mobile/modules/MobileLangugeSwitcher.vue';
export default {
    name: 'PanelMenu',
    components: {
        MobileLangugeSwitcher,
        MobileCurrencySwitcher,
        MobileSubmenu,
    },
    methods: {
        handleClosePanel() {
            this.$store.commit('app/setCurrentDrawerContent', null);
            this.$store.commit('app/setAppDrawer', false);
        },
    },
};
</script>

<style lang="scss" scoped></style>
