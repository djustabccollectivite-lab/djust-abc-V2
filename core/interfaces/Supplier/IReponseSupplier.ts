import { CustomFieldValueResponse } from '../CustomField/ICustomField';

export interface SupplierDetailReponse {
    additionalImageLink: string[];
    banner: string;
    createdAt: Date;
    customFieldValues: CustomFieldValueResponse[];
    description: string;
    evaluationCount: number;
    externalId: string;
    externalSource: string;
    id: string;
    isDefault: true;
    logo: string;
    name: string;
    paymentDueDate: {
        paymentDueDateDelay: number;
        paymentDueDateMode: string;
    };
    returnPolicy: string;
    supplierRating: string;
    supplierStatus: string;
    totalOffers: number;
    totalOrders: number;
    totalSales: number;
    updatedAt: Date;
}

export interface SupplierEvaluationsResponse {
    comment: string;
    creationDate: Date;
    customerId: string;
    firstname: string;
    grade: number;
    lastUpdatedDate: Date;
    lastname: string;
}
