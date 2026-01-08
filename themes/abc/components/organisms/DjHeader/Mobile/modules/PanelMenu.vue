<template>
    <div class="dj-panel--sidebar text-black">
        <DjHeaderMobileHorizontal :isMenuOpen="true" />
        <div class="mb-4 px-2">
            <SearchHeader />
        </div>
        <div class="dj-panel__content p-0">
            <v-list class="menu--mobile">
                <v-list-group v-if="isLoggedIn && accountChoices.length > 1" no-action :ripple="false">
                    <template #activator>
                        <v-list-item-content>
                            <span class="text-black font-700 size-16 uppercase">Multi user</span>
                        </v-list-item-content>
                    </template>
                    <div>
                        <div class="p-4">
                            <div class="mb-4 font-700 text-black">Compte actuel :</div>
                            <div class="font-700 text-black">{{ accountSelected }}</div>
                        </div>
                        <div class="ml-4 py-2 text-black">Choisir un autre compte :</div>
                        <v-list
                            v-for="(account, index) in accountChoices.filter(
                                (accountChoice) => accountChoice.name !== accountSelected,
                            )"
                            :key="index"
                        >
                            <v-list-item class="account-choice" @click="changeShopAccount(account)">
                                {{ account.name }}
                            </v-list-item>
                        </v-list>
                    </div>
                </v-list-group>
                <v-list-group v-if="isLoggedIn" no-action :ripple="false">
                    <template #activator>
                        <v-list-item-content>
                            <span class="text-black font-700 size-16 uppercase">Compte</span>
                        </v-list-item-content>
                    </template>
                    <MobileSubmenu :menu="dataMenu" />
                </v-list-group>
                <div v-if="isLoggedIn" class="pl-4 py-2">
                    <nuxt-link to="/buyinglist" class="w-full" @click.prevent="handleClosePanel">
                        <div class="text-black font-700 size-16 uppercase">Liste de favoris</div>
                    </nuxt-link>
                </div>
                <div v-if="isLoggedIn" class="pl-4 py-2">
                    <nuxt-link to="/quotes" @click.prevent="handleClosePanel">
                        <span class="text-black font-700 size-16 uppercase">Devis</span>
                    </nuxt-link>
                </div>
                <div v-if="!isLoggedIn" class="pl-4 py-2">
                    <nuxt-link to="/auth/login" @click.prevent="handleClosePanel">
                        <span class="text-black font-700 size-16 uppercase">Connexion</span>
                    </nuxt-link>
                </div>
                <div v-if="!isLoggedIn" class="pl-4 py-2">
                    <nuxt-link to="/auth/register" @click.prevent="handleClosePanel">
                        <span class="text-black font-700 size-16 uppercase">Créer un compte</span>
                    </nuxt-link>
                </div>
                <v-list-group no-action>
                    <template #activator>
                        <v-list-item-content>
                            <span class="text-black font-700 size-16 uppercase">Catégories</span>
                        </v-list-item-content>
                    </template>
                    <MobileSubmenu :menu="categories" />
                </v-list-group>
            </v-list>
        </div>
    </div>
</template>

<script>
import MobileSubmenu from '@components/organisms/DjHeader/Mobile/modules/MobileSubmenu.vue';
import DjHeaderMobileHorizontal from '@components/organisms/DjHeader/Mobile/DjHeaderMobileHorizontal.vue';
import SearchHeader from '@components/organisms/DjHeader/Horizontal/modules/SearchHeader.vue';
import { slugify } from '~/purjus/helpers/common/urlHelper';

export default {
    name: 'PanelMenu',
    components: {
        MobileSubmenu,
        DjHeaderMobileHorizontal,
        SearchHeader,
    },
    data() {
        return {
            accountSelected: '',
            accountChoices: [],
            selectedAccount: null,
            isMenuOpen: null,
            dataMenu: [
                {
                    url: '/account/user-information',
                    text: 'Profil',
                    megaContent: [],
                },
                {
                    url: '/account/organisation',
                    text: 'Organisations',
                    megaContent: [],
                },
                {
                    url: '/account/addresses',
                    text: 'Adresses',
                    megaContent: [],
                },
                {
                    url: '/account/orders',
                    text: 'Commandes',
                    megaContent: [],
                },
                {
                    url: 'logout',
                    text: 'Déconnexion',
                    megaContent: [],
                },
            ],
        };
    },
    computed: {
        isLoggedIn() {
            return this.$auth.loggedIn;
        },
        categories() {
            return this.getCategoriesUrlByName(
                this.$core.getCategories.getMenuCategories(this.$store.state.categories.categories),
            );
        },
    },
    async created() {
        const jwt = this.$cookies.get('auth._token.local', { parseJSON: true });
        const userAccount = await this.$core.useUser.getUserDataAuthenticated(jwt);
        const userAccountSelected = userAccount.accounts.find(
            (account) => account.id === this.$store.state.app.account,
        );
        this.accountSelected = userAccountSelected ? userAccountSelected.name : userAccount.account.name;
        this.accountChoices = userAccount.accounts.sort((a, b) => a.name.localeCompare(b.name));
    },
    methods: {
        handleClosePanel() {
            this.isMenuOpen = false;
            this.$store.commit('app/setCurrentDrawerContent', null);
            this.$store.commit('app/setAppDrawer', false);
        },
        async changeShopAccount(shopSelected) {
            await this.$core.useUser.defineAccount(shopSelected.id);
            this.accountSelected = shopSelected.name;
            this.menuAccounts = false;
            if (window.location.pathname === '/') {
                location.reload();
            } else {
                window.location.href = '/';
            }
        },
        getCategoriesUrlByName(categories) {
            if (categories?.some((cat) => cat.megaContent.length > 0)) {
                const newCategories = categories.map((cat) =>
                    Object.assign(cat, { url: `/list/${slugify(cat.text)}` }),
                );
                return newCategories.map((cat) =>
                    Object.assign(cat, {
                        megaContent: [{ megaItems: this.getCategoriesUrlByName(cat.megaContent[0].megaItems) }],
                    }),
                );
            }
            return categories.map((cat) => Object.assign(cat, { url: `/list/${slugify(cat.text)}` }));
        },
    },
};
</script>
