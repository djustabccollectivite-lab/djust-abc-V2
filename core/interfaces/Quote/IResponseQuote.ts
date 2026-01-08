import { SupplierQuote, Address, QuoteLine } from '../IQuote';
import { ProductVariant } from '../IOffer';
import { SupplierDetailReponse } from '../Supplier/IReponseSupplier';

export interface MasterQuoteDetail {
    id: string;
    productVariant: ProductVariant;
    quantity: number;
};

export interface MasterQuoteResponse {
    description: string | null;
    id: string;
    masterQuoteDetails: MasterQuoteDetail[];
    name: string;
    supplierQuotes: SupplierQuote[];
};

export interface Sort {
    ascending: boolean;
    descending: boolean;
    direction: string;
    ignoreCase: boolean;
    nullHandling: string;
    property: string;
};

export interface Pageable {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: true;
    sort: Sort[];
    unpaged: true;
};

export interface PageMasterQuoteResponse {
    content: MasterQuoteResponse[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: Pageable;
    size: number;
    sort: Sort[];
    totalElements: number;
    totalPages: number;
};

export interface CustomerThread {
    message: string;
    messageDate: Date;
    name: string;
};

export interface SupplierQuoteResponse {
    billingAddress: Address;
    createdAt: Date;
    customerName: string;
    customerThread: CustomerThread[];
    customerUserId: string;
    id: string;
    quoteLines: QuoteLine[];
    status: string;
    supplier: SupplierDetailReponse;
    updatedAt: Date;
    validityDate: Date | null;
};

enum SupplierQuoteStatus {
    STAGING = 'STAGING',
    NEW = 'NEW',
    WAITING_FOR_CUSTOMER = 'WAITING_FOR_CUSTOMER',
    WAITING_FOR_SUPPLIER_INFOS = 'WAITING_FOR_SUPPLIER_INFOS',
    WAITING_FOR_OPERATOR = 'WAITING_FOR_OPERATOR',
    DECLINED_BY_OPERATOR = 'DECLINED_BY_OPERATOR',
    DECLINED_BY_SUPPLIER = 'DECLINED_BY_SUPPLIER',
    DECLINED_BY_CUSTOMER = 'DECLINED_BY_CUSTOMER',
    VALIDATED = 'VALIDATED',
    CLOSED = 'CLOSED'
};

export interface SupplierQuoteStatusResponse {
    status: SupplierQuoteStatus;
};
