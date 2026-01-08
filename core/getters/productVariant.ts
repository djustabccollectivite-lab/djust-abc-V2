import * as ProductInterface from '../interfaces/IProduct';
import { ProductVariant } from '../interfaces/IOffer';
import { ProductVariantGetters } from './types';

export const getProductId = (product: ProductVariant): string => product.id;

export const getProductTitle = (product: ProductVariant): string | null => {
    return product?.name ? product.name : null;
};

export const getProductNpm = (product: ProductVariant): string | null => product.mpn;

export const getProductSku = (product: ProductVariant): string => product.skuProduct;

export const getProductMainImage = (product: ProductVariant): string | null => product.mainImageUrl;

export const getProductPictures = (
    productVariant: ProductInterface.ProductV2,
): ProductInterface.ProductMediaInfoDTO[] | null => {
    const res = productVariant?.pictureUrls ? [...productVariant.pictureUrls] : [];
    res.sort(function (x, y) {
        return x.isMain === y.isMain ? 0 : x.isMain ? -1 : 1;
    });
    return res;
};

// Interface pour Getters Products

const productVariantGetters: ProductVariantGetters<ProductVariant> = {
    getProductId,
    getProductTitle,
    getProductNpm,
    getProductSku,
    getProductMainImage,
    getProductPictures,
};

export default productVariantGetters;
