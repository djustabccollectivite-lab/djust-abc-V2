export enum suppliersStatus {
    ACTIVE,
    INACTIVE,
    SUSPENDED,
    UNKNOWN,
}

export enum externalSource {
    MIRAKL,
    CLIENT,
    NOT_DEFINED,
    EXTERN,
}

export interface Supplier {
    id: string;
    name: string;
    externalId: string;
    supplierStatus: suppliersStatus;
    totalOffers: number;
    totalOrders: number;
    totalSales: number;
    supplierRating: string | null;
    description: string | null;
    image1: string | null;
    image2: string | null;
    image3: string | null;
    logo: string | null;
    isDefault: boolean;
    evaluationCount: number;
    externalSource: externalSource;
}

export interface SupplierSnapShot {
  description: string;
  externalId: string;
  id: string;
  name: string;
  paymentDueDate: PaymentDueDate;
  returnPolicy: unknown;
  totalOffers: number;
  totalOrders: number;
  totalSales: number;
}

export interface PaymentDueDate { 
  paymentDueDateDelay: number;
  paymentDueDateMode: string;
}