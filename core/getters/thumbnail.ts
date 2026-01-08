import { Product, Thumbnails } from '../interfaces/IProduct';
import { ProductThumbnail,ProductThumbnailv2, Thumbnail, ProductThumbnailVariant, ProductThumbnailVariantPictureUrl } from '../interfaces/IThumbnail';
import { ContentRecordSearchResponse } from '../interfaces/Product/IResponseProduct';
import { ThumbnailGetters } from './types';

export const getProductFromThumbnail = (productThumbnail: ProductThumbnail): Product => productThumbnail.product;
export const getProductVariantFromThumbnail = (productThumbnail: ProductThumbnailv2): ProductThumbnailVariant => productThumbnail.variant;

export const getProductThumbnailId = (productThumbnail: ProductThumbnail): string => productThumbnail.product.id;

export const getProductThumbnailTitle = (productThumbnail: ProductThumbnail): string =>
    productThumbnail.product.name[Object.keys(productThumbnail.product.name)[0]];

export const getProductThumbnailCategory = (productThumbnail: ProductThumbnail): string =>
    productThumbnail.product.navigationCategories[0].name;

export const getProductThumbnailSku = (productThumbnail: ProductThumbnail): string => productThumbnail.product.sku;

export const getProductThumbnailBrandName = (productThumbnail: ProductThumbnail): string =>
    productThumbnail.product.brand;

export const getProductThumbnailDescription = (productThumbnail: ProductThumbnail): string =>
    productThumbnail.product.description[Object.keys(productThumbnail.product.description)[0]];

export const getProductThumbnailNbReviews = (productThumbnail: ProductThumbnail): number =>
    productThumbnail.productReviewRatings?.countRating;

export const getProductThumbnaiRating = (productThumbnail: ProductThumbnail): number =>
    productThumbnail.productReviewRatings?.rating;

export const getProductminShippingPrice = (productThumbnail: ProductThumbnail): number | null =>
    productThumbnail.bestOffer ? productThumbnail.bestOffer.offerInventory.minShippingPrice : null;

export const getProductThumbnailImages = (productThumbnail: any): Thumbnails[] => {
    const thumbnails: { url: string }[] | null = [];
    productThumbnail.product.imageLinks.forEach((image: string) =>
        thumbnails.push({
            url: image,
        })
    );
    return thumbnails;
};

export const getProductThumbnailMainImage = (productThumbnail: ProductThumbnailVariant): ProductThumbnailVariantPictureUrl[] => {
    const thumbnails: { url: string }[] | null = [];
    const res = productThumbnail?.pictureUrls ? [...productThumbnail.pictureUrls] : [];
    res.sort(function (x, y) {
        return x.main === y.main ? 0 : x.main ? -1 : 1;
    });
    return res;
};

export const getProductThumbnailBestOffer = (productThumbnail: ProductThumbnail): any => {
    return {
        id: productThumbnail.bestOffer ? productThumbnail.bestOffer.offerPrice.id : null,
        price: productThumbnail.bestOffer ? productThumbnail.bestOffer.offerPrice.priceRanges[0].price.itemPrice : null,
        priceUnit: productThumbnail.bestOffer
            ? productThumbnail.bestOffer.offerPrice.priceRanges[0].price.unitPrice
            : null,
        quantity: productThumbnail.bestOffer ? productThumbnail.bestOffer.offerPrice.priceRanges[0].quantity : null,
        quantityPerPack: productThumbnail.bestOffer ? productThumbnail.bestOffer.offerPrice.itemPerPack : null,
        discrountPrice: productThumbnail.bestOffer
            ? productThumbnail.bestOffer.offerPrice.priceRanges[0].discountPrice?.unitPrice
            : null,
        productVariantId: productThumbnail.bestOffer ? productThumbnail.bestOffer.offerInventory.variant.id : null,
    };
};

export const getProductsThumbnailId = (productsList: Product[]): any => {
    const x = productsList ? productsList.map((item) => item.id) : null;
    const xDedoublonne = [...new Set(x)];
    return xDedoublonne;
};

export const getProductBestOfferName = (product: ProductThumbnail): string | undefined => {
    return product.bestOffer?.offerInventory?.variant.name;
};
export const getProductVariantName = (product: ContentRecordSearchResponse): string => {
    return product?.variant?.name;
};
const thumbnailProductGetters: ThumbnailGetters<ProductThumbnail, ProductThumbnailv2, Product, ProductThumbnailVariantPictureUrl> = {
    getProductThumbnailId: getProductThumbnailId,
    getProductThumbnailTitle: getProductThumbnailTitle,
    getProductThumbnailCategory: getProductThumbnailCategory,
    getProductThumbnailSku: getProductThumbnailSku,
    getProductThumbnailBrandName: getProductThumbnailBrandName,
    getProductThumbnailNbReviews: getProductThumbnailNbReviews,
    getProductThumbnaiRating: getProductThumbnaiRating,
    getProductThumbnailImages: getProductThumbnailImages,
    getProductThumbnailDescription: getProductThumbnailDescription,
    getProductThumbnailBestOffer: getProductThumbnailBestOffer,
    getProductsThumbnailId: getProductsThumbnailId,
    getProductFromThumbnail: getProductFromThumbnail,
    getProductminShippingPrice: getProductminShippingPrice,
    getProductBestOfferName: getProductBestOfferName,
    getProductVariantName: getProductVariantName,
    getProductVariantFromThumbnail:getProductVariantFromThumbnail,
    getProductThumbnailMainImage: getProductThumbnailMainImage
};

export default thumbnailProductGetters;
