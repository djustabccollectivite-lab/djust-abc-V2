export interface CustomFieldValueResponse {
    externalId: string;
    externalSource: string;
    id: string;
    mandatory: boolean;
    name: CustomFieldValueName;
    role: string;
    sealedTarget: string;
    status: string;
    type: string;
}

export interface CustomFieldValueName {
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string;
}
export interface CustomFieldResponse {
    customField: CustomFieldValueResponse;
}
