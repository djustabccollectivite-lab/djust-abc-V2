import { ProductVariant } from './IOffer';
import { Supplier } from './ISupplier';
import { ClassificationCategory, NavigationCategorySimpleView, ProductSpecification } from './IProduct';

export interface Quote {
    description: string | null;
    id: string;
    quoteLines: QuoteLine[];
    name: string;
    supplierQuotes: SupplierQuote[];
}

export interface QuoteLine {
    id: string;
    price: number | null;
    offerInventoryId: string | null;
    productVariant: ProductVariant;
    quantity: number;
    quoteDeliveryLines: QuoteDeliveryLine[];
}

export interface QuoteDeliveryLine {
    quantity: number;
    shippingAddress: Address;
}

export interface Address {
    additionalAddress: string | null;
    address: string;
    city: string;
    country: string;
    fullName: string;
    label: string;
    phone: string;
    state: string;
    zipcode: string;
    id: string;
    version: number;
    shipping: boolean;
    billing: boolean;
}

export interface ProductEntity {
    catalogViews: CatalogViewEntity[];
    createdAt: string;
    djustProductUuid: string;
    externalProductId: string;
    externalSource: string;
    id: string;
    productGroupId: string;
    productInfo: ProductInfo;
    status: string;
}

export interface SupplierQuote {
    createdAt: string;
    updatedAt: string;
    customerUserId: string;
    id: string;
    status: string;
    quoteLines: QuoteLine[];
    supplier: Supplier;
    validityDate: string | null;
    billingAddress: Address;
}

export interface SimpleUserView {
    email: string;
    firstName: string;
    id: string;
    lastName: string;
    specificUserId: string;
}

export interface CatalogViewEntity {
    createdAt: string;
    description: string;
    id: string;
    name: string;
    status: string;
    updatedAT: string;
    version: number;
}

export interface ProductInfo {
    additionalImageLink: string[];
    brand: string;
    classificationCategory: ClassificationCategory;
    description: string;
    defaultLanguage: string;
    gtin: string;
    mainImageUrl: string;
    mpn: string;
    navigationCategories: NavigationCategorySimpleView[];
    productName: string;
    specifications: ProductSpecification[];
}
