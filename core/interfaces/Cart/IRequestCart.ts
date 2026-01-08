import { CartDeliveryLine } from "../ICart";

export interface RequestUpdateCartLine {
  deliveryLines: CartDeliveryLine[];
  offerPriceId: string;
  quantity: number;
}

export interface RequestCartBillingAddress {
  addressId: string;
}
