export enum ReasonType {
    INCIDENT_OPEN = 'INCIDENT_OPEN',
    REFUND = 'REFUND',
    ORDER_MESSAGING = 'ORDER_MESSAGING',
    OFFER_MESSAGING = 'OFFER_MESSAGING',
    CANCELATION = 'CANCELATION',
}

export interface CustomFieldData {
    customFieldId: string;
    customFieldValue: string;
}

export interface Thread {
    lineId: string;
    message: string;
    reasonCode: string;
}

export interface CreateOrder {
    channel: string;
    locale: string;
    origin: string;
    originId: string;
}
export interface PostOrderList {
    nbPreviewLines?: number;
    page?: number;
    size?: number;
    sort?: string[];
    locale: string;
    supplierIds?: string[];
}

export interface PunchoutRequest {
    tenantId: string;
    tenantConfigId: string;
    commercialBusinessId: string;
    buyerCookie: string;
    locale: string
}