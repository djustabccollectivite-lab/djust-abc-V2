<template>
    <DjCard
        headerColor="#ffffff"
        class="dj-address--card"
        :class="billingAddressSelected === address.id && select ? 'dj-address--card-active' : null"
        noPadding="true"
        :withActions="true"
        :key="increment"
    >
        <div class="headerAdress">
            <div class="title__h3 addressName">
                {{ address.label ? address.label : address.fullName }}
            </div>
            <div v-if="select" class="mb-3">
                <div v-if="billingAddressSelected !== address.id" @click="onClickButton()">
                    <DjButton
                        :text="$t('checkout.billing.selectButton')"
                        styleButton="primary"
                        :fullWidth="true"
                        size="small"
                    />
                </div>
                <div v-else>
                    <DjButton :text="$t('checkout.billing.selectButtonOk')" styleButton="primary" :fullWidth="true" />
                </div>
            </div>
        </div>

        <div class="dj-address--card-content">
            <div class="dj-address-items">
                <dl class="items-list">
                    <div class="item">
                        <dt class="item-props">{{ $t('account.address.fullName') }}</dt>
                        <dd class="item-value">{{ address.fullName }}</dd>
                    </div>
                    <div class="item">
                        <dt class="item-props">{{ $t('account.address.address') }}</dt>
                        <dd class="item-value">{{ address.address }}</dd>
                    </div>
                    <div class="item">
                        <dt class="item-props">{{ $t('account.address.city') }}</dt>
                        <dd class="item-value">{{ address.zipcode }} {{ address.city }}</dd>
                    </div>
                    <div class="item">
                        <dt class="item-props">{{ $t('account.address.country') }}</dt>
                        <dd class="item-value">{{ address.country }}</dd>
                    </div>
                </dl>
            </div>
        </div>

        <template #actions>
            <div class="addressActions">
                <div @click.prevent="editModal()" class="mr-3">
                    <DjButton
                        :text="$t('account.address.modify')"
                        :iconDisplayed="false"
                        styleButton="secondary"
                        :shape="'button'"
                        icon="icon-loupe-zoom-in"
                        :size="'small'"
                    />
                </div>

                <DjModal :key="increment" v-model="edit" max-width="900px">
                    <DjCard :withActions="true" headerColor="var(--color-secondary)">
                        <template #title>
                            <div class="dj-address-modal-header">
                                <div class="title__h4">{{ $t('account.address.editAddress') }}</div>
                                <div class="text-left">
                                    <div @click.prevent="editModal()">
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
                            <v-form class="dj-form--edit-address" v-model="valid" lazy-validation>
                                <div class="dj-form__content">
                                    <v-row>
                                        <v-col cols="12">
                                            <div class="form-group">
                                                <span v-if="error">{{ error }}</span>
                                            </div>
                                        </v-col>
                                        <v-col cols="12">
                                            <ValidationProvider
                                                mode="eager"
                                                v-slot="{ errors }"
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
                                                mode="eager"
                                                v-slot="{ errors }"
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
                                                mode="eager"
                                                v-slot="{ errors }"
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
                                                mode="eager"
                                                v-slot="{ errors }"
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
                                                mode="eager"
                                                v-slot="{ errors }"
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
                                                mode="eager"
                                                v-slot="{ errors }"
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
                                                mode="eager"
                                                v-slot="{ errors }"
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
                                                mode="eager"
                                                v-slot="{ errors }"
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
                                                mode="eager"
                                                v-slot="{ errors }"
                                                :name="$t('account.address.phone')"
                                                :rules="{ required: true, numeric: true }"
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
                        <div class="bottom">
                            <div @click.prevent="edit = false" class="b1">
                                <DjButton
                                    :text="$t('cart.close')"
                                    :iconDisplayed="true"
                                    styleButton="primary"
                                    :shape="'button'"
                                    icon="icon-cross-circle"
                                    :size="'standard'"
                                    :fullWidth="true"
                                />
                            </div>
                            <div @click.prevent="editAddresse(address.id)" class="b2">
                                <DjButton
                                    :text="$t('account.address.save')"
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

                <div @click.prevent="supp = true" v-if="!select">
                    <DjButton
                        :text="$t('account.address.delete')"
                        :iconDisplayed="false"
                        styleButton="secondary"
                        :shape="'button'"
                        icon="icon-trash2"
                        :size="'small'"
                    />
                </div>
            </div>
        </template>

        <DjModal v-model="supp" max-width="600">
            <DjCard :title="$t('account.address.deleteAddress')" :withActions="true">
                <div class="title__h5">{{ $t('account.address.deleteConfirm') }}</div>

                <template #actions>
                    <DjSpacer></DjSpacer>
                    <div @click.prevent="deleteTitle(address.id)" class="p-10">
                        <DjButton
                            :text="$t('account.organisation.yesButton')"
                            :iconDisplayed="true"
                            styleButton="primary"
                            :shape="'button'"
                            icon="icon-check-square"
                            :size="'small'"
                        />
                    </div>

                    <div @click.prevent="supp = false">
                        <DjButton
                            :text="$t('account.organisation.noButton')"
                            :iconDisplayed="true"
                            styleButton="primary"
                            :shape="'button'"
                            icon="icon-cross-square"
                            :size="'small'"
                        />
                    </div>
                </template>
            </DjCard>
        </DjModal>
    </DjCard>
</template>

<script>
import { mapState } from 'vuex';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjLink from '@components/atoms/DjLink/DjLink.vue';
import DjSpacer from '@components/atoms/DjSpacer/DjSpacer.vue';
import DjModal from '@components/molecules/DjModal/DjModal.vue';
import DjCard from '@components/molecules/DjCard/DjCard.vue';
import DjInput from '@components/atoms/DjInput/DjInput.vue';
import DjCheckbox from '@components/atoms/DjCheckbox/DjCheckbox.vue';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
    name: 'AddressCard',
    components: {
        DjCheckbox,
        DjInput,
        DjButton,
        DjLink,
        DjModal,
        DjCard,
        DjSpacer,
        ValidationObserver,
        ValidationProvider,
    },
    props: {
        address: {
            type: Object,
            default: {},
        },
        active: {
            type: Boolean,
            default: false,
        },
        select: {
            type: Boolean,
            default: true,
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
            supp: false,
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
        onClickButton() {
            this.dialog = false;
            this.$store.commit('cart/setBillingAddressId', this.address.id);
        },
        async deleteTitle(id) {
            let checkDeleted = await this.$core.useUser.deleteAddress(id);
            if (checkDeleted) {
                this.$emit('refresh', 'refresh');

                this.supp = false;
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
        async editAddresse(id) {
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
                    const X = await this.$core.useUser.editAddress(data, id);
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
.dj-btn--address {
    padding: 0.3rem 1rem !important;
    font-size: 11px;
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
.addressName {
    font-family: var(--font-1st);
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: #4d4d4f;
}
.dj-address--card-content {
    overflow: hidden;
    .dj-address-items {
        padding-top: 1.25rem;
        padding-bottom: 1.25rem;
        @media (min-width: 640px) {
            padding: 0;
        }
        .items-list {
            .item {
                padding-bottom: 1rem;

                @media (min-width: 640px) {
                    display: grid;
                    padding-top: 1rem;
                    padding-bottom: 1rem;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    gap: 1rem;
                }
                .item-props {
                    font-family: var(--font-1st);
                    font-style: normal;
                    font-weight: 100;
                    font-size: 16px;
                    line-height: 19px;
                    color: #000000;
                }
                .item-value {
                    margin-top: 0.25rem;
                    font-family: var(--font-1st);
                    font-style: normal;
                    font-weight: 500;
                    font-size: 16px;
                    line-height: 19px;
                    color: #000000;

                    @media (min-width: 640px) {
                        margin-top: 0;
                        grid-column: span 2 / span 2;
                    }
                }
            }
        }
    }
}
.headerAdress {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.addressActions {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
