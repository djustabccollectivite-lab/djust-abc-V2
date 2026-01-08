<template>
    <div class="register-page mx-auto">
        <form>
            <transition v-if="3 === page" name="home" mode="out-in">
                <div class="notification-content my-16 text-center p-5 mx-auto w-full text-center">
                    <SvgIcon name="checkmark" />
                    <h2 class="size-24 mt-1">
                        {{ $t('register.confirmEmail') }}
                    </h2>
                    <p>
                        {{
                            manualAccountCheck
                                ? $t('register.confirmEmailManualDescription')
                                : $t('register.confirmEmailDescription')
                        }}
                    </p>
                </div>
            </transition>
            <div v-else class="dj-form-login">
                <div class="mt-16 text-center">
                    <h2 class="font-700 size-24">{{ $t('register.title') }}</h2>
                    <p class="mt-2 mb-0">{{ $t('register.needHelp') }}</p>
                    <p>
                        {{ $t(`register.contactUs.${client}`) }} <span class="underline">{{ ownerEmail }}</span>
                    </p>
                    <p class="mt-2"><span class="text-red">*</span> : {{ $t('register.requiredField') }}</p>
                </div>
                <div class="dj-form__content">
                    <div>
                        <div v-show="1 === page">
                            <transition name="home" mode="out-in">
                                <ValidationObserver ref="formStep1">
                                    <v-form v-model="validationForm" lazy-validation>
                                        <ValidationProvider
                                            v-slot="{ errors }"
                                            mode="eager"
                                            :name="$t('register.labels.accountName')"
                                            rules="required"
                                        >
                                            <label :for="$t('register.labels.accountName')" class="form-label">
                                                {{ $t('register.labels.accountName') }}
                                                <span class="required">*</span>
                                            </label>
                                            <DjInput v-model="accountName" :error-messages="errors[0]" outlined />
                                        </ValidationProvider>
                                        <ValidationProvider
                                            v-slot="{ errors }"
                                            mode="eager"
                                            :name="$t('register.labels.accountManager')"
                                        >
                                            <label :for="$t('register.labels.accountManager')" class="form-label">
                                                {{ $t('register.labels.accountManager') }}
                                            </label>
                                            <DjInput v-model="accountManager" :error-messages="errors[0]" outlined />
                                        </ValidationProvider>
                                        <ValidationProvider
                                            v-slot="{ errors }"
                                            mode="eager"
                                            :name="$t('register.labels.website')"
                                        >
                                            <label :for="$t('register.labels.website')" class="form-label">
                                                {{ $t('register.labels.website') }}
                                            </label>
                                            <DjInput
                                                v-model="website"
                                                :error-messages="errors[0]"
                                                prefix="https://"
                                                outlined
                                            />
                                        </ValidationProvider>
                                        <ValidationProvider
                                            v-slot="{ errors }"
                                            mode="eager"
                                            :name="$t('register.labels.companyRegistrationName')"
                                            rules="required"
                                        >
                                            <label
                                                :for="$t('register.labels.companyRegistrationName')"
                                                class="form-label"
                                            >
                                                {{ $t('register.labels.companyRegistrationName') }}
                                                <span class="required">*</span></label
                                            >
                                            <DjInput
                                                v-model="companyRegistrationName"
                                                :error-messages="errors[0]"
                                                outlined
                                            />
                                        </ValidationProvider>
                                        <ValidationProvider
                                            v-slot="{ errors }"
                                            mode="eager"
                                            :name="$t('register.labels.businessRegistrationNumber')"
                                            rules="required"
                                        >
                                            <label
                                                :for="$t('register.labels.businessRegistrationNumber')"
                                                class="form-label"
                                            >
                                                {{ $t('register.labels.businessRegistrationNumber') }}
                                                <span class="required">*</span></label
                                            >
                                            <DjInput
                                                v-model="businessRegistrationNumber"
                                                :error-messages="errors[0]"
                                                outlined
                                            />
                                        </ValidationProvider>
                                        <ValidationProvider
                                            v-slot="{ errors }"
                                            mode="eager"
                                            :name="$t('register.labels.VATNumber')"
                                        >
                                            <label :for="$t('register.labels.VATNumber')" class="form-label">
                                                {{ $t('register.labels.VATNumber') }}
                                            </label>
                                            <DjInput v-model="VATNumber" :error-messages="errors[0]" outlined />
                                        </ValidationProvider>
                                        <ValidationProvider
                                            v-slot="{ errors }"
                                            mode="eager"
                                            :name="$t('register.labels.fullName')"
                                            rules="required"
                                        >
                                            <label :for="$t('register.labels.fullName')" class="form-label">
                                                {{ $t('register.labels.fullName') }}
                                                <span class="required">*</span></label
                                            >
                                            <DjInput v-model="fullName" :error-messages="errors[0]" outlined />
                                        </ValidationProvider>
                                        <ValidationProvider
                                            v-slot="{ errors }"
                                            mode="eager"
                                            :name="$t('register.labels.address')"
                                            rules="required"
                                        >
                                            <label :for="$t('register.labels.address')" class="form-label">
                                                {{ $t('register.labels.address') }}
                                                <span class="required">*</span></label
                                            >
                                            <DjInput v-model="address" :error-messages="errors[0]" outlined />
                                        </ValidationProvider>
                                        <ValidationProvider
                                            v-slot="{ errors }"
                                            mode="eager"
                                            :name="$t('register.labels.label')"
                                            rules=""
                                        >
                                            <label :for="$t('register.labels.label')" class="form-label">
                                                {{ $t('register.labels.label') }}
                                            </label>
                                            <DjInput v-model="label" :error-messages="errors[0]" outlined />
                                        </ValidationProvider>
                                        <ValidationProvider mode="eager" :name="$t('register.labels.address2')">
                                            <label :for="$t('register.labels.address2')" class="form-label">
                                                {{ $t('register.labels.address2') }}
                                            </label>
                                            <DjInput v-model="additionalAddress" outlined />
                                        </ValidationProvider>
                                        <ValidationProvider
                                            v-slot="{ errors }"
                                            mode="eager"
                                            :name="$t('register.labels.zipCode')"
                                            rules="required"
                                        >
                                            <label :for="$t('register.labels.zipCode')" class="form-label">
                                                {{ $t('register.labels.zipCode') }}
                                                <span class="required">*</span>
                                            </label>
                                            <DjInput v-model="zipcode" :error-messages="errors[0]" outlined />
                                        </ValidationProvider>
                                        <ValidationProvider
                                            v-slot="{ errors }"
                                            mode="eager"
                                            :name="$t('register.labels.city')"
                                            rules="required"
                                        >
                                            <label :for="$t('register.labels.city')" class="form-label">
                                                {{ $t('register.labels.city') }}
                                                <span class="required">*</span></label
                                            >
                                            <DjInput v-model="city" :error-messages="errors[0]" outlined />
                                        </ValidationProvider>
                                        <div>
                                            <ValidationProvider
                                                v-slot="{ errors }"
                                                mode="eager"
                                                :name="$t('register.labels.state')"
                                                rules="required"
                                            >
                                                <label :for="$t('register.labels.state')" class="form-label">
                                                    {{ $t('register.labels.state') }}
                                                    <span class="required">*</span></label
                                                >
                                                <DjInput
                                                    v-model="state"
                                                    :error-messages="errors[0]"
                                                    class="pr-2"
                                                    outlined
                                                />
                                            </ValidationProvider>
                                            <ValidationProvider
                                                v-slot="{ errors }"
                                                mode="eager"
                                                :name="$t('register.labels.country')"
                                                rules="required"
                                            >
                                                <label :for="$t('register.labels.country')" class="form-label">
                                                    {{ $t('register.labels.country') }}
                                                    <span class="required">*</span></label
                                                >
                                                <DjInput
                                                    v-model="country"
                                                    :error-messages="errors[0]"
                                                    outlined
                                                    disabled
                                                />
                                            </ValidationProvider>
                                        </div>
                                    </v-form>
                                    <div class="form-group submit mt-2 d-flex justify-content-center">
                                        <div class="w-full pr-4" @click.prevent="cancel()">
                                            <DjButton
                                                shape="button"
                                                variant="outlined"
                                                :text="$t('register.cancel')"
                                                :fullWidth="true"
                                                :rounded="true"
                                            />
                                        </div>
                                        <div class="w-full" @click.prevent="validateStep1()">
                                            <DjButton
                                                shape="button"
                                                variant="contained"
                                                :text="$t('register.continueButton')"
                                                :iconDisplayed="false"
                                                :fullWidth="true"
                                                :rounded="true"
                                            />
                                        </div>
                                    </div>
                                    <div v-if="true === dataTest" @click.prevent="handleDataTest1()">
                                        <DjButton
                                            shape="button"
                                            variant="outlined"
                                            text="Data Tests 1"
                                            :iconDisplayed="false"
                                            :fullWidth="true"
                                            :rounded="true"
                                        />
                                    </div>
                                </ValidationObserver>
                            </transition>
                        </div>
                        <div v-show="2 === page">
                            <transition name="home" mode="out-in">
                                <ValidationObserver ref="formStep2">
                                    <v-form v-model="validationForm" lazy-validation>
                                        <div class="w-full">
                                            <ValidationProvider
                                                mode="eager"
                                                :name="$t('register.labels.civility')"
                                                rules="required"
                                            >
                                                <label :for="$t('register.labels.civility')" class="form-label">
                                                    {{ $t('register.labels.civility') }} <span class="required">*</span>
                                                </label>
                                                <v-select
                                                    v-model="civility"
                                                    :items="civilities"
                                                    outlined
                                                    class="w-full"
                                                />
                                            </ValidationProvider>
                                        </div>
                                        <ValidationProvider
                                            v-slot="{ errors }"
                                            mode="eager"
                                            :name="$t('register.labels.firstName')"
                                            rules="required"
                                        >
                                            <label :for="$t('register.labels.firstName')" class="form-label">
                                                {{ $t('register.labels.firstName') }}
                                                <span class="required">*</span></label
                                            >
                                            <DjInput v-model="firstName" :error-messages="errors[0]" outlined />
                                        </ValidationProvider>
                                        <ValidationProvider
                                            v-slot="{ errors }"
                                            mode="eager"
                                            :name="$t('register.labels.lastName')"
                                            rules="required"
                                        >
                                            <label :for="$t('register.labels.lastName')" class="form-label">
                                                {{ $t('register.labels.lastName') }}
                                                <span class="required">*</span></label
                                            >
                                            <DjInput v-model="lastName" :error-messages="errors[0]" outlined />
                                        </ValidationProvider>
                                        <ValidationProvider
                                            v-slot="{ errors }"
                                            mode="eager"
                                            :name="$t('register.labels.email')"
                                            rules="required|email"
                                        >
                                            <label :for="$t('register.labels.email')" class="form-label">
                                                {{ $t('register.labels.email') }}
                                                <span class="required">*</span></label
                                            >
                                            <DjInput v-model="email" :error-messages="errors[0]" outlined />
                                        </ValidationProvider>
                                        <ValidationProvider
                                            v-slot="{ errors }"
                                            mode="eager"
                                            :name="$t('register.labels.phone')"
                                            :rules="{
                                                max: 15,
                                                regex: '^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$',
                                            }"
                                        >
                                            <label :for="$t('register.labels.phone')" class="form-label">
                                                {{ $t('register.labels.phone') }}
                                            </label>
                                            <DjInput v-model="phone" :error-messages="errors[0]" outlined />
                                        </ValidationProvider>
                                        <ValidationProvider
                                            v-slot="{ errors }"
                                            mode="eager"
                                            :name="$t('register.labels.password')"
                                            vid="password"
                                            rules="required|verify_password"
                                        >
                                            <label :for="$t('register.labels.password')" class="form-label">
                                                {{ $t('register.labels.password') }}
                                                <span class="required">*</span>
                                                <v-tooltip top>
                                                    <template #activator="{ on, attrs }">
                                                        <v-icon
                                                            class="text-primary"
                                                            dark
                                                            small
                                                            v-bind="attrs"
                                                            v-on="on"
                                                        >
                                                            mdi-alert-circle
                                                        </v-icon>
                                                    </template>
                                                    <span>
                                                        {{ $t('register.passwordRules') }}
                                                    </span>
                                                </v-tooltip>
                                            </label>
                                            <DjInput
                                                v-model="password"
                                                :error-messages="errors[0]"
                                                :append-icon="passwordVisible1 ? 'icon-eye' : 'icon-eye-crossed'"
                                                :type="passwordVisible1 ? 'text' : 'password'"
                                                outlined
                                                @click:append="passwordVisible1 = !passwordVisible1"
                                            />
                                        </ValidationProvider>
                                        <ValidationProvider
                                            v-slot="{ errors }"
                                            mode="eager"
                                            :name="$t('register.labels.confirmpassword')"
                                            rules="required|confirmed:password"
                                        >
                                            <label :for="$t('register.labels.confirmpassword')" class="form-label">
                                                {{ $t('register.labels.confirmpassword') }}
                                                <span class="required">*</span></label
                                            >
                                            <DjInput
                                                v-model="confirmpassword"
                                                :append-icon="passwordVisible2 ? 'icon-eye' : 'icon-eye-crossed'"
                                                :type="passwordVisible2 ? 'text' : 'password'"
                                                :error-messages="errors[0]"
                                                outlined
                                                @click:append="passwordVisible2 = !passwordVisible2"
                                            />
                                        </ValidationProvider>
                                    </v-form>
                                    <div class="form-group submit mt-30 d-flex justify-content-center">
                                        <div class="w-full pr-4" @click.prevent="backToStep1()">
                                            <DjButton
                                                shape="button"
                                                variant="outlined"
                                                :text="$t('register.back')"
                                                :fullWidth="true"
                                                :rounded="true"
                                            />
                                        </div>
                                        <div class="w-full" @click.prevent="validateStep2()">
                                            <DjButton
                                                shape="button"
                                                variant="contained"
                                                :text="$t('register.confirmButton')"
                                                :iconDisplayed="false"
                                                :fullWidth="true"
                                                :rounded="true"
                                            />
                                        </div>
                                    </div>
                                    <div v-if="true === dataTest" @click.prevent="handleDataTest2()">
                                        <DjButton
                                            shape="button"
                                            variant="outlined"
                                            text="Data Tests 2"
                                            :iconDisplayed="false"
                                            :fullWidth="true"
                                            :rounded="true"
                                        />
                                    </div>
                                </ValidationObserver>
                            </transition>
                        </div>
                        <div class="mb-10">
                            <div class="text-center size-14">
                                {{ $t('register.footerText') }}
                                <nuxt-link :to="localePath('/auth/login')" class="linktoRegister">
                                    <span class="text-black underline">{{ $t('register.footerBtn') }}</span>
                                </nuxt-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import DjInput from '@components/atoms/DjInput/DjInput.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import SvgIcon from '@components/atoms/icons/SvgIcon.vue';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
    name: 'RegisterPage',
    components: {
        DjInput,
        DjButton,
        SvgIcon,
        ValidationProvider,
        ValidationObserver,
    },
    data() {
        return {
            page: 1,
            validationForm: true,
            civilities: ['MR', 'MRS'],
            accountName: '',
            accountManager: '',
            website: '',
            companyRegistrationName: '',
            businessRegistrationNumber: '',
            VATNumber: '',
            civility: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmpassword: '',
            country: 'France',
            label: '',
            fullName: '',
            address: '',
            additionalAddress: '',
            city: '',
            state: '',
            zipcode: '',
            phone: '',
            billing: true,
            passwordVisible1: false,
            passwordVisible2: false,
            manualAccountCheck: false,
            dataTest: false,
        };
    },
    computed: {
        ownerEmail() {
            return this.$config.email;
        },
        client() {
            return this.$config.clientName.toLowerCase();
        },
    },
    async created() {
        const settings = await this.$core.useUser.getSettings();
        this.manualAccountCheck = settings ? settings.manualAccountCheck : false;
    },
    methods: {
        cancel() {
            this.$router.push(this.localePath('/auth/login'));
        },
        backToStep1() {
            this.$refs.formStep2.reset();
            this.page = 1;
        },
        validateStep1() {
            this.$refs.formStep2.reset();
            this.$refs.formStep1.validate().then((success) => {
                if (success) {
                    this.page = 2;
                }
            });
        },
        validateStep2() {
            this.$refs.formStep2.validate().then(async (success) => {
                if (!success) return;
                const request = {
                    createAddressRequests: [
                        {
                            label: this.label,
                            fullName: this.fullName,
                            address: this.address,
                            city: this.city,
                            zipcode: this.zipcode,
                            country: this.country,
                            billing: this.billing,
                            shipping: true,
                            additionalAddress: this.additionalAddress,
                            state: this.state,
                            phone: this.phone,
                        },
                    ],
                    createCustomerUserRequest: {
                        civility: this.civility,
                        email: this.email,
                        firstName: this.firstName,
                        lastName: this.lastName,
                        password: this.password,
                        phone: this.phone,
                    },
                    createObjectCustomerAccountRequest: {
                        accountManager: this.accountManager,
                        businessRegistrationNumber: this.businessRegistrationNumber,
                        companyRegistrationName: this.companyRegistrationName,
                        vatNumber: this.VATNumber,
                        name: this.accountName,
                        website: this.website,
                    },
                    fromFO: true,
                };
                const apiResponse = await this.$core.useUser.createCustomerAccount(request);
                if (apiResponse.status === 'success') {
                    this.$toast.success(apiResponse.message);
                    this.page = 3;
                } else {
                    this.$toast.error(apiResponse.message);
                }
            });
        },
        // Pour remplir les champs des forms - MODE DEV ONLY
        handleDataTest1() {
            this.accountName = `Test User ${Math.floor(Math.random() * 1000) + 1}`; // Doit être unique
            this.accountManager = 'Johan';
            this.website = 'www.purjus.fr';
            this.companyRegistrationName = '4898686846868';
            this.businessRegistrationNumber = '161681681';
            this.VATNumber = '874889566';
            this.label = 'Label';
            this.fullName = 'Nom complet test';
            this.address = 'Le beau réveil';
            this.additionalAddress = 'A gauche';
            this.city = 'Vauvenargues';
            this.state = 'PACA';
            this.zipcode = '13126';
        },
        handleDataTest2() {
            this.civility = 'MR';
            this.firstName = 'John';
            this.lastName = 'Dow';
            this.email = `test.user+${Math.floor(Math.random() * 1000) + 1}@purjus.fr`; // Doit être unique
            this.phone = '0600112233';
            this.password = 'Azerty123!';
            this.confirmpassword = 'Azerty123!';
        },
    },
};
</script>

<style lang="scss" scoped>
.register-page {
    max-width: 400px;
}

.notification-content {
    max-width: 400px;
    box-shadow:
        0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 6px -4px rgb(0 0 0 / 0.1);
}

.required {
    color: var(--color-red);
}
</style>
