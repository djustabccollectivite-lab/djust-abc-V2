<template>
  <DjCard headerColor="#FFFFFF">
    <template #title>
      <div class="title__h4 title-shipping-line">
        <div>
          <DjIcon style="font-size: 20px; font-weight: bold">icon-cube</DjIcon>
          {{ $core.getCart.getSupplierName(cartItem) }}
        </div>

        <div @click.prevent="handleRemoveProductFromCart">
          <DjButton style="font-size: 20px; font-weight: bold" :textDisplayed="false" :iconDisplayed="true"
            styleButton="secondary" shape="icon" icon="icon-cross-circle" size="small" />
        </div>
      </div>
    </template>

    <div class="dj-shipping-line-content" v-if="shippingAddress">
      <ProductCart :productId="$core.getCart.getProductId(cartItem)" :productSku="$core.getCart.getProductSku(cartItem)"
        :productImage="$core.getCart.getProductImage(cartItem)" :productName="$core.getCart.getProductName(cartItem)"
        :productBrand="$core.getCart.getProductBrand(cartItem)" :supplierName="$core.getCart.getSupplierName(cartItem)"
        :qte="$core.getCart.getQuantity(cartItem)" :offerQuantityInStock="$core.getCart.getOfferStock(cartItem)"
        :attributs="$core.getCart.getProductAttributes(cartItem)"
      />

      <div class="dj-shipping-line-address-list" id="shipping-line">
        <table class="dj-shipping-table" v-if="checkStock" aria-describedby="shipping-line">
          <thead class="headclass">
            <tr>
              <th scope="col" class="thPrice pl-40">{{ $t('checkout.shipping.priceHT') }}</th>

              <th scope="col" class="thShippingType">{{ $t('checkout.shipping.shippingDetail') }}</th>

              <th scope="col" class="thShippingType">&nbsp;</th>

              <th scope="col" class="thShippingType">&nbsp;</th>
            </tr>
          </thead>

          <tbody>
            <tr class="trShippingLine">
              <td class="tdPrice">
                <span class="priceht" v-html="productPriceTotal" />
              </td>

              <td class="tdAddress">
                <div v-if="cartItem.deliveryLines.length > 0">
                  <ShippingLineAddress
                    v-for="(deliveryLine, n) in cartItem.deliveryLines" :key="increment + n + 1000"
                    :key_="increment + n + 1000" :id="cartItem.id" :line="deliveryLine"
                    :shippingAdressSelected="deliveryLine.addressId" :shippingAddress="shippingAddress"
                    :qtePerPack="$core.getCart.getProductPerPack(cartItem)" :showlabel="false"
                    :showDeleteLine="showDeleteLine" :cartItem="cartItem" @update="update"
                    @deleteAddressLine="deleteAdressLine" />
                </div>
              </td>

              <td class="tdSplitButton">
                <div class="split-button">
                  <div @click="addLine">
                    <DjButton :textDisplayed="false" :iconDisplayed="true" styleButton="light" shape="icon"
                      icon="icon-plus" size="x-small" />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-else>
          <span>{{ $t('product.tabs.offers.outofstock') }}</span>
        </div>
      </div>
    </div>
  </DjCard>
</template>

<script>
import { mapState } from 'vuex';
import ShippingLineAddress from '@modules/checkout/components/modules/ShippingLineAddress.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import ProductCart from '@components/organisms/productCard/ProductCart.vue';
import DjCard from '@components/molecules/DjCard/DjCard.vue';
import DjIcon from '@components/atoms/DjIcon/DjIcon.vue';

export default {
  components: { ProductCart, ShippingLineAddress, DjButton, DjCard, DjIcon },
  props: {
    cartItem: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      quantity: this.cartItem.quantity,
      nbLines: 0,
      increment: 3,
    };
  },
  computed: {
    ...mapState({
      currency: (state) => state.app.currency,
    }),
    select: {
      get() {
        return this.shippingAddress ? this.shippingAddress[0] : {};
      },
      set(value) {
        return value;
      },
    },
    shippingAddress() {
      return this.$store.state.user.addressShippingList;
    },
    showDeleteLine() {
      return this.cartItem.deliveryLines.length > 1 ? true : false;
    },
    productPriceTotal() {
      return this.$core.getCart.getProductTotalPrice(this.cartItem, this.currency);
    },
    checkStock() {
      return this.$core.getCart.getOfferStock(this.cartItem) > 0 ? true : false;
    },
  },
  methods: {
    addLine() {
      this.addNewDeliveryLine(this.cartItem);
    },
    async update() {
      this.$store.commit('cart/setLoading', true);
      const data = {
        quantity: this.cartItem.deliveryLines.reduce(function (prev, cur) {
          return prev + cur.quantity;
        }, 0),
        offerPriceId: this.cartItem.offerPrice.id,
        deliveryLines: this.cartItem.deliveryLines,
      };
      await this.$core.useCart.updateCartLines([data]);
      this.$store.commit('cart/setLoading', false);
      this.increment += 1;
    },
    handleRemoveProductFromCart() {
      this.$core.useCart.removeProductFromCart(this.cartItem)
        .then(() => {
          this.$toast.success(
            this.$core.getCart.getProductName(this.cartItem) + this.$t('checkout.shipping.alertDeleteItem')
          );
        })
        .catch((error) => {
          console.error(error);
        });
    },
    initFirstDelivery(cartItem) {
      if (cartItem.deliveryLines.length === 0) {
        const Line = {
          quantity: cartItem.quantity,
          addressId: null,
          id: Math.random(),
        };
        this.$store.commit('cart/addDeliveryLine', { line: Line, id: this.cartItem.id });
      }
    },
    addNewDeliveryLine() {
      const Line = {
        quantity: this.$core.getCart.getProductPerPack(this.cartItem),
        addressId: null,
        id: Math.random(),
      };
      this.$store.commit('cart/addDeliveryLine', { line: Line, id: this.cartItem.id });
    },
    deleteAdressLine(value) {
      this.$store.commit('cart/deleteDeliveryLine', { AddressLineId: value, id: this.cartItem.id });
      this.update();
    },
  },
  mounted() {
    this.initFirstDelivery(this.cartItem);
  },
  watch: {
    increment: {
      handler() {
        const data = {
          quantity: this.cartItem.deliveryLines.reduce(function (prev, cur) {
            return prev + cur.quantity;
          }, 0),
          offerPriceId: this.cartItem.offerPrice.id,
          deliveryLines: this.cartItem.deliveryLines,
        };
        this.$core.useCart.updateCartLines([data]);
      },
      deep: true,
    },
    cartItem: {
      handler() {
        if (this.cartItem.deliveryLines.length === 0) this.initFirstDelivery(this.cartItem);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.title-shipping-line {
  justify-content: space-between;
  align-items: center;
  display: flex;
  padding-left: 30px;
  padding-top: 10px;
  font-family: var(--font-1st);
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  margin-bottom: 0;
  color: #4d4d4f;
}

.dj-shipping-line-address-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}

.split-button {
  display: flex;
  justify-content: flex-end;
}

.dj-shipping-table {
  table-layout: fixed;

  min-width: 100%;
  border-top-width: 1px;
  border-color: #d1d5db;

  thead {
    border-bottom: 1px solid;
    border-color: #e5e7eb;
  }

  .thPrice {
    padding-top: 0.875rem;
    padding-bottom: 0.875rem;
    padding-right: 0.75rem;
    font-family: var(--font-1st);
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #4d4d4f;
    text-align: left;
    width: 15%;
  }

  .thQte {
    display: none;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    padding-top: 0.875rem;
    padding-bottom: 0.875rem;
    font-family: var(--font-1st);
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #4d4d4f;
    text-align: center;

    @media (min-width: 640px) {
      display: table-cell;
    }
  }

  .thAddress {
    display: none;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    padding-top: 0.875rem;
    padding-bottom: 0.875rem;
    font-family: var(--font-1st);
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #4d4d4f;
    text-align: left;

    @media (min-width: 640px) {
      display: table-cell;
    }
  }

  .thShippingType {
    padding-top: 0.875rem;
    padding-bottom: 0.875rem;
    padding-left: 0.75rem;
    padding-right: 1rem;
    font-family: var(--font-1st);
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #4d4d4f;
    text-align: center;

    @media (min-width: 640px) {
      padding-right: 1.5rem;
    }

    @media (min-width: 768px) {
      padding-right: 0;
    }
  }

  .trShippingLine {
    .tdPrice {
      padding-top: 1rem;
      padding-bottom: 1rem;
      padding-right: 0.75rem;
      padding-left: 1rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
      display: flex;
      margin-top: 10px;
      justify-content: center;

      @media (min-width: 640px) {
        padding-left: 1.5rem;
      }

      @media (min-width: 768px) {
        padding-left: 0;
      }
    }

    .tdQte {
      padding-left: 0.75rem;
      padding-right: 0.75rem;
      padding-top: 1rem;
      padding-bottom: 1rem;
      color: #6b7280;
      font-size: 0.875rem;
      line-height: 1.25rem;
      text-align: right;

      @media (min-width: 640px) {
        display: table-cell;
      }
    }

    .tdAddress {
      padding-left: 0.75rem;
      padding-right: 0.75rem;
      padding-top: 1rem;
      padding-bottom: 1rem;
      color: #6b7280;
      font-size: 0.875rem;
      line-height: 1.25rem;
      text-align: right;

      @media (min-width: 640px) {
        display: table-cell;
      }
    }

    .tdShippingType {
      padding-left: 0.75rem;
      padding-right: 0.75rem;
      padding-top: 1rem;
      padding-bottom: 1rem;
      color: #6b7280;
      font-size: 0.875rem;
      line-height: 1.25rem;
      text-align: center;
      min-width: 50%;

      @media (min-width: 640px) {
        display: table-cell;
      }
    }

    .tdSplitButton {
      padding-top: 1rem;
      padding-bottom: 1rem;
      padding-left: 0.75rem;
      padding-right: 1rem;
      color: #6b7280;
      font-size: 0.875rem;
      line-height: 1.25rem;
      text-align: right;

      @media (min-width: 640px) {
        padding-right: 1.5rem;
      }

      @media (min-width: 768px) {
        padding-right: 0;
      }
    }
  }
}

.priceht {
  font-family: var(--font-2nd) !important;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
}

.headclass {
  @media (max-width: 480px) {
    display: none;
  }
}
</style>
