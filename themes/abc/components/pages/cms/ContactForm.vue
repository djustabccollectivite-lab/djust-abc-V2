<template>
    <DjAccountLayout :idAccountLink="accountLayoutContact">
        <div class="shadow rounded-extra-lg">
            <div class="d-flex align-items-center bg-black navigation-header pl-6">
                <span class="text-white font-700 size-24">
                    {{ $t('page.contact.contactUsForAnyQuestions') }}
                </span>
            </div>
            <div class="p-5">
                <ValidationObserver ref="formContact">
                    <v-form lazy-validation>
                        <div class="row">
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <ValidationProvider
                                    v-slot="{ errors }"
                                    mode="eager"
                                    :name="$t('page.contact.form.name')"
                                    rules="required"
                                >
                                    <label :for="$t('page.contact.form.name')" class="text-black">
                                        {{ $t('page.contact.form.name') }}
                                        <span class="text-red">*</span>
                                    </label>
                                    <DjInput
                                        v-model="name"
                                        type="text"
                                        outlined
                                        :error-messages="errors[0]"
                                        @v-on:keyup="updateOutputUrl"
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
                                    <label :for="$t('page.contact.form.email')" class="text-black">
                                        {{ $t('page.contact.form.email') }}
                                        <span class="text-red">*</span>
                                    </label>
                                    <DjInput
                                        v-if="mail"
                                        v-model="mail"
                                        type="text"
                                        outlined
                                        :error-messages="errors[0]"
                                        @v-on:keyup="updateOutputUrl"
                                    />
                                    <DjInput
                                        v-else
                                        v-model="mail"
                                        type="text"
                                        outlined
                                        :error-messages="errors[0]"
                                        @v-on:keyup="updateOutputUrl"
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
                                    <label :for="$t('page.contact.form.subject')" class="text-black">
                                        {{ $t('page.contact.form.subject') }}
                                        <span class="text-red">*</span>
                                    </label>
                                    <v-select
                                        v-model="email.subject"
                                        type="text"
                                        outlined
                                        :items="items"
                                        :error-messages="errors[0]"
                                        @v-on:change="updateOutputUrl"
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
                                    <label :for="$t('page.contact.form.message')" class="text-black">
                                        {{ $t('page.contact.form.message') }}
                                        <span class="text-red">*</span>
                                    </label>
                                    <v-textarea
                                        v-model="email.body"
                                        outlined
                                        rows="6"
                                        :error-messages="errors[0]"
                                        @v-on:keyup="updateOutputUrl"
                                    ></v-textarea>
                                </ValidationProvider>
                            </div>
                        </div>
                    </v-form>
                </ValidationObserver>
                <div @click.prevent="sendMessage()">
                    <DjButton
                        :text="$t('page.contact.contactus')"
                        shape="button"
                        variant="contained"
                        :iconDisplayed="false"
                    />
                </div>
            </div>
        </div>
    </DjAccountLayout>
</template>

<script>
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjInput from '@components/atoms/DjInput/DjInput.vue';
import DjAccountLayout from '@components/templates/DjAccountLayout/DjAccountLayout.vue';

import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
    name: 'ContactForm',
    components: { DjInput, DjButton, ValidationObserver, ValidationProvider, DjAccountLayout },
    data() {
        const redirectedFrom = this.$route.query.redirectedFrom;
        let subject = null;
        let body = null;
        switch (redirectedFrom) {
            case 'newsletter':
                subject = `Je souhaite m'inscrire à la newsletter`;
                body = `Je souhaite recevoir les prochaines newsletters !`;
                break;
            case 'associatedProduct':
                subject = `Je souhaite recevoir vos offres promotionnelles`;
                body = `Je souhaite recevoir les offres promotionnelles`;
                break;
        }

        return {
            accountLayoutContact: 'Contact',
            items: [
                `J'ai une question sur un produit `,
                `J'ai une question sur mon compte client`,
                `J'ai une question sur ma commande`,
                `J'ai une question sur le paiement`,
                `J'ai une question sur la livraison`,
                `Je souhaite m'inscrire à la newsletter`,
                {
                    text: `Je souhaite recevoir vos offres promotionnelles`,
                    disabled: !this.$auth.loggedIn,
                },
                `Autre`,
            ],
            redirectedFrom,
            email: {
                subject,
                body,
            },
            name: this.$auth.user?.firstName ? this.$auth.user.firstName : null,
            subject: null,
            mail: this.$auth.user?.email ? this.$auth.user.email : null,
            body: null,
            ContactMail: this.$config?.email ? this.$config.email : null,
            outputUrl: null,
            storyblokMailListObject: null,
        };
    },
    computed: {
        valid() {
            if (!this.$refs.formContact) return false;
            try {
                this.$refs.formContact.validate();
                return true;
            } catch {
                return false;
            }
        },
    },
    created() {
        this.updateOutputUrl();
    },
    methods: {
        updateOutputUrl() {
            this.outputUrl = 'mailto:' + this.ContactMail;
            const emailKeys = Object.keys(this.email);
            const remaining = emailKeys.filter((key) => this.email[key]?.trim()?.length > 0);
            if (remaining.length > 0) {
                this.outputUrl += '?';
            }
            this.outputUrl += remaining.map((key) => `${key}=${encodeURI(this.email[key]?.trim())}`).join('&');
        },
        sendMessage() {
            this.updateOutputUrl();
            this.$refs.formContact.validate().then(async (result) => {
                if (result) {
                    await this.$core.useBrevo.createContact({
                        clientId: 'ABC',
                        email: this.mail,
                    });

                    const listId = this.email.subject === "Je souhaite m'inscrire à la newsletter" ? '60' : '63';

                    await this.$core.useBrevo.addContactsToList({
                        clientId: 'ABC',
                        listId,
                        emails: [this.mail],
                    });

                    try {
                        await this.$core.useBrevo.sendEmail({
                            clientId: 'ABC',
                            sender: {
                                name: this.name,
                                email: this.mail,
                            },
                            to: [
                                {
                                    name: 'Contact ABC',
                                    email: this.$config.contactMail,
                                },
                            ],
                            subject: this.email.subject,
                            htmlContent: `<html>
                                        <head></head>
                                        <body>
                                            <h1>${this.email.subject}</h1>
                                            <p>${this.email.body}</p>
                                        </body>
                                    </html>`,
                        });

                        this.$toast.success(this.$t('notification.contact.mailSuccess'));
                    } catch {
                        this.$toast.error(this.$t('notification.contact.mailError'));
                    }
                } else {
                    this.$toast.error(this.$t('notification.contact.error'));
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.rounded-extra-lg {
    border-radius: 24px;
}
</style>
