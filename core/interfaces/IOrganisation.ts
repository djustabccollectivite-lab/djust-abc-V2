export enum EnumOrganisationStatus {
    ACTIVE,
    INACTIVE,
}

export interface FoAddressDto {
    id: string;
    label: string;
    fullName: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    address: string;
    additionalAddress: string;
    phone: string;
    shipping: boolean;
    billing: boolean;
}

export interface FoCustomerOrganisationDto {
    id: string;
    accountId: string;
    name: string;
    children: FoCustomerOrganisationDto[];
    addresses: FoAddressDto[];
    status: EnumOrganisationStatus;
}
