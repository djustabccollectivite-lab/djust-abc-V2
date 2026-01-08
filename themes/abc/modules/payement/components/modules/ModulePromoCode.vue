<template>
  <div>
    <h2 class="dj-promo-code__title">{{ $t("checkout.payment.promo.title") }}</h2>

    <form @submit.prevent="validatePromoCode">
      <div class="d-flex">
        <input class="dj-promo-code__input mr-4 pl-4" type="text" v-model="promoCode"
          :placeholder="$t('checkout.payment.promo.placeholder')" />

        <DjButton @click="validatePromoCode" :text="$t('checkout.payment.promo.button')" styleButton="secondary"
          :isDisabled="!promoCode" />
      </div>
    </form>

    <div v-if="message.value" :class="`dj-promo-code__${message.type} mt-2`">{{ message.value }}</div>

    <div v-if="voucher.value" class="dj-promo-code__voucher mt-5 pt-5">
      <div class="dj-promo-code__voucher-label">
        <DjIcon @click="removeVoucher" class="dj-promo-code__close-icon icon-cross mr-2" />
        <div class="pr-3">{{ voucher.value }}{{ voucher.conditions ? '*' : '' }}</div>
      </div>

      <div class="dj-promo-code__voucher-infos">
        {{ voucher.infos }}
      </div>

      <div class="dj-promo-code__voucher-conditions">{{ voucher.conditions }}</div>
    </div>
  </div>
</template>

<script>
import DjInput from '@components/atoms/DjInput/DjInput.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjIcon from '@components/atoms/DjIcon/DjIcon.vue';

export default {
  components: { DjInput, DjButton, DjIcon },
  props: {
    validPromoCode: {
      type: String,
      default: null,
    }
  },
  data: () => ({
    promoCode: "",
    voucher: {},
    message: {},
  }),
  methods: {
    validatePromoCode() {
      this.error = "";
      this.message = {};
      if (this.promoCode !== this.validPromoCode) {
        this.message.type = "error";
        this.message.value = this.$i18n.t('checkout.payment.promo.notValid');
        return;
      }
      this.message.type = "success";
      this.message.value = this.$i18n.t('checkout.payment.promo.valid');
      this.voucher = {
        value: this.validPromoCode,
        infos: "-50.00 €",
        conditions: "* Cette somme sera remboursée après l'expédition de votre commande."
      };
      this.promoCode = "";
    },
    removeVoucher() {
      this.promoCode = "";
      this.voucher = {};
      this.message = {};
    }
  }
}
</script>

