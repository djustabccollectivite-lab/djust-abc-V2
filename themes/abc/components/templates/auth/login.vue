<template>
    <form v-if="accountForm === true" class="login-page mx-auto">
        <div class="mt-16 text-center">
            <h2 class="font-700 size-24 mb-10">Bonjour {{ user.firstName }} {{ user.lastName }}</h2>
        </div>
        <div class="dj-form__content">
            <p class="font-700">{{ $t('login.selectClient') }}</p>
            <div class="form-group">
                <v-select
                    v-model="accountSelected"
                    :items="accountChoices"
                    :label="$t('login.yourClient')"
                    item-text="name"
                    item-value="id"
                    outlined
                    hide-details
                    return-object
                />
                <div class="form-group submit mt-30" @click.prevent="handleSubmitAccount()">
                    <DjButton
                        text="Valider"
                        shape="button"
                        variant="contained"
                        :fullWidth="true"
                        :isLoading="isLoading"
                        :isDisabled="accountSelected === null"
                        rounded
                    />
                </div>
            </div>
        </div>
    </form>
    <form v-else class="login-page mx-auto">
        <div class="mt-10 text-center">
            <h2 class="font-700 size-24 mb-10">Veuillez vous connecter</h2>
        </div>
        <div class="form-group">
            <ValidationObserver ref="form">
                <v-form v-model="validationForm" lazy-validation>
                    <ValidationProvider
                        v-slot="{ errors }"
                        mode="eager"
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
                            :append-icon="passwordVisible ? 'icon-eye' : 'icon-eye-crossed'"
                            :type="passwordVisible ? 'text' : 'password'"
                            :placeholder="$t('login.loginInputPwd')"
                            :error-messages="errors[0]"
                            height="50"
                            outlined
                            @click:append="passwordVisible = !passwordVisible"
                        />
                    </ValidationProvider>
                    <div class="d-flex justify-content-end">
                        <nuxt-link :to="localePath('/auth/forgot-password')">
                            <span class="text-blue font-700">
                                {{ $t('login.forgotPassword') }}
                            </span>
                        </nuxt-link>
                    </div>
                    <div class="text-center mt-4">
                        {{ $t('login.titleNewClient') }}
                        <nuxt-link :to="localePath('/auth/register')">
                            <span class="text-black underline">
                                {{ $t('login.titleregisterlink') }}
                            </span>
                        </nuxt-link>
                    </div>
                    <div class="form-group submit mt-30" @click.prevent="handleSubmit">
                        <DjButton
                            :text="$t('login.loginButton')"
                            :iconDisplayed="false"
                            shape="button"
                            variant="contained"
                            :fullWidth="true"
                            :isLoading="isLoading"
                            rounded
                        />
                    </div>
                </v-form>
            </ValidationObserver>
        </div>
    </form>
</template>

<script>
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjInput from '@components/atoms/DjInput/DjInput.vue';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
    name: 'LoginTemplate',
    components: {
        DjButton,
        DjInput,
        ValidationObserver,
        ValidationProvider,
    },
    data() {
        return {
            passwordVisible: false,
            username: '',
            password: '',
            validationForm: true,
            error: null,
            isLoading: false,
            accountForm: false,
            accountSelected: null,
            accountChoices: [],
            user: null,
        };
    },
    methods: {
        handleSubmit() {
            this.$refs.form.validate().then(async (success) => {
                if (!success) {
                    return;
                }
                this.isLoading = true;
                const body = {
                    username: this.username,
                    password: this.password,
                };
                const params = {
                    withUser: true,
                };
                const login = await this.$core.useUser.login(body, params);
                this.isLoading = false;
                if (login !== true) {
                    let message = login;
                    if (login === 'User not found') {
                        message = this.$t('notification.login.userNotFound');
                    } else if (login === 'Bad Credentials') {
                        message = this.$t('notification.login.badCredentials');
                    }
                    this.$toast.error(message);
                } else {
                    const jwt = this.$cookies.get('auth._token.local', { parseJSON: true });
                    const userAccounts = await this.$core.useUser.getUserDataAuthenticated(jwt);
                    if (userAccounts.accounts.length > 1) {
                        this.user = userAccounts.user;
                        this.accountForm = true;
                        this.accountChoices = userAccounts.accounts.sort((a, b) => a.name.localeCompare(b.name));
                        return;
                    } else {
                        await this.$core.useUser.defineAccount(userAccounts.accounts[0].id);
                    }
                    this.$purjus.initiatorsInThemeContext.initStore();
                    // Rediriger vers l'URL d'origine ou la homepage
                    const redirectUrl = this.$route.query.redirect || '/';
                    window.location.replace(this.localePath(redirectUrl));
                }
            });
        },
        async handleSubmitAccount() {
            if (this.accountSelected !== null) {
                this.isLoading = true;
                await this.$core.useUser.defineAccount(this.accountSelected.id);
                this.isLoading = false;
                this.$purjus.initiatorsInThemeContext.initStore();
                // Rediriger vers l'URL d'origine ou la homepage
                const redirectUrl = this.$route.query.redirect || '/';
                window.location.replace(this.localePath(redirectUrl));
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.login-page {
    max-width: 400px;
}
</style>
