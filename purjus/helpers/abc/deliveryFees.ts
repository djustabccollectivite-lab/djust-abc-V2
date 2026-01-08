import type { Context } from '@nuxt/types';
import type { CartLine } from '../../interfaces/common/cartv2';
import type { Supplier } from '../../interfaces/djustInterfaces';
import type { Offer } from '~/core/api/OfferService';
import type { Address } from '~/core/interfaces/IQuote';

enum Rule {
    WEIGHT = 'Poids x département',
    PERCENTAGE = 'Pourcentage',
}

enum CfExtId {
    RULE = 'regle_frais_livraison',
    PERCENTAGE = 'pourcentage_frais_livraison',
    MATRIX = 'matrice_livraison',
    WEIGHT = 'Caracteristique_Poids_livraison',
}

enum SpecialSupplier {
    C2E = 'C2E',
    SPL = 'SPL',
}

const RuleThreshold = {
    C2E: 100,
    SPL: 100,
};

type NumberRange = `${number}_${number}`;

type DeliveryFeesBySupplier = Record<string, number>;

const matrixRules = {
    [SpecialSupplier.C2E]: (price: number, weight: number) => Math.round(((weight + 10) / 100) * price),
    [SpecialSupplier.SPL]: (price: number, weight: number) => Math.round((weight / 100) * price),
};

function extractCustomFieldValue<T>(
    customFieldValues: Supplier['customFieldValues'],
    externalId: string,
): T | undefined {
    return customFieldValues.find((el) => el.customField.externalId.includes(externalId))?.value as T;
}

function getSuppliersFromCartLines(cartLines: CartLine[]) {
    return cartLines.reduce((acc: Record<string, CartLine[]>, item) => {
        const supplierId = item.supplier.id;
        if (!acc[supplierId]) {
            acc[supplierId] = [];
        }
        acc[supplierId].push(item);
        return acc;
    }, {});
}

function calculateFeesByPercentage(products: CartLine[], percentage: number) {
    return Math.round(
        products.reduce((acc, item) => {
            const feePerItem = item.offer.totalPrice.priceWithoutTax * (percentage / 100);
            return acc + feePerItem * item.quantity;
        }, 0),
    );
}

// extraie une valeur de la matrice en fonction du poids
// [0_100, 10] => [range, value], d'ou le return [1]
function extractPriceFromMatrixLine(matrixLine: Record<NumberRange, number>, weight: number) {
    return Object.entries(matrixLine).find(([range]) => {
        const [min, max] = range.split('_').map((n) => parseInt(n, 10));
        return weight >= min && weight <= max;
    })?.[1];
}

function calculateFeesByMatrix(
    products: CartLine[],
    matrixData: string,
    departmentNumber: string,
    supplierDetails: Supplier,
) {
    const parsedMatrixData = parseMatrixData(matrixData);
    const departmentLine = parsedMatrixData[departmentNumber];
    const totalWeight = products.reduce((acc, item) => {
        return (
            acc +
            item.quantity *
                parseInt(item.productVariant.variantAttributesValues.find((v) => v.id === CfExtId.WEIGHT)?.value ?? '0')
        );
    }, 0);

    if (!departmentLine) {
        return 0;
    }
    const price = extractPriceFromMatrixLine(departmentLine, totalWeight) ?? 0;
    if (
        Object.keys(RuleThreshold).includes(supplierDetails.externalId) &&
        totalWeight > RuleThreshold[supplierDetails.externalId]
    ) {
        return matrixRules[supplierDetails.externalId](price as number, totalWeight);
    }
    return price;
}

// quick csv parser
function parseMatrixData(matrixData: string): { [departmentNumber: string]: Record<NumberRange, number> } {
    const [header, ...lines] = matrixData.split('\n');
    const weightRanges = header
        .split(';')
        .slice(1)
        .map((range) => range.trim());

    return lines.reduce((acc, line) => {
        const [departmentNumber, ...fees] = line.split(';');
        if (!departmentNumber) {
            return acc;
        }
        acc[departmentNumber] = fees.reduce((feeAcc, fee, index) => {
            feeAcc[weightRanges[index]] = parseInt(fee, 10);
            return feeAcc;
        }, {});
        return acc;
    }, {});
}

async function getSupplierDeliveryFees(
    supplierDetails: Supplier,
    products: CartLine[],
    departmentNumber: string | undefined,
) {
    const deliveryFeesRule = extractCustomFieldValue<Rule>(supplierDetails.customFieldValues, CfExtId.RULE);

    if (deliveryFeesRule === Rule.PERCENTAGE) {
        const percentage = extractCustomFieldValue<number>(supplierDetails.customFieldValues, CfExtId.PERCENTAGE);
        if (percentage === undefined) {
            return 0;
        }
        return calculateFeesByPercentage(products, percentage);
    } else if (deliveryFeesRule === Rule.WEIGHT) {
        const matrice = extractCustomFieldValue<string>(supplierDetails.customFieldValues, CfExtId.MATRIX);
        if (matrice === undefined || !departmentNumber) {
            return 0;
        }
        const matrixData = await fetch(matrice).then((response) => response.text());
        return calculateFeesByMatrix(products, matrixData, departmentNumber, supplierDetails);
    }

    return 0;
}

function getAddressDepartmentNumber(address: Address) {
    return address.zipcode.slice(0, 2);
}

export default (context: Context) => {
    async function fetchOfferByExternalId(externalId: string): Promise<Offer | undefined> {
        const offers = await context.$purjus.useOffers.getOfferList({ offerIds: [externalId], idType: 'EXTERNAL_ID' });
        return offers.content[0];
    }
    function getSelectedAddressDepartmentNumber(): string | undefined {
        const selectedAddressId = context.store.state.cart.cartShippingAddressId as string | null;
        const address = context.store.state.user.addressShippingList.find(
            (address: Address) => address.id === selectedAddressId,
        );
        if (!address) {
            return;
        }
        return getAddressDepartmentNumber(address);
    }
    return {
        async getTotalDeliveryFees(cartLines: CartLine[]): Promise<DeliveryFeesBySupplier> {
            const cart = context.store.getters['purjus/cartv2/monoCart'];
            if (cart.totalPrice.priceWithoutTax > 2000) {
                return {};
            }
            const departmentNumber = getSelectedAddressDepartmentNumber();
            const suppliers = getSuppliersFromCartLines(cartLines);

            const totalDeliveryFees = await Promise.all(
                Object.entries(suppliers).map(async ([supplierId, products]) => {
                    const supplierDetails = await context.$purjus.useSupplier.getSupplierDetails(supplierId);
                    const deliveryFees = await getSupplierDeliveryFees(supplierDetails, products, departmentNumber);

                    return { supplierId, deliveryFees };
                }),
            );

            return totalDeliveryFees.reduce((acc, { supplierId, deliveryFees }) => {
                acc[supplierId] = deliveryFees;

                return acc;
            }, {});
        },
        async addDeliveryFeesToCart(cartId: string, deliveryFees: DeliveryFeesBySupplier): Promise<void> {
            await Promise.all(
                Object.entries(deliveryFees).map(async ([supplierId, fees]) => {
                    const deliveryFeeOfferPrice = (await fetchOfferByExternalId(`${supplierId}_FDL`))?.offerPrices[0];
                    if (!deliveryFeeOfferPrice) {
                        return;
                    }
                    await context.$purjus.useCartv2.modifyLines(cartId, [
                        {
                            offerPriceId: deliveryFeeOfferPrice.externalId,
                            quantity: fees,
                            updateAction: 'REPLACE_QUANTITY',
                        },
                    ]);
                }),
            );
        },
        async removeDeliveryFeesFromCart(cartId: string): Promise<void> {
            const cartDetails = await context.$purjus.useCartv2.getLines(cartId);
            const fdlItems = cartDetails.cartLines.filter((item) => item.productVariant.id === 'FDL');

            if (fdlItems.length > 0) {
                const fdlOfferIds = fdlItems.map((fdlItem) => fdlItem.offer.offerPriceId);
                // Supprimer toutes les lignes frais de livraison en une seule fois
                await context.$purjus.useCartv2.deleteLines(cartId, fdlOfferIds);
            }
        },
        async cleanupFDLIfNeeded(currentRouteName: string): Promise<void> {
            // Garder les produits de frais de livraison (FDL) sur la page de paiement
            const allowedPages = ['Payement_Checkout'];

            // Si on n'est pas sur la page supprime les FDL
            if (!allowedPages.includes(currentRouteName)) {
                try {
                    const cart = context.store.getters['purjus/cartv2/monoCart'];
                    if (cart?.id) {
                        await this.removeDeliveryFeesFromCart(cart.id);
                        await context.store.dispatch('purjus/cartv2/retrieveCarts');
                    }
                } catch (error) {
                    console.error('Erreur lors de la suppression des FDL:', error);
                }
            }
        },
    };
};
