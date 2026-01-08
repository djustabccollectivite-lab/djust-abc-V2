import { SupplierData } from './data/supplier';
import supplierGetters from '../getters/supplier';
import { externalSource, suppliersStatus } from '../interfaces/ISupplier';

test(' Get supplier ID', () => {
    expect(supplierGetters.getId(SupplierData)).toBe('5');
});

test(' Get Supplier Name', () => {
    expect(supplierGetters.getName(SupplierData)).toBe('Arnoshop');
});

test(' Get External ID', () => {
    expect(supplierGetters.getExternalId(SupplierData)).toBe('2002');
});

test(' Get Supplier status', () => {
    expect(supplierGetters.getSupplierStatus(SupplierData)).toBe(suppliersStatus.ACTIVE);
});

test(' Get Total Offers', () => {
    expect(supplierGetters.getTotalOffers(SupplierData)).toBe(0);
});

test(' Get Total Orders', () => {
    expect(supplierGetters.getTotalOrders(SupplierData)).toBe(13);
});

test(' Get Total Sales', () => {
    expect(supplierGetters.getTotalSales(SupplierData)).toBe(8);
});

test(' Get Description', () => {
    expect(supplierGetters.getDescription(SupplierData)).toBe('blabla');
});

test(' Get Supplier Rating', () => {
    expect(supplierGetters.getSupplierRating(SupplierData)).toBe(null);
});

test(' Get image 1', () => {
    expect(supplierGetters.getimage1(SupplierData)).toBe('png');
});

test(' Get Image 2', () => {
    expect(supplierGetters.getimage2(SupplierData)).toBe('photo');
});

test(' Get Image 3', () => {
    expect(supplierGetters.getimage3(SupplierData)).toBe('image');
});

test(' Get Logo', () => {
    expect(supplierGetters.getLogo(SupplierData)).toBe('Djust');
});

test(' Get supplier isdefault', () => {
    expect(supplierGetters.getIsDefault(SupplierData)).toBe(false);
});

test(' Get supplier evaluation count', () => {
    expect(supplierGetters.getEvaluationCount(SupplierData)).toBe(5);
});

test(' Get supplier externalSource', () => {
    expect(supplierGetters.getExternalSource(SupplierData)).toBe(externalSource.MIRAKL);
});
