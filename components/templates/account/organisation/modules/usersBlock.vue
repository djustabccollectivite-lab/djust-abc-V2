<template>
    <DjCard headerColor="var(--color-secondary)" :title="$t('account.organisation.titleUser') + ' ' + organisationName">
        <div class="dj-section--account-setting">
            <div
                v-for="(user, index) in paginatedUsers"
                :key="index"
            >
                <UsersLine
                    :usersLine="user"
                    :i="index"
                    :currentOrga="currentOrga"
                    :organisationId="organisationId"
                />
            </div>
            <v-pagination
                v-if="totalPages > 1"
                v-model="currentPage"
                class="mt-4"
                color="#00244e"
                total-visible="8"
                :length="totalPages"
                @input="handleChangePagination"
            />
            <DjButton
                :text="$t('account.organisation.createUser')"
                :iconDisplayed="true"
                styleButton="light"
                :shape="'button'"
                icon="icon-plus-circle"
                :size="'standard'"
                :textDisplayed="true"
                @click.native="createUser()"
            />
        </div>
        <DjModal
            v-model="createUserPage"
            width="700"
            class="modale__buying"
        >
            <DjCard
                headerColor="var(--color-secondary)"
                :title="$t('account.organisation.createUser')"
                class="djCardTitle"
            >
                <ValidationObserver v-slot="{ invalid }" ref="createuser">
                    <v-form v-model="valid">
                        <ValidationProvider
                            mode="eager"
                            v-slot="{ errors }"
                            :name="$t('register.labels.civility')"
                            rules="required"
                        >
                            <v-select
                                v-model="civility"
                                :items="civilities"
                                :label="$t('register.labels.civility') + '*'"
                                :value="civility"
                                :error-messages="errors[0]"
                                outlined
                            />
                        </ValidationProvider>
                        <ValidationProvider
                            mode="eager"
                            v-slot="{ errors }"
                            :name="$t('register.labels.lastName')"
                            rules="required"
                        >
                            <DjInput
                                v-model="lastName"
                                :error-messages="errors[0]"
                                :label="$t('register.labels.lastName') + '*'"
                                outlined
                            />
                        </ValidationProvider>
                        <ValidationProvider
                            mode="eager"
                            v-slot="{ errors }"
                            :name="$t('register.labels.firstName')"
                            rules="required"
                        >
                            <DjInput
                                v-model="firstName"
                                :error-messages="errors[0]"
                                :label="$t('register.labels.firstName') + '*'"
                                outlined
                            />
                        </ValidationProvider>
                        <ValidationProvider
                            mode="eager"
                            v-slot="{ errors }"
                            :name="$t('register.labels.email')"
                            rules="required"
                        >
                            <DjInput
                                v-model="email"
                                :error-messages="errors[0]"
                                :label="$t('register.labels.email') + '*'"
                                outlined
                            />
                        </ValidationProvider>
                        <ValidationProvider
                            mode="eager"
                            v-slot="{ errors }"
                            :name="$t('register.labels.password')"
                            rules="required"
                        >
                            <DjInput
                                v-model="password"
                                :error-messages="errors[0]"
                                @click:append="show1 = !show1"
                                :append-icon="show1 ? 'icon-eye' : 'icon-eye-crossed'"
                                :type="show1 ? 'text' : 'password'"
                                :label="$t('register.labels.password') + '*'"
                                outlined
                            />
                        </ValidationProvider>
                        <ValidationProvider
                            mode="eager"
                            v-slot="{ errors }"
                            :name="$t('account.organisation.role')"
                            rules="required"
                        >
                            <v-select
                                v-model="role"
                                :items="enumrole"
                                :label="$t('account.organisation.role') + '*'"
                                :error-messages="errors[0]"
                                outlined
                            />
                        </ValidationProvider>
                    </v-form>
                </ValidationObserver>
                <DjLink class="dj-btn dj-btn--primary djLinkWidth" @click.prevent="createUserOrganisation()">
                    {{ $t('register.registerButton') }}
                </DjLink>
                <template #actions>
                    <DjSpacer />
                </template>
            </DjCard>
        </DjModal>
    </DjCard>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import DjLink from '@components/atoms/DjLink/DjLink.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjModal from '@components/molecules/DjModal/DjModal.vue';
import DjInput from '@components/atoms/DjInput/DjInput.vue';
import DjCard from '@components/molecules/DjCard/DjCard.vue';
import UsersLine from '@components/templates/account/organisation/modules/usersLine.vue';

export default {
    name: 'UsersBlock',
    components: {
        ValidationObserver,
        ValidationProvider,
        DjLink,
        DjButton,
        DjModal,
        DjInput,
        DjCard,
        UsersLine,
    },
    props: {
        userOrga: {
            type: Array,
            required: true,
        },
        organisationName: {
            type: String,
            default: '',
        },
        organisationId: {
            type: String,
            default: '',
        },
        currentOrga: {
            type: String,
            default: '0',
        },
    },
    data() {
        return {
            currentPage: 1,
            usersPerPage: 10,
            civilities: ['MR', 'MRS', 'MISS'],
            civility: '',
            lastName: '',
            firstName: '',
            email: '',
            password: '',
            createUserPage: false,
            show1: false,
            valid: true,
            role: '',
            enumrole: ['FOC_User', 'FOC_Admin'],
        };
    },
    computed: {
        paginatedUsers() {
            const start = (this.currentPage - 1) * this.usersPerPage;
            const end = this.currentPage * this.usersPerPage;

            return this.userOrga.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.userOrga.length / this.usersPerPage);
        },
    },
    methods: {
        createUser() {
            if (this.$refs.createuser) {
                this.$refs.createuser.reset();
            }
            this.createUserPage = true;
        },
        createUserOrganisation() {
            this.$refs.createuser.validate().then(async (validateSuccess) => {
                if (!validateSuccess) {
                    this.$toast.error(this.$t('notification.user.vide'));
                } else {
                    const request = {
                        civility: this.civility,
                        firstName: this.firstName,
                        lastName: this.lastName,
                        email: this.email,
                        password: this.password,
                        groups: [this.role],
                        activationUrl: `${window.location.origin}/auth/validation`,
                        mainOrganisationId: this.organisationId !== '0' ? this.organisationId : null,
                    };
                    const postSuccess = await this.$core.useUser.postCreateUserOrganisation(request);
                    if (!postSuccess) {
                        this.$toast.error(this.$t('notification.user.errorUpdate'));
                    } else {
                        this.$toast.success(this.$t('notification.user.update'));
                        this.$nuxt.$emit('updateUsers', true);
                        this.createUserPage = false;
                        this.civility = '';
                        this.lastName = '';
                        this.firstName = '';
                        this.email = '';
                        this.civility = '';
                        this.password = '';
                    }
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.dj-section--account-setting {
    margin-top: 50px;
}

.djCardTitle {
    text-align: center;
}

.djLinkWidth {
    width: 630px;
}
</style>
