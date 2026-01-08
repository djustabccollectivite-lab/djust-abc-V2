import { CustomFieldData, CustomFieldMandatory, FoCustomFieldValue } from '../ICustomField';
import { NavCategoriesChildren, NavCategoriesRequest } from './IRequestCategorie';

export interface CategorieResponse {
    childrenCategories: NavCategoriesChildren[];
    customFieldValues: CustomFieldData[];
    id: string;
    name: string;
}

export interface NavigationCategoriesResponse {
    active: boolean;
    childrenCategories: NavCategoriesRequest[];
    customFieldValues: FoCustomFieldValue[];
    externalId: string;
    id: string;
    name: string;
}

export interface NavigationCategoriesBreadCrumbResponse {
    customFieldValues: CustomFieldMandatory[];
    externalId: string;
    id: string;
    name: string;
    parent: NavigationCategoriesBreadCrumbResponse[];
}
