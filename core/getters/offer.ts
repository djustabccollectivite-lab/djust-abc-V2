// There is many fix to DO !!!!!
import { FoBestOfferPrice, FoOfferInventoryWithPrices, OfferPrice, PriceRange } from '../interfaces/IOffer';
import { ContentRecordSearchResponse } from '../interfaces/Product/IResponseProduct';
import tools from '../helpers/tools';
import { FoCustomFieldValue } from '../interfaces/ICustomField';
import { FoProductVariant } from '../interfaces/ICart';
import { OfferGetters } from './types';

export const getNumberOffers = (offersToDisplay: any): number => (offersToDisplay ? offersToDisplay.length : 0);

export const getOfferId = (offer: OfferPrice): string => offer.id;

export const getOfferExternalId = (offer: OfferPrice): string => offer.externalId;

export const getOfferCurrency = (offer: FoBestOfferPrice): string => offer.offerInventory.currency;

export const getOfferStock = (offer: FoOfferInventoryWithPrices | FoBestOfferPrice): number => {
    return offer?.offerInventory.stock;
};

export const getOfferStockV2 = (offer: { stock: number }): number => {
    return offer?.stock;
};

export const getOfferminOrderQuantity = (offer: FoOfferInventoryWithPrices | FoBestOfferPrice): number => {
    return offer.offerInventory.minOrderQuantity;
};

export const getOfferLeadTimeToShip = (offer: FoOfferInventoryWithPrices | FoBestOfferPrice): number => {
    return offer.offerInventory.leadTimeToShip ? offer.offerInventory.leadTimeToShip : 0;
};
// todo variabiliser le leadTimeToShip

export const getOfferItemPerPack = (offer: OfferPrice): number => {
    return offer.itemPerPack;
};
export const getQuantityPerItem = (offer: FoBestOfferPrice): string => {
    return offer.offerInventory.quantityPerItem + ' ' + offer.offerInventory.productUnit;
};

export const getOfferSupplierName = (offer: FoBestOfferPrice): string => {
    return offer.supplier.name;
};

export const getOfferSupplierId = (offer: FoBestOfferPrice): string => {
    return offer.supplier.id;
};

export const getOfferProductVariantId = (offer: FoBestOfferPrice): string | undefined => {
    try {
        return offer.offerInventory.variant.id;
    } catch (error) {
        return undefined;
    }
};

export const getOfferVariantId = (offer: ContentRecordSearchResponse): string => {
    return offer?.variant?.id;
};
export const getOfferPackingType = (offer: FoBestOfferPrice): string => {
    return offer.offerInventory.packingType;
};

export const getProductVariantMpn = (offer: FoBestOfferPrice): string => {
    return offer.offerInventory.variant.mpn;
};
export const getOfferMinShippingFees = (offer: FoBestOfferPrice): any => {
    return offer.offerInventory?.minShippingPrice;
};

export const getOfferPrices = (offer: FoOfferInventoryWithPrices): OfferPrice[] => {
    if (offer?.offerPrices?.length > 0) {
        const offersACCOUNT = offer.offerPrices.filter((offerPrice) => offerPrice.offerPriceType === 'ACCOUNT');
        const offersGROUP = offer.offerPrices.filter((offerPrice) => offerPrice.offerPriceType === 'GROUP');
        const offersPUBLIC = offer.offerPrices.filter((offerPrice) => offerPrice.offerPriceType === 'PUBLIC');
        return offersACCOUNT.length > 0 ? offersACCOUNT : offersGROUP.length > 0 ? offersGROUP : offersPUBLIC;
    } else {
        return [];
    }
};

export const getOfferPriceNbPriceRanges = (offerPrice: OfferPrice): number => offerPrice.priceRanges.length;

export const getOfferPricePriceRanges = (offerPrice: OfferPrice): PriceRange[] => offerPrice.priceRanges;

export const getFirstPriceFromOfferPrice = (
    offerPrice: OfferPrice,
    currency: string,
    format: boolean,
    maximumFractionDigits?: number,
): any => {
    return format
        ? tools.formatCurrencyAuto(offerPrice.priceRanges[0].price.itemPrice, currency, maximumFractionDigits)
        : offerPrice.priceRanges[0].price.itemPrice;
};

export const getFirstDiscountPriceFromOfferPrice = (
    offerPrice: OfferPrice,
    currency: string,
    format: boolean,
    maximumFractionDigits?: number,
): any => {
    return format
        ? tools.formatCurrencyAuto(offerPrice.priceRanges[0].discountPrice.itemPrice, currency, maximumFractionDigits)
        : offerPrice.priceRanges[0].price.itemPrice;
};

export const getFirstPriceWithQuantityFromOfferPrice = (
    offerPrice: OfferPrice,
    quantity: number,
    currency: string,
    format: boolean,
    maximumFractionDigits?: number,
): any => {
    return format
        ? tools.formatCurrencyAuto(
              offerPrice.priceRanges[0].price.itemPrice * quantity,
              currency,
              maximumFractionDigits,
          )
        : offerPrice.priceRanges[0].price.itemPrice * quantity;
};

export const getBestOfferPriceFromOfferInventory = (offerInventory: FoOfferInventoryWithPrices): OfferPrice | any => {
    // Cette fonction retourne la meilleur offerPrice d'une OfferInventory
    if (offerInventory.offerPrices.length > 0 && offerInventory.offerInventory.stock > 0) {
        // on filtre les offres (PUBLIC, GROUP ou ACCOUNT)
        const offers = getOfferPrices(offerInventory);
        // Si on a plusieurs offerPrice
        if (offers.length > 1) {
            // on trie les offres par ordre des prix et on prend la première
            return offers.reduce(function (prev: any, current: any) {
                return prev.priceRanges[0].price.itemPrice < current.priceRanges[0].price.itemPrice ? prev : current;
            });
        } else if (offers.length === 1) {
            // Si on a qu'une seule offerPrice, on retourne le seul élément de la liste
            return offers[0];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

export const getBestOfferFromList = (offers: FoOfferInventoryWithPrices[]): FoOfferInventoryWithPrices | any => {
    const offersTypePriority = ['ACCOUNT', 'GROUP', 'PUBLIC'];
    // Cette fonction retourne l'offerInventory qui contient la meilleur offerPrice
    if (offers?.length > 0) {
        // Get offres if stock > 0
        let filterOffers =
            offers.length > 1
                ? offers.filter((offer) => offer.offerInventory.stock > 0 && offer.offerPrices.length > 0)
                : offers;
        filterOffers = filterOffers.length === 0 ? offers : filterOffers;
        const BestOffer = filterOffers.reduce(function (prev, current) {
            // Récupérer pour chaque offre la meilleure offerPrice (selon le type et le prix)
            const prevBestOfferPrice = getBestOfferPriceFromOfferInventory(prev);
            const currentBestOfferPrice = getBestOfferPriceFromOfferInventory(current);
            // Si une des deux offres pas d'offer price ou pas de stock, prendre l'autre
            if (!prevBestOfferPrice || !currentBestOfferPrice) {
                return prevBestOfferPrice ? prev : current;
            }
            // Choisir l'offre avec le type le plus prioritaire
            if (
                offersTypePriority.indexOf(prevBestOfferPrice.offerPriceType) <
                offersTypePriority.indexOf(currentBestOfferPrice.offerPriceType)
            ) {
                return prev;
            } else if (
                offersTypePriority.indexOf(prevBestOfferPrice.offerPriceType) >
                offersTypePriority.indexOf(currentBestOfferPrice.offerPriceType)
            ) {
                return current;
            }
            // Si même type d'offer price, choisir l'offre avec le prix le plus bas
            return prevBestOfferPrice.priceRanges[0].price.itemPrice <
                currentBestOfferPrice.priceRanges[0].price.itemPrice
                ? prev
                : current;
        });
        return BestOffer;
    } else {
        return null;
    }
};

export const getBestOfferFromSupplier = (
    offers: FoOfferInventoryWithPrices[],
    supplierName: String,
): FoOfferInventoryWithPrices | boolean => {
    const offers_ = [...offers];
    const filtList = offers_.filter((offer) => offer.supplier.name === supplierName);
    return getBestOfferFromList(filtList);
};

export const getFormatedPrice = (price: number, currency: string, maximumFractionDigits?: number): any => {
    return tools.formatCurrencyAuto(price, currency, maximumFractionDigits);
};

export const getOffersToDisplay = (offers: any): FoBestOfferPrice[] => offers.offersToDisplay;

export const getOffersSupplierList = (offers: FoBestOfferPrice[]): any => offers.map((offer) => offer.supplier.name);

export const getOfferCustomFields = (offer: FoBestOfferPrice): FoCustomFieldValue[] => {
    return offer.offerInventory.customFieldValues;
};

export const getOfferCustomFieldsById = (offer: FoBestOfferPrice, id: string): FoCustomFieldValue => {
    return offer?.offerInventory.customFieldValues.find((cf) => cf.customField.externalId === id) as FoCustomFieldValue;
};

export const getProductsVariantsFromOffers = (offers: FoBestOfferPrice[]): FoProductVariant[] => {
    const productsVariantsList: FoProductVariant[] = [];
    offers.forEach((offer: FoBestOfferPrice) => {
        productsVariantsList.push(offer.offerInventory.variant);
    });
    return productsVariantsList;
};

export const getDeliveryDates = (offer: FoBestOfferPrice): any => {
    if (offer !== null) {
        return offer[0] ? offer[0].estimatedDeliveryDates : null;
    }
};

export const getOfferIdFormSearch = (offer: ContentRecordSearchResponse): string => {
    return offer?.offerPrice?.id;
};
export const getOfferPriceFormSearch = (offer: ContentRecordSearchResponse): number => {
    return offer?.offerPrice?.price;
};
export const getOfferPriceHTFormSearch = (offer: ContentRecordSearchResponse): number => {
    return offer?.offerPrice?.itemPrice;
};
const offerGetters: OfferGetters<
    OfferPrice,
    ContentRecordSearchResponse,
    FoBestOfferPrice,
    FoOfferInventoryWithPrices
> = {
    getOfferId,
    getOfferCurrency,
    getOfferStock,
    getOfferStockV2,
    getOfferLeadTimeToShip,
    getOfferSupplierName,
    getOfferSupplierId,
    getOfferProductVariantId,
    getOfferPrices,
    getOfferPriceNbPriceRanges,
    getOfferPricePriceRanges,
    // getOfferFirstPrice:getOfferFirstPrice,
    getFirstPriceFromOfferPrice,
    getFirstDiscountPriceFromOfferPrice,
    getFirstPriceWithQuantityFromOfferPrice,
    // getBestPriceFromOfferInventory:getBestPriceFromOfferInventory,
    getBestOfferPriceFromOfferInventory,
    getBestOfferFromList,
    getBestOfferFromSupplier,
    getOfferMinShippingFees,
    getFormatedPrice,
    getNumberOffers,
    getOffersToDisplay,
    getOffersSupplierList,
    getOfferItemPerPack,
    getQuantityPerItem,
    getOfferPackingType,
    getOfferminOrderQuantity,
    getOfferCustomFields,
    getOfferCustomFieldsById,
    getProductsVariantsFromOffers,
    getDeliveryDates,
    getProductVariantMpn,
    getOfferExternalId,
    getOfferIdFormSearch,
    getOfferPriceFormSearch,
    getOfferPriceHTFormSearch,
    getOfferVariantId,
};

export default offerGetters;
