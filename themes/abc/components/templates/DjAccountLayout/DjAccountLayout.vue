<template>
    <section class="my-10">
        <div class="row">
            <div class="col-12 col-md-3">
                <aside class="shadow rounded-extra-lg">
                    <div class="d-flex justify-content-center align-items-center bg-black navigation-header mb-2">
                        <span class="text-white font-700 size-24">
                            {{ fullName }}
                        </span>
                    </div>
                    <AccountLinks :links="accountLinkActiveTrue" />
                </aside>
            </div>
            <div class="col-12 col-md-9">
                <slot />
            </div>
        </div>
    </section>
</template>

<script>
import AccountLinks from '@components/templates/DjAccountLayout/modules/AccountLinks.vue';

export default {
    name: 'DjAccountLayout',
    components: { AccountLinks },
    props: {
        idAccountLink: {
            type: String,
            default: 'Profil',
        },
    },
    computed: {
        fullName() {
            if (this.$auth?.user) {
                return this.$auth.user.firstName + ' ' + this.$auth.user.lastName;
            }

            return 'Invité';
        },
        accountLinkActiveTrue() {
            const accountLinks = [
                {
                    id: 'Profil',
                    text: this.$t('accountLayout.profile'),
                    url: '/account/user-information',
                    icon: 'icon-user',
                    show: this.$auth?.user,
                    active: false,
                },
                {
                    id: 'Adresses',
                    text: this.$t('accountLayout.adresses'),
                    url: '/account/addresses',
                    icon: 'icon-map-marker',
                    show: this.$auth?.user,
                    active: false,
                },
                {
                    id: 'Commandes',
                    text: this.$t('accountLayout.commandes'),
                    url: '/account/orders',
                    icon: 'icon-cart',
                    show: this.$auth?.user,
                    active: false,
                },
                {
                    id: 'Favoris',
                    text: this.$t('accountLayout.favoris'),
                    url: '/buyingList',
                    icon: 'icon-heart',
                    show: this.$core.useWishlist.IsActive() && this.$auth?.user,
                    active: false,
                },
                {
                    id: 'Devis',
                    text: this.$t('accountLayout.devis'),
                    url: '/quotes',
                    icon: 'icon-papers',
                    show: this.$core.useQuote.IsActive() && this.$auth?.user,
                    active: false,
                },
                {
                    id: 'Contact',
                    text: this.$t('accountLayout.contact'),
                    url: '/cms/contact-us',
                    icon: 'icon-envelope',
                    show: true,
                    active: false,
                },
            ];
            accountLinks.forEach((i) => {
                if (this.idAccountLink === i.id) {
                    i.active = true;
                }
            });
            return accountLinks;
        },
    },
};
</script>

<style lang="scss" scoped>
.navigation-header {
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    height: 83px;
}

.rounded-extra-lg {
    border-radius: 24px;
}

.acodis .navigation-header {
    background-color: var(--color-primary);
}
</style>
