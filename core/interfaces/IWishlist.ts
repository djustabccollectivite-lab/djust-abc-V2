import { FoSupplier } from './ICart';
import { OfferInventory, OfferPrice } from './IOffer';
import { CartDeliveryLine } from './ICart';
export interface BuyingList {
    buyingListItems: BuyingListItem[];
    customerUserId: string;
    id: string;
    name: string;
}

export interface BuyingListItem {
    id: string;
    offerPrice: OfferPrice;
    offerInventory: OfferInventory;
    supplier: FoSupplier;
    quantity: number;
}

export interface BuyingListItemWithOfferId {
    deliveryLines: CartDeliveryLine[];
    minOrder: Number;
    offerId: string;
    quantity: Number;
    stock: Number;
}
