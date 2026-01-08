import { FoAddressDto, FoCustomerOrganisationDto, EnumOrganisationStatus } from '../../interfaces/IOrganisation';

export const children: FoCustomerOrganisationDto = {
    id: '00002',
    accountId: 'A0002',
    name: 'nameOrgaChildren',
    children: [],
    addresses: [
        {
            id: '00012',
            label: 'labelChildren',
            fullName: 'ruechildren',
            country: 'francechildren',
            state: 'ilechildren',
            city: 'parischildren',
            zipcode: '75000children',
            address: 'boetiechildren',
            additionalAddress: 'djustchildren',
            phone: '06060606children',
            shipping: true,
            billing: false,
        },
    ],
    status: EnumOrganisationStatus.ACTIVE,
};

export const organisation: FoCustomerOrganisationDto = {
    id: '00001',
    accountId: 'A0001',
    name: 'nameOrga',
    children: [children],
    addresses: [
        {
            id: '00010',
            label: 'label',
            fullName: 'rue',
            country: 'france',
            state: 'ile',
            city: 'paris',
            zipcode: '75000',
            address: 'boetie',
            additionalAddress: 'djust',
            phone: '06060606',
            shipping: true,
            billing: false,
        },
    ],
    status: EnumOrganisationStatus.INACTIVE,
};
