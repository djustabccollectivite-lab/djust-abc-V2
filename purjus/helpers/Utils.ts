import type { FoOfferInventoryWithPrices, FoBestOfferPrice } from '~/core/interfaces/IOffer';
import { Product } from '~/core/interfaces/IProduct';
import type { Order } from '~/core/interfaces/Order/IOrderResponse';
import tools from '@/core/helpers/tools';

export default () => ({
    extractOfferCustomFieldValue(offer: FoOfferInventoryWithPrices | FoBestOfferPrice, externalId: string): unknown {
        const customFieldValue = offer?.offerInventory?.customFieldValues.find(
            (customFieldValue) => customFieldValue.customField.externalId === externalId,
        );
        if (undefined === customFieldValue) {
            return null;
        }
        return customFieldValue.value.value;
    },
    extractOfferCustomFieldValuev2(offer: any, externalId: string): unknown {
        const customFieldValue = offer.customFields.find(
            (customFieldValue) => customFieldValue.externalId === externalId,
        );
        if (customFieldValue === undefined) {
            return null;
        }
        return customFieldValue.value;
    },
    extractProductCustomFieldValue(product: Product, externalId: string): unknown {
        const customFieldValue = product.attributeValues.find(
            (attribute) => attribute.attribute.externalId === externalId,
        );
        if (customFieldValue === undefined) {
            return null;
        }
        return customFieldValue.value;
    },
    extractOrderCustomFieldValue(order: Order, externalId: string): unknown {
        const customFieldValue = order?.customFieldValues.find(
            (customFieldValue) => customFieldValue.customField.externalId === externalId,
        );
        if (undefined === customFieldValue) {
            return null;
        }
        return customFieldValue.value;
    },
    downloadFile(stream: Blob, documentName: string): void {
        const url = window.URL.createObjectURL(stream);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = documentName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    },
    formatPrice(price: number, currency: string) {
        const htmlPrice = tools.formatCurrencyAuto(price, currency);
        return htmlPrice.replaceAll(/<.*?>/g, '').replaceAll(' ', ' ');
    },
});
