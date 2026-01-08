import type { lang } from './Common';

export interface FoCustomField {
    externalId: string;
    id: string;
    name: string;
    type: string;
}

type customFieldValueType = 'STRING' | 'NUMBER';
export interface FoCustomFieldValue {
    customField: FoCustomField;
    value: {
        customField: {
            type: customFieldValueType;
            id: string;
            name: Partial<Record<lang, string>>;
            externalId: string;
            externalSource: string;
            mandatory: boolean;
            status: string;
            sealedTarget: string;
            role: string | null;
        };
        value: unknown;
        type: customFieldValueType;
    };
}

export interface CustomFieldData {
    name: string;
    type: string;
    value: string;
    externalId: string;
}

export interface CustomFieldMandatory {
    externalId: string;
    externalSource: string;
    id: string;
    mandatory: boolean;
    name: string;
    role: string;
    sealedTarget: string;
    status: string;
    type: string;
}

export interface OfferCustomFieldSnapshotDtos {
    offerCustomFieldSnapshotDto: OfferCustomFieldSnapshotDto;
    value: string;
}

export interface OfferCustomFieldSnapshotDto {
    externalId: string;
    externalSource: string;
    mandatory: boolean;
    name: {
        FR?: string;
        EN?: string;
    };
    role: string;
    sealedTarget: string;
    status: string;
    type: string;
}

export enum AttributeValueType {
    LONG_TEXT = 'string',
    TEXT = 'string',
    NUMBER = 'number',
    METRIC = 'string',
    DATE = 'string',
    COLOR = 'string',
    MEDIA = 'string',
    LIST_TEXT = 'array',
    LIST_METRIC = 'array',
    LIST_COLOR = 'array',
}

export interface OfferCustomField {
    id: string;
    name: string;
    value: string;
}
