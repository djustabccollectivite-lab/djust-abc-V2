import type { Context } from '@nuxt/types';
import type {OrderLogisticItem} from "~/core/interfaces/IOrder";

export default (context: Context) => ({
    getOfferCustomFieldFromOrderLine(orderLine: OrderLogisticItem, value: string) {
        const attribute = orderLine.offerCustomFieldSnapshotDtos?.find((customField) => customField.offerCustomFieldSnapshotDto.externalId === value);
        if (!attribute) {
            return null;
        }
        return attribute.value;
    },
    getproductCustomFieldFromOrderLine(orderLine: OrderLogisticItem, value: string) {
        const attribute = orderLine.orderLogisticLineProductDto.productAttributeValues.find((customField) => customField.attributeExternalId === value);
        if (!attribute) {
            return null;
        }
        return attribute.attributeValue;
    },
});
