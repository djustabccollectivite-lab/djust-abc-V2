<template lang="html">
    <div id="address" class="address-cadre">
        <div class="address-line">
            <i class="icon-map-marker"></i>
            <div class="address-right">
                {{ address.fullName + ' ' + address.country }}
            </div>
        </div>
        <div class="icon">
            <div v-if="currentOrga !== '0'" class="pencil" @click.prevent="editAddress()">
                <DjButton
                    :iconDisplayed="true"
                    styleButton="light"
                    :shape="'icon'"
                    :size="'standard'"
                    icon="icon-pencil"
                    :textDisplayed="false"
                    :fullWidth="true"
                >
                </DjButton>
            </div>
            <div v-if="currentOrga !== '0'" class="trash" @click.prevent="trash()">
                <DjButton
                    :iconDisplayed="true"
                    styleButton="light"
                    :shape="'icon'"
                    :size="'standard'"
                    icon="icon-trash2"
                    :textDisplayed="false"
                    :fullWidth="true"
                >
                </DjButton>
            </div>
        </div>
        <DjModal v-model="editAddressPage" width="700" class="modale__buying">
            <DjCard
                headerColor="var(--color-secondary)"
                :title="$t('account.organisation.createAddress')"
                class="djCardTitle"
            >
                <ValidationObserver v-slot="{ invalid }" ref="addressvalid">
                    <v-form v-model="valid" lazy-validation>
                        <ValidationProvider
                            mode="eager"
                            v-slot="{ errors }"
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
                            />
                        </ValidationProvider>
                        <ValidationProvider
                            mode="eager"
                            v-slot="{ errors }"
                            :name="$t('account.address.label')"
                            rules="required"
                        >
                            <DjInput
                                v-model="label"
                                type="text"
                                :error-messages="errors[0]"
                                :label="$t('account.address.label') + '*'"
                                required
                                outlined
                            />
                        </ValidationProvider>
                        <ValidationProvider
                            mode="eager"
                            v-slot="{ errors }"
                            :name="$t('account.address.fullName')"
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
                            mode="eager"
                            v-slot="{ errors }"
                            :name="$t('account.address.address')"
                            rules="required"
                        >
                            <DjInput
                                v-model="showaddress"
                                :error-messages="errors[0]"
                                :label="$t('account.address.address') + '*'"
                                outlined
                            />
                        </ValidationProvider>
                        <ValidationProvider
                            mode="eager"
                            v-slot="{ errors }"
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
                            mode="eager"
                            v-slot="{ errors }"
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
                            mode="eager"
                            v-slot="{ errors }"
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
                            mode="eager"
                            v-slot="{ errors }"
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
                            mode="eager"
                            v-slot="{ errors }"
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
                                mode="eager"
                                v-slot="{ errors }"
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
                                mode="eager"
                                v-slot="{ errors }"
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
                        <div @click.prevent="editAddressData()">
                            <DjButton
                                :text="$t('account.organisation.edit')"
                                :iconDisplayed="false"
                                styleButton="primary"
                                :shape="'button'"
                                :size="'standard'"
                                :textDisplayed="true"
                                :fullWidth="true"
                            >
                            </DjButton>
                        </div>
                    </v-form>
                </ValidationObserver>
            </DjCard>
        </DjModal>
    </div>
</template>

<script>
import { computed, defineComponent, ref, useContext } from '@nuxtjs/composition-api';
import DjLink from '@components/atoms/DjLink/DjLink';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjModal from '@components/molecules/DjModal/DjModal.vue';
import DjInput from '@components/atoms/DjInput/DjInput.vue';
import DjCard from '@components/molecules/DjCard/DjCard.vue';

export default {
    name: 'AddressLine',
    components: { ref, DjLink, ValidationObserver, ValidationProvider, DjModal, DjInput, DjButton, DjCard },
    props: {
        address: {
            type: Object,
            default: {},
        },
        id: {
            type: Number,
            default: {},
        },
        currentOrga: {
            type: String,
            default: '0',
        },
    },
    data() {
        return {
            editAddressPage: false,
            valid: true,
            country: '',
            zipcode: '',
            label: '',
            fullName: '',
            state: '',
            additionalAddress: '',
            city: '',
            phone: '',
            shipping: '',
            billing: '',
            showaddress: '',
            idAddress: '',
        };
    },
    methods: {
        editAddress() {
            this.idAddress = this.address.id;
            this.country = this.address.country;
            this.zipcode = this.address.zipcode;
            this.label = this.address.label;
            this.fullName = this.address.fullName;
            this.showaddress = this.address.address;
            this.state = this.address.state;
            this.additionalAddress = this.address.additionalAddress;
            this.city = this.address.city;
            this.phone = this.address.phone;
            this.shipping = this.address.shipping;
            this.billing = this.address.billing;
            this.editAddressPage = true;
        },
        async editAddressData() {
            this.$refs.addressvalid.validate().then(async (success) => {
                if (!success) {
                    this.$toast.error(this.$t('notification.user.vide'));

                    // this.$notify({
                    //     group: 'error',
                    //     title: 'Error!',
                    //     text: this.$t('notification.user.vide')
                    // });
                    return;
                } else {
                    const request = {
                        additionalAddress: this.additionalAddress,
                        address: this.showaddress,
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
                    await this.$core.useUser.editAddress(request, this.idAddress);
                    this.editAddressPage = false;
                    $nuxt.$emit('updateAddressOrga', true);
                }
            });
        },
        async trash() {
        },
    },
};
</script>

<style lang="scss" scoped>
.address-cadre {
    width: 100%;
    height: 50px;
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    border: 0.3px solid #4d4d4f63;
    border-radius: 5px;
    align-items: center;
}

.djCardTitle {
    text-align: center;
}

.address-line {
    display: flex;
    justify-content: center;
    align-items: center;
}

small.address {
    display: flex;
    align-items: center;
    font-size: 15px;
}

.djLinkWidth {
    width: 630px;
}

.icon {
    display: flex;
}

.trash {
    //margin-top: 3px;
    margin-right: 10px;
}

.address-right {
    margin-left: 10px;
    align-items: center;
    display: flex;
    width: auto;
    font-family: var(--font-1st);
    font-style: normal;
    font-weight: 100;
    font-size: 16px;
    line-height: 19px;
}

.pencil {
    display: flex;
    justify-content: flex-end;
    margin-right: 12px;
    align-items: center;
}

i.icon-map-marker {
    display: flex;
    align-items: center;
    margin-left: 10px;
    margin-right: 10px;
}
</style>
