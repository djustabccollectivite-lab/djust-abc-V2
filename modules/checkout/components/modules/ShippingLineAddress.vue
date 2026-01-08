<template>
    <div v-if="shippingAddress" class="dj-shippingline">
        <div class="qte">
            <dj-quantity
                v-if="line"
                :key="key_"
                :quantityIncrement="qtePerPack"
                :displayTitle="false"
                :showIncrement="true"
                :quantityValue="quantity"
                :lazy="true"
                class="quantity_to_cart"
                :isDisabled="load"
                @child-quantity="quantityValue"
            />
        </div>

        <div class="address">
            <v-select
                v-model="ShippingAdressSelected"
                :items="items"
                outlined
                dense
                item-text="fullName"
                :label="$t('checkout.shipping.address')"
                return-object
                hide-details
                :disabled="load"
            />
        </div>

        <div class="shippingType">
            <v-select
                v-show="deliveryModes_.length > 0"
                v-model="selectedShippingType"
                :items="deliveryModes_"
                outlined
                dense
                item-text="libelle"
                :label="$t('checkout.shipping.shipping')"
                return-object
                hide-details
                :disabled="load"
            />
        </div>

        <div v-if="showDeleteLine" class="removeButton">
            <a href="#" @click.prevent="handleRemoveDeliveryAddress">
                <DjIcon class="iconDelete" color="#FFFFFF"> icon-cross</DjIcon>
            </a>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import DjQuantity from '@components/atoms/DjQuantity/DjQuantity.vue';
import DjIcon from '@components/atoms/DjIcon/DjIcon.vue';
export default {
    name: 'ShippingLineAddress',
    components: {
        DjQuantity,
        DjIcon,
    },
    props: {
        line: {
            type: Object,
            require: true,
            default: () => {},
        },
        id: {
            type: String,
            require: true,
            default: '',
        },
        showlabel: {
            type: Boolean,
        },
        showDeleteLine: {
            type: Boolean,
        },
        // eslint-disable-next-line vue/prop-name-casing
        key_: {
            type: Number,
            require: true,
            default: 0,
        },
        qtePerPack: {
            type: Number,
            require: true,
            default: 1,
        },
        cartItem: {
            type: Object,
            require: true,
            default: () => {},
        },
    },
    data() {
        return {
            show: this.showlabel,
            load: this.$store.state.cart.load,
        };
    },
    computed: {
        ...mapState({
            shippingAddress: (state) => state.user.addressShippingList,
        }),
        ShippingAdressSelected: {
            get() {
                return this.line.addressId
                    ? this.shippingAddress.find((address) => address.id === this.line.addressId)
                    : null;
            },
            set(value) {
                this.$store.commit('cart/setCartLineAddress', {
                    addressId: value.id,
                    deliveryLineId: this.line.id,
                    basketLineId: this.id,
                });
                this.$emit('update', true);
            },
        },
        items() {
            return this.shippingAddress ? this.shippingAddress : [];
        },
        deliveryModes_() {
            const deliveryModess = this.line.shippingTypes ? [...this.line.shippingTypes] : null;
            deliveryModess?.forEach((shippingType) => (shippingType.libelle = shippingType.label));
            return deliveryModess?.length > 0 ? deliveryModess : [];
        },
        selectedShippingType: {
            get() {
                return this.line.selectedShippingType
                    ? this.line.shippingTypes !== null &&
                          this.line.shippingTypes.find(
                              (shippingType) => shippingType.code === this.line.selectedShippingType,
                          )
                    : null;
            },
            set(value) {
                this.$store.commit('cart/setCartLineShippingType', {
                    deliveryLineId: this.line.id,
                    basketLineId: this.id,
                    selectedShippingType: value.code,
                });
                this.$emit('update', true);
            },
        },
        quantity: {
            get() {
                return this.line ? this.line.quantity : this.qtePerPack;
            },
            set(value) {
                const cartItemsLocal = [...this.cartItem.deliveryLines];
                const cartItemsLocalWithoutThisLine = cartItemsLocal.filter((item) => item.id !== this.line.id);
                const quantity = cartItemsLocalWithoutThisLine.reduce(function (prev, cur) {
                    return prev + cur.quantity;
                }, 0);

                const checkStockControlIsOk = this.$config.checkStock
                    ? !(
                          value > this.cartItem.offerInventory.stock ||
                          Number(quantity) + Number(value) > this.cartItem.offerInventory.stock
                      )
                    : true;
                if (this.ShippingAdressSelected) {
                    if (checkStockControlIsOk) {
                        this.$store.commit('cart/setCartLineQuantity', {
                            quantity: Number(value),
                            deliveryLineId: this.line.id,
                            basketLineId: this.id,
                        });
                        this.$emit('update', true);
                    } else {
                        this.$store.commit('cart/setCartLineQuantity', {
                            quantity: Number(value),
                            deliveryLineId: this.line.id,
                            basketLineId: this.id,
                        });
                        this.$toast.error(this.$t('notification.product.stockError'));
                    }
                } else {
                    this.$toast.error(this.$t('notification.product.addressError'));
                }
            },
        },
    },
    created() {
        if (this.load === true) {
            setTimeout(
                function () {
                    this.load = this.$store.state.cart.load;
                }.bind(this),
                600,
            );
        }
    },
    methods: {
        quantityValue(params) {
            this.quantity = params;
        },
        handleRemoveDeliveryAddress() {
            this.$emit('deleteAddressLine', this.line.id);
        },
    },
};
</script>

<style lang="scss" scoped>
.dj-shippingline {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 20px;

    @media (max-width: 480px) {
        display: flex;
        flex-direction: column;
    }

    @media screen and (min-width: 480px) {
        flex-direction: row;
    }

    .qte {
        margin-bottom: 10px;
        margin-right: 10px;
        display: flex;
        justify-content: center;

        @media screen and (min-width: 480px) {
            margin-bottom: 0px;
        }
    }

    .address {
        width: 100%;
        margin-left: 0px;
        margin-bottom: 0px;
        display: flex;
        justify-content: center;

        @media screen and (min-width: 480px) {
            margin-bottom: 0px;
            margin-left: 10px;
        }
    }

    .shippingType {
        width: 100%;
        margin-left: 0px;
        margin-bottom: 0px;
        display: flex;
        justify-content: center;

        @media screen and (min-width: 480px) {
            margin-bottom: 10px;
            margin-left: 10px;
        }
    }
}

.iconDelete {
    font-size: 15px !important;
    padding: 2px;
    font-weight: bold;
    background-color: var(--color-secondary);
    border-radius: 50%;
}

.removeButton {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
}
</style>
