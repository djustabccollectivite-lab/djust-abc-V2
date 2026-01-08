import { BuyingList, BuyingListItem, BuyingListItemWithOfferId } from '../interfaces/IWishlist';
import { WishlistGetters } from './types';
import tools from '../helpers/tools';

export const getTotal = (items: any): any => items.length;

export const getOfferIdFromBuyingListItem = (item: BuyingListItem): string => item.offerPrice.id;

export const getQteFromBuyingListItem = (item: BuyingListItem): Number => item.quantity;

export const getMinOrderFromBuyingListItem = (item: BuyingListItem): Number => item.offerInventory.minOrderQuantity;

export const getStockFromBuyingListItem = (item: BuyingListItem): Number => item.offerInventory.stock;

export const getBuyingListToOrder = (items: BuyingList): BuyingListItemWithOfferId[] => {
    let listToAdd: BuyingListItemWithOfferId[] = [];
    items?.buyingListItems?.forEach((item) => {
        listToAdd.push({
            offerId: getOfferIdFromBuyingListItem(item),
            quantity: getQteFromBuyingListItem(item),
            minOrder: getMinOrderFromBuyingListItem(item),
            stock: getStockFromBuyingListItem(item),
            deliveryLines: [],
        });
    });
    return listToAdd;
};
export const getBuyingListToOrderV2 = (items: BuyingList): BuyingListItemWithOfferId[] => {
    let listToAdd: BuyingListItemWithOfferId[] = [];
    items?.buyingListItems?.forEach((item) => {
        listToAdd.push({
            offerId: item.offerPrice.externalId,
            quantity: getQteFromBuyingListItem(item),
            minOrder: getMinOrderFromBuyingListItem(item),
            stock: getStockFromBuyingListItem(item),
            deliveryLines: [],
        });
    });
    return listToAdd;
};

export const getBuyingListTotalPriceHT = (buyingListItems: BuyingListItem[], currency: string): string => {
    const prices = buyingListItems.map((cartitem) => {
        return {
            price: tools.calculDetermineProductPrice(cartitem.offerPrice.priceRanges, cartitem.quantity),
            quantity: cartitem.quantity,
        };
    });
    const total = prices.reduce((acc, { quantity, price }) => acc + quantity * price, 0);
    return tools.formatCurrencyAuto(total, currency);
};

const wishlistGetters: WishlistGetters = {
    getTotal: getTotal,
    getOfferIdFromBuyingListItem: getOfferIdFromBuyingListItem,
    getQteFromBuyingListItem: getQteFromBuyingListItem,
    getBuyingListToOrder: getBuyingListToOrder,
    getMinOrderFromBuyingListItem: getMinOrderFromBuyingListItem,
    getStockFromBuyingListItem: getStockFromBuyingListItem,
    getBuyingListToOrderV2: getBuyingListToOrderV2,
    getBuyingListTotalPriceHT:getBuyingListTotalPriceHT
};

export default wishlistGetters;
