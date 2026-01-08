import thumbnailProductGetters from '../getters/thumbnail';
import { thumbnailProduct, product } from './data/thumbnail';

const product1 = { ...product };
const product2 = {
    ...product,
    id: '10021',
    sku: '10130',
    name: {
        EN: 'Bottle of lemon juice',
    },
    description: {
        FR: 'CITRON',
    },
    productStatus: 'ACTIVE',
    brand: 'DJUST',
};
const product3 = {
    ...product,
    id: '11111',
    sku: '1130',
    name: {
        EN: 'Bottle of chocolate',
    },
    description: {
        FR: 'Chocolat',
    },
    productStatus: 'ACTIVE',
    brand: 'DJUST',
};

const porducts = [product1, product2, product3, product1];

test('Thumbnail Product', () => {
    expect(thumbnailProductGetters.getProductFromThumbnail(thumbnailProduct)).toStrictEqual(product);
});

test('Thumbnail Product id', () => {
    expect(thumbnailProductGetters.getProductThumbnailId(thumbnailProduct)).toBe('46602');
});

test('Thumbnail Product title', () => {
    expect(thumbnailProductGetters.getProductThumbnailTitle(thumbnailProduct)).toBe('Bottle of water');
});

test('Thumbnail Product Category', () => {
    expect(thumbnailProductGetters.getProductThumbnailCategory(thumbnailProduct)).toBe('boisson');
});

test('Thumbnail Product Sku', () => {
    expect(thumbnailProductGetters.getProductThumbnailSku(thumbnailProduct)).toBe('10129');
});

test('Thumbnail Product Brand', () => {
    expect(thumbnailProductGetters.getProductThumbnailBrandName(thumbnailProduct)).toBe('DJUST');
});

test('Thumbnail Product Description', () => {
    expect(thumbnailProductGetters.getProductThumbnailDescription(thumbnailProduct)).toBe('WATER');
});

test('Thumbnail Product NbReviews', () => {
    expect(thumbnailProductGetters.getProductThumbnailNbReviews(thumbnailProduct)).toBe(5);
});

test('Thumbnail Product Rating', () => {
    expect(thumbnailProductGetters.getProductThumbnaiRating(thumbnailProduct)).toBe(5);
});

test('Thumbnail Product BestOffer', () => {
    expect(thumbnailProductGetters.getProductThumbnailBestOffer(thumbnailProduct)).toStrictEqual({
        discrountPrice: 0.667,
        id: '46759',
        price: 1,
        productVariantId: '46653',
        priceUnit: 0.667,
        quantity: 1,
        quantityPerPack: 1,
    });
});

test('Thumbnail Product Image', () => {
    expect(thumbnailProductGetters.getProductThumbnailImages(thumbnailProduct)).toStrictEqual([
        {
            url: 'https://s3.eu-west-3.amazonaws.com/djust.dam.noprod/1644592496499-Bouteille-plastique_default_default_default_default_default.jpg',
        },
    ]);
});

test('Thumbnail All products ID', () => {
    return expect(thumbnailProductGetters.getProductsThumbnailId(porducts)).toStrictEqual(['46602', '10021', '11111']);
});
