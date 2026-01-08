import addressGetters, { getFullAddress } from '../getters/address';
import { AddressFull } from './data/address';

test('Get FullAdress', () => {
    expect(addressGetters.getFullAddress(AddressFull)).toStrictEqual(
        'Kipchoge - 21 rue de la boetie Paris France zipcodehere'
    );
});

test('Get Addictionnal Addresse', () => {
    expect(addressGetters.getAdditionalAddress(AddressFull)).toBe('1 rue de la victoire');
});

test('Get Address', () => {
    expect(addressGetters.getAddress(AddressFull)).toBe('21 rue de la boetie');
});

test('Get City', () => {
    expect(addressGetters.getCity(AddressFull)).toBe('Paris');
});

test('Get Country', () => {
    expect(addressGetters.getCountry(AddressFull)).toBe('France');
});

test('Get FullName', () => {
    expect(addressGetters.getFullName(AddressFull)).toBe('Kipchoge');
});

test('Get label', () => {
    expect(addressGetters.getLabel(AddressFull)).toBe('labelhere');
});

test('Get phone', () => {
    expect(addressGetters.getPhone(AddressFull)).toBe('0601010101');
});

test('Get State', () => {
    expect(addressGetters.getState(AddressFull)).toBe('statehere');
});

test('Get ZipCode', () => {
    expect(addressGetters.getCode(AddressFull)).toBe('zipcodehere');
});

test('Get id', () => {
    expect(addressGetters.getid(AddressFull)).toBe('1');
});

test('Get Version', () => {
    expect(addressGetters.getVersion(AddressFull)).toBe(2);
});

test('Get Shipping', () => {
    expect(addressGetters.getShipping(AddressFull)).toBe(true);
});

test('Get Billing', () => {
    expect(addressGetters.getBilling(AddressFull)).toBe(false);
});
