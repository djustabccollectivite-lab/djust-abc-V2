import * as MangopayCheckout from "@mangopay/checkout-sdk";
export default (context, inject) => {
  if (MangopayCheckout && MangopayCheckout.CheckoutSdk) {
    inject("mangopayCheckout", MangopayCheckout.CheckoutSdk);
  } else {
    console.error('Can not use Mangopay')
  }
};
