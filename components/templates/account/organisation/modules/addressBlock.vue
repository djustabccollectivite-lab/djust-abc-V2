<template>
    <DjCard
        headerColor="var(--color-secondary)"
        :title="$t('account.organisation.titleAddress') + ' ' + organisationName"
    >
        <div class="dj-section--account-setting">
            <div v-for="(_address, index) in addressOrga" :key="index">
                <AddressLine :id="index" :currentOrga="currentOrga" :address="addressOrga[index]" />
            </div>
            <div @click.prevent="createAddress">
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
        <DjModal v-model="createAddressPage" max-width="900px" class="modale__buying">
            <DjCard headerColor="var(--color-secondary)" class="djCardTitle" :withActions="true">
                <template #title>
                    <div class="dj-address-modal-header">
                        <div class="title__h4">{{ $t('account.address.createAddress') }}</div>
                        <div class="text-left">
                            <div @click.prevent="createAddressPage = false">
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
                <ValidationObserver ref="addressvalid">
                    <v-form v-model="valid" lazy-validation>
                        <ValidationProvider
                            v-slot="{ errors }"
                            mode="eager"
                            :name="$t('account.address.label')"
                            rules="required"
                        >
                            <DjInput
                                v-model="label"
                                type="text"
                                :error-messages="errors[0]"
                                :label="$t('account.address.label')"
                                required
                                outlined
                            />
                        </ValidationProvider>
                        <ValidationProvider
                            v-slot="{ errors }"
                            :name="$t('account.address.fullName')"
                            mode="eager"
                            rules="required"
                        >
                            <DjInput
                                v-model="fullName"
                                :error-messages="errors[0]"
                                :label="$t('account.address.fullName') + '*'"
                                outlined
                            />
                        </ValidationProvider>
                        <ValidationProvider
                            v-slot="{ errors }"
                            mode="eager"
                            :name="$t('account.address.address')"
                            rules="required"
                        >
                            <DjInput
                                v-model="address"
                                :error-messages="errors[0]"
                                :label="$t('account.address.address') + '*'"
                                outlined
                            />
                        </ValidationProvider>
                        <ValidationProvider
                            v-slot="{ errors }"
                            mode="eager"
                            :name="$t('account.address.additionalAddress')"
                        >
                            <DjInput
                                v-model="additionalAddress"
                                :error-messages="errors[0]"
                                :label="$t('account.address.additionalAddress')"
                                outlined
                            />
                        </ValidationProvider>
                        <ValidationProvider
                            v-slot="{ errors }"
                            mode="eager"
                            :name="$t('account.address.country')"
                            rules="required"
                        >
                            <DjInput
                                v-model="country"
                                type="text"
                                :error-messages="errors[0]"
                                :label="$t('account.address.country') + '*'"
                                required
                                outlined
                                disabled
                            />
                        </ValidationProvider>

                        <ValidationProvider
                            v-slot="{ errors }"
                            mode="eager"
                            :name="$t('account.address.zipcode')"
                            rules="required"
                        >
                            <DjInput
                                v-model="zipcode"
                                :error-messages="errors[0]"
                                :label="$t('account.address.zipcode') + '*'"
                                outlined
                            />
                        </ValidationProvider>
                        <ValidationProvider
                            v-slot="{ errors }"
                            mode="eager"
                            :name="$t('account.address.city')"
                            rules="required"
                        >
                            <DjInput
                                v-model="city"
                                :error-messages="errors[0]"
                                :label="$t('account.address.city') + '*'"
                                outlined
                            />
                        </ValidationProvider>
                        <ValidationProvider
                            v-slot="{ errors }"
                            mode="eager"
                            :name="$t('account.address.state')"
                            rules="required"
                        >
                            <DjInput
                                v-model="state"
                                :error-messages="errors[0]"
                                :label="$t('account.address.state') + '*'"
                                outlined
                            />
                        </ValidationProvider>
                        <ValidationProvider
                            v-slot="{ errors }"
                            mode="eager"
                            :name="$t('account.address.phone')"
                            rules="required"
                        >
                            <DjInput
                                v-model="phone"
                                :error-messages="errors[0]"
                                :label="$t('account.address.phone') + '*'"
                                outlined
                            />
                        </ValidationProvider>
                        <div class="checkbox">
                            <ValidationProvider
                                v-slot="{ errors }"
                                mode="eager"
                                :name="$t('account.address.billing')"
                                rules="confirmTrue:@shipping"
                            >
                                <v-checkbox
                                    v-model="billing"
                                    :label="$t('account.address.billing')"
                                    :error-messages="errors[0]"
                                >
                                </v-checkbox>
                            </ValidationProvider>
                            <ValidationProvider
                                v-slot="{ errors }"
                                mode="eager"
                                :name="$t('account.address.shipping')"
                                rules="confirmTrue:@billing"
                            >
                                <v-checkbox
                                    v-model="shipping"
                                    :label="$t('account.address.shipping')"
                                    :error-messages="errors[0]"
                                >
                                </v-checkbox>
                            </ValidationProvider>
                        </div>
                        <div class="bottom">
                            <div class="b1" @click.prevent="createAddressPage = false">
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
                            <div class="b2" @click.prevent="createAddresses()">
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
                    </v-form>
                </ValidationObserver>
            </DjCard>
        </DjModal>
    </DjCard>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import AddressLine from '@components/templates/account/organisation/modules/addressLine.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjModal from '@components/molecules/DjModal/DjModal.vue';
import DjInput from '@components/atoms/DjInput/DjInput.vue';
import DjCard from '@components/molecules/DjCard/DjCard.vue';

export default {
    name: 'AddressBlock',
    components: {
        ValidationObserver,
        ValidationProvider,
        AddressLine,
        DjButton,
        DjModal,
        DjInput,
        DjCard,
    },
    props: {
        addressOrga: {
            type: Array,
            default: () => [],
        },
        organisationName: {
            type: String,
            default: '',
        },
        currentOrga: {
            type: String,
            default: '0',
        },
    },
    data() {
        return {
            valid: true,
            country: 'France',
            zipcode: '',
            label: '',
            fullName: '',
            address: '',
            state: '',
            additionalAddress: '',
            city: '',
            phone: '',
            shipping: '',
            billing: '',
            createAddressPage: false,
        };
    },
    methods: {
        createAddresses() {
            this.$refs.addressvalid
                .validate()
                .then((success) => {
                    if (success) {
                        const request = {
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
                        this.$core.useUser
                            .createAddress(request)
                            .then(() => {
                                this.zipcode = '';
                                this.label = '';
                                this.fullName = '';
                                this.address = '';
                                this.state = '';
                                this.additionalAddress = '';
                                this.city = '';
                                this.phone = '';
                                this.shipping = '';
                                this.billing = '';
                                this.createAddressPage = false;
                                this.$nuxt.$emit('updateAddressOrga', true);
                            })
                            .catch(() => {
                                this.$toast.error(this.$t('notification.user.errorUpdate'));
                            });
                    } else {
                        this.$toast.error(this.$t('notification.user.vide'));
                    }
                })
                .catch(() => {});
        },
        createAddress() {
            if (this.$refs.addressvalid) this.$refs.addressvalid.reset();
            this.createAddressPage = true;
        },
    },
};
</script>

<style lang="scss" scoped>
.titre {
    color: black;
    text-transform: uppercase;
    font-size: 25px;
    padding-top: 7px;
}
.buttoncreate {
    margin-left: 10px;
    display: flex;
    margin-top: 14px;
    align-items: center;
}
small.address {
    margin-top: 6px;
    font-size: 15px;
}

i.icon-plus-circle {
    font-size: 24px;
    margin-right: 5px;
}

.djCardTitle {
    text-align: center;
}

.djLinkWidth {
    width: 630px;
}

i.icon-user {
    margin-top: 7px;
    margin-left: 10px;
    margin-right: 10px;
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
