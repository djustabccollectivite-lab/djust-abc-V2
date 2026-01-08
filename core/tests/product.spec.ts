import productGetters from '../getters/product';
import { productDefault, productReview, reviewDefault } from '@/core/tests/data/product';

describe('Product Getters', () => {
    const product = { ...productDefault };

    const thumbnails: any[] = [];
    product.imageLinks.forEach((image) =>
        thumbnails.push({
            url: image,
        })
    );

    test('Product ID', () => {
        expect(productGetters.getProductId(product)).toBe('0');
    });

    test('Product Name', () => {
        expect(productGetters.getProductTitle(product)).toBe(product.name[Object.keys(product.name)[0]]);
    });

    test('Product Npm', () => {
        expect(productGetters.getProductNpm(product)).toBe(product.mpn);
    });

    test('Product Category', () => {
        expect(productGetters.getProductCategory(product)).toBe('string');
    });

    test('Product Sku', () => {
        expect(productGetters.getProductSku(product)).toBe(product.sku);
    });

    test('Product Main Image', () => {
        expect(productGetters.getProductMainImage(product)).toBe(product.productPictures[0]);
    });

    test('Product Description', () => {
        expect(productGetters.getProductDescription(product)).toBe(
            product.description[Object.keys(product.description)[0]]
        );
    });

    test('Product Brand', () => {
        expect(productGetters.getProductBrand(product)).toBe(product.brand);
    });

    test('Product Specifications', () => {
        expect(productGetters.getProductSpecifications(product)).toBe(product.specifications);
    });

    test('Product Tags', () => {
        const tags = [
            {
                createdAt: '2021-07-07T08:01:46.020Z',
                id: '0',
                name: 'Tag1',
                updatedAt: '2021-07-07T08:01:46.020Z',
            },
            {
                createdAt: '2021-07-07T08:01:46.020Z',
                id: '0',
                name: 'tag__Tag2',
                updatedAt: '2021-07-07T08:01:46.020Z',
            },
        ];
        const product = { ...productDefault, tags: tags };
        expect(productGetters.getProductTags(product)).toStrictEqual(['Tag1', 'Tag2']);
    });

    test('Product Thumbnails', () => {
        const additionalImageLink = ['url1', 'url2'];
        const product = { ...productDefault, imageLinks: additionalImageLink };
        expect(productGetters.getProductThumbnails(product)).toStrictEqual([{ url: 'url1' }, { url: 'url2' }]);
    });
});
