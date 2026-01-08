import type {OfferInventory, OfferPrice, PriceRange} from "~/core/interfaces/IOffer";

export default () => ({
    // Détermine le prix à afficher en fonction des fourchettes de prix et de la quantité fournie.
    getPriceFromPriceRange(offer: OfferPrice, quantity: number) {
        let minimumQuantity = 0;
        let selectedPriceRange: PriceRange | null = null;
        for (const priceRange of offer.priceRanges) {
            if (quantity >= priceRange.quantity && priceRange.quantity > minimumQuantity) {
                minimumQuantity = priceRange.quantity;
                selectedPriceRange = priceRange;
            }
        }
        return selectedPriceRange;
    }
});
