<template>
    <DjAccountLayout :idAccountLink="accountLayoutAdresses">
        <div class="shadow rounded-extra-lg">
            <div class="d-flex align-items-center bg-black navigation-header pl-6">
                <span class="text-white font-700 size-24">
                    {{ $t('account.address.titleAddress') }}
                </span>
            </div>
            <div class="p-5 pb-0 row">
                <div class="col-md-6 col-12">
                    <figure>
                        <figcaption class="d-flex align-items-center p-0 mb-4">
                            <SvgIcon name="pin-point" />
                            <span class="text-primary font-700 size-24 ml-2">
                                Adresses de livraison
                            </span>
                        </figcaption>
                        <AddressCard
                            v-if="shippingAddress"
                            v-for="address in shippingAddress"
                            :key="address.id + increment"
                            @refresh="refresh"
                            :address="address"
                            :select="null"
                            class="mb-5"
                        />
                    </figure>
                    <div @click.prevent="add = true" class="text-primary pointer font-700 d-flex align-items-center gap-2">
                        <SvgIcon name="plus-primary" class="relative-top" />
                        <div>{{ $t('account.organisation.createAddress') }}</div>
                    </div>
                </div>
                <div class="col-md-6 col-12 mb-4">
                    <figure>
                        <figcaption class="d-flex align-items-center p-0 mb-4">
                            <SvgIcon name="pin-point" />
                            <span class="text-primary font-700 size-24 ml-2">
                                Adresses de facturation
                            </span>
                        </figcaption>
                        <AddressCard
                            v-if="billingAddress"
                            v-for="address in billingAddress"
                            :key="address.id + increment"
                            @refresh="refresh"
                            :address="address"
                            :select="null"
                            class="mb-5"
                        />
                        <div class="dj-block__content"></div>
                    </figure>
                    <div @click.prevent="add = true" class="text-primary pointer font-700 d-flex align-items-center gap-2">
                        <SvgIcon name="plus-primary" class="relative-top" />
                        <div>{{ $t('account.organisation.createAddress') }}</div>
                    </div>
                </div>
                <DjModal v-model="add" max-width="900px">
                    <template v-slot:activator="{ on }"> </template>
                    <div class="bg-white p-5">
                        <div class="d-flex justify-space-between align-items-center">
                            <div class="text-black font-700 size-18">{{ $t('account.address.createAddress') }}</div>
                            <div @click.prevent="add = false" class="d-flex justify-content-center align-items-center close-button">
                                <SvgIcon name="cross-black" />
                            </div>
                        </div>
                        <ValidationObserver ref="form">
                            <v-form class="dj-form--edit-address" v-model="validationForm" lazy-validation>
                                <div class="dj-form__content">
                                    <v-row>
                                        <v-col cols="12">
                                            <div class="form-group">
                                            <span v-if="error">
                                                {{ error }}
                                            </span>
                                            </div>
                                        </v-col>
                                        <v-col cols="12">
                                            <ValidationProvider
                                                    mode="eager"
                                                    v-slot="{ errors }"
                                                    :name="$t('register.labels.label')"
                                            >
                                                <DjInput
                                                        v-model="label"
                                                        type="text"
                                                        :error-messages="errors[0]"
                                                        height="50"
                                                        :label="$t('register.labels.label')"
                                                        outlined
                                                />
                                            </ValidationProvider>
                                        </v-col>
                                        <v-col cols="12">
                                            <ValidationProvider
                                                    mode="eager"
                                                    v-slot="{ errors }"
                                                    :name="$t('register.labels.fullName')"
                                                    rules="required"
                                            >
                                                <DjInput
                                                        v-model="fullName"
                                                        :error-messages="errors[0]"
                                                        height="50"
                                                        :label="$t('register.labels.fullName') + ' *'"
                                                        outlined
                                                />
                                            </ValidationProvider>
                                        </v-col>
                                        <v-col cols="12">
                                            <ValidationProvider
                                                    mode="eager"
                                                    v-slot="{ errors }"
                                                    :name="$t('register.labels.addresse')"
                                                    rules="required"
                                            >
                                                <DjInput
                                                        v-model="address"
                                                        :error-messages="errors[0]"
                                                        height="50"
                                                        :label="$t('register.labels.addresse') + ' *'"
                                                        outlined
                                                />
                                            </ValidationProvider>
                                        </v-col>
                                        <v-col cols="12">
                                            <ValidationProvider
                                                    mode="eager"
                                                    v-slot="{ errors }"
                                                    :name="$t('register.labels.address2')"
                                            >
                                                <DjInput
                                                        v-model="additionalAddress"
                                                        :error-messages="errors[0]"
                                                        height="50"
                                                        :label="$t('register.labels.address2')"
                                                        outlined
                                                />
                                            </ValidationProvider>
                                        </v-col>
                                        <v-col cols="6">
                                            <ValidationProvider
                                                    mode="eager"
                                                    v-slot="{ errors }"
                                                    :name="$t('register.labels.country')"
                                                    rules="required"
                                            >
                                                <DjInput
                                                        v-model="country"
                                                        :error-messages="errors[0]"
                                                        height="50"
                                                        :label="$t('register.labels.country') + ' *'"
                                                        outlined
                                                        disabled
                                                />
                                            </ValidationProvider>
                                        </v-col>
                                        <v-col cols="6">
                                            <ValidationProvider
                                                    mode="eager"
                                                    v-slot="{ errors }"
                                                    :name="$t('register.labels.zipCode')"
                                                    rules="required"
                                            >
                                                <DjInput
                                                        v-model="zipcode"
                                                        :error-messages="errors[0]"
                                                        height="50"
                                                        :label="$t('register.labels.zipCode') + ' *'"
                                                        outlined
                                                />
                                            </ValidationProvider>
                                        </v-col>

                                        <v-col cols="6">
                                            <ValidationProvider
                                                    mode="eager"
                                                    v-slot="{ errors }"
                                                    :name="$t('register.labels.city')"
                                                    rules="required"
                                            >
                                                <DjInput
                                                        v-model="city"
                                                        :error-messages="errors[0]"
                                                        height="50"
                                                        :label="$t('register.labels.city') + ' *'"
                                                        outlined
                                                />
                                            </ValidationProvider>
                                        </v-col>
                                        <v-col cols="6">
                                            <ValidationProvider
                                                    mode="eager"
                                                    v-slot="{ errors }"
                                                    :name="$t('register.labels.state')"
                                                    rules="required"
                                            >
                                                <DjInput
                                                        v-model="state"
                                                        :error-messages="errors[0]"
                                                        height="50"
                                                        :label="$t('register.labels.state') + ' *'"
                                                        outlined
                                                />
                                            </ValidationProvider>
                                        </v-col>
                                        <v-col cols="12">
                                            <ValidationProvider
                                                    mode="eager"
                                                    v-slot="{ errors }"
                                                    :name="$t('register.labels.phone')"
                                                    rules="required"
                                            >
                                                <DjInput
                                                        v-model="phone"
                                                        :error-messages="errors[0]"
                                                        height="50"
                                                        :label="$t('register.labels.phone') + ' *'"
                                                        outlined
                                                />
                                            </ValidationProvider>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-label class="text-center">{{
                                                    $t('account.address.typeofAddress')
                                                }}</v-label>
                                            <br />
                                            <v-row>
                                                <v-col cols="6">
                                                    <ValidationProvider
                                                            mode="eager"
                                                            v-slot="{ errors }"
                                                            name="billing"
                                                            rules="confirmTrue:@shipping"
                                                    >
                                                        <v-checkbox
                                                                v-model="billing"
                                                                height="50"
                                                                :label="$t('account.address.billing')"
                                                                :error-messages="errors[0]"
                                                        ></v-checkbox>
                                                    </ValidationProvider>
                                                </v-col>
                                                <v-col cols="6">
                                                    <ValidationProvider
                                                            mode="eager"
                                                            v-slot="{ errors }"
                                                            name="shipping"
                                                            rules="confirmTrue:@billing"
                                                    >
                                                        <v-checkbox
                                                                v-model="shipping"
                                                                height="50"
                                                                :label="$t('account.address.shipping')"
                                                                :error-messages="errors[0]"
                                                        ></v-checkbox>
                                                    </ValidationProvider>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-row>
                                </div>
                            </v-form>
                        </ValidationObserver>
                        <div class="d-flex justify-content-end gap-8 ">
                            <div @click.prevent="add = false" class="b1">
                                <DjButton
                                    :text="$t('cart.close')"
                                    shape="button"
                                    variant="outlined"
                                    :iconDisplayed="false"
                                />
                            </div>
                            <div @click.prevent="SaveAddress()" class="b2">
                                <DjButton
                                    :text="$t('product.buttonAddToQuote.createButton')"
                                    shape="button"
                                    variant="contained"
                                    :iconDisplayed="false"
                                />
                            </div>
                        </div>
                    </div>
                </DjModal>
            </div>
        </div>
    </DjAccountLayout>
</template>

<script>
import { mapState } from 'vuex';
import AddressCard from '@components/organisms/DjAddressCard/DjAddressCard.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjAccountLayout from '@components/templates/DjAccountLayout/DjAccountLayout.vue';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import DjInput from '@components/atoms/DjInput/DjInput.vue';
import DjCheckbox from '@components/atoms/DjCheckbox/DjCheckbox.vue';
import DjModal from '@components/molecules/DjModal/DjModal.vue';
import SvgIcon from '@components/atoms/icons/SvgIcon.vue';

export default {
    name: 'Addresses',
    components: {
        AddressCard,
        DjButton,
        DjAccountLayout,
        ValidationObserver,
        ValidationProvider,
        DjInput,
        DjCheckbox,
        DjModal,
        SvgIcon,
    },

    data() {
        return {
            increment: 1,
            add: false,
            additionalAddress: '',
            address: '',
            billing: true,
            city: '',
            country: 'France',
            fullName: '',
            label: '',
            phone: '',
            shipping: true,
            state: '',
            zipcode: '',
            validationForm: true,
            error: false,
            accountLayoutAdresses: 'Adresses',
        };
    },
    computed: {
        ...mapState({
            userName: (state) => state.auth.user.firstName,
        }),
        shippingAddress() {
            return this.$store.state.user.addressShippingList;
        },
        billingAddress() {
            return this.$store.state.user.addressBillingList;
        },
    },
    beforeMount() {
        this.$core.useUser.getUserBillingAddressList();
        this.$core.useUser.getUserShippingAddressList();
    },
    created() {
        this.$nuxt.$on('refresh', (val) => {
            this.increment++;
        });
    },
    methods: {
        async SaveAddress() {
            this.$refs.form.validate().then(async (success) => {
                if (!success) {
                    return;
                }
                const data = {
                    additionalAddress: this.additionalAddress,
                    address: this.address,
                    billing: this.billing,
                    city: this.city,
                    country: this.country,
                    fullName: this.fullName,
                    label: this.label,
                    phone: this.phone,
                    shipping: this.shipping,
                    state: this.state,
                    zipcode: this.zipcode,
                };
                await this.$core.useUser.createAddress(data);
                this.$emit('refresh', 'refresh');
                this.increment++;
                this.add = false;
                this.$toast.success(`${this.label}` + this.$t('notification.address.success'));
            });
        },
        refresh() {
            this.$emit('refresh', 'refresh');
        },
    },
};
</script>

<style lang="scss" scoped>
.rounded-extra-lg {
    border-radius: 24px;
}

.close-button {
    width: 25px;
    height: 25px;
    border: 1px solid var(--color-black);
    cursor: pointer;
}
</style>
