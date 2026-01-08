<template>
    <DjAccountLayout :key="increment" :idAccountLink="accountLayoutOrga">
        <InformationBlock
            :treeOrga="getOrga"
            :customerAccount="fullData"
            :organisationName="organisationName"
            :organisationId="organisationId"
            class="mb-8"
        >
        </InformationBlock>
        <UserBlock
            :currentOrga="organisation.id"
            :userOrga="getUser"
            :organisationName="organisationName"
            :organisationId="organisationId"
            class="mb-8"
        >
        </UserBlock>
        <AddressesOrga :currentOrga="organisation.id" :addressOrga="fullAddress" :organisationName="organisationName">
        </AddressesOrga>
    </DjAccountLayout>
</template>

<script>
import DjAccountLayout from '@components/templates/DjAccountLayout/DjAccountLayout.vue';
import AddressesOrga from '@components/templates/account/organisation/modules/addressBlock.vue';
import UserBlock from '@components/templates/account/organisation/modules/usersBlock.vue';
import InformationBlock from '@components/templates/account/organisation/modules/urInformationBlock.vue';
import DjCard from '@components/molecules/DjCard/DjCard.vue';

export default {
    name: 'Organisation',
    components: { DjAccountLayout, AddressesOrga, UserBlock, InformationBlock, DjCard },
    async created() {
        this.$nuxt.$on('updateAddressOrga', async (val) => {
            this.$core.useUser.getCustomerAccount().then((response) => (this.fullAddress = response.addresses));
            this.increment++;
        });
        this.$nuxt.$on('updateUsers', async (val) => {
            this.callGetUserFormAccount();
            this.increment++;
        });
        this.$nuxt.$on('whenClickOnTree', async (clickOnTree) => {
            this.organisation = clickOnTree;
            if (this.organisation.id !== '0') {
                this.getUser = await this.$core.useUser.getUserInOrga(this.organisation.id);
            } else {
                this.organisation = { id: '0' };
                this.callGetUserFormAccount();
            }
        });
        this.$nuxt.$on('whenCreateOrganisation', async (val) => {
            this.getOrga = await this.$core.useUser.getOrganisation();
        });
        this.$nuxt.$on('clickOnCancel', async (val) => {
            this.fullData = await this.$core.useUser.getCustomerAccount();
        });
        this.callGetUserFormAccount();
        this.fullData = await this.$core.useUser.getCustomerAccount();
        this.fullAddress = this.fullData.addresses;
        this.getOrga = await this.$core.useUser.getOrganisation();
    },
    computed: {
        organisationId() {
            return this.organisation ? this.$core.organisationGet.getOrganisationId(this.organisation) : '';
        },
        organisationName() {
            return this.organisation
                ? this.$core.organisationGet.getOrganisationName(this.organisation)
                : this.fullData.name;
        },
    },

    data() {
        return {
            civilities: ['MR', 'MRS', 'MISS'],
            fullData: '',
            fullAddress: [],
            getUser: [],
            getOrga: [],
            increment: 0,
            organisation: { id: '0' },
            getUserInOrga: [],
            accountLayoutOrga: 'Orga',
        };
    },
    methods: {
        async callGetUserFormAccount() {
            this.getUser = await this.$core.useUser.getUserFormAccount({ size: 100 });
        },
    },
};
</script>

<style lang="scss" scoped>
.dj-section--account-setting {
    margin-top: 5rem;
}
</style>
