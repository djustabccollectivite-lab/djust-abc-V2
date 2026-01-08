<template>
    <AuthLayout>
        <div v-if="res">
            <div class="dj-form__content">
                <div class="notif">
                    <h2 style="text-align: center" class="iconValidate">
                        <DjIcon color="green">icon-checkmark-circle</DjIcon>
                        <br />
                        {{ $t('validation.successValidationTitle') }}
                    </h2>
                    <p>{{ $t('validation.successValidationDescription') }}</p>
                    <nuxt-link :to="localePath('/auth/login')" class="linktoRegister">
                        <DjButton
                            :text="$t('register.footerBtn')"
                            :iconDisplayed="false"
                            style="primary"
                            shape="button"
                            class="bg"
                            icon=""
                            :fullWidth="true"
                        />
                    </nuxt-link>
                </div>
            </div>
        </div>
        <div v-if="!res">
            <div class="dj-form__content">
                <div v-if="!mailSended" class="notif">
                    <h2 style="text-align: center" class="iconValidate">
                        <DjIcon color="red">icon-cross-circle</DjIcon>
                        <br />
                        {{ $t('validation.failedValidationTitle') }}
                    </h2>
                    <p>{{ $t('validation.failesValidationDescription') }}</p>
                    <div class="form-group submit" @click.prevent="resendValidationRequestEmail()">
                        <DjButton
                            :text="$t('validation.btnResendLinkValidation')"
                            :iconDisplayed="false"
                            style="primary"
                            shape="button"
                            class="bg"
                            icon=""
                            :fullWidth="true"
                            :isLoading="isLoading"
                        />
                    </div>
                </div>
                <div v-if="mailSended && sucessMailSended" class="notif">
                    <h2 style="text-align: center" class="iconValidate">
                        <DjIcon color="green">icon-checkmark-circle</DjIcon>
                        <br />
                        {{ $t('validation.mailValidationSended') }}
                    </h2>
                </div>
                <div v-if="mailSended && !sucessMailSended" class="notif">
                    <h2 style="text-align: center" class="iconValidate">
                        <DjIcon color="red">icon-cross-circle</DjIcon>
                        <br />
                        {{ $t('validation.mailValidationNotSended') }}
                    </h2>
                    <div class="form-group submit" @click.prevent="resendValidationRequestEmail()">
                        <DjButton
                            :text="$t('validation.btnResendLinkValidation')"
                            :iconDisplayed="false"
                            style="primary"
                            shape="button"
                            class="bg"
                            icon=""
                            :fullWidth="true"
                            :isLoading="isLoading"
                        />
                    </div>
                </div>
            </div>
        </div>
    </AuthLayout>
</template>

<script>
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjIcon from '@components/atoms/DjIcon/DjIcon.vue';
import AuthLayout from '@components/templates/auth/AuthLayout.vue';

export default {
    name: 'ValidateTemplate',
    components: {
        DjButton,
        AuthLayout,
        DjIcon,
    },
    data() {
        return {
            show1: false,
            altLogo: '',
            headerLogo: '',
            bgLogin: '',
            cssBg: '',
            withUser: true,
            valid: true,
            error: null,
            activer: '',
            res: null,
            mailSended: false,
            sucessMailSended: false,
            isLoading: false,
        };
    },
    computed: {
        title() {
            return this.res
                ? this.$t('validation.successValidationTitle')
                : this.$t('validation.failedValidationTitle');
        },
        validationUrlEndpoint() {
            return '/auth/validation';
        },
    },
    async created() {
        if (this.$route.query.token) {
            const res = await this.$core.useUser.validationAccount(this.$route.query.token);
            if (res) {
                this.activer = this.$t('validation.successValidationDescription');
                this.res = true;
            } else {
                this.activer = this.$t('validation.failedValidationDescription');
            }
        }
    },
    methods: {
        resendValidationRequestEmail() {
            const redirect = window.location.origin + this.validationUrlEndpoint;
            const request = {
                token: this.$route.query.token,
                redirectUrl: redirect,
            };
            this.isLoading = true;

            this.$core.useUser
                .resendValidationRequestEmail(request)
                .then((result) => {
                    this.sucessMailSended = result;
                    this.isLoading = false;
                    this.mailSended = true;
                })
                .catch(() => {});
        },
    },
};
</script>

<style lang="scss" scoped>
.notif {
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    max-width: 100%;
    padding: 20px;
    box-shadow:
        0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 6px -4px rgb(0 0 0 / 0.1);
    @media (min-width: 1024px) {
        //width: 384px;
    }
    .iconValidate {
        font-size: 25px;
        line-height: 31.8px;
        font-weight: 400;
        i {
            padding-bottom: 5px;
            color: green;
            font-size: 40px;
            text-align: center;
        }
    }
    p,
    span {
        text-align: center;
    }
}
.failedicon {
    color: red;
    font-size: 40px;
}
.successicon {
    color: green;
    font-size: 40px;
}
</style>
