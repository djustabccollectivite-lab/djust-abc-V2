<template>
    <form class="dj-form-login">
        <div class="dj-form__content">
            <div class="form-group" v-if="accountForm === false">
                <ValidationObserver ref="form">
                    <v-form v-model="valid" lazy-validation>
                        <ValidationProvider
                            mode="eager"
                            v-slot="{ errors }"
                            :name="$t('login.loginInputEmail')"
                            rules="required|email"
                        >
                            <DjInput
                                v-model="username"
                                type="text"
                                :label="$t('login.loginInputEmail')"
                                :error-messages="errors[0]"
                                :placeholder="$t('login.loginInputEmail')"
                                height="50"
                                outlined
                            />
                        </ValidationProvider>

                        <ValidationProvider
                            v-slot="{ errors }"
                            mode="eager"
                            :name="$t('login.loginInputPwd')"
                            rules="required"
                        >
                            <DjInput
                                v-model="password"
                                :label="$t('login.loginInputPwd')"
                                @click:append="show1 = !show1"
                                :append-icon="show1 ? 'icon-eye' : 'icon-eye-crossed'"
                                :type="show1 ? 'text' : 'password'"
                                :placeholder="$t('login.loginInputPwd')"
                                :error-messages="errors[0]"
                                height="50"
                                outlined
                            />
                        </ValidationProvider>

                        <div class="dj-form-login-bottom">
                            <div class="dj-form-link">
                                <DjLink :to="localePath('/auth/forgot-password')"
                                    >{{ $t('login.forgotPassword') }}
                                </DjLink>
                            </div>
                        </div>
                        <div class="form-group submit mt-30" @click.prevent="handleSubmit()">
                            <DjButton
                                :text="$t('login.loginButton')"
                                :iconDisplayed="false"
                                style="primary"
                                shape="button"
                                icon=""
                                :fullWidth="true"
                                :isLoading="isLoading"
                            />
                        </div>
                    </v-form>
                </ValidationObserver>
            </div>
            <div class="auth-header choose-shop" v-if="accountForm === true">
                <h2>{{ $t('header.navigationExtra.chooseAccount') }}</h2>
                <hr />
            </div>
            <form v-if="accountForm === true" class="dj-form-login">
                <div class="dj-form__content">
                    <div class="form-group activeSelect">
                        <v-select
                            color="red"
                            :items="accountChoices.name"
                            :key="incrementSelect"
                            v-model="selectedOption"
                            label="Choisissez un compte"
                        >
                        </v-select>

                        <div class="form-group submit mt-30" @click.prevent="handleSubmitAccount()">
                            <DjButton
                                :text="$t('login.confirm')"
                                :iconDisplayed="false"
                                style="'primary'"
                                shape="button"
                                icon=""
                                :fullWidth="true"
                                :isLoading="isLoading"
                                :isDisabled="accountSelected === null"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="dj-form__footer">
            <p>
                {{ $t('login.titleNewClient') }}
                {{ ' ' }}
                <nuxt-link :to="localePath('/auth/register')" class="linktoRegister">
                    {{ $t('login.titleregisterlink') }}
                </nuxt-link>
            </p>
        </div>
    </form>
</template>

<script>
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjLink from '@components/atoms/DjLink/DjLink.vue';
import DjInput from '@components/atoms/DjInput/DjInput.vue';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import AuthLayout from '@components/templates/auth/AuthLayout.vue';

export default {
    name: 'LoginTemplate',
    components: {
        DjLink,
        DjButton,
        DjInput,
        AuthLayout,
        ValidationObserver,
        ValidationProvider,
    },
    data() {
        return {
            show1: false,
            username: null,
            password: null,
            altLogo: '',
            headerLogo: '',
            bgLogin: '',
            cssBg: '',
            withUser: true,
            valid: true,
            error: null,
            isLoading: false,
            accountForm: false,
            selectedOption: null,
            accountChoices: {
                name: [],
                id: [],
            },
            accountSelected: null,
            storyBlokAuth: null,
            incrementSelect: 1,
        };
    },
    watch: {
        selectedOption(newVal, oldVal) {
            const selectedIndex = this.accountChoices.name.indexOf(newVal);
            this.accountSelected = this.accountChoices.id[selectedIndex];
        },
    },
    methods: {
        async handleSubmit() {
            this.$refs.form.validate().then(async (success) => {
                if (!success) return;
                this.isLoading = true;
                const body = {
                    username: this.username,
                    password: this.password,
                };

                const params = {
                    withUser: this.withUser,
                };

                const login = await this.$core.useUser.login(body, params);
                const jwt = this.$cookies.get('auth._token.local', { parseJSON: true });
                const userAccounts = await this.$core.useUser.getUserDataAuthenticated(jwt);

                this.isLoading = false;

                if (login === true) {
                    if (userAccounts.accounts.length > 1) {
                        this.accountForm = true;
                        userAccounts.accounts.forEach((account) => {
                            this.accountChoices.name.push(account.name);
                            this.accountChoices.id.push(account.id);
                        });
                        this.incrementSelect++;
                        return;
                    } else {
                        await this.$core.useUser.defineAccount(userAccounts.accounts[0].id);
                    }
                    this.$router.push(this.localePath('/'));
                } else {
                    let message;

                    if (login === 'User not found') {
                        message = this.$t('notification.login.userNotFound');
                    } else if (login === 'Bad Credentials') {
                        message = this.$t('notification.login.badCredentials');
                    }
                    message
                        ? this.$toast.error(message)
                        : this.$toast.error(this.$t('notification.login.userNotFound'));
                }
            });
        },
        async handleSubmitAccount() {
            if (null !== this.accountSelected) {
                this.isLoading = true;
                await this.$core.useUser.defineAccount(this.accountSelected);
                await this.$core.useUser.getCustomerAccountById(this.accountSelected);
                this.isLoading = false;
                this.$router.push(this.localePath('/'));
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.dj-form-login {
    margin-top: 24px;
    .dj-form__footer {
        p {
            text-align: center;
            font-size: 14px;
            line-height: 16.8px;
            font-weight: 400;
            .linktoRegister {
                text-decoration: underline;
                &:hover {
                    color: rgba(var(--color-primary), 0.8);
                }
            }
        }
    }
}
.dj-form-login-bottom {
    display: flex;
    justify-content: flex-end;
    justify-items: center;
    .dj-form-remember-me {
        display: flex;
        justify-items: center;
        input {
            height: 16px;
            width: 16px;
            color: var(--color-primary);
            border-color: rgb(209 213 219);
            border-radius: 4px;
            &:focus {
                color: rgba(var(--color-primary), 0.8);
            }
        }
        label {
            margin-left: 8px;
            display: block;
            font-size: 14px;
            line-height: 20px;
            color: rgb(17 24 39);
        }
    }
    .dj-form-link {
        font-size: 14px;
        line-height: 20px;
        a {
            font-weight: 500;
            color: var(--color-primary);
            &:hover {
                color: rgba(var(--color-primary), 0.8);
            }
        }
    }
}
</style>
