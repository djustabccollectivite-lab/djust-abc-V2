<template>
    <DjAccountLayout :idAccountLink="accountLayoutProfile">
        <div class="shadow rounded-extra-lg">
            <div class="d-flex align-items-center bg-black navigation-header pl-6">
                <span class="text-white font-700 size-24"> Vos Informations </span>
            </div>
            <section class="p-5">
                <div class="ps-section__content">
                    <span class="text-black">{{ $t('accountLayout.userInformations.text') }}</span>
                    <ValidationObserver ref="userupdate">
                        <v-form v-model="valid" lazy-validation>
                            <div class="d-flex align-items-center">
                                <div class="text-black mr-4">
                                    {{ $t('register.labels.civility') }}
                                </div>
                                <ValidationProvider
                                    v-slot="{ errors }"
                                    mode="eager"
                                    :name="$t('register.labels.civility')"
                                    rules="required"
                                >
                                    <v-radio-group v-model="civility" :error-messages="errors[0]" row>
                                        <v-radio class="mr-7" value="MR" :disabled="submitUpdate">
                                            <template #label>
                                                <span class="text-black pt-2">
                                                    {{ $t('accountLayout.userInformations.civility.mister') }}
                                                </span>
                                            </template>
                                        </v-radio>
                                        <v-radio value="MRS" :disabled="submitUpdate">
                                            <template #label>
                                                <span class="text-black pt-2">
                                                    {{ $t('accountLayout.userInformations.civility.miss') }}
                                                </span>
                                            </template>
                                        </v-radio>
                                    </v-radio-group>
                                </ValidationProvider>
                            </div>
                            <div class="formGroup">
                                <ValidationProvider
                                    v-slot="{ errors }"
                                    mode="eager"
                                    :name="$t('register.labels.lastName')"
                                    rules="required"
                                >
                                    <label :for="$t('register.labels.lastName')">
                                        {{ $t('register.labels.lastName') }}
                                        <span class="required">*</span>
                                    </label>

                                    <DjInput
                                        v-model="nom"
                                        :error-messages="errors[0]"
                                        outlined
                                        :disabled="submitUpdate"
                                        append-icon="icon-pencil"
                                    />
                                </ValidationProvider>

                                <ValidationProvider
                                    v-slot="{ errors }"
                                    mode="eager"
                                    :name="$t('register.labels.firstName')"
                                    rules="required"
                                >
                                    <label :for="$t('register.labels.firstName')">
                                        {{ $t('register.labels.firstName') }}
                                        <span class="required">*</span>
                                    </label>

                                    <DjInput
                                        v-model="prenom"
                                        :error-messages="errors[0]"
                                        outlined
                                        :disabled="submitUpdate"
                                        append-icon="icon-pencil"
                                    />
                                </ValidationProvider>
                            </div>

                            <div class="formGroup">
                                <ValidationProvider
                                    v-slot="{ errors }"
                                    mode="eager"
                                    :name="$t('register.labels.email')"
                                    rules=""
                                >
                                    <label :for="$t('register.labels.email')">
                                        {{ $t('register.labels.email') }}
                                        <span class="required">*</span>
                                    </label>

                                    <DjInput
                                        :value="email"
                                        :error-messages="errors[0]"
                                        outlined
                                        disabled
                                        append-icon="icon-pencil"
                                    />
                                </ValidationProvider>

                                <ValidationProvider mode="eager" name="group" rules="">
                                    <label for="Groupe">
                                        Groupe
                                        <span class="required">*</span>
                                    </label>

                                    <DjInput outlined disabled value="User" append-icon="icon-pencil" />
                                </ValidationProvider>
                            </div>
                        </v-form>
                    </ValidationObserver>
                    <div @click.prevent="updateUserInformation()">
                        <DjButton
                            :text="$t('register.registerButton')"
                            :iconDisplayed="false"
                            shape="button"
                            variant="contained"
                            :fullWidth="false"
                            :isDisabled="
                                prenom === $auth.user.firstName &&
                                nom === $auth.user.lastName &&
                                civility === $auth.user.civility
                            "
                        />
                    </div>
                </div>
            </section>
        </div>
    </DjAccountLayout>
</template>

<script>
import DjAccountLayout from '@components/templates/DjAccountLayout/DjAccountLayout.vue';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjInput from '@components/atoms/DjInput/DjInput.vue';

export default {
    name: 'UserInformation',
    components: {
        DjAccountLayout,
        ValidationObserver,
        ValidationProvider,
        DjButton,
        DjInput,
    },
    data() {
        return {
            valid: true,
            user: '',
            civility: '',
            nom: '',
            prenom: '',
            email: '',
            submitUpdate: false,
            accountLayoutProfile: 'Profil',
        };
    },
    created() {
        this.prenom = this.$auth.user.firstName;
        this.nom = this.$auth.user.lastName;
        this.civility = this.$auth.user.civility;
        this.email = this.$auth.user.email;
    },
    methods: {
        updateUserInformation() {
            this.submitUpdate = true;
            this.$refs.userupdate.validate().then((success) => {
                if (!success) {
                    this.$toast.error(this.$t('notification.user.vide'));
                    return;
                }
                if (
                    this.prenom === this.$auth.user.firstName &&
                    this.nom === this.$auth.user.lastName &&
                    this.civility === this.$auth.user.civility
                ) {
                    this.$toast.error(this.$t('notification.user.noupdate'));
                } else {
                    const request = {
                        civility: this.civility,
                        firstName: this.prenom,
                        lastName: this.nom,
                        email: this.user.email,
                    };
                    this.$toast.success(this.$t('notification.user.update'));
                    this.$core.useUser.modifyUserInformation(request);
                    setTimeout(() => {
                        this.submitUpdate = false;
                    }, 1000);
                }
            });
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

.formGroup {
    display: flex;
    flex-direction: column;

    @media (min-width: 640px) {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
        grid-gap: 20px;
    }
}
</style>
