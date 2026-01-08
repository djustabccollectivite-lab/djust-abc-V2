import type { Context } from '@nuxt/types';
import type {
    Product552Response,
    Product552Data,
    Currency,
    Attribute,
    ProductVariantSearch,
} from '~/purjus/interfaces/common/searchv2';

export default (context: Context) => ({
    async getProductList(params?: Partial<Product552Data>): Promise<Product552Response> {
        const defaultParams: Product552Data = {
            query: {
                locale: context.i18n.locale,
                currency: context.store.state.app.currency as Currency,
                pageable: {},
            },
        };
        const mergedParams = {
            ...defaultParams,
            ...params,
            query: {
                ...defaultParams.query,
                ...params?.query,
            },
        };
        return await context.$purjus.api.searchv2ApiClient.product552(mergedParams);
    },
    extractProductAttributeValueByExternalId(productAttributes: Attribute[], externalId: string): unknown {
        const attribute = productAttributes.find((attr) => attr.externalId === externalId);
        return attribute?.value as unknown;
    },
    extractProductVariantImage(
        productVariant: ProductVariantSearch,
        formatType = 'WEBP',
        sizeType = 'MEDIUM',
    ): string | undefined {
        const media = productVariant.pictureUrls?.find(
            (media) => media.formatType === formatType && media.sizeType === sizeType,
        );
        return media?.url;
    },
});
