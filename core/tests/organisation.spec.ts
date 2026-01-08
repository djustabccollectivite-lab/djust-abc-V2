import organisationGetters from '../getters/organisation';
import { organisation } from './data/organisation';

test('get organisation id', () => {
    expect(organisationGetters.getOrganisationId(organisation)).toBe('00001');
});

test('get organisation accountid', () => {
    expect(organisationGetters.getAccountId(organisation)).toBe('A0001');
});

test('get organisation name', () => {
    expect(organisationGetters.getOrganisationName(organisation)).toBe('nameOrga');
});

test('get organisation name', () => {
    expect(organisationGetters.getChildrenOrga(organisation)).toStrictEqual([
        {
            accountId: 'A0002',
            addresses: [
                {
                    additionalAddress: 'djustchildren',
                    address: 'boetiechildren',
                    billing: false,
                    city: 'parischildren',
                    country: 'francechildren',
                    fullName: 'ruechildren',
                    id: '00012',
                    label: 'labelChildren',
                    phone: '06060606children',
                    shipping: true,
                    state: 'ilechildren',
                    zipcode: '75000children',
                },
            ],
            children: [],
            id: '00002',
            name: 'nameOrgaChildren',
            status: 0,
        },
    ]);
});

test('get organisation status', () => {
    expect(organisationGetters.getEnumOrganisationStatus(organisation)).toBe(1);
});
