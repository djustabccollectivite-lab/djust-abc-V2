import { CustomFieldData, FoCustomFieldValue } from '../ICustomField';

export interface NavCategoriesRequest {
    active: boolean;
    childrenCategories: NavCategoriesRequest[];
    customFieldValues: FoCustomFieldValue[];
    externalId: string;
    id: string;
    name: string;
}
export interface NavCategoriesChildren {
    childrenCategories: NavCategoriesChildren[];
    customFieldValues: CustomFieldData[];
    id: string;
    name: string;
}
export interface NavCategoriesRequestRemoveActive {
    active: boolean;
    childrenCategories: NavCategoriesChildren[];
    customFieldValues: CustomFieldData[];
    externalId: string;
    id: string;
    name: string;
}
