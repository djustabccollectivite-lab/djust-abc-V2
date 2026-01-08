<template>
    <DjAccountLayout :idAccountLink="accountLayoutAdresses">
        <DjCard headerColor="var(--color-secondary)" :title="$t('account.address.titleAddress')" :withActions="true">
            <div class="dj-section--account-setting">
                <div>
                    <div class="row">
                        <div class="col-md-6 col-12">
                            <figure class="dj-block--address dj-block--shipping">
                                <figcaption class="shipping">
                                    <DjIcon>icon-map-marker</DjIcon>
                                    Adresses de livraison
                                </figcaption>
                                <AddressCard
                                    v-for="addressElt in shippingAddress"
                                    :key="addressElt.id + increment"
                                    :address="addressElt"
                                    :select="false"
                                    class="mb-5"
                                    @refresh="refresh"
                                />
                            </figure>
                            <div @click.prevent="add = true">
                                <DjButton
                                    :text="$t('account.organisation.createAddress')"
                                    :iconDisplayed="true"
                                    styleButton="light"
                                    :shape="'button'"
                                    icon="icon-plus-circle"
                                    :size="'standard'"
                                    :textDisplayed="true"
                                />
                            </div>
                        </div>
                        <div class="col-md-6 col-12 mb-4">
                            <figure class="dj-block--address dj-block--shipping">
                                <figcaption class="billing">
                                    <DjIcon>icon-map-marker</DjIcon>
                                    Adresses de facturation
                                </figcaption>
                                <AddressCard
                                    v-for="addressElt in billingAddress"
                                    :key="addressElt.id + increment"
                                    :address="addressElt"
                                    :select="false"
                                    class="mb-5"
                                    @refresh="refresh"
                                />
                                <div class="dj-block__content"></div>
                            </figure>
                            <div @click.prevent="add = true">
                                <DjButton
                                    :text="$t('account.organisation.createAddress')"
                                    :iconDisplayed="true"
                                    styleButton="light"
                                    :shape="'button'"
                                    icon="icon-plus-circle"
                                    :size="'standard'"
                                    :textDisplayed="true"
                                />
                            </div>
                        </div>

                        <DjModal v-model="add" max-width="900px">
                            <DjCard headerColor="var(--color-secondary)" :withActions="true">
                                <template #title>
                                    <div class="dj-address-modal-header">
                                        <div class="title__h4">{{ $t('account.address.createAddress') }}</div>
                                        <div class="text-left">
                                            <div @click.prevent="add = false">
                                                <DjButton
                                                    :iconDisplayed="true"
                                                    styleButton="light"
                                                    :shape="'icon'"
                                                    icon="icon-cross-circle"
                                                    :size="'small'"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <ValidationObserver ref="form">
                                    <v-form v-model="valid" class="dj-form--edit-address" lazy-validation>
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
                                                        v-slot="{ errors }"
                                                        mode="eager"
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
                                                        v-slot="{ errors }"
                                                        mode="eager"
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
                                                        v-slot="{ errors }"
                                                        mode="eager"
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
                                                        v-slot="{ errors }"
                                                        mode="eager"
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
                                                        v-slot="{ errors }"
                                                        mode="eager"
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
                                                        v-slot="{ errors }"
                                                        mode="eager"
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
                                                        v-slot="{ errors }"
                                                        mode="eager"
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
                                                        v-slot="{ errors }"
                                                        mode="eager"
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
                                                        v-slot="{ errors }"
                                                        mode="eager"
                                                        :name="$t('register.labels.phone')"
                                                        :rules="{ required: true, numeric: true }"
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
                                                                v-slot="{ errors }"
                                                                mode="eager"
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
                                                                v-slot="{ errors }"
                                                                mode="eager"
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
                                <div class="bottom">
                                    <div class="b1" @click.prevent="add = false">
                                        <DjButton
                                            :text="$t('cart.close')"
                                            :iconDisplayed="true"
                                            styleButton="secondary"
                                            :shape="'button'"
                                            icon="icon-cross-circle"
                                            :size="'standard'"
                                            :fullWidth="true"
                                        />
                                    </div>
                                    <div class="b2" @click.prevent="SaveAddress()">
                                        <DjButton
                                            :text="$t('product.buttonAddToQuote.createButton')"
                                            :iconDisplayed="true"
                                            styleButton="primary"
                                            :shape="'button'"
                                            icon="icon-floppy-disk"
                                            :size="'standard'"
                                            :fullWidth="true"
                                        />
                                    </div>
                                </div>
                            </DjCard>
                        </DjModal>
                    </div>
                </div>
            </div>
        </DjCard>
    </DjAccountLayout>
</template>

<script>
import { mapState } from 'vuex';
import AddressCard from '@components/organisms/DjAddressCard/DjAddressCard.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjAccountLayout from '@components/templates/DjAccountLayout/DjAccountLayout.vue';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import DjInput from '@components/atoms/DjInput/DjInput.vue';
import DjCard from '@components/molecules/DjCard/DjCard.vue';
import DjModal from '@components/molecules/DjModal/DjModal.vue';
import DjIcon from '@components/atoms/DjIcon/DjIcon.vue';
export default {
    name: 'AddressesTemplate',
    components: {
        AddressCard,
        DjButton,
        DjAccountLayout,
        ValidationObserver,
        ValidationProvider,
        DjInput,
        DjCard,
        DjModal,
        DjIcon,
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
            valid: true,
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
        this.$nuxt.$on('refresh', () => {
            this.increment++;
        });
    },
    methods: {
        SaveAddress() {
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
.bottom {
    display: flex;
}
.dj-section--account-setting {
    margin-top: 5rem;
}
.dj-address-modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    h4,
    .title__h4 {
        color: #fff;
        margin-bottom: 0;
    }
}
.bottom {
    display: flex;
    .b1 {
        flex: 1;
        margin-right: 6px;
    }
    .b2 {
        flex: 1;
    }
}
</style>
