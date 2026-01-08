import tools from '../helpers/tools';
import { Address } from '../interfaces/IQuote';
import { AddressGetters } from './types';

export const getFullAddress = (address: Address): String => tools.formatAddress(address);
export const getAdditionalAddress = (address: Address): String | null => address.additionalAddress;
export const getAddress = (address: Address): String => address.address;
export const getCity = (address: Address): String => address.city;
export const getCountry = (address: Address): String => address.country;
export const getFullName = (address: Address): String => address.fullName;
export const getLabel = (address: Address): String => address.label;
export const getPhone = (address: Address): String => address.phone;
export const getState = (address: Address): String => address.state;
export const getCode = (address: Address): String => address.zipcode;
export const getid = (address: Address): String => address.id;
export const getVersion = (address: Address): Number => address.version;
export const getShipping = (address: Address): Boolean => address.shipping;
export const getBilling = (address: Address): Boolean => address.billing;
export const getDefaultAddrressId = (addresses: Address[]): String | null => {
    return addresses.length > 0 ? addresses[0].id : null;
};

const addressGetters: AddressGetters = {
    getFullAddress: getFullAddress,
    getAdditionalAddress: getAdditionalAddress,
    getAddress: getAddress,
    getCity: getCity,
    getCountry: getCountry,
    getFullName: getFullName,
    getLabel: getLabel,
    getPhone: getPhone,
    getState: getState,
    getCode: getCode,
    getid: getid,
    getVersion: getVersion,
    getShipping: getShipping,
    getBilling: getBilling,
    getDefaultAddrressId: getDefaultAddrressId,
};

export default addressGetters;
