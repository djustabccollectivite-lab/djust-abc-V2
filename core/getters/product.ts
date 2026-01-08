import { FoAttributeValue } from '../interfaces/ICart';
import { AttributeValueType } from '../interfaces/ICustomField';
import * as ProductInterface from '../interfaces/IProduct';
import { ProductGetters } from './types';

export const getProductId = (product: ProductInterface.Product): string => {
    return product.id;
};

export const getProductTitle = (product: ProductInterface.Product): string | null => {
    const nameObj = product.name;

    return typeof nameObj === 'object' ? nameObj[Object.keys(nameObj)[0]] : nameObj;
};

export const getProductName = (product: ProductInterface.ProductV2): string => product?.name;

export const getProductNpm = (product: ProductInterface.Product): string | null =>
    product.mpn ? product.mpn : product.externalId;

export const getProductCategory = (product: ProductInterface.Product): string => {
    return product.navigationCategories && product.navigationCategories.length > 0
        ? product.navigationCategories[0].name
        : '';
};

export const getProductSku = (product: ProductInterface.Product): string => product.sku;
export const getProductExternalId = (product: ProductInterface.Product): string => product.externalId;

export const getProductMainImage = (product: ProductInterface.Product): ProductInterface.ProductMediaInfoDTO | null => {
    const res = [...product.productPictures];
    res.sort(function (x, y) {
        return x.isMain === y.isMain ? 0 : x.isMain ? -1 : 1;
    });
    return res[0];
};

export const getProductDescription = (product: ProductInterface.Product): string => {
    const descObj = product?.description;
    return typeof descObj === 'object' ? descObj[Object.keys(descObj)[0]] : descObj;
};

export const getProductBrand = (product: ProductInterface.Product): string => product.brand;

export const getProductTags = (product: ProductInterface.Product): Array<any> => {
    const prefixLength = process.env.tag_prefix ? process.env.tag_prefix?.length : 5;
    const prefixTag = process.env.tag_prefix ? process.env.tag_prefix : 'tag__';
    const regEx = new RegExp('^' + prefixTag);
    return product.tags.map((tag) => (regEx.test(tag.name) ? tag.name.substr(prefixLength) : tag.name));
};

export const getProductSpecifications = (product: ProductInterface.Product): ProductInterface.ProductSpecification[] =>
    product.specifications;

export const getProductThumbnails = (product: ProductInterface.Product): ProductInterface.Thumbnails[] | null => {
    const thumbnails: { url: string }[] | null = [];
    product.imageLinks.forEach((image: string) =>
        thumbnails.push({
            url: image,
        }),
    );
    return thumbnails;
};

export const getProductPictures = (
    product: ProductInterface.Product,
): ProductInterface.ProductMediaInfoDTO[] | null => {
    const res = product?.productPictures ? [...product.productPictures] : [];
    res.sort(function (x, y) {
        return x.isMain === y.isMain ? 0 : x.isMain ? -1 : 1;
    });
    return res;
};

export const getMainPictureUrl = (product: ProductInterface.ProductV2): string => product?.mainPictureUrl;

export const getRatingProduct = (reviews: ProductInterface.ProductReview[]): any => {
    const calculateRating = (obj: any): any =>
        Object.values(obj).reduce((acc: any, rating: any) => acc + rating.productReview.rating, 0);
    return reviews?.length > 0 ? (calculateRating(reviews) / reviews.length).toFixed(1) : null;
};

export const getReviews = (reviews: any): any => reviews;

export const getAttributes = (attributes: any): any => {
    return attributes;
};

export const getProductAttributesValues = (product: ProductInterface.Product, locale: string): any => {
    const res = product.attributeValues.map((attribut: FoAttributeValue): any => {
        let valueAttribute: string = '';

        if (attribut.value) {
            switch (attribut.attribute.type) {
                case 'LIST_TEXT':
                    valueAttribute = attribut.value[0];
                    break;
                case 'LIST_METRIC':
                    valueAttribute = `${attribut.value.selectedValue} ${attribut.value.unit}`;
                    break;
                case 'METRIC':
                    valueAttribute = `${attribut.value.selectedValue} ${attribut.value.unit}`;
                    break;
                case 'LIST_COLOR':
                    valueAttribute = attribut.value[0].label;
                    break;
                default:
                    valueAttribute = attribut.value;
            }
        }

        const attributNameLocale = Object.entries(attribut.attribute.name).find(([id, _value]) => id.includes(locale));

        return {
            externalId: attribut.attribute.externalId,
            label: attributNameLocale ? attributNameLocale[1] : Object.entries(attribut.attribute.name[0])[1],
            value: valueAttribute,
        };
    });

    return res;
};

export const getProductAttributes = (product: ProductInterface.Product): FoAttributeValue[] => product.attributeValues;

export const getProductCustomField = (
    product: ProductInterface.Product,
    customFieldExternalID: string,
): AttributeValueType[] => {
    const customFieldData: AttributeValueType[] = [];

    for (let i = 0; i < product.attributeValues.length; i++) {
        const a = product.attributeValues[i];

        if (a.attribute.externalId === customFieldExternalID) {
            customFieldData.push(a.value);
        }
    }

    return customFieldData;
};

export const getProductUnit = (product: ProductInterface.Product): string => {
    const unit = product.productUnit.unit || '';
    return unit;
};

// interface pour Getters Products

const productGetters: ProductGetters<ProductInterface.Product> = {
    getProductId,
    getProductExternalId,
    getProductTitle,
    getProductNpm,
    getProductCategory,
    getProductSku,
    getProductMainImage,
    getProductDescription,
    getProductBrand,
    getProductTags,
    getProductSpecifications,
    getProductThumbnails,
    getRatingProduct,
    getReviews,
    getAttributes,
    getProductAttributes,
    getProductPictures,
    getProductAttributesValues,
    getProductCustomField,
    getProductUnit,
    getProductName,
    getMainPictureUrl,
};

export default productGetters;
