<template>
    <div class="shadow p-4 rounded">
        <div>
            <div class="text-black font-700 size-18 mb-4">
                {{ address.label ? address.label : address.fullName }}
            </div>
            <div v-if="select !== null" class="mb-3">
                <div
                    v-if="select === 'billing' && billingAddressSelected !== address.id"
                    @click="handleSelectBillingAddress()"
                >
                    <DjButton
                        :text="$t('checkout.billing.selectButton')"
                        shape="button"
                        variant="outlined"
                        :fullWidth="true"
                        size="small"
                    />
                </div>
                <div
                    v-else-if="select === 'shipping' && shippingAddressSelected !== address.id"
                    @click="handleSelectShippingAddress()"
                >
                    <DjButton
                        :text="$t('checkout.billing.selectButton')"
                        shape="button"
                        variant="outlined"
                        :fullWidth="true"
                        size="small"
                    />
                </div>
                <div v-else>
                    <DjButton :text="$t('checkout.billing.selectButtonOk')" variant="contained" :fullWidth="true" />
                </div>
            </div>
        </div>
        <div>
            <div class="d-flex mb-6">
                <div class="address-attribute">{{ $t('account.address.fullName') }}</div>
                <div class="font-500">{{ address.fullName }}</div>
            </div>
            <div class="d-flex mb-6">
                <div class="address-attribute">{{ $t('account.address.address') }}</div>
                <div class="font-500">{{ address.address }}</div>
            </div>
            <div class="d-flex mb-6">
                <div class="address-attribute">{{ $t('account.address.city') }}</div>
                <div class="font-500">{{ address.zipcode }} {{ address.city }}</div>
            </div>
            <div class="d-flex mb-2">
                <div class="address-attribute">{{ $t('account.address.country') }}</div>
                <div class="font-500">{{ address.country }}</div>
            </div>
        </div>
        <div class="d-flex justify-content-end align-items-center">
            <div class="mr-3" @click.prevent="editModal()">
                <DjButton
                    :text="$t('account.address.modify')"
                    shape="button"
                    variant="outlined"
                    :iconDisplayed="false"
                    class="dj-address--card-action"
                />
            </div>
            <div v-if="!select" @click.prevent="deleteModal = true">
                <DjButton
                    :text="$t('account.address.delete')"
                    :shape="'button'"
                    variant="outlined"
                    :iconDisplayed="false"
                    class="dj-address--card-action"
                />
            </div>
        </div>
        <DjModal :key="increment" v-model="edit" max-width="900px">
            <div class="bg-white p-5">
                <div class="d-flex justify-space-between align-items-center">
                    <div class="text-black font-700 size-18">{{ $t('account.address.editAddress') }}</div>
                    <div
                        class="d-flex justify-content-center align-items-center close-button"
                        @click.prevent="edit = false"
                    >
                        <SvgIcon name="cross-black" />
                    </div>
                </div>
                <ValidationObserver ref="form">
                    <v-form v-model="valid" class="dj-form--edit-address" lazy-validation>
                        <div class="dj-form__content">
                            <v-row>
                                <v-col cols="12">
                                    <div class="form-group">
                                        <span v-if="error">{{ error }}</span>
                                    </div>
                                </v-col>
                                <v-col cols="12">
                                    <ValidationProvider
                                        v-slot="{ errors }"
                                        mode="eager"
                                        :name="$t('account.address.label')"
                                    >
                                        <DjInput
                                            v-model="label"
                                            type="text"
                                            :error-messages="errors[0]"
                                            height="50"
                                            :label="$t('account.address.label')"
                                            required
                                            outlined
                                        />
                                    </ValidationProvider>
                                </v-col>
                                <v-col cols="12">
                                    <ValidationProvider
                                        v-slot="{ errors }"
                                        mode="eager"
                                        :name="$t('account.address.fullName')"
                                        rules="required"
                                    >
                                        <DjInput
                                            v-model="fullName"
                                            :error-messages="errors[0]"
                                            height="50"
                                            :label="$t('account.address.fullName') + '*'"
                                            outlined
                                        />
                                    </ValidationProvider>
                                </v-col>
                                <v-col cols="12">
                                    <ValidationProvider
                                        v-slot="{ errors }"
                                        mode="eager"
                                        :name="$t('account.address.address')"
                                        rules="required"
                                    >
                                        <DjInput
                                            v-model="addresss"
                                            :error-messages="errors[0]"
                                            height="50"
                                            outlined
                                            :label="$t('account.address.address') + '*'"
                                        >
                                        </DjInput>
                                    </ValidationProvider>
                                </v-col>
                                <v-col cols="12">
                                    <ValidationProvider
                                        v-slot="{ errors }"
                                        mode="eager"
                                        :name="$t('account.address.additionalAddress')"
                                    >
                                        <DjInput
                                            v-model="additionalAddress"
                                            :error-messages="errors[0]"
                                            height="50"
                                            :label="$t('account.address.additionalAddress')"
                                            outlined
                                        />
                                    </ValidationProvider>
                                </v-col>
                                <v-col cols="6">
                                    <ValidationProvider
                                        v-slot="{ errors }"
                                        mode="eager"
                                        :name="$t('account.address.country')"
                                        rules="required"
                                    >
                                        <DjInput
                                            v-model="country"
                                            :error-messages="errors[0]"
                                            height="50"
                                            :label="$t('account.address.country') + '*'"
                                            outlined
                                            disabled
                                        />
                                    </ValidationProvider>
                                </v-col>
                                <v-col cols="6">
                                    <ValidationProvider
                                        v-slot="{ errors }"
                                        mode="eager"
                                        :name="$t('account.address.zipcode')"
                                        rules="required"
                                    >
                                        <DjInput
                                            v-model="zipcode"
                                            :error-messages="errors[0]"
                                            height="50"
                                            :label="$t('account.address.zipcode') + '*'"
                                            outlined
                                        />
                                    </ValidationProvider>
                                </v-col>
                                <v-col cols="6">
                                    <ValidationProvider
                                        v-slot="{ errors }"
                                        mode="eager"
                                        :name="$t('account.address.city')"
                                        rules="required"
                                    >
                                        <DjInput
                                            v-model="city"
                                            :error-messages="errors[0]"
                                            height="50"
                                            :label="$t('account.address.city') + '*'"
                                            outlined
                                        />
                                    </ValidationProvider>
                                </v-col>
                                <v-col cols="6">
                                    <ValidationProvider
                                        v-slot="{ errors }"
                                        mode="eager"
                                        :name="$t('account.address.state')"
                                        rules="required"
                                    >
                                        <DjInput
                                            v-model="state"
                                            :error-messages="errors[0]"
                                            height="50"
                                            :label="$t('account.address.state') + '*'"
                                            outlined
                                        />
                                    </ValidationProvider>
                                </v-col>
                                <v-col cols="12">
                                    <ValidationProvider
                                        v-slot="{ errors }"
                                        mode="eager"
                                        :name="$t('account.address.phone')"
                                        rules="required"
                                    >
                                        <DjInput
                                            v-model="phone"
                                            :error-messages="errors[0]"
                                            height="50"
                                            :label="$t('account.address.phone') + '*'"
                                            outlined
                                        />
                                    </ValidationProvider>
                                </v-col>
                                <v-col cols="12">
                                    <v-label class="text-center">{{ $t('account.address.typeofAddress') }}</v-label>
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
                <div class="d-flex justify-content-end gap-8">
                    <div @click.prevent="edit = false">
                        <DjButton :text="$t('cart.close')" shape="button" variant="outlined" :iconDisplayed="false" />
                    </div>
                    <div @click.prevent="editAddress(address.id)">
                        <DjButton
                            :text="$t('account.address.save')"
                            shape="button"
                            variant="contained"
                            :iconDisplayed="false"
                        />
                    </div>
                </div>
            </div>
        </DjModal>
        <DjModal v-model="deleteModal" max-width="600">
            <div class="bg-white p-4">
                <div class="text-black size-18 font-700">{{ $t('account.address.deleteAddress') }}</div>
                <div class="text-black text-center my-10">{{ $t('account.address.deleteConfirm') }}</div>
                <div class="d-flex justify-content-end gap-8">
                    <div @click.prevent="deleteModal = false">
                        <DjButton
                            :text="$t('account.organisation.noButton')"
                            :shape="'button'"
                            variant="outlined"
                            :iconDisplayed="false"
                        />
                    </div>
                    <div @click.prevent="deleteTitle(address.id)">
                        <DjButton
                            :text="$t('account.organisation.yesButton')"
                            :shape="'button'"
                            variant="contained"
                            :iconDisplayed="false"
                        />
                    </div>
                </div>
            </div>
        </DjModal>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjModal from '@components/molecules/DjModal/DjModal.vue';
import DjInput from '@components/atoms/DjInput/DjInput.vue';
import SvgIcon from '@components/atoms/icons/SvgIcon.vue';

import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
    name: 'AddressCard',
    components: {
        DjInput,
        DjButton,
        DjModal,
        ValidationObserver,
        ValidationProvider,
        SvgIcon,
    },
    props: {
        address: {
            type: Object,
            default: () => {},
        },
        active: {
            type: Boolean,
            default: false,
        },
        select: {
            type: String,
            required: false,
            default: null,
        },
    },
    data() {
        return {
            test: {},
            increment: Math.random(),
            additionalAddress: this.address.additionalAddress ? this.address.additionalAddress : '',
            addresss: this.address.address ? this.address.address : '',
            billing: this.address.billing ? this.address.billing : '',
            city: this.address.city ? this.address.city : '',
            country: this.address.country ? this.address.country : '',
            fullName: this.address.fullName ? this.address.fullName : '',
            label: this.address.label ? this.address.label : '',
            phone: this.address.phone ? this.address.phone : '',
            shipping: this.address.shipping ? this.address.shipping : '',
            state: this.address.state ? this.address.state : '',
            zipcode: this.address.zipcode ? this.address.zipcode : '',
            edit: false,
            deleteModal: false,
            username: null,
            valid: true,
            error: false,
        };
    },
    computed: {
        actived() {
            return this.active;
        },
        ...mapState({
            billingAddressSelected: (state) => state.cart.cartBillingAddressId,
            shippingAddressSelected: (state) => state.cart.cartShippingAddressId,
        }),
    },
    methods: {
        refresh() {
            this.$emit('refresh', 'refresh');
        },
        close(params) {
            this.edit = params;
            this.increment++;
        },
        handleSelectBillingAddress() {
            this.dialog = false;
            this.$store.commit('cart/setBillingAddressId', this.address.id);
        },
        handleSelectShippingAddress() {
            this.dialog = false;
            this.$store.commit('cart/setShippingAddressId', this.address.id);
            this.$emit('addressSelected', this.address);
        },
        async deleteTitle(id) {
            const checkDeleted = await this.$core.useUser.deleteAddress(id);
            if (checkDeleted) {
                this.$emit('refresh', 'refresh');

                this.deleteModal = false;
                this.$toast.success(this.$t('notification.address.delete'));
            } else this.$toast.error(this.$t('account.address.errorDeleteAddress'));
        },
        editModal() {
            this.additionalAddress = this.address.additionalAddress ? this.address.additionalAddress : '';
            this.addresss = this.address.address ? this.address.address : '';
            this.billing = this.address.billing ? this.address.billing : '';
            this.city = this.address.city ? this.address.city : '';
            this.country = this.address.country ? this.address.country : '';
            this.fullName = this.address.fullName ? this.address.fullName : '';
            this.label = this.address.label ? this.address.label : '';
            this.phone = this.address.phone ? this.address.phone : '';
            this.shipping = this.address.shipping ? this.address.shipping : '';
            this.state = this.address.state ? this.address.state : '';
            this.zipcode = this.address.zipcode ? this.address.zipcode : '';
            this.edit = true;
        },
        editAddress(id) {
            this.$refs.form
                .validate()
                .then(async (success) => {
                    if (!success) {
                        return;
                    }
                    const data = {
                        additionalAddress: this.additionalAddress,
                        address: this.addresss,
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
                    await this.$core.useUser.editAddress(data, id);
                    this.$emit('close', false);
                    this.increment++;
                    this.$toast.success(`${this.label}` + this.$t('notification.address.update'));
                    this.$emit('refresh', 'refresh');
                })
                .catch((err) => {
                    this.error = err;
                });
        },
    },
};
</script>

<style lang="scss" scoped>
.address-attribute {
    width: 100px;
}

.dj-address--card {
    width: 100%;
    margin-right: 15px;
    background: #ffffff;
    box-shadow: 0px 2px 4px 1px rgba(105, 105, 105, 0.25);
    border-radius: 20px;
    padding-left: 10px !important;
}
.dj-address--card-active {
    border: 2px solid var(--color-primary);
}
.close-button {
    width: 25px;
    height: 25px;
    border: 1px solid var(--color-black);
    cursor: pointer;
}
</style>
<style lang="scss">
.acodis {
    .dj-address--card-action button {
        color: var(--color-secondary) !important;
        border-color: var(--color-secondary) !important;
    }
}
</style>
