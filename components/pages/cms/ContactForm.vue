<template>
    <div class="dj-contact-form">
        <div>
            <ValidationObserver ref="formContact">
                <v-form class="dj-form--contact-us">
                    <div class="row">
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <ValidationProvider
                                v-slot="{ errors }"
                                mode="eager"
                                :name="$t('page.contact.form.name')"
                                rules="required"
                            >
                                <label for="Nom" class="label-c">
                                    {{ $t('page.contact.form.name') }}
                                    <span class="required">*</span></label
                                >
                                <DjInput
                                    v-model="name"
                                    type="text"
                                    outlined
                                    :error-messages="errors[0]"
                                    @keyup="updateOutputUrl"
                                />
                            </ValidationProvider>
                        </div>
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <ValidationProvider
                                v-slot="{ errors }"
                                mode="eager"
                                :name="$t('page.contact.form.email')"
                                rules="required|email"
                            >
                                <label for="Nom" class="label-c">
                                    {{ $t('page.contact.form.email') }}
                                    <span class="required">*</span></label
                                >
                                <DjInput
                                    v-model="mail"
                                    type="text"
                                    outlined
                                    :error-messages="errors[0]"
                                    @keyup="updateOutputUrl"
                                />
                            </ValidationProvider>
                        </div>
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <ValidationProvider
                                v-slot="{ errors }"
                                mode="eager"
                                :name="$t('page.contact.form.subject')"
                                rules="required"
                            >
                                <label for="Nom" class="label-c">
                                    {{ $t('page.contact.form.subject') }}
                                    <span class="required">*</span></label
                                >
                                <v-select
                                    v-model="email.subject"
                                    type="text"
                                    outlined
                                    :items="$t('items')"
                                    :error-messages="errors[0]"
                                    @change="updateOutputUrl"
                                />
                            </ValidationProvider>
                        </div>
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <ValidationProvider
                                v-slot="{ errors }"
                                mode="eager"
                                :name="$t('page.contact.form.message')"
                                rules="required"
                            >
                                <label for="Nom" class="label-c">
                                    {{ $t('page.contact.form.message') }}
                                    <span class="required">*</span></label
                                >
                                <v-textarea
                                    v-model="email.body"
                                    outlined
                                    rows="6"
                                    :error-messages="errors[0]"
                                    @keyup="updateOutputUrl"
                                ></v-textarea>
                            </ValidationProvider>
                        </div>
                    </div>
                </v-form>
            </ValidationObserver>
            <div class="form-group submit">
                <div @click.prevent="sendMessage()">
                    <DjButton
                        :text="$t('page.contact.contactus')"
                        :iconDisplayed="true"
                        styleButton="primary"
                        icon="icon-papers"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjInput from '@components/atoms/DjInput/DjInput.vue';

import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
    name: 'ContactForm',
    components: { DjInput, DjButton, ValidationObserver, ValidationProvider },
    i18n: {
        messages: {
            en: {
                items: [
                    'I have a question about a product',
                    'I have a question about my account',
                    'I have a question about my order',
                    'I have a question about a payment or billing',
                    'I have a question about my delivery',
                    'Another question',
                ],
            },
            fr: {
                items: [
                    `J'ai une question sur un produit`,
                    `J'ai une question concernant mon compte`,
                    `J'ai une question concernant ma commande`,
                    `J'ai une question concernant un paiement ou une facturation`,
                    `J'ai une question concernant ma livraison`,
                    `Autre question`,
                ],
            },
        },
    },
    data() {
        return {
            email: {
                subject: '',
                body: '',
            },
            name: this.$auth.user?.firstName ? this.$auth.user.firstName : null,
            subject: null,
            mail: this.$auth.user?.email ? this.$auth.user.email : null,
            body: null,
            ContactMail: this.$config?.email ? this.$config.email : null,
            outputUrl: null,
        };
    },
    computed: {
        locale() {
            return this.$i18n.localeProperties.code;
        },
    },
    methods: {
        updateOutputUrl() {
            this.outputUrl = 'mailto:' + this.ContactMail;
            const emailKeys = Object.keys(this.email);
            const remaining = emailKeys.filter((key) => this.email[key].trim().length > 0);
            if (remaining.length > 0) this.outputUrl += '?';
            this.outputUrl += remaining.map((key) => `${key}=${encodeURI(this.email[key].trim())}`).join('&');
        },
        sendMessage() {
            this.updateOutputUrl();
            this.$refs.formContact
                .validate()
                .then((result) => {
                    if (result) {
                        window.location.href = this.outputUrl;
                    } else {
                        this.$toast.error(this.$t('notification.contact.error'));
                    }
                })
                .catch((err) => {
                    return err;
                });
        },
    },
};
</script>

<style lang="scss" scoped>
.label-c {
    font-family: var(--font-1st);
    font-style: normal;
    font-weight: 100;
    font-size: 15px;
    line-height: 18px;

    color: #000000;
    padding-right: 20px;
    .required {
        color: red;
    }
}
</style>
