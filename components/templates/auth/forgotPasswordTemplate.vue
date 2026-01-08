<template>
    <form>
        <div v-if="!toggleshow" class="dj-form-login">
            <div class="dj-form__content">
                <div class="form-group">
                    <ValidationObserver ref="form">
                        <v-form v-model="valid" lazy-validation>
                            <ValidationProvider mode="eager" v-slot="{ errors }" name="Email" rules="required|email">
                                <DjInput
                                    v-model="email"
                                    type="text"
                                    :label="$t('forgotPassword.loginInputEmail')"
                                    :error-messages="errors[0]"
                                    :placeholder="$t('forgotPassword.loginInputEmail')"
                                    height="50"
                                    outlined
                                />
                            </ValidationProvider>
                            <div class="form-group submit" @click.prevent="sendResetLink()">
                                <DjButton
                                    :text="$t('forgotPassword.submitButton')"
                                    :iconDisplayed="false"
                                    style="primary"
                                    shape="button"
                                    class="bg"
                                    icon=""
                                    :fullWidth="true"
                                />
                            </div>
                        </v-form>
                    </ValidationObserver>
                </div>
            </div>
        </div>
        <transition name="home" mode="out-in">
            <div class="dj-form__content" v-if="toggleshow">
                <div class="notif">
                    <h2 style="text-align: center" class="iconValidate">
                        <DjIcon color="green">icon-checkmark-circle</DjIcon>
                        <br />
                        {{ $t('forgotPassword.successMsg') }}
                    </h2>

                    <p>
                        {{ $t('forgotPassword.messageText1') }} <br />
                        <b>{{ this.email }}</b>
                    </p>
                    <span>{{ $t('forgotPassword.messageText2') }}</span>
                    <DjLink :to="'/auth/login'">
                        <u>{{ $t('forgotPassword.retryButton') }}</u></DjLink
                    >
                </div>
            </div>
        </transition>
    </form>
</template>

<script>
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjInput from '@components/atoms/DjInput/DjInput.vue';
import DjIcon from '@components/atoms/DjIcon/DjIcon.vue';
import DjLink from '@components/atoms/DjLink/DjLink.vue';

import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
    name: 'ForgotPasswordTemplate',
    components: {
        DjLink,
        DjIcon,
        DjButton,
        DjInput,
        ValidationObserver,
        ValidationProvider,
    },
    computed: {
        toggleshow() {
            return this.showMessage;
        },
        isComplete() {
            return this.email;
        },
        getEndpointResetPasswordPage() {
            return '/auth/reset-password';
        },
    },
    data() {
        return {
            showMessage: false,
            show1: false,
            email: null,
            withUser: true,
            valid: true,
            error: null,
        };
    },

    methods: {
        sendResetLink() {
            this.$refs.form.validate().then((success) => {
                if (!success) {
                    return;
                }
                let redirectUrl = window.location.origin + this.getEndpointResetPasswordPage;
                let request = {
                    email: this.email,
                    redirectUrl: redirectUrl,
                };
                this.$core.useUser
                    .forgotPassword(request)
                    .then((result) => {
                        this.showMessage = true;
                    })
                    .catch((err) => {
                        this.$toast.error('Error with Send Reset Link');
                    });
                this.$nextTick(() => {
                    this.$refs.form.reset();
                });
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.dj-form-login {
    margin-top: 24px;
}

.notif {
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    max-width: 384px;
    padding: 20px;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
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

.home-enter-active,
.home-leave-active {
    transition: all 0.5s ease;
    animation: flipInX 0.5s;
}
.home-enter,
.home-leave-active {
    opacity: 0;
}
@keyframes flipInX {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
}
</style>
