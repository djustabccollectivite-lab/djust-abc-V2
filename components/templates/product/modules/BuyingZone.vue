<template>
  <div>
    <div v-if="offer && offerPrices.length > 0" class="dj-product__price-right row ma-0 d-flex">
      <div v-if="offerQuantityInStock > 0" class="livraison-info pb-3">
        <div class="align-items-center stock-info">
          <i class="icon icon-circle mb-5"
            style="font-size: 8px; border-radius: 999px; background-color: green"></i><span> &nbsp; {{
              $t('product.quantityInStock') }}</span>
        </div>
      </div>

      <div v-else class="livraison-info">
        <span class="stock-info-rupture"><i class="icon icon-cube pr-3" style="font-size: 14px"></i>{{
              $t('product.quantityOutStock') }}</span>
      </div>
      <div v-if="offer" class="col-12 pa-0 offers-section">
        <VRadioGroup dense v-model="offerSelected" v-for="offerPrice in offerPrices" :key="offerPrice.id"
          class="d-flex flex-row mt-0">
          <DjOfferSelector :isSelected="offerSelected == offerPrice.id || offerPrices.length == 1" :offer="offer"
            :offerPrice="offerPrice" :showRadioBtn="offerPrices.length > 1">
          </DjOfferSelector>
        </VRadioGroup>
      </div>

      <div v-else class="col-12 pa-0">
        <span> {{ $t('product.noOffer') }} </span>
      </div>

      <div v-if="offer" class="dj-product__shopping col-12 pa-0">
        <div v-if="offer.offerInventory.minOrderQuantity > 1" class="min-max-order-quantity">
          <span>
            minimum de commande :
          </span>
          <span class="quantity">
            {{ offer.offerInventory.minOrderQuantity }}
          </span>
        </div>
        <div v-if="offer.offerInventory.maxOrderQuantity" class="min-max-order-quantity">
          <span>
            maximum de commande :
          </span>
          <span class="quantity">
            {{ offer.offerInventory.maxOrderQuantity }}
          </span>
        </div>
        <div class="quantity-section">
          <DjQuantity
            :key="quantityKey"
            class="fullWithQteBuyingZone"
            :displayTitle="false"
            :min="offer.offerInventory.minOrderQuantity"
            :quantityIncrement="quantityPerPack"
            :showIncrement="true"
            @child-quantity="quantity = $event"
          />
          <DjButtonAddToCart style="width: 100%; padding-left: 10px" v-if="$core.useShop.IsActive()" :quantity="quantity"
            :offerId="offerSelected" :quantityInStock="stock" :productName="productTitle" :productPicture="productImage"
            :productSupplier="offerVendor" :fullWidth="true" :minOrderQuantity="offer.offerInventory.minOrderQuantity" />
        </div>

        <DjButtonAddToBuyingList v-if="$core.useWishlist.IsActive()" :quantity="quantity" :offerId="offerSelected"
          :productName="productTitle" :fullWidth="true" styleButton="secondary" />
        <DjButtonAddToQuote v-if="$core.useQuote.IsActive()" :quantity="quantity" :productId="productVariantId"
          :productName="productTitle" :fullWidth="true" styleButton="secondary" :supplierId="this.offerVendorId" />
      </div>
    </div>
    <div v-else class="dj-product__price-right row ma-0 d-flex pb-5">
      <span> {{ $t('product.noOffer') }} </span>
    </div>
  </div>
</template>

<script>
//Stay to fix offer Selector
import DjButtonAddToCart from '@components/molecules/DjButtonAddToCart/DjButtonAddToCart.vue';
import DjButtonAddToBuyingList from '@components/molecules/DjButtonAddToBuyingList/DjButtonAddToBuyingList.vue';
import DjButtonAddToQuote from '@components/molecules/DjButtonAddToQuote/DjButtonAddToQuote.vue';
import DjQuantity from '@components/atoms/DjQuantity/DjQuantity.vue';
import DjOfferSelector from '@components/molecules/DjOfferSelector/DjOfferSelector.vue';

export default {
  name: 'BuyingZone',
  components: {
    DjButtonAddToCart,
    DjButtonAddToBuyingList,
    DjButtonAddToQuote,
    DjQuantity,
    DjOfferSelector,
  },
  props: {
    product: {
      type: Object,
      require: true,
      default: () => {},
    },
    offer: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
  computed: {
    locale() {
      return this.$i18n.localeProperties.code.toUpperCase();
    },
    offerVendor() {
      return this.$core.getOffer.getOfferSupplierName(this.offer);
    },
    offerVendorId() {
      return this.$core.getOffer.getOfferSupplierId(this.offer);
    },
    offerQuantityInStock() {
      return this.$core.getOffer.getOfferStock(this.offer);
    },
    offerPrices() {
      return this.$core.getOffer.getOfferPrices(this.offer);
    },
    offerLeadTimeToShip() {
      return this.$core.getOffer.getOfferLeadTimeToShip(this.offer);
    },
    productVariantId() {
      return this.$core.getOffer.getOfferProductVariantId(this.offer);
    },
    productTitle() {
      return this.$core.getProduct.getProductTitle(this.product);
    },
    productImage() {
      return this.$core.getProduct.getProductMainImage(this.product);
    },
    stock() {
      return this.$core.getOffer.getOfferStock(this.offer);
    },
  },
  data() {
    return {
      quantity: this.offer.offerPrices[0].itemPerPack,
      quantityPerPack: this.offer.offerPrices[0].itemPerPack,
      offerSelected: this.offer.offerPrices[0].id,
      quantityKey: 1,
    };
  },
  watch: {
    offerSelected: {
      handler: function (value) {
        const offerSelected = this.offer.offerPrices.find((offerPrice) => offerPrice.id === value);
        this.quantityPerPack = offerSelected.itemPerPack;
        this.quantity = offerSelected.itemPerPack;
        this.quantityKey += 1;
      },
    },
    offerPrices() {
      this.quantity = this.offerPrices[0].itemPerPack;
      this.quantityPerPack = this.offerPrices[0].itemPerPack;
      this.offerSelected = this.offerPrices[0].id;
      this.quantityKey += 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.min-max-order-quantity {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-style: italic;
  font-weight: 400;
  line-height: 16px;
  text-align: left;

  &:not(:first-child) {
    margin-top: 8px;
  }

  .quantity {
    margin-left: 4px;
    font-size: 16px;
    font-weight: 500;
  }
}

.offers-section {
  margin-top: 10px;
}

.livraison-info {
  display: flex;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #000000;

  .date {
    margin-left: 2px;
    font-size: 14px;
    line-height: 19.2px;
  }
}

.stock-info {
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  color: #3fc62a;
  margin-right: 2px;
}

.v-input--radio-group__input {
  flex-direction: row !important;
  align-items: start !important;
}

.button_to_cart .dj-btn--primary {
  background-color: var(--color-primary) !important;
  background: var(--color-primary) !important;
  border-radius: 0px !important;
  border-top-right-radius: var(--border-radius-button) !important;
  border-bottom-right-radius: var(--border-radius-button) !important;
}

.quantity_to_cart input {
  border: 0.5px solid #4d4d4f !important;
  box-sizing: border-box !important;
  background: #ffffff !important;
  border-radius: 5px !important;
  height: 40px !important;
  padding: 0px !important;
}

.quantity-section {
  @media (max-width: 550px) {
    flex-direction: column;
  }

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  &:not(:first-child) {
    margin-top: 20px;
  }

  .text-qte {
    padding-bottom: 10px;
    padding-right: 16px;
    margin-bottom: 10px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
  }
}

.fullWithQteBuyingZone {
  @media (max-width: 550px) {
    width: 100% !important;
  }
}

.stock-info-rupture {
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  color: #c62a2a;
  margin-right: 2px;
}
</style>
