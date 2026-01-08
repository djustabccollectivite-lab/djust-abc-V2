<template>
    <section class="dj-my-account dj-page--account">
        <div class="dj-account-layout">
            <div class="row">
                <div class="col-lg-3">
                    <aside class="ps-widget--account-dashboard">
                        <DjCard headerColor="var(--color-secondary)" :title="fullName" :Nopadding="true">
                            <div class="ps-widget__content">
                                <AccountLinks :links="accountLinkActiveTrue" />
                            </div>
                        </DjCard>
                    </aside>
                </div>
                <div class="col-lg-9">
                    <slot />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import AccountLinks from '@components/templates/DjAccountLayout/modules/AccountLinks.vue';
import DjCard from '@components/molecules/DjCard/DjCard.vue';

export default {
    name: 'DjAccountLayout',
    components: { AccountLinks, DjCard },
    props: {
        idAccountLink: {
            type: String,
            default: 'Profil',
        },
    },
    computed: {
        fullName() {
            return this.$auth.user.firstName + ' ' + this.$auth.user.lastName;
        },
        accountLinkActiveTrue() {
            const accountLinks = [
                {
                    id: 'Profil',
                    text: this.$t('accountLayout.profile'),
                    url: '/account/user-information',
                    icon: 'icon-user',
                    show: true,
                    active: false,
                },
                {
                    id: 'Orga',
                    text: this.$t('accountLayout.organisations'),
                    url: '/account/organisation',
                    icon: 'icon-group-work',
                    show: true,
                    active: false,
                },
                {
                    id: 'Adresses',
                    text: this.$t('accountLayout.adresses'),
                    url: '/account/addresses',
                    icon: 'icon-map-marker',
                    show: true,
                    active: false,
                },
                {
                    id: 'Commandes',
                    text: this.$t('accountLayout.commandes'),
                    url: '/account/orders',
                    icon: 'icon-cart',
                    show: true,
                    active: false,
                },
                {
                    id: 'Fav',
                    text: this.$t('accountLayout.favoris'),
                    url: '/buyingList',
                    icon: 'icon-heart',
                    show: this.$core.useWishlist.IsActive(),
                    active: false,
                },
                {
                    id: 'Devis',
                    text: this.$t('accountLayout.devis'),
                    url: '/quotes',
                    icon: 'icon-papers',
                    show: this.$core.useQuote.IsActive(),
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
.widthcontainer {
    max-width: 95%;
}
.dj-account-layout {
    width: 100%;
    background: #ffffff;
    margin-left: auto;
    margin-right: auto;
    padding: 24px 0;
    @media (min-width: 640px) {
        padding: 24px;
    }
    @media (min-width: 1024px) {
        padding: 24px 30px;
    }
}
</style>
