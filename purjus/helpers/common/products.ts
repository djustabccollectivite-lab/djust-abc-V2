import { Context } from '@nuxt/types';
import type { ProductThumbnail } from '~/core/interfaces/IThumbnail';
import type { Product } from '~/core/interfaces/IProduct';

export default (context: Context) => ({
    async getProductListFromCart(cart): Promise<ProductThumbnail[]> {
        const skus = cart.map((line) => line.productVariant.skuProduct);
        if (0 === skus.length) {
            return [];
        }
        const productList = await context.$purjus.useProducts.getProductsBySkus(skus);
        return productList?.productThumbnails?.content;
    },
    getImageFromProduct(product: Product) {
        // cf getters/product.ts
        const productsPics = [...product.productPictures].sort(function (x, y) {
            return x.isMain === y.isMain ? 0 : x.isMain ? -1 : 1;
        });
        const isMain = 1 < productsPics.length ? productsPics.find((media) => media.isMain) : productsPics[0];
        return isMain;
    },
});
