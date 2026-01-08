import { FoCustomerOrganisationDto, EnumOrganisationStatus } from '../interfaces/IOrganisation';
import { OrganisationGetters } from './types';

export const getOrganisationId = (organisation: FoCustomerOrganisationDto): string => {
    return organisation.id;
};

export const getAccountId = (orgnaisation: FoCustomerOrganisationDto): string => orgnaisation.accountId;

export const getOrganisationName = (organisation: FoCustomerOrganisationDto): string => organisation.name;

export const getChildrenOrga = (organisation: FoCustomerOrganisationDto): FoCustomerOrganisationDto[] =>
    organisation.children;

export const getEnumOrganisationStatus = (organisation: FoCustomerOrganisationDto): EnumOrganisationStatus =>
    organisation.status;

const organisationGet: OrganisationGetters<FoCustomerOrganisationDto, EnumOrganisationStatus> = {
    getOrganisationId,
    getAccountId,
    getOrganisationName,
    getChildrenOrga,
    getEnumOrganisationStatus,
};

export default organisationGet;
