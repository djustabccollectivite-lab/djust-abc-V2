<template>
    <v-list>
        <template v-for="menuItem in menu">
            <v-list-group
                v-if="menuItem.megaContent[0]"
                :style="{ 'margin-left': marginForChild + 'px' }"
                no-action
                :key="menuItem.text"
            >
                <template v-slot:activator>
                    <v-list-item-content>
                        <nuxt-link :to="menuItem.url">
                            {{ menuItem.text }}
                        </nuxt-link>
                    </v-list-item-content>
                </template>
                <MobileSubmenu :marginForChild="marginForChild + 10" :menu="menuItem.megaContent[0].megaItems" />
            </v-list-group>
            <v-list-item v-else no-action :style="{ 'margin-left': marginForChild + 'px' }" :key="menuItem.text">
                <v-list-item-content>
                    <nuxt-link :to="menuItem.url">
                        {{ menuItem.text }}
                    </nuxt-link>
                </v-list-item-content>
            </v-list-item>
        </template>
    </v-list>
</template>

<script>
import MobileSubmenu from '@components/organisms/DjHeader/Mobile/modules/MobileSubmenu.vue';
export default {
    name: 'MobileSubmenu',
    components: { MobileSubmenu },
    props: {
        menu: {
            type: Array,
            default: () => [],
        },
        marginForChild: {
            type: Number,
            default: 10,
            require: false,
        },
    },
};
</script>
