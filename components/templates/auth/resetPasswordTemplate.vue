<template>
    <form>
        <div v-if="!toggleshow" class="dj-form-login">
            <div class="dj-form__content">
                <div class="form-group">
                    <ValidationObserver ref="form">
                        <v-form v-model="valid" lazy-validation>
                            <ValidationProvider
                                mode="eager"
                                v-slot="{ errors }"
                                :name="$t('resetPassword.InputPwd')"
                                vid="Password"
                                rules="required|verify_password"
                            >
                                <DjInput
                                    v-model="password"
                                    :label="$t('resetPassword.InputPwd')"
                                    @click:append="show1 = !show1"
                                    :append-icon="show1 ? 'icon-eye' : 'icon-eye-crossed'"
                                    :type="show1 ? 'text' : 'password'"
                                    :placeholder="$t('resetPassword.InputPwd')"
                                    :error-messages="errors[0]"
                                    height="50"
                                    outlined
                                />
                            </ValidationProvider>
                            <ValidationProvider
                                mode="eager"
                                v-slot="{ errors }"
                                :name="$t('resetPassword.InputCPwd')"
                                rules="required|confirmed:Password"
                            >
                                <DjInput
                                    v-model="cpassword"
                                    :label="$t('resetPassword.InputCPwd')"
                                    @click:append="show2 = !show2"
                                    :append-icon="show2 ? 'icon-eye' : 'icon-eye-crossed'"
                                    :type="show2 ? 'text' : 'password'"
                                    :placeholder="$t('resetPassword.InputCPwd')"
                                    :error-messages="errors[0]"
                                    height="50"
                                    outlined
                                />
                            </ValidationProvider>
                            <div class="form-group submit" @click.prevent="resetPassword()">
                                <DjButton
                                    :text="$t('resetPassword.submitButton')"
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
                        {{ $t('resetPassword.successMsg') }}
                    </h2>
                    <p>{{ $t('resetPassword.messageText') }}</p>
                </div>
            </div>
        </transition>
    </form>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjInput from '@components/atoms/DjInput/DjInput.vue';
import DjIcon from '@components/atoms/DjIcon/DjIcon.vue';
import DjLink from '@components/atoms/DjLink/DjLink.vue';
import AuthLayout from '@components/templates/auth/AuthLayout.vue';

export default {
    name: 'ResetPasswordTemplate',
    components: {
        ValidationObserver,
        ValidationProvider,
        DjButton,
        DjInput,
        DjIcon,
        DjLink,
        AuthLayout,
    },
    computed: {
        toggleshow() {
            return this.showMessage;
        },
    },
    data() {
        return {
            showMessage: false,
            show1: false,
            show2: false,
            password: null,
            cpassword: null,
            withUser: true,
            valid: true,
            error: null,
        };
    },
    methods: {
        resetPassword() {
            this.$refs.form.validate().then(async (success) => {
                if (!success) {
                    return;
                }
                let request = {
                    newPassword: this.password,
                    token: this.$route.query.token,
                };
                const res = await this.$core.useUser.resetPassword(request);
                if (res) {
                    this.$toast.success(this.$t('resetPassword.messageText'));
                    this.showMessage = true;
                    window.setTimeout(() => {
                        this.$router.push(this.localePath('/auth/login'));
                    }, 2000)
                } else {
                    this.$toast.error(this.$t('resetPassword.errorMessageText'));
                    this.$router.push(this.localePath('/auth/login'));
            }
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
        // width: 384px;
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
