<template lang="html">
    <div class="user-cadre">
        <div class="user-line">
            <i class="icon-user"></i>
            <div class="user-right">{{ usersLine.firstName }} {{ usersLine.lastName }}</div>
        </div>
        <div class="icon">
            <div
                v-if="(currentOrga !== '0' && organisationId) || (currentOrga !== '0' && usersLine.mainOrganisationId)"
                class="pencil"
                @click.prevent="editUser()"
            >
                <DjButton
                    :iconDisplayed="true"
                    styleButton="light"
                    :shape="'icon'"
                    :size="'standard'"
                    icon="icon-pencil"
                    :textDisplayed="false"
                    :fullWidth="true"
                >
                </DjButton>
            </div>
            <!-- <div class="trash" @click.prevent="trash()">
                <DjButton
                    :iconDisplayed="true"
                    styleButton="light"
                    :shape="'icon'"
                    :size="'standard'"
                    icon="icon-trash2"
                    :textDisplayed="false"
                    :fullWidth="true" >
                </DjButton>
            </div> -->
        </div>
        <DjModal v-model="editUserPage" width="700" class="modale__buying">
            <DjCard
                headerColor="var(--color-secondary)"
                :title="$t('account.organisation.editUser')"
                class="djCardTitle"
            >
                <ValidationObserver v-slot="{ invalid }" ref="editUser">
                    <v-form v-model="valid" lazy-validation>
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
                                disabled
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
                                disabled
                            />
                        </ValidationProvider>
                    </v-form>
                </ValidationObserver>
                <div @click.prevent="editUserOrganisation()">
                    <DjButton
                        :text="$t('account.organisation.edit')"
                        :iconDisplayed="false"
                        styleButton="primary"
                        :shape="'button'"
                        :size="'standard'"
                        :textDisplayed="true"
                        :fullWidth="true"
                    >
                    </DjButton>
                </div>
            </DjCard>
        </DjModal>
    </div>
</template>

<script>
import { computed, defineComponent, ref, useContext } from '@nuxtjs/composition-api';
import DjLink from '@components/atoms/DjLink/DjLink';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjModal from '@components/molecules/DjModal/DjModal.vue';
import DjInput from '@components/atoms/DjInput/DjInput.vue';
import DjCard from '@components/molecules/DjCard/DjCard.vue';

export default {
    name: 'UsersLine',
    components: { ref, DjLink, ValidationObserver, ValidationProvider, DjModal, DjInput, DjButton, DjCard },
    props: {
        usersLine: {
            type: Object,
            default: {},
        },
        i: {
            type: Number,
            default: {},
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
            civilities: ['MR', 'MRS', 'MISS'],
            civility: '',
            lastName: '',
            firstName: '',
            email: '',
            editUserPage: false,
            role: '',
            enumrole: ['FOC_User', 'FOC_Admin'],
            valid: true,
            toast: '',
        };
    },
    methods: {
        editUser() {
            this.civility = this.usersLine.civility;
            this.lastName = this.usersLine.firstName;
            this.firstName = this.usersLine.lastName;
            this.email = this.usersLine.email;
            this.role = this.usersLine.groups;
            this.editUserPage = true;
        },
        editUserOrganisation() {
            this.$refs.editUser.validate().then(async (success) => {
                if (!success) {
                    this.$toast.error(this.$t('notification.user.vide'));
                    return;
                } else {
                    const request = {
                        civility: this.civility,
                        firstName: this.firstName,
                        lastName: this.lastName,
                        groups: [this.role],
                    };
                    if (this.organisationId) {
                        this.toast = await this.$core.useUser.putUpdateUserInOrganisation(
                            request,
                            this.organisationId,
                            this.usersLine.id
                        );
                    } else {
                        this.toast = await this.$core.useUser.putUpdateUserInOrganisation(
                            request,
                            this.usersLine.mainOrganisationId,
                            this.usersLine.id
                        );
                    }
                    if (this.toast) {
                        this.$toast.success(this.$t('account.organisation.updateUser'));
                    } else {
                        this.$toast.error(this.$t('account.organisation.belongsToOrganisation'));
                    }

                    $nuxt.$emit('updateUsers', true);
                }
                this.editUserPage = false;
            });
        },
        trash() {
        },
    },
};
</script>

<style lang="scss" scoped>
.user-cadre {
    width: 100%;
    height: 50px;
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    border: 0.3px solid #4d4d4f63;
    border-radius: 5px;
    margin-bottom: 5px;
    align-items: center;
}

small.user {
    display: flex;
    align-items: center;
    font-size: 15px;
}
.djCardTitle {
    text-align: center;
}

.user-right {
    margin-left: 10px;
    align-items: center;
    display: flex;
    width: auto;
    font-family: var(--font-1st);
    font-style: normal;
    font-weight: 100;
    font-size: 16px;
    line-height: 19px;
}

.icon {
    display: flex;
}

.trash {
    //margin-top: 3px;
    margin-right: 10px;
}

.pencil {
    display: flex;
    justify-content: flex-end;
    margin-right: 12px;
    align-items: center;
}

.user-line {
    display: flex;
    justify-content: center;
    align-items: center;
}

i.icon-user {
    display: flex;
    align-items: center;
    margin-left: 10px;
    margin-right: 10px;
}

.djLinkWidth {
    width: 630px;
}
</style>
